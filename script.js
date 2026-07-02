/* Arthur Business Services — redesign concept
   Nav shrink, mobile menu, scroll reveal, form validation (client-side only). */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');

  /* ---- year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- shrink header on scroll ---- */
  var lastKnown = 0, ticking = false;
  function onScroll() {
    lastKnown = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        header.classList.toggle('scrolled', lastKnown > 24);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu (with backdrop) ---- */
  var backdrop = document.createElement('div');
  backdrop.className = 'menu-backdrop';
  document.body.appendChild(backdrop);

  function setMenu(open) {
    menu.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
  }
  backdrop.addEventListener('click', function () { setMenu(false); });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
  });

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- form validation (client-side; not wired to a backend) ---- */
  var form = document.getElementById('inquiryForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var fields = form.querySelectorAll('input, select, textarea');
      fields.forEach(function (f) {
        f.classList.remove('invalid');
        var valid = f.checkValidity();
        if (f.type === 'email' && f.value) {
          valid = valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value);
        }
        if (!valid) { f.classList.add('invalid'); ok = false; }
      });

      if (!ok) {
        note.textContent = 'Please fill in every field so we can reach you.';
        note.className = 'form-note error';
        var firstBad = form.querySelector('.invalid');
        if (firstBad) firstBad.focus();
        return;
      }

      var name = (form.querySelector('#name').value || '').trim().split(' ')[0];
      note.textContent = 'Thanks' + (name ? ', ' + name : '') +
        '! This is a redesign concept, so the form isn’t live yet — ' +
        'call or text (479) 488-5991 and we’ll set up your free discovery call.';
      note.className = 'form-note success';
      form.reset();
    });
  }
})();
