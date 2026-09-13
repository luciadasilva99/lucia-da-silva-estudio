// Lucía Da Silva Estudio — interacciones del sitio

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

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
  const revealEls = document.querySelectorAll('.reveal');
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
          card.hidden = !match;
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

  // Lienzo libre del Home: arrastrar con el mouse para explorar (desktop);
  // en mobile/trackpad el scroll táctil nativo ya permite moverse en todas direcciones
  const canvasViewport = document.querySelector('.canvas-viewport');
  const homeCanvas = document.querySelector('.home-canvas');
  if (canvasViewport && homeCanvas) {
    let isDown = false;
    let moved = false;
    let startX = 0, startY = 0, startScrollLeft = 0, startScrollTop = 0;

    const markInteracted = () => homeCanvas.classList.add('has-interacted');

    canvasViewport.addEventListener('mousedown', (e) => {
      isDown = true;
      moved = false;
      canvasViewport.classList.add('is-dragging');
      startX = e.pageX;
      startY = e.pageY;
      startScrollLeft = canvasViewport.scrollLeft;
      startScrollTop = canvasViewport.scrollTop;
    });
    window.addEventListener('mouseup', () => {
      isDown = false;
      canvasViewport.classList.remove('is-dragging');
    });
    canvasViewport.addEventListener('mouseleave', () => {
      isDown = false;
      canvasViewport.classList.remove('is-dragging');
    });
    canvasViewport.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      const dy = e.pageY - startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) { moved = true; markInteracted(); }
      canvasViewport.scrollLeft = startScrollLeft - dx;
      canvasViewport.scrollTop = startScrollTop - dy;
    });
    // Evita que soltar el arrastre justo sobre una tarjeta dispare la navegación sin querer
    canvasViewport.querySelectorAll('a.canvas-tile').forEach(link => {
      link.addEventListener('click', (e) => { if (moved) e.preventDefault(); });
    });
    canvasViewport.addEventListener('scroll', markInteracted, { once: true });
    canvasViewport.addEventListener('touchstart', markInteracted, { once: true, passive: true });
  }

  // Año automático en el footer
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
