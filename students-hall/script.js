// Students Hall - Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initStatsCounter();
  initMobileFlipCards();
  initVideoCards();
  initViewMoreStories();
  initFormHandler();
  initScrollAnimations();
  initSmoothAnchors();
  initTouchFlipSupport();
  initLazyImages();
});

// Animated Stats Counter
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target, 10) || 0;
        // Each stat animates in 1-2s, random for natural effect
        const duration = 1000 + Math.random() * 1000;
        animateNumber(entry.target, 0, target, duration);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
  const startTime = performance.now();
  const range = end - start;
  const numberNode = Array.from(element.childNodes).find(
    node => node.nodeType === Node.TEXT_NODE
  );

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (range * easeOutQuart));
    if (numberNode) {
      numberNode.nodeValue = current;
    } else {
      element.textContent = current;
    }
    if (progress < 1) requestAnimationFrame(update);
    else {
      if (numberNode) {
        numberNode.nodeValue = end;
      } else {
        element.textContent = end;
      }
    }
  }

  requestAnimationFrame(update);
}

// Mobile-Friendly Flip Cards
function initMobileFlipCards() {
  const storyCards = document.querySelectorAll('.story-card');
  if (!storyCards.length) return;
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    storyCards.forEach(card => {
      card.addEventListener('click', function () {
        const inner = this.querySelector('.story-card-inner');
        if (inner) inner.classList.toggle('flipped');
      });
    });
  }
}

// Video Card Interactions
function initVideoCards() {
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      showVideoModal();
    });
  });
}

// View More Stories button - show coming-soon modal
function initViewMoreStories() {
  const btn = document.getElementById('viewMoreStoriesBtn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showComingSoonModal('Stories are coming soon!', 'We are curating more student stories. Check back shortly to explore them all.');
  });
}

// Modal helpers
function showVideoModal() {
  const modal = buildModal('Video Coming Soon!', "We're currently collecting video testimonials from our amazing students. Check back soon to see their inspiring stories!");
  document.body.appendChild(modal);
}

function showComingSoonModal(title, message) {
  const modal = buildModal(title, message);
  document.body.appendChild(modal);
}

function buildModal(title, message) {
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.innerHTML = `
    <div class="video-modal-content">
      <button class="video-modal-close" aria-label="Close">&times;</button>
      <div class="video-modal-body">
        <h3 style="color: var(--color-deep); margin-bottom: 1rem; font-weight: 800;">${title}</h3>
        <p style="color: #64748b; margin-bottom: 1.5rem;">${message}</p>
        <button class="modal-btn" aria-label="Dismiss notice">Got it!</button>
      </div>
    </div>
  `;

  ensureModalStyles();

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  const closeBtn = modal.querySelector('.video-modal-close');
  const dismissBtn = modal.querySelector('.modal-btn');
  [closeBtn, dismissBtn].forEach(btn => {
    btn.addEventListener('click', () => modal.remove());
  });

  const escHandler = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  return modal;
}

function ensureModalStyles() {
  if (document.querySelector('style[data-modal-styles]')) return;
  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-modal-styles', 'true');
  styleEl.textContent = `
    .video-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 61, 63, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 1rem;
      animation: fadeIn 0.3s;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .video-modal-content {
      background: white;
      border-radius: 1.5rem;
      max-width: 500px;
      width: 100%;
      position: relative;
      animation: slideUp 0.3s;
    }
    @keyframes slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .video-modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      font-size: 2rem;
      color: #64748b;
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s;
    }
    .video-modal-close:hover {
      background: #f1f5f9;
      color: var(--color-orange);
    }
    .video-modal-body {
      padding: 3rem 2rem 2rem;
      text-align: center;
    }
    .modal-btn {
      background: var(--color-orange);
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 9999px;
      font-weight: 700;
      cursor: pointer;
      font-size: 1rem;
      font-family: 'Nunito', sans-serif;
      transition: all 0.3s;
    }
    .modal-btn:hover {
      background: var(--color-teal);
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(styleEl);
}

// Form Handler
function initFormHandler() {
  const form = document.getElementById('storyForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('storyName')?.value.trim();
    const email = document.getElementById('storyEmail')?.value.trim();
    const grade = document.getElementById('storyGrade')?.value;
    const story = document.getElementById('storyText')?.value.trim();

    if (!name || !grade || !story) {
      showNotification('Please fill in all required fields (Name, Grade, and Your Story).', 'error');
      return;
    }

    const subject = encodeURIComponent(`Student Story Submission: ${name} (Grade ${grade})`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Grade: ${grade}\n` +
      `Email: ${email || 'Not provided'}\n\n` +
      `Story:\n${story}`
    );

    window.location.href = `mailto:contact@lingo-land.net?subject=${subject}&body=${body}`;
    showNotification('Opening your email client... Thank you for sharing your story!', 'success');
    setTimeout(() => form.reset(), 1500);
  });
}

// Notification System
function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const note = document.createElement('div');
  note.className = `notification notification-${type}`;
  note.textContent = message;

  ensureNotificationStyles();
  document.body.appendChild(note);

  setTimeout(() => {
    note.style.animation = 'slideOutRight 0.3s';
    setTimeout(() => note.remove(), 300);
  }, 5000);
}

function ensureNotificationStyles() {
  if (document.querySelector('style[data-note-styles]')) return;
  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-note-styles', 'true');
  styleEl.textContent = `
    .notification {
      position: fixed;
      top: 100px;
      right: 20px;
      background: white;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      max-width: 400px;
      animation: slideInRight 0.3s;
      font-weight: 600;
      border-left: 4px solid;
    }
    .notification-success { border-left-color: #10b981; color: #065f46; }
    .notification-error { border-left-color: #ef4444; color: #991b1b; }
    .notification-info { border-left-color: var(--color-teal); color: var(--color-deep); }
    @keyframes slideInRight { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
    @media (max-width: 768px) { .notification { right: 10px; left: 10px; max-width: none; } }
  `;
  document.head.appendChild(styleEl);
}

// Scroll Animations
function initScrollAnimations() {
  const revealables = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .scale-in');
  if (!revealables.length) return;

  if (!('IntersectionObserver' in window)) {
    revealables.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.revealDelay) {
          el.style.transitionDelay = el.dataset.revealDelay;
        }
        requestAnimationFrame(() => el.classList.add('active'));
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealables.forEach(el => observer.observe(el));
}

// Smooth Scroll for Anchor Links
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// Touch support for flip cards on mobile
function initTouchFlipSupport() {
  if (!('ontouchstart' in window)) return;
  const storyCards = document.querySelectorAll('.story-card');
  storyCards.forEach(card => {
    card.addEventListener('touchstart', function () {
      this.classList.add('touch-active');
    });
  });
}

// Performance: Lazy load images with data-src
function initLazyImages() {
  if (!('IntersectionObserver' in window)) return;
  const imageObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        obs.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Console Easter Egg
console.log('%cLingoLand Students Hall 🎓', 'color: #00ACA8; font-size: 20px; font-weight: bold;');
console.log('%cWhere learning meets excellence!', 'color: #F48C06; font-size: 14px;');
console.log("%cInterested in our code? We're always looking for talented developers!", 'color: #0f3d3f; font-size: 12px;');
