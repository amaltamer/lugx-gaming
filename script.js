

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MOBILE NAV TOGGLE ---------- */  
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close the mobile menu after a link is tapped
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. SIGN IN MODAL ---------- */
  const signInBtn = document.getElementById('signInBtn');
  const signInModal = document.getElementById('signInModal');
  const modalClose = document.getElementById('modalClose');

  const openModal = () => signInModal && signInModal.classList.add('is-open');
  const closeModal = () => signInModal && signInModal.classList.remove('is-open');

  if (signInBtn) signInBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Close modal when clicking the dark overlay (outside the box)
  if (signInModal) {
    signInModal.addEventListener('click', (e) => {
      if (e.target === signInModal) closeModal();
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- 3. CONTACT FORM VALIDATION ---------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const fields = {
      fullName: { min: 2, message: 'Please enter your full name.' },
      email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address.' },
      subject: { min: 3, message: 'Please enter a subject.' },
      message: { min: 10, message: 'Message should be at least 10 characters.' },
    };

    const validateField = (id) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(`${id}Error`);
      const rules = fields[id];
      const value = input.value.trim();
      let message = '';

      if (!value) {
        message = 'This field is required.';
      } else if (rules.min && value.length < rules.min) {
        message = rules.message;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        message = rules.message;
      }

      errorEl.textContent = message;
      return message === '';
    };

    // Validate a field as soon as the user leaves it
    Object.keys(fields).forEach((id) => {
      const input = document.getElementById(id);
      input.addEventListener('blur', () => validateField(id));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isValid = Object.keys(fields)
        .map((id) => validateField(id))
        .every(Boolean);

      const successMsg = document.getElementById('formSuccess');

      if (isValid) {
        // In a real project this is where you'd send the data to a server/API
        contactForm.reset();
        successMsg.hidden = false;
        setTimeout(() => { successMsg.hidden = true; }, 4000);
      } else {
        successMsg.hidden = true;
      }
    });
  }

  /* ---------- 4. FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
