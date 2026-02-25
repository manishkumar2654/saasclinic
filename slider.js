// slider.js
export function initImageSlider() {
  const root = document.getElementById("imgSlider");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll(".slide"));
  if (!slides.length) return;

  const prevBtn = document.getElementById("imgPrev");
  const nextBtn = document.getElementById("imgNext");
  const dotsWrap = document.getElementById("imgDots");
  const progress = document.getElementById("imgProgress");

  const AUTOPLAY_MS = 5200; // little slower = premium feel
  const ZOOM_DURATION_MS = AUTOPLAY_MS + 900; // smooth zoom across slide time
  let index = 0;
  let timer = null;

  // ---- helpers
  function setBaseStyles() {
    // ensure stacking + smooth look
    slides.forEach((s) => {
      s.style.willChange = "opacity";
      const img = s.querySelector(".slider-img");
      if (img) {
        img.style.willChange = "transform, filter";
        img.style.transformOrigin = "center";
        img.style.transition = `transform ${ZOOM_DURATION_MS}ms ease, filter ${ZOOM_DURATION_MS}ms ease`;
      }

      const content = s.querySelector(".slider-content");
      if (content) {
        content.style.willChange = "transform, opacity";
        content.style.transition = "transform 700ms ease, opacity 700ms ease";
      }
    });
  }

  // build dots
  let dots = [];
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className =
        "h-2.5 w-2.5 rounded-full bg-white/50 transition-all duration-300";
      b.setAttribute("aria-label", `Slide ${i + 1}`);
      b.addEventListener("click", () => go(i));
      dotsWrap.appendChild(b);
      return b;
    });
  }

  function applyZoom(slide, active) {
    const img = slide.querySelector(".slider-img");
    if (!img) return;

    // alternates direction per slide index
    const zoomIn = index % 2 === 0;

    if (active) {
      // reset first (important for re-trigger)
      img.style.transition = "none";
      img.style.transform = zoomIn ? "scale(1.04)" : "scale(1.12)";
      img.style.filter = "saturate(1.05) contrast(1.03)";

      requestAnimationFrame(() => {
        img.style.transition = `transform ${ZOOM_DURATION_MS}ms ease, filter ${ZOOM_DURATION_MS}ms ease`;
        img.style.transform = zoomIn ? "scale(1.12)" : "scale(1.04)";
        img.style.filter = "saturate(1.12) contrast(1.06)";
      });
    } else {
      img.style.transition = "none";
      img.style.transform = "scale(1.02)";
      img.style.filter = "saturate(1) contrast(1)";
    }
  }

  function applyContentAnim(slide, active) {
    const content = slide.querySelector(".slider-content");
    if (!content) return;

    if (active) {
      content.style.opacity = "0";
      content.style.transform = "translateY(12px)";
      requestAnimationFrame(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      });
    } else {
      content.style.opacity = "0";
      content.style.transform = "translateY(8px)";
    }
  }

  function render() {
    slides.forEach((s, i) => {
      const active = i === index;

      // fade slide
      s.style.opacity = active ? "1" : "0";
      s.style.pointerEvents = active ? "auto" : "none";

      // premium effects
      applyZoom(s, active);
      applyContentAnim(s, active);
    });

    // dots state
    dots.forEach((d, i) => {
      const active = i === index;
      d.classList.toggle("w-6", active);
      d.classList.toggle("bg-white", active);
      d.classList.toggle("bg-white/50", !active);
    });

    // progress
    if (progress) {
      progress.style.transition = "none";
      progress.style.width = "0%";
      requestAnimationFrame(() => {
        progress.style.transition = `width ${AUTOPLAY_MS}ms linear`;
        progress.style.width = "100%";
      });
    }
  }

  function go(i) {
    index = (i + slides.length) % slides.length;
    render();
    restart();
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, AUTOPLAY_MS);
  }

  // init
  setBaseStyles();

  // first visible
  slides.forEach((s, i) => {
    s.style.opacity = i === 0 ? "1" : "0";
    s.style.pointerEvents = i === 0 ? "auto" : "none";
  });

  render();
  restart();

  // controls
  nextBtn && nextBtn.addEventListener("click", next);
  prevBtn && prevBtn.addEventListener("click", prev);

  // pause on hover
  root.addEventListener("mouseenter", () => clearInterval(timer));
  root.addEventListener("mouseleave", restart);

  // swipe mobile
  let startX = 0, dx = 0;
  root.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    dx = 0;
  }, { passive: true });

  root.addEventListener("touchmove", (e) => {
    dx = e.touches[0].clientX - startX;
  }, { passive: true });

  root.addEventListener("touchend", () => {
    if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
  });
}