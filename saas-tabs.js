const TAB_DATA = {
  pulmonology: {
    icon: "P",
    title: "Pulmonology",
    subtitle: "Diagnostics & care",
    desc:
      "(Dummy) Breath-related issues ke liye comprehensive evaluation, lung function testing, reports and step-by-step guidance.",
    bullets: [
      { h: "Lung Function Testing", p: "Accurate diagnostics (dummy)." },
      { h: "Treatment Planning", p: "Clear guidance & follow-ups (dummy)." },
    ],
    image: "./images/saa2.jpg",
    badge: "Pulmonology",
    mini: "Diagnostics • Care",
    miniDesc: "(Dummy) Patient-friendly workflow.",
    primaryHref: "#core-services",
    secondaryHref: "#how-it-works",
  },

  sleep: {
    icon: "S",
    title: "Sleep Medicine",
    subtitle: "Sleep study & CPAP",
    desc:
      "(Dummy) Sleep issues ke liye PSG, CPAP/BiPAP titration aur comfort support. Reports + follow-ups included.",
    bullets: [
      { h: "Level 1 Sleep Study (PSG)", p: "Guided study & interpretation (dummy)." },
      { h: "CPAP / BiPAP Titration", p: "Comfort settings & tracking (dummy)." },
    ],
    image: "./images/saa10.jpg",
    badge: "Sleep Medicine",
    mini: "PSG • CPAP/BiPAP",
    miniDesc: "(Dummy) Better sleep, better health.",
    primaryHref: "#core-services",
    secondaryHref: "#how-it-works",
  },

  allergy: {
    icon: "A",
    title: "Allergy Clinic",
    subtitle: "Testing & immunotherapy",
    desc:
      "(Dummy) Allergies ke triggers identify karke prevention plan, testing, aur immunotherapy guidance provide ki jaati hai.",
    bullets: [
      { h: "Allergy Testing", p: "Identify triggers (dummy)." },
      { h: "Immunotherapy Guidance", p: "Personalized plan (dummy)." },
    ],
    image: "./images/saa1.jpg",
    badge: "Allergy Clinic",
    mini: "Testing • Prevention",
    miniDesc: "(Dummy) Better control, fewer flare-ups.",
    primaryHref: "#core-services",
    secondaryHref: "#how-it-works",
  },

  rehab: {
    icon: "R",
    title: "Pulmonary Rehab",
    subtitle: "Exercise & recovery",
    desc:
      "(Dummy) Breathing exercises, endurance training, recovery plans aur progress tracking for better lung health.",
    bullets: [
      { h: "Breathing Exercises", p: "Step-by-step plan (dummy)." },
      { h: "Recovery Tracking", p: "Follow-up support (dummy)." },
    ],
    image: "./images/saa11.jpg",
    badge: "Pulmonary Rehab",
    mini: "Recovery • Training",
    miniDesc: "(Dummy) Stronger breathing over time.",
    primaryHref: "#core-services",
    secondaryHref: "#how-it-works",
  },
};

function qs(id) {
  return document.getElementById(id);
}

function setActiveBtn(activeBtn) {
  document.querySelectorAll(".saas-tab-btn").forEach((btn) => {
    const isActive = btn === activeBtn;
    btn.classList.toggle("bg-emerald-500", isActive);
    btn.classList.toggle("border-emerald-300/40", isActive);
    btn.classList.toggle("text-white", true);

    btn.classList.toggle("bg-white/10", !isActive);
    btn.classList.toggle("border-white/15", !isActive);

    // keep blur feel for non-active also
    btn.classList.toggle("backdrop-blur", !isActive);
  });
}

function renderTab(key) {
  const t = TAB_DATA[key] || TAB_DATA.pulmonology;

  qs("tabIcon").textContent = t.icon;
  qs("tabTitle").textContent = t.title;
  qs("tabSubtitle").textContent = t.subtitle;
  qs("tabDesc").textContent = t.desc;

  const bulletsWrap = qs("tabBullets");
  bulletsWrap.innerHTML = t.bullets
    .map(
      (b) => `
      <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/15">
        <p class="text-sm font-extrabold text-white">${b.h}</p>
        <p class="mt-1 text-xs text-white/70">${b.p}</p>
      </div>
    `
    )
    .join("");

  qs("tabImage").src = t.image;
  qs("tabBadge").textContent = t.badge;
  qs("tabMini").textContent = t.mini;
  qs("tabMiniDesc").textContent = t.miniDesc;

  qs("tabPrimaryBtn").href = t.primaryHref;
  qs("tabSecondaryBtn").href = t.secondaryHref;
}

document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll(".saas-tab-btn");
  if (!btns.length) return;

  // default
  renderTab("pulmonology");
  setActiveBtn(btns[0]);

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-tab");
      renderTab(key);
      setActiveBtn(btn);
    });
  });
});