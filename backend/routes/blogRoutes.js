import express from "express";
import Blog from "../models/Blog.js";
import protectAdmin from "../middleware/authMiddleware.js";
import uploadBlogImage from "../middleware/uploadBlogImage.js";

const router = express.Router();

// Public: all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
});

// Public: single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
});

// Admin: create blog with image upload
router.post("/", protectAdmin, uploadBlogImage.single("image"), async (req, res) => {
  try {
    const { title, shortDescription, category, author, content } = req.body;

    if (!title || !shortDescription || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "All required blog fields must be filled",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Blog image is required",
      });
    }

    const imagePath = `http://localhost:${process.env.PORT || 5000}/uploads/blogs/${req.file.filename}`;

    const newBlog = await Blog.create({
      title,
      shortDescription,
      category,
      image: imagePath,
      author: author || "Saas Clinic",
      content,
    });

    res.status(201).json({
      success: true,
      message: "Blog added successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: error.message,
    });
  }
});

// Admin: delete blog
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      error: error.message,
    });
  }
});

export default router;