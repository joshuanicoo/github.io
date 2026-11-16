// Marks the nav link for the section currently in view.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      if (a === map[id]) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(function (s) { io.observe(s); });
  setActive(sections[0].id);
})();
