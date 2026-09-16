(function(){
  var here = window.location.pathname.split('/').pop() || 'index.html';

  Array.from(document.querySelectorAll('.sidebar .nav-product')).forEach(function(a){
    var href = a.getAttribute('href').split('/').pop();
    a.classList.toggle('active', href === here);
  });

  var subNavGroups = Array.from(document.querySelectorAll('.section-nav'));
  function setActiveSub(){
    subNavGroups.forEach(function(nav){
      var links = Array.from(nav.querySelectorAll('a'));
      var targets = links.map(function(a){ return document.getElementById(a.getAttribute('href').substring(1)); }).filter(Boolean);
      var scrollY = window.scrollY + 140;
      var currentIdx = -1;
      targets.forEach(function(t, i){ if(t.offsetTop <= scrollY) currentIdx = i; });
      links.forEach(function(a, i){ a.classList.toggle('current', i === currentIdx); });
    });
  }

  if(subNavGroups.length){
    window.addEventListener('scroll', setActiveSub, {passive:true});
    setActiveSub();
  }
})();
