// Testimonial Slider Functionality (accessible + auto-pause)
document.addEventListener('DOMContentLoaded', function() {
  const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
  const container = document.querySelector('.testimonial-slider');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  if (!slides.length || !container || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  let intervalId = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showSlide(n) {
    slides.forEach((slide, idx) => {
      const isActive = idx === ((n + slides.length) % slides.length);
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    currentSlide = (n + slides.length) % slides.length;
  }

  function startAuto() {
    if (intervalId || reduceMotion) return;
    intervalId = setInterval(() => showSlide(currentSlide + 1), 8000);
  }
  function stopAuto() { if (intervalId) { clearInterval(intervalId); intervalId = null; } }

  prevBtn.addEventListener('click', () => { stopAuto(); showSlide(currentSlide - 1); });
  nextBtn.addEventListener('click', () => { stopAuto(); showSlide(currentSlide + 1); });

  // Pause on hover/focus, resume on leave/blur
  container.addEventListener('mouseenter', stopAuto);
  container.addEventListener('mouseleave', startAuto);
  container.addEventListener('focusin', stopAuto);
  container.addEventListener('focusout', startAuto);

  // Pause when slider is not visible
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { entry.isIntersecting ? startAuto() : stopAuto(); });
  }, { threshold: 0.4 });
  io.observe(container);

  // Keyboard support on the container
  container.setAttribute('tabindex', '0');
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); stopAuto(); showSlide(currentSlide - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); stopAuto(); showSlide(currentSlide + 1); }
  });

  // Init
  showSlide(0);
  startAuto();
});

// Lightbox Gallery Implementation
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('studentGallery');
  if (!gallery) return;
  const images = Array.from(gallery.querySelectorAll('img'));
  let currentIndex = 0;
  let overlay = null;

  function openLightbox(index) {
    currentIndex = index;
    const img = images[currentIndex];
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Close gallery">&times;</button>
          <img src="${img.src}" alt="${img.alt}">
          <div class="lightbox-counter" aria-live="polite"></div>
        </div>`;
      document.body.appendChild(overlay);
      overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
      document.addEventListener('keydown', handleKey);
    } else {
      const lightImg = overlay.querySelector('img');
      lightImg.src = img.src;
      lightImg.alt = img.alt;
    }
    updateCounter();
    trapFocus();
  }

  function updateCounter() {
    if (!overlay) return;
    const counter = overlay.querySelector('.lightbox-counter');
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  function closeLightbox() {
    if (overlay) {
      overlay.remove();
      overlay = null;
      document.removeEventListener('keydown', handleKey);
    }
  }

  function handleKey(e) {
    if (!overlay) return;
    if (e.key === 'Escape') { closeLightbox(); }
    if (e.key === 'ArrowRight') { navigate(1); }
    if (e.key === 'ArrowLeft') { navigate(-1); }
  }

  function navigate(delta) {
    currentIndex = (currentIndex + delta + images.length) % images.length;
    const img = images[currentIndex];
    const lightImg = overlay.querySelector('img');
    lightImg.src = img.src;
    lightImg.alt = img.alt;
    updateCounter();
  }

  function trapFocus() {
    if (!overlay) return;
    const focusable = overlay.querySelector('.lightbox-close');
    focusable.focus();
  }

  images.forEach((img, idx) => {
    img.addEventListener('click', () => openLightbox(idx));
    img.setAttribute('tabindex', '0');
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); } });
  });
});

// Share Story form handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('storyForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#storyName').value.trim();
    const grade = form.querySelector('#storyGrade').value;
    const story = form.querySelector('#storyText').value.trim();
    if (!name || !grade || !story) {
      alert('Please fill in all required fields (Name, Grade, Story).');
      return;
    }
    const email = form.querySelector('#storyEmail').value.trim();
    const subject = encodeURIComponent(`Student Story Submission: ${name} (Grade ${grade})`);
    const body = encodeURIComponent(`Name: ${name}\nGrade: ${grade}\nEmail: ${email || 'Not provided'}\n\nStory:\n${story}`);
    window.location.href = `mailto:contact@lingo-land.net?subject=${subject}&body=${body}`;
  });
});
