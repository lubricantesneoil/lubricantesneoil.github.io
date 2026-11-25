(function(){
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  document.querySelectorAll('.choice').forEach(function(c){
    c.addEventListener('pointermove',function(e){
      var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      c.style.setProperty('--ry',(x*5).toFixed(2)+'deg');c.style.setProperty('--rx',(-y*4).toFixed(2)+'deg');
    });
    c.addEventListener('pointerleave',function(){c.style.removeProperty('--rx');c.style.removeProperty('--ry');});
  });
})();
