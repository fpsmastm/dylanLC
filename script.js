// ---- Data for the three service tabs ----
const services = [
  {
    number: '01',
    name: 'Lawn mowing',
    eyebrow: 'The weekly reset',
    description: 'Consistent mowing, clean lines, and a finish that makes the whole property feel cared for.',
    image: 'images/front-yard.jpg',
    alt: 'Before and after view of a refreshed suburban front yard',
  },
  {
    number: '02',
    name: 'Trimming & edging',
    eyebrow: 'The clean-up crew',
    description: 'Crisp borders around beds, walks, and driveways bring definition back to every corner.',
    image: 'images/garden-beds.jpg',
    alt: 'Before and after view of a newly mulched and edged planting bed',
  },
  {
    number: '03',
    name: 'Seasonal cleanups',
    eyebrow: 'A fresh start',
    description: 'Leaves, overgrowth, and tired beds get cleared out so your yard is ready for the next season.',
    image: 'images/pool-area.jpg',
    alt: 'Before and after view of a refreshed poolside landscape',
  },
];

// ---- Footer year ----
document.getElementById('footer-year').textContent = `© ${new Date().getFullYear()} Dylan's Lawn Care`;

// ---- Mobile nav toggle ----
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('main-nav--open');
  menuToggle.classList.toggle('menu-toggle--active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('main-nav--open');
    menuToggle.classList.remove('menu-toggle--active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- Service tabs ----
const serviceList = document.getElementById('service-list');
const servicePhoto = document.getElementById('service-photo');
const photoLabel = document.getElementById('photo-label');
const serviceEyebrow = document.getElementById('service-eyebrow');
const serviceDescription = document.getElementById('service-description');

serviceList.querySelectorAll('.service-row').forEach((row) => {
  row.addEventListener('click', () => {
    const service = services[Number(row.dataset.service)];

    serviceList.querySelectorAll('.service-row').forEach((r) => {
      r.classList.remove('service-row--active');
      r.setAttribute('aria-selected', 'false');
    });
    row.classList.add('service-row--active');
    row.setAttribute('aria-selected', 'true');

    servicePhoto.src = service.image;
    servicePhoto.alt = service.alt;
    photoLabel.textContent = `DLC / ${service.number}`;
    serviceEyebrow.textContent = service.eyebrow;
    serviceDescription.textContent = service.description;
  });
});

// ---- Quote modal ----
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const quoteForm = document.getElementById('quote-form');
const formSubmit = document.getElementById('form-submit');

function openQuote() {
  modalBackdrop.hidden = false;
  mainNav.classList.remove('main-nav--open');
  menuToggle.classList.remove('menu-toggle--active');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function closeQuote() {
  modalBackdrop.hidden = true;
}

document.querySelectorAll('[data-open-quote]').forEach((btn) => {
  btn.addEventListener('click', openQuote);
});

modalClose.addEventListener('click', closeQuote);
modalBackdrop.addEventListener('mousedown', (event) => {
  if (event.target === modalBackdrop) closeQuote();
});

function getMailtoUrl() {
  const data = new FormData(quoteForm);
  const name = data.get('name') || '';
  const phone = data.get('phone') || '';
  const town = data.get('town') || '';
  const service = data.get('service') || '';
  const message = data.get('message') || 'No additional details provided.';

  const subject = `Free estimate request from ${name}`;
  const body = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Town: ${town}`,
    `Service: ${service}`,
    '',
    'Project details:',
    message,
  ].join('\n');

  return `mailto:dylangallullo@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

formSubmit.addEventListener('click', (event) => {
  const name = quoteForm.elements['name'].value;
  const phone = quoteForm.elements['phone'].value;
  const town = quoteForm.elements['town'].value;

  if (!name || !phone || !town) {
    event.preventDefault();
    quoteForm.reportValidity();
    return;
  }

  formSubmit.href = getMailtoUrl();
  setTimeout(closeQuote, 500);
});
