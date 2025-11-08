// Testimonials implementation: horizontal scroll carousel
const reviews = [
  {
    name: "Hamdi Dkhil",
    role: "English Teacher / Entrepreneur",
    body:
      "As a Teacher, I am thrilled to have had the opportunity to teach with this innovative English book. Its interactive approach and creative use of AI have transformed my classroom experience.",
    img: "assets/img/testppl/hamdi.jpg",
    stars: 5,
  },
  {
    name: "Hela Hawari",
    role: "English Teacher / Parent",
    body:
      "LingoLand is the creation of one of the most creative and innovative teachers I've ever known. The content is varied and rich, with joyful colors that students love.",
    img: "assets/img/testppl/Hela Hawari.jpg",
    stars: 5,
  },
  {
    name: "Najoua Ben Jazia Regaieg",
    role: "French Teacher / Parent",
    body:
      "En tant qu'enseignante, je trouve que LingoLand est un outil pédagogique innovant, motivant et unique. Il facilite l'apprentissage de l'anglais aux jeunes apprenants.",
    img: "assets/img/testppl/Najoua.jpg",
    stars: 5,
  },
  {
    name: "Chad Chtourou",
    role: "Student / Learner",
    body:
      "Lingoland helped me structure my learning and made English feel natural. The mix of listening, speaking and practical tasks boosted my confidence a lot.",
    img: "assets/img/testppl/chahd.jpeg",
    stars: 5,
  },
  // Add more reviews in this array; they will auto-render & scroll
];

function starRow(count = 5) {
  return '<div class="flex text-yellow-400">' +
    Array.from({ length: 5 }, (_, i) =>
      `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ${i < count ? '' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.175 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
    ).join('') + '</div><br>';
}

function createCard({ img, name, role, body, stars = 5 }) {
  const card = document.createElement('div');
  card.className = 'card p-6 shadow-sm border border-gray-200 rounded-2xl bg-white';
  const avatar = img && img.trim() !== '' ? img : 'assets/img/logo.png';
  card.innerHTML = `
    <div class="flex items-center gap-4">
      <img class="rounded-full border-2 border-gray-200 shadow-sm" width="56" height="56" src="${avatar}" alt="${name}" />
      <div>
        <div class="font-extrabold text-gray-900">${name}</div>
        <div class="text-sm text-gray-500">${role}</div>
        ${starRow(stars)}
      </div>
    </div>
    <p class="mt-3 text-gray-700">${body}</p>
  `;
  return card;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  if (!grid) return;

  const data = shuffle(reviews); // Randomize order
  
  // Triple the content for seamless infinite scroll
  grid.innerHTML = '';
  const tripled = [...data, ...data, ...data];
  tripled.forEach(r => grid.appendChild(createCard(r)));

  // Horizontal scroll setup
  grid.classList.add('horizontal-scroll-ready');
  
  // Start at the middle set
  setTimeout(() => {
    grid.scrollLeft = grid.scrollWidth / 3;
  }, 10);

  let autoScrollInterval = null;
  let userInteracting = false;

  // Get card width for precise scrolling
  function getCardWidth() {
    const card = grid.querySelector('.card');
    return card ? card.offsetWidth + 16 : 336; // card width + gap
  }

  // Scroll exactly one testimonial card
  function scrollOne(dir = 1) {
    const cardWidth = getCardWidth();
    grid.scrollBy({ left: cardWidth * dir, behavior: 'smooth' });
  }

  // Infinite scroll logic: when reaching end, jump to equivalent position
  function handleInfiniteScroll() {
    const scrollLeft = grid.scrollLeft;
    const scrollWidth = grid.scrollWidth;
    const clientWidth = grid.clientWidth;
    const sectionWidth = scrollWidth / 3;

    // If scrolled past 2/3, jump back to 1/3
    if (scrollLeft >= sectionWidth * 2) {
      grid.scrollLeft = scrollLeft - sectionWidth;
    }
    // If scrolled before 1/3, jump forward to 2/3
    else if (scrollLeft <= 0) {
      grid.scrollLeft = scrollLeft + sectionWidth;
    }
  }

  function updateButtons() {
    if (!prevBtn || !nextBtn) return;
    // Always show buttons for infinite scroll
    prevBtn.style.visibility = 'visible';
    nextBtn.style.visibility = 'visible';
  }

  // Auto-scroll functionality
  function startAutoScroll() {
    if (autoScrollInterval) return;
    autoScrollInterval = setInterval(() => {
      if (!userInteracting) {
        const cardWidth = getCardWidth();
        grid.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3000); // Scroll every 3 seconds
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  // Pause auto-scroll on user interaction
  function pauseAutoScroll() {
    userInteracting = true;
    stopAutoScroll();
    setTimeout(() => {
      userInteracting = false;
      startAutoScroll();
    }, 5000); // Resume after 5 seconds of no interaction
  }

  // Button events
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pauseAutoScroll();
      scrollOne(-1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pauseAutoScroll();
      scrollOne(1);
    });
  }

  // Sync button visibility and infinite scroll on scroll
  grid.addEventListener('scroll', () => {
    updateButtons();
    handleInfiniteScroll();
  }, { passive: true });
  
  window.addEventListener('resize', updateButtons);
  updateButtons();

  // Pause on hover
  grid.addEventListener('mouseenter', () => {
    userInteracting = true;
  });
  
  grid.addEventListener('mouseleave', () => {
    userInteracting = false;
  });

  // Wheel (shift vertical wheel into horizontal scroll)
  grid.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      pauseAutoScroll();
      grid.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  // Drag-to-scroll (pointer based)
  let isDown = false, startX = 0, scrollLeftStart = 0;
  grid.addEventListener('pointerdown', (e) => {
    isDown = true; 
    startX = e.pageX; 
    scrollLeftStart = grid.scrollLeft; 
    grid.setPointerCapture(e.pointerId);
    pauseAutoScroll();
  });
  grid.addEventListener('pointermove', (e) => {
    if (!isDown) return; 
    const dx = e.pageX - startX; 
    grid.scrollLeft = scrollLeftStart - dx; 
    updateButtons();
  });
  grid.addEventListener('pointerup', (e) => { 
    isDown = false; 
    try { grid.releasePointerCapture(e.pointerId); } catch(err) {}
  });
  grid.addEventListener('pointerleave', () => { isDown = false; });

  // Start auto-scroll
  startAutoScroll();

  // Rate-limit the "Show more" button if present
  const moreBtn = document.getElementById('moreTestimonials');
  if (moreBtn) {
    let lastClick = 0;
    const intervalMs = 900;
    moreBtn.addEventListener('click', function(e) {
      const now = Date.now();
      if (now - lastClick < intervalMs) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }
      lastClick = now;
      // Optional: brief disable to avoid double submission
      moreBtn.disabled = true;
      setTimeout(() => {
        if (moreBtn.offsetParent !== null) {
          moreBtn.disabled = false;
        }
      }, 600);
    }, true);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTestimonials);
} else {
  initTestimonials();
}
