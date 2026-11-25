document.querySelectorAll('.product-choice').forEach(button=>button.addEventListener('click',()=>{const area=document.getElementById('inquiry');area.value=`Hola, me interesa Neoil ${button.dataset.choice}${button.dataset.size ? ` de ${button.dataset.size} litros` : ''}.\nLo necesito para limpiar:\nLa superficie o material es:\nLo usaría con esta frecuencia:\nQuisiera conocer más sobre esta opción.`;document.getElementById('consulta').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});area.focus({preventScroll:true});document.getElementById('copy-status').textContent='Consulta preparada. Podés completarla y enviarla por WhatsApp.'}));
document.getElementById('copy-inquiry').addEventListener('click',async()=>{const area=document.getElementById('inquiry');const status=document.getElementById('copy-status');if(!area.value.trim()){status.textContent='Escribí tu consulta antes de copiarla.';return}try{await navigator.clipboard.writeText(area.value);status.textContent='Consulta copiada. Ya podés pegarla en tu conversación.'}catch{area.focus();area.select();status.textContent='Seleccionamos el texto. Usá la opción Copiar de tu dispositivo.'}});

const viewer=document.getElementById('product-viewer');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{document.getElementById('viewer-title').textContent=button.dataset.title;const image=document.getElementById('viewer-image');image.src=button.dataset.image;image.alt=button.dataset.title;document.getElementById('viewer-original').href=button.dataset.image;document.getElementById('viewer-instructions').textContent=button.dataset.image.includes('neoil-multiuso-')?'Utilizar puro sobre piezas y superficies con grasa intensa. Para suciedad más leve, diluir 1 parte de producto en hasta 5 partes de agua. Aplicar por trapeo y enjuagar según las indicaciones del equipo.':'Listo para usar. Aplicar directamente. Para suciedad ligera, puede diluirse en agua para aumentar el rendimiento. Aplicar con paño, mopa o cepillo. Enjuagar con agua.';viewer.showModal()}));
document.getElementById('close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer){const rect=viewer.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)viewer.close()}});

const inquiryArea=document.getElementById('inquiry');
const whatsappInquiry=document.getElementById('whatsapp-inquiry');
function updateWhatsAppLink(){whatsappInquiry.href='https://wa.me/5491140931029?text='+encodeURIComponent(inquiryArea.value.trim());}
inquiryArea.addEventListener('input',updateWhatsAppLink);
whatsappInquiry.addEventListener('click',updateWhatsAppLink);
updateWhatsAppLink();

const productVariants={"motor": {"1": {"image": "envases/neoil-multiuso-1L.png?v=20261022", "label": "etiquetas/neoil-multiuso-1L.png?v=20261022"}, "5": {"image": "envases/neoil-multiuso-5L.png?v=20261022", "label": "etiquetas/neoil-multiuso-5L.png?v=20261022"}, "10": {"image": "envases/neoil-multiuso-10L.png?v=20261022", "label": "etiquetas/neoil-multiuso-10L.png?v=20261022"}, "20": {"image": "envases/neoil-multiuso-20L.png?v=20261022", "label": "etiquetas/neoil-multiuso-20L.png?v=20261022"}}, "limpieza": {"1": {"image": "envases/neoil-limpieza-1L-botella.png?v=20261014", "label": "etiquetas/neoil-limpieza-1L-directo.png?v=20261014"}, "5": {"image": "envases/neoil-limpieza-5L-directo.jpg?v=20261014", "label": "etiquetas/neoil-limpieza-5L-directo.png?v=20261014"}, "10": {"image": "envases/neoil-limpieza-10L-directo.jpg?v=20261014", "label": "etiquetas/neoil-limpieza-10L-directo.png?v=20261014"}, "20": {"image": "envases/neoil-limpieza-20L-directo.jpg?v=20261014", "label": "etiquetas/neoil-limpieza-20L-directo.png?v=20261014"}}};

document.querySelectorAll('.product-selector').forEach(section=>{
 section.querySelectorAll('.size-option').forEach(button=>button.addEventListener('click',()=>{
  const size=button.dataset.size, item=productVariants[section.dataset.family][size];
  section.querySelectorAll('.size-option').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  const trigger=section.querySelector('.selected-image'), image=trigger.querySelector('img'), choice=section.querySelector('.product-choice'), label=section.querySelector('.label-open');
  const title=`Neoil ${choice.dataset.choice} · ${size} L`;
  image.src=item.image; image.alt=title; trigger.dataset.image=item.image;trigger.dataset.title=title;trigger.setAttribute('aria-label',`Ampliar ${title}`);
  label.dataset.image=item.label;label.dataset.title=`Etiqueta ${title}`;
  choice.dataset.size=size;choice.textContent=`Consultar ${size} L`;
  section.querySelector('.selected-size').textContent=`Presentación de ${size} ${size==='1'?'litro':'litros'}`;
 }));
});
document.querySelectorAll('.scene-button').forEach(button=>button.addEventListener('click',()=>{
 const image=document.querySelector('.hero-backdrop');image.src=button.dataset.scene;image.alt=button.dataset.alt;
 document.getElementById('scene-caption').textContent=button.dataset.caption;
 document.querySelectorAll('.scene-button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
}));

// Keep the size controls beside the preview on small screens, without duplicates.
const compactProducts = window.matchMedia('(max-width: 800px)');
function positionSizeControls() {
 document.querySelectorAll('.product-selector').forEach(section => {
  const stage = section.querySelector('.product-stage');
  const details = section.querySelector('.product-details');
  const picker = section.querySelector('.size-picker');
  const selected = section.querySelector('.selected-size');
  if (compactProducts.matches) {
   stage.append(picker, selected);
  } else {
   details.insertBefore(picker, section.querySelector('.product-actions'));
   picker.after(selected);
  }
 });
}
compactProducts.addEventListener('change', positionSizeControls);
positionSizeControls();

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
function neoilAnimate(element, frames, options) {
 if (!motionPreference.matches && element.animate) element.animate(frames, options);
}
if ('IntersectionObserver' in window) {
 const entrances = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (!entry.isIntersecting) return;
   entrances.unobserve(entry.target);
   neoilAnimate(entry.target, [{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}], {duration:550,easing:'cubic-bezier(.2,.7,.2,1)'});
  });
 }, {threshold:.12});
 document.querySelectorAll('.section-heading,.product-selector,.feature,.application-gallery>a,.contact-grid').forEach(el => entrances.observe(el));
}
document.querySelectorAll('.selected-image img,.hero-backdrop').forEach(image => {
 image.addEventListener('load', () => neoilAnimate(image, [{opacity:.35,transform:'scale(.97)'},{opacity:1,transform:'scale(1)'}], {duration:340,easing:'ease-out'}));
});
motionPreference.addEventListener('change', () => {
 if (motionPreference.matches) document.getAnimations().forEach(animation => animation.cancel());
});

const comingSoon = document.querySelector('.coming-soon');
if (comingSoon && 'IntersectionObserver' in window) {
 let comingSoonEntered = false;
 const comingSoonObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   comingSoon.classList.toggle('is-visible', entry.isIntersecting);
   if (!entry.isIntersecting || comingSoonEntered) return;
   comingSoonEntered = true;
   comingSoon.querySelectorAll('p,h2').forEach((element,index) => {
    neoilAnimate(element, [{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}], {duration:650,delay:index*110,easing:'ease-out',fill:'backwards'});
   });
  });
 }, {threshold:.2});
 comingSoonObserver.observe(comingSoon);
}
