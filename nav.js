// nav.js
export function initNavbar() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const iconOpen = document.getElementById("iconOpen");
  const iconClose = document.getElementById("iconClose");
  const nav = document.getElementById("siteNav");

  const closeMenu = () => {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", "false");
    iconOpen?.classList.remove("hidden");
    iconClose?.classList.add("hidden");
  };

  const openMenu = () => {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.remove("hidden");
    menuBtn.setAttribute("aria-expanded", "true");
    iconOpen?.classList.add("hidden");
    iconClose?.classList.remove("hidden");
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    // mobile: click link => close
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

    // ESC => close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // outside click => close
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!nav || !t) return;
      const isInside = nav.contains(t);
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      if (isOpen && !isInside) closeMenu();
    });
  }

  // Active highlight
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll(".nav-link").forEach((a) => {
    const target = (a.getAttribute("data-nav") || "").toLowerCase();
    const underline = a.querySelector(".nav-underline");
    if (target === path) {
      a.classList.add("text-emerald-700");
      underline?.classList.remove("w-0");
      underline?.classList.add("w-7");
    } else {
      underline?.classList.add("w-0");
      underline?.classList.remove("w-7");
    }
  });

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    const target = (btn.getAttribute("data-nav") || "").toLowerCase();
    if (target === path) btn.classList.add("ring-2", "ring-emerald-400/30");
    else btn.classList.remove("ring-2", "ring-emerald-400/30");
  });

  document.querySelectorAll(".m-link").forEach((a) => {
    const target = (a.getAttribute("data-nav") || "").toLowerCase();
    if (target === path) a.classList.add("bg-emerald-50", "text-emerald-700");
    else a.classList.remove("bg-emerald-50", "text-emerald-700");
  });
}