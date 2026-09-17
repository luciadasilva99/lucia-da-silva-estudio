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
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale, .reveal-quote');
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

  // Carátula dinámica (por ahora solo Estudio): a medida que se scrollea, el título
  // se va yendo con un poco de zoom y desvanecimiento, y el detalle de puntitos se
  // desplaza a otra velocidad, para que la entrada a la página no se sienta estática
  const dynamicHero = document.querySelector('.page-hero--dynamic');
  if (dynamicHero) {
    const heroContainer = dynamicHero.querySelector('.container');
    const updateHero = () => {
      const rect = dynamicHero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      dynamicHero.style.setProperty('--hero-progress', progress);
      heroContainer.style.transform = `translateY(${progress * -70}px) scale(${1 - progress * 0.14})`;
      heroContainer.style.opacity = String(Math.max(0, 1 - progress * 1.3));
    };
    window.addEventListener('scroll', updateHero, { passive: true });
    updateHero();
  }

  // Filtros de proyectos (solo en proyectos.html): Residencial queda activo por defecto
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-grid .card');
  if (filterBtns.length && cards.length) {
    const applyFilter = (btn) => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'todos' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    };
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => applyFilter(btn));
    });
    const defaultBtn = document.querySelector('.filter-btn[data-filter="residencial"]') || filterBtns[0];
    applyFilter(defaultBtn);
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
    const seqDots = materialSequence.querySelectorAll('.sequence-dots span');
    const updateSequence = () => {
      const rect = materialSequence.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      // Posición continua (0 a n-1): cada imagen se desplaza en proporción exacta
      // a lo que se scrolleó, sin animación propia, para que acompañe el dedo o
      // la rueda del mouse en tiempo real en vez de "saltar" entre pasos.
      const pos = progress * (seqImgs.length - 1);
      seqImgs.forEach((img, i) => {
        const offset = Math.max(-1, Math.min(1, pos - i));
        img.style.transform = `translateY(${offset * 100}%)`;
      });
      let idx = Math.round(pos);
      if (idx >= seqImgs.length) idx = seqImgs.length - 1;
      seqDots.forEach((dot, i) => dot.classList.toggle('is-active', i === idx));
    };
    window.addEventListener('scroll', updateSequence, { passive: true });
    updateSequence();
  }

  // Portada de proyecto: rotación automática entre las fotos del proyecto
  const ICON_CHEVRON_LEFT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
  const ICON_CHEVRON_RIGHT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  const ICON_ZOOM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>';
  const ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

  // Portada de proyecto: rotación automática + navegación manual (flechas y puntos)
  // + zoom para ver cada foto completa, sin recortar, en una capa superior
  document.querySelectorAll('.project-cover').forEach(cover => {
    const imgs = Array.from(cover.querySelectorAll('img'));
    if (imgs.length < 2) return;

    let i = Math.max(0, imgs.findIndex(img => img.classList.contains('is-active')));
    let timer = null;
    let dots = [];

    const render = () => {
      imgs.forEach((img, idx) => img.classList.toggle('is-active', idx === i));
      dots.forEach((dot, idx) => dot.classList.toggle('is-active', idx === i));
    };
    const goTo = (newIndex) => {
      i = (newIndex + imgs.length) % imgs.length;
      render();
      if (lightbox.classList.contains('is-open')) lbImg.src = imgs[i].currentSrc || imgs[i].src;
    };
    const startAuto = () => {
      stopAuto();
      timer = setInterval(() => goTo(i + 1), 3200);
    };
    const stopAuto = () => { if (timer) { clearInterval(timer); timer = null; } };

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'cover-nav cover-prev';
    prevBtn.setAttribute('aria-label', 'Imagen anterior');
    prevBtn.innerHTML = ICON_CHEVRON_LEFT;
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'cover-nav cover-next';
    nextBtn.setAttribute('aria-label', 'Imagen siguiente');
    nextBtn.innerHTML = ICON_CHEVRON_RIGHT;
    prevBtn.addEventListener('click', () => { goTo(i - 1); startAuto(); });
    nextBtn.addEventListener('click', () => { goTo(i + 1); startAuto(); });
    cover.append(prevBtn, nextBtn);

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'cover-dots';
    dots = imgs.map((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ver imagen ${idx + 1}`);
      dot.addEventListener('click', () => { goTo(idx); startAuto(); });
      dotsWrap.appendChild(dot);
      return dot;
    });
    cover.appendChild(dotsWrap);

    // Lightbox compartido: se crea una vez por portada, se monta al final del body
    // para que tape todo (header, botón flotante, etc.)
    const lightbox = document.createElement('div');
    lightbox.className = 'cover-lightbox';
    const lbClose = document.createElement('button');
    lbClose.type = 'button';
    lbClose.className = 'lightbox-close';
    lbClose.setAttribute('aria-label', 'Cerrar');
    lbClose.innerHTML = ICON_CLOSE;
    const lbPrev = document.createElement('button');
    lbPrev.type = 'button';
    lbPrev.className = 'cover-nav cover-prev';
    lbPrev.setAttribute('aria-label', 'Imagen anterior');
    lbPrev.innerHTML = ICON_CHEVRON_LEFT;
    const lbNext = document.createElement('button');
    lbNext.type = 'button';
    lbNext.className = 'cover-nav cover-next';
    lbNext.setAttribute('aria-label', 'Imagen siguiente');
    lbNext.innerHTML = ICON_CHEVRON_RIGHT;
    const lbImg = document.createElement('img');
    lightbox.append(lbClose, lbPrev, lbImg, lbNext);
    document.body.appendChild(lightbox);

    const openLightbox = () => {
      stopAuto();
      lbImg.src = imgs[i].currentSrc || imgs[i].src;
      lbImg.alt = imgs[i].alt || '';
      lightbox.classList.add('is-open');
    };
    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      startAuto();
    };
    imgs.forEach(img => img.addEventListener('click', openLightbox));
    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    lbPrev.addEventListener('click', () => goTo(i - 1));
    lbNext.addEventListener('click', () => goTo(i + 1));
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goTo(i - 1);
      if (e.key === 'ArrowRight') goTo(i + 1);
    });

    const zoomBtn = document.createElement('button');
    zoomBtn.type = 'button';
    zoomBtn.className = 'cover-zoom';
    zoomBtn.setAttribute('aria-label', 'Ver imagen en grande');
    zoomBtn.innerHTML = ICON_ZOOM;
    zoomBtn.addEventListener('click', openLightbox);
    cover.appendChild(zoomBtn);

    render();
    startAuto();
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

  // Arranca siempre en el mismo lugar del lienzo, no en un centro geométrico que
  // cambia según el tamaño exacto de cada pantalla. En computadora (mouse + pantalla
  // ancha): SA queda arriba a la izquierda, con Arena y la madera al lado, Terraza
  // asomando apenas arriba de todo y MUD como protagonista a la derecha. En cualquier
  // celular/tablet (touch), centrado en VJ.
  if (canvasViewport && homeCanvas) {
    const canvasWorld = homeCanvas.querySelector('.canvas-world');
    const isDesktop = window.matchMedia('(pointer: fine) and (min-width: 900px)').matches;
    let targetLeft, targetTop;
    if (isDesktop) {
      const santaAna = canvasWorld.querySelector('a[href="proyecto-santa-ana.html"]');
      const terraza = canvasWorld.querySelector('a[href="proyecto-terraza.html"]');
      targetLeft = santaAna ? santaAna.offsetLeft : 0;
      targetTop = terraza ? terraza.offsetTop + terraza.offsetHeight - 100 : 0;
    } else {
      const vj = canvasWorld.querySelector('a[href="proyecto-vj.html"]') || canvasWorld;
      targetLeft = vj.offsetLeft + vj.offsetWidth / 2 - canvasViewport.clientWidth / 2;
      targetTop = vj.offsetTop + vj.offsetHeight / 2 - canvasViewport.clientHeight / 2;
    }
    canvasViewport.scrollLeft = Math.max(0, targetLeft);
    canvasViewport.scrollTop = Math.max(0, targetTop);
  }

  // Ocultar el aviso al primer toque, en cualquier dispositivo (esto no depende de si hay mouse)
  if (canvasViewport && homeCanvas) {
    canvasViewport.addEventListener('touchstart', () => homeCanvas.classList.add('has-interacted'), { once: true, passive: true });
  }

  // Overlay de bienvenida del Home: deja elegir entre explorar el lienzo o ir directo
  // a Servicios, en vez de dejar a la persona sin un primer paso claro. Un clic en
  // cualquier parte del overlay que no sean los botones revela el lienzo (nunca navega
  // a un proyecto sin querer, ya que el overlay intercepta ese clic antes de que llegue
  // a los tiles de abajo).
  const homeIntro = document.getElementById('homeIntro');
  const homeIntroExplore = document.getElementById('homeIntroExplore');
  if (homeIntro && homeIntroExplore && homeCanvas) {
    // Mientras el overlay está puesto, el lienzo queda "is-idle": en touch (sin mouse
    // para posarse y panear) las fotos respiran solas con un zoom sutil, para que no
    // se sienta estático mientras se elige una opción
    homeCanvas.classList.add('is-idle');
    const revealCanvas = () => {
      homeIntro.classList.add('is-hidden');
      homeCanvas.classList.remove('is-idle');
    };
    homeIntro.addEventListener('click', (e) => {
      if (!e.target.closest('.home-intro-buttons')) revealCanvas();
    });
    homeIntroExplore.addEventListener('click', revealCanvas);
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

    // Escuchado en homeCanvas (no solo canvasViewport) para que el paneo por mouse
    // siga funcionando aunque el overlay de bienvenida todavía esté tapando el lienzo
    homeCanvas.addEventListener('mouseenter', () => {
      if (!rafId) rafId = requestAnimationFrame(step);
    });
    homeCanvas.addEventListener('mousemove', (e) => {
      const rect = canvasViewport.getBoundingClientRect();
      panX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      panY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      markInteracted();
    });
    homeCanvas.addEventListener('mouseleave', () => {
      panX = 0; panY = 0;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    });
  }

  // Año automático en el footer
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
