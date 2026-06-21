/* Freedom — лёгкий вспомогательный скрипт без зависимостей.
   1) hover/focus-эффекты из data-hover / data-focus
   2) плавное появление блоков [data-reveal] при прокрутке */
document.addEventListener('DOMContentLoaded', function () {

  // --- hover ---
  document.querySelectorAll('[data-hover]').forEach(function (el) {
    var extra = el.getAttribute('data-hover'), base;
    el.addEventListener('mouseenter', function () {
      base = el.getAttribute('style') || '';
      el.setAttribute('style', base + ';' + extra);
    });
    el.addEventListener('mouseleave', function () {
      if (base !== undefined) el.setAttribute('style', base);
    });
  });

  // --- focus (поля формы) ---
  document.querySelectorAll('[data-focus]').forEach(function (el) {
    var extra = el.getAttribute('data-focus'), base;
    el.addEventListener('focus', function () {
      base = el.getAttribute('style') || '';
      el.setAttribute('style', base + ';' + extra);
    });
    el.addEventListener('blur', function () {
      if (base !== undefined) el.setAttribute('style', base);
    });
  });

  // --- появление при прокрутке ---
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (reduce || !('IntersectionObserver' in window) || !els.length) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  requestAnimationFrame(function () {
    els.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      el.style.transition = 'opacity .7s ease ' + ((i % 3) * 0.05) + 's, transform .7s ease ' + ((i % 3) * 0.05) + 's';
      obs.observe(el);
    });
  });
});
