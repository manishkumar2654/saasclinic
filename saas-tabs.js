// saas-tabs.js (ES Module)
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const buttons = $$('.saas-tab-btn');

const ui = {
  tabIcon: $('#tabIcon'),
  tabTitle: $('#tabTitle'),
  tabSubtitle: $('#tabSubtitle'),
  tabDesc: $('#tabDesc'),
  tabBullets: $('#tabBullets'),

  tabImage: $('#tabImage'),
  tabBadge: $('#tabBadge'),
  tabMini: $('#tabMini'),
  tabMiniDesc: $('#tabMiniDesc'),

  tabPrimaryBtn: $('#tabPrimaryBtn'),
  tabSecondaryBtn: $('#tabSecondaryBtn')
};

const TABS = {
  pulmonology: {
    icon: 'P',
    title: 'Pulmonology',
    subtitle: 'Diagnostics & care',
    desc:
      'Breath-related issues ke liye comprehensive evaluation, lung function testing, reports and step-by-step guidance.',
    bullets: [
      { title: 'Lung Function Testing', sub: 'Accurate diagnostics.' },
      { title: 'Treatment Planning', sub: 'Clear guidance & follow-ups.' },
      { title: 'COPD / Asthma Care', sub: 'Long-term management.' },
      { title: 'Respiratory Support', sub: 'Emergency guidance.' }
    ],
    image: './images/saa2.jpg',
    badge: 'Pulmonology',
    mini: 'Diagnostics • Care',
    miniDesc: 'Patient-friendly workflow.',
    primaryHref: '#core-services',
    primaryText: 'View Related Services →',
    secondaryHref: '#how-it-works',
    secondaryText: 'How It Works'
  },

  sleep: {
    icon: 'S',
    title: 'Sleep Medicine',
    subtitle: 'Sleep study & CPAP',
    desc:
      'Snoring, daytime fatigue, sleep apnea jaise concerns me sleep study (PSG) + CPAP/BiPAP guidance with follow-ups.',
    bullets: [
      { title: 'Level 1 Sleep Study (PSG)', sub: 'Guided test + interpretation.' },
      { title: 'CPAP / BiPAP Titration', sub: 'Comfort + correct settings.' },
      { title: 'Sleep Hygiene Plan', sub: 'Better routine & habits.' },
      { title: 'Follow-up Tracking', sub: 'Progress monitoring.' }
    ],
    image: './images/saa3.jpg',
    badge: 'Sleep Medicine',
    mini: 'Study • CPAP',
    miniDesc: 'Comfort-first support.',
    primaryHref: '#core-services',
    primaryText: 'See Sleep Services →',
    secondaryHref: '#how-it-works',
    secondaryText: 'How It Works'
  },

  allergy: {
    icon: 'A',
    title: 'Allergy Clinic',
    subtitle: 'Testing & immunotherapy',
    desc:
      'Allergy triggers identify karke personalized plan: testing, medicines, lifestyle guidance, and immunotherapy support.',
    bullets: [
      { title: 'Allergy Testing', sub: 'Trigger identification.' },
      { title: 'Immunotherapy', sub: 'Long-term relief support.' },
      { title: 'Diet & Lifestyle', sub: 'Practical changes.' },
      { title: 'Seasonal Care', sub: 'Prevention plan.' }
    ],
    image: './images/saa4.jpg',
    badge: 'Allergy Clinic',
    mini: 'Testing • Therapy',
    miniDesc: 'Personalized plan.',
    primaryHref: '#core-services',
    primaryText: 'View Allergy Services →',
    secondaryHref: '#how-it-works',
    secondaryText: 'How It Works'
  },

  rehab: {
    icon: 'R',
    title: 'Pulmonary Rehab',
    subtitle: 'Exercise & recovery',
    desc:
      'Breathing exercises, endurance, and recovery plan—patients ki daily capacity improve karne ke liye structured rehab.',
    bullets: [
      { title: 'Breathing Training', sub: 'Better lung control.' },
      { title: 'Exercise Plan', sub: 'Strength + endurance.' },
      { title: 'Recovery Routine', sub: 'Step-by-step progress.' },
      { title: 'Education & Support', sub: 'Safe technique guidance.' }
    ],
    image: './images/saa5.jpg',
    badge: 'Pulmonary Rehab',
    mini: 'Exercise • Recovery',
    miniDesc: 'Improved daily capacity.',
    primaryHref: '#how-it-works',
    primaryText: 'See Rehab Flow →',
    secondaryHref: '#core-services',
    secondaryText: 'View Core Services'
  }
};

function setActiveButton(activeBtn) {
  buttons.forEach((btn) => {
    const isActive = btn === activeBtn;

    btn.classList.toggle('bg-emerald-600', isActive);
    btn.classList.toggle('text-white', isActive);
    btn.classList.toggle('border-emerald-600/30', isActive);

    btn.classList.toggle('bg-white', !isActive);
    btn.classList.toggle('text-slate-900', !isActive);
    btn.classList.toggle('border-slate-200', !isActive);
  });
}

function renderBullets(items) {
  if (!ui.tabBullets) return;
  ui.tabBullets.innerHTML = items
    .slice(0, 4)
    .map(
      (b) => `
      <div class="rounded-2xl border border-slate-200 bg-white/60 p-4 transition hover:-translate-y-0.5 hover:bg-white/80">
        <p class="text-sm font-extrabold text-slate-900">${b.title}</p>
        <p class="mt-1 text-xs text-slate-500">${b.sub}</p>
      </div>
    `
    )
    .join('');
}

function softSwap(el, updater) {
  if (!el) return;
  el.style.transition = 'opacity 220ms ease, transform 220ms ease';
  el.style.opacity = '0';
  el.style.transform = 'translateY(4px)';
  window.setTimeout(() => {
    updater();
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 140);
}

function setTab(key, clickedBtn) {
  const data = TABS[key];
  if (!data) return;

  if (clickedBtn) setActiveButton(clickedBtn);

  softSwap(ui.tabIcon, () => { ui.tabIcon.textContent = data.icon; });

  softSwap(ui.tabTitle, () => { ui.tabTitle.textContent = data.title; });
  softSwap(ui.tabSubtitle, () => { ui.tabSubtitle.textContent = data.subtitle; });
  softSwap(ui.tabDesc, () => { ui.tabDesc.textContent = data.desc; });

  renderBullets(data.bullets);

  if (ui.tabImage) {
    ui.tabImage.style.transition = 'opacity 240ms ease';
    ui.tabImage.style.opacity = '0';
    window.setTimeout(() => {
      ui.tabImage.src = data.image;
      ui.tabImage.style.opacity = '1';
    }, 160);
  }

  softSwap(ui.tabBadge, () => { ui.tabBadge.textContent = data.badge; });
  softSwap(ui.tabMini, () => { ui.tabMini.textContent = data.mini; });
  softSwap(ui.tabMiniDesc, () => { ui.tabMiniDesc.textContent = data.miniDesc; });

  if (ui.tabPrimaryBtn) {
    ui.tabPrimaryBtn.href = data.primaryHref;
    ui.tabPrimaryBtn.textContent = data.primaryText;
  }
  if (ui.tabSecondaryBtn) {
    ui.tabSecondaryBtn.href = data.secondaryHref;
    ui.tabSecondaryBtn.textContent = data.secondaryText;
  }
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.tab;
    setTab(key, btn);
  });
});

// Default tab
const defaultBtn = buttons.find(b => b.dataset.tab === 'pulmonology') || buttons[0];
if (defaultBtn) setTab(defaultBtn.dataset.tab, defaultBtn);