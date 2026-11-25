(function(){
  var d=document,root=d.documentElement;root.classList.add('js');
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  // aparecer al hacer scroll
  var els=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('in');});}
  // fotos que cambian en la portada
  var sl=d.querySelectorAll('.slides img'),dots=d.querySelectorAll('.dots i'),i=0;
  if(dots[0])dots[0].classList.add('on');
  if(sl.length>1&&!reduce){setInterval(function(){
    sl[i].classList.remove('on');if(dots[i])dots[i].classList.remove('on');
    i=(i+1)%sl.length;sl[i].classList.add('on');if(dots[i])dots[i].classList.add('on');
  },4200);}
  // inclinación de las tarjetas con el mouse
  if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce){
    d.querySelectorAll('.pcard').forEach(function(c){
      c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        c.style.setProperty('--ry',(x*7).toFixed(2)+'deg');c.style.setProperty('--rx',(-y*6).toFixed(2)+'deg');});
      c.addEventListener('pointerleave',function(){c.style.removeProperty('--rx');c.style.removeProperty('--ry');});
    });
  }
})();
