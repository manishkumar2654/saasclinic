import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

router.post("/book-appointment", async (req, res) => {
  try {
    const { fullName, phoneNumber, emailAddress, message } = req.body;

    if (!fullName || !phoneNumber || !message) {
      return res.status(400).json({
        success: false,
        message: "Full name, phone number and message are required",
      });
    }

    const newAppointment = new Appointment({
      fullName,
      phoneNumber,
      emailAddress: emailAddress || "",
      message,
    });

    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment request saved successfully",
      data: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;