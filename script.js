/* Arthur Business Services — redesign concept
   Nav shrink, mobile menu, scroll reveal, form validation (client-side only). */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  var menuWrap = document.getElementById('mobileMenuWrap');

  /* ---- year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- header: shrink on scroll + hide on scroll-down, reveal on ANY scroll-up ---- */
  var lastY = window.scrollY || window.pageYOffset, ticking = false;
  function onScroll() {
    var cur = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        header.classList.toggle('scrolled', cur > 24);
        // Never hide while the mobile menu is open.
        if (menu.classList.contains('open')) {
          header.classList.remove('hidden');
        } else if (cur > lastY && cur > 120) {
          header.classList.add('hidden');      // scrolling down, past the header
        } else if (cur < lastY) {
          header.classList.remove('hidden');   // ANY upward scroll reveals it
        }
        lastY = cur;
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

  var menuLinks = menu ? Array.prototype.slice.call(menu.querySelectorAll('a')) : [];
  // Everything at the top level of <body> that isn't part of the drawer UI.
  var inertTargets = Array.prototype.filter.call(document.body.children, function (el) {
    return el !== menuWrap && el !== backdrop;
  });

  // Keep off-canvas links out of the tab order whenever the drawer is closed.
  function setLinksFocusable(focusable) {
    menuLinks.forEach(function (a) {
      if (focusable) a.removeAttribute('tabindex');
      else a.setAttribute('tabindex', '-1');
    });
  }
  setLinksFocusable(false);

  function setInert(on) {
    inertTargets.forEach(function (el) {
      if (on) {
        el.setAttribute('inert', '');
        el.setAttribute('aria-hidden', 'true');
      } else {
        el.removeAttribute('inert');
        el.removeAttribute('aria-hidden');
      }
    });
  }

  function focusables() {
    return menuLinks.filter(function (a) {
      return a.offsetParent !== null || a.getClientRects().length;
    });
  }

  function setMenu(open) {
    var isOpen = menu.classList.contains('open');
    menu.classList.toggle('open', open);
    if (menuWrap) menuWrap.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.documentElement.style.overflow = open ? 'hidden' : '';
    document.body.style.overflow = open ? 'hidden' : '';
    setLinksFocusable(open);
    if (open) {
      header.classList.remove('hidden');
      setInert(true);
      var f = focusables();
      if (f.length) f[0].focus();
    } else {
      setInert(false);
      // Return focus to the toggle only if focus was inside the drawer.
      if (isOpen && menu.contains(document.activeElement)) toggle.focus();
    }
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
  }
  backdrop.addEventListener('click', function () { setMenu(false); });
  menuLinks.forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (!menu.classList.contains('open')) return;
    if (e.key === 'Escape') { setMenu(false); return; }
    if (e.key === 'Tab') {
      var f = focusables();
      if (!f.length) { e.preventDefault(); return; }
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      } else if (!menu.contains(document.activeElement)) {
        e.preventDefault(); first.focus();
      }
    }
  });

  // Reset drawer + toggle state when crossing the desktop breakpoint.
  var mq = window.matchMedia('(min-width: 981px)');
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function () {
    if (mq.matches && menu.classList.contains('open')) setMenu(false);
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
