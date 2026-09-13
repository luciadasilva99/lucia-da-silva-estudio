// Lucía Da Silva Estudio — interacciones del sitio

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav--mobile');

  // Header con sombra al hacer scroll
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Menú móvil
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('is-open'));
    });
  }

  // Animación de aparición al hacer scroll
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Filtros de proyectos (solo en proyectos.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-grid .card');
  if (filterBtns.length && cards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          const match = filter === 'todos' || card.dataset.category === filter;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  // Precompletar el servicio en el formulario de contacto según el link de origen
  const servicioSelect = document.getElementById('servicio');
  if (servicioSelect) {
    const servicioParam = new URLSearchParams(window.location.search).get('servicio');
    if (servicioParam && servicioSelect.querySelector(`option[value="${servicioParam}"]`)) {
      servicioSelect.value = servicioParam;
    }
  }

  // Rotar las fotos de un proyecto al pasar el mouse por su tarjeta
  document.querySelectorAll('.card[data-gallery]').forEach(card => {
    const images = card.dataset.gallery.split(',');
    const img = card.querySelector('.ph-block img');
    if (!img || images.length < 2) return;
    let index = 0;
    let timer = null;
    card.addEventListener('mouseenter', () => {
      timer = setInterval(() => {
        index = (index + 1) % images.length;
        img.src = images[index];
      }, 1600);
    });
    card.addEventListener('mouseleave', () => {
      clearInterval(timer);
      index = 0;
      img.src = images[0];
    });
  });

  // Secuencia de materia (Estudio): las imágenes cambian según cuánto se scrolleó,
  // fijas en pantalla mientras dura el recorrido (formato Approach de Yabu Pushelberg)
  const materialSequence = document.querySelector('.material-sequence');
  if (materialSequence) {
    const seqImgs = materialSequence.querySelectorAll('img');
    const updateSequence = () => {
      const rect = materialSequence.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      let idx = Math.floor(progress * seqImgs.length);
      if (idx >= seqImgs.length) idx = seqImgs.length - 1;
      seqImgs.forEach((img, i) => img.classList.toggle('is-active', i === idx));
    };
    window.addEventListener('scroll', updateSequence, { passive: true });
    updateSequence();
  }

  // Portada de proyecto: rotación automática entre las fotos del proyecto
  document.querySelectorAll('.project-cover').forEach(cover => {
    const imgs = cover.querySelectorAll('img');
    if (imgs.length < 2) return;
    let i = 0;
    setInterval(() => {
      imgs[i].classList.remove('is-active');
      i = (i + 1) % imgs.length;
      imgs[i].classList.add('is-active');
    }, 3200);
  });

  // Envío del formulario de contacto sin recargar la página (Formspree)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      formStatus.hidden = true;
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          contactForm.reset();
          formStatus.textContent = '¡Gracias! Recibimos tu consulta y te vamos a responder a la brevedad.';
          formStatus.className = 'form-status is-success';
        } else {
          formStatus.textContent = 'Hubo un problema al enviar el formulario. Probá de nuevo o escribinos directo por mail.';
          formStatus.className = 'form-status is-error';
        }
      } catch (err) {
        formStatus.textContent = 'Hubo un problema al enviar el formulario. Probá de nuevo o escribinos directo por mail.';
        formStatus.className = 'form-status is-error';
      }
      formStatus.hidden = false;
      submitBtn.disabled = false;
    });
  }

  // Preloader del Home: pantalla de carga con el logo centrado (solo si existe en la página)
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.setTimeout(() => preloader.classList.add('is-hidden'), 3000);
  }

  // Lienzo libre del Home: apoyar el cursor hacia un lado para moverse hacia allá
  // (sin clickear ni arrastrar), al estilo Yabu Pushelberg. En mobile, el dedo
  // desliza de forma nativa en cualquier dirección.
  const canvasViewport = document.querySelector('.canvas-viewport');
  const homeCanvas = document.querySelector('.home-canvas');

  // Arranca centrado en el lienzo (no en la esquina superior izquierda)
  if (canvasViewport && homeCanvas) {
    const canvasWorld = homeCanvas.querySelector('.canvas-world');
    canvasViewport.scrollLeft = (canvasWorld.scrollWidth - canvasViewport.clientWidth) / 2;
    canvasViewport.scrollTop = (canvasWorld.scrollHeight - canvasViewport.clientHeight) / 2;
  }

  if (canvasViewport && homeCanvas && window.matchMedia('(pointer: fine)').matches) {
    const markInteracted = () => homeCanvas.classList.add('has-interacted');
    const deadZone = 0.14;   // zona muerta central: quieto si el cursor está cerca del medio
    const maxSpeed = 15;     // px por frame cerca del borde
    const ease = (v) => Math.sign(v) * Math.pow(Math.abs(v), 1.7);

    let panX = 0, panY = 0;
    let rafId = null;

    const step = () => {
      if (Math.abs(panX) > deadZone || Math.abs(panY) > deadZone) {
        const vx = Math.abs(panX) > deadZone ? ease(panX) : 0;
        const vy = Math.abs(panY) > deadZone ? ease(panY) : 0;
        canvasViewport.scrollLeft += vx * maxSpeed;
        canvasViewport.scrollTop += vy * maxSpeed;
      }
      rafId = requestAnimationFrame(step);
    };

    canvasViewport.addEventListener('mouseenter', () => {
      if (!rafId) rafId = requestAnimationFrame(step);
    });
    canvasViewport.addEventListener('mousemove', (e) => {
      const rect = canvasViewport.getBoundingClientRect();
      panX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      panY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      markInteracted();
    });
    canvasViewport.addEventListener('mouseleave', () => {
      panX = 0; panY = 0;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    });
    canvasViewport.addEventListener('touchstart', markInteracted, { once: true, passive: true });
  }

  // Año automático en el footer
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
