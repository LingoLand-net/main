document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', function() {
        if (nav.classList.contains('hidden')) {
            nav.classList.remove('hidden');
            nav.classList.add('margin-top-16');
            setTimeout(() => {
                nav.classList.remove('-translate-x-full');
                nav.classList.add('translate-x-0');
            }, 10); 
        } else {
            nav.classList.remove('translate-x-0');
            nav.classList.add('-translate-x-full');

            nav.addEventListener('transitionend', function() {
                nav.classList.add('hidden');
            }, { once: true });
        }
    });
});

// window.onload = function() {
//     // Get the current URL path
//     const currentPath = window.location.pathname;

//     // Mapping current paths to new paths
//     const pathMap = {
//         '/index.html': '/Welcome to lingoland',
//         '/about-us.html': '/About Us',
//         '/contact.html': '/Contact',
//         '/store.html': '/Store',
//         '/our-resources.html': '/Resources'
//     };

//     // Get the new path based on the current path
//     const newPath = pathMap[currentPath];

//     // If a new path exists, update the URL
//     if (newPath) {
//         const newUrl = window.location.origin + newPath; // Keep the same domain
//         window.history.pushState({}, '', newUrl);
//     }
// };

 document.addEventListener('DOMContentLoaded', () => {
            const videoContainer = document.querySelector('.video-container');
            const playPauseBtn = document.getElementById('playPauseBtn');
            const video = document.getElementById('myVideo');
            const thumbnail = document.querySelector('.video-thumbnail');
            let hideTimeout;

            // Show controls on mouse enter
            videoContainer.addEventListener('mouseenter', () => {
                playPauseBtn.style.display = 'block';
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => {
                    playPauseBtn.style.display = 'none';
                }, 4000);
            });

            // Hide controls on mouse leave
            videoContainer.addEventListener('mouseleave', () => {
                clearTimeout(hideTimeout);
                playPauseBtn.style.display = 'none';
            });

            // Play/Pause functionality
            playPauseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video.paused) {
                    video.play();
                    playPauseBtn.textContent = '❚❚';
                    thumbnail.classList.add('hidden');
                } else {
                    video.pause();
                    playPauseBtn.textContent = '▶';
                }
            });

            // Also toggle play/pause when clicking on the video
            videoContainer.addEventListener('click', (e) => {
                if (e.target !== playPauseBtn) {
                    if (video.paused) {
                        video.play();
                        playPauseBtn.textContent = '❚❚';
                        thumbnail.classList.add('hidden');
                    } else {
                        video.pause();
                        playPauseBtn.textContent = '▶';
                    }
                }
            });

            // Hide button when video is playing and show when paused
            video.addEventListener('play', () => {
                playPauseBtn.textContent = '❚❚';
                thumbnail.classList.add('hidden');
            });

            video.addEventListener('pause', () => {
                playPauseBtn.textContent = '▶';
                playPauseBtn.style.display = 'block';
            });

            // Initially hide the play button
            playPauseBtn.style.display = 'none';
        });

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Adjust this value to trigger the animation sooner or later
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});


//Google ads

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());


// Simple rate limiter: returns a function that allows one call per intervalMs.
function rateLimitFactory(intervalMs = 800) {
    let last = 0;
    return function allow() {
        const now = Date.now();
        if (now - last >= intervalMs) {
            last = now;
            return true;
        }
        return false;
    };
}

// Apply a Read More toggle to a single element containing text
function setupReadMore(el, options = {}) {
    const maxChars = options.maxChars || 300;
    const moreLabel = options.moreLabel || 'Read more';
    const lessLabel = options.lessLabel || 'Read less';

    if (!el) return;
    const fullText = el.textContent.trim();
    if (fullText.length <= maxChars) return; // nothing to collapse

    const shortText = fullText.slice(0, maxChars).replace(/\s+\S*$/, '') + '…';

    // Build structure: <span class="rm-short">..</span><span class="rm-full hidden">..</span> <button data-action="toggle-readmore">
    el.innerHTML = '';
    const shortSpan = document.createElement('span');
    shortSpan.className = 'rm-short';
    shortSpan.textContent = shortText;

    const fullSpan = document.createElement('span');
    fullSpan.className = 'rm-full hidden';
    fullSpan.textContent = fullText;

    const btn = document.createElement('button');
    btn.type = 'button';
    // Brand color and positioning: primary pill button, centered on mobile, left on md+
    btn.className = 'btn btn-primary px-5 py-2.5 mt-3 mx-auto md:mx-0 inline-flex items-center justify-center';
    btn.setAttribute('data-action', 'toggle-readmore');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = moreLabel;

    el.appendChild(shortSpan);
    el.appendChild(fullSpan);
    el.appendChild(btn);
}

// Delegate read more toggling
document.addEventListener('click', function(e) {
    const t = e.target;
    if (t && t.getAttribute('data-action') === 'toggle-readmore') {
        const container = t.parentElement;
        if (!container) return;
        const shortEl = container.querySelector('.rm-short');
        const fullEl = container.querySelector('.rm-full');
        const expanded = t.getAttribute('aria-expanded') === 'true';
        if (shortEl && fullEl) {
            shortEl.classList.toggle('hidden', !expanded);
            fullEl.classList.toggle('hidden', expanded);
            t.setAttribute('aria-expanded', String(!expanded));
            t.textContent = expanded ? 'Read more' : 'Read less';
        }
    }
});

// Initialize Read More on specific sections and add rate limiting to high-click actions
(function initUXEnhancements() {
    const onDomReady = function() {
        // Apply read more to Student Says paragraph only
        const studentPara = document.querySelector('#student-says .sec');
        setupReadMore(studentPara, { maxChars: 420 });
        // add a br before the button so it doesnt mix with the text
        const br = document.createElement('br');
        const btn = studentPara.querySelector('button[data-action="toggle-readmore"]');
        studentPara.insertBefore(br, btn);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDomReady);
    } else {
        onDomReady();
    }
})();

// -------- Book Covers Interactive Showcase --------
(function initBookShowcase(){
    let interactive = window.matchMedia('(max-width: 1023px)').matches; // enable scroll on tablet/phone only
    const mq = window.matchMedia('(max-width: 1023px)');
    mq.addEventListener ? mq.addEventListener('change', (e)=>{ interactive = e.matches; }) : mq.addListener((e)=>{ interactive = e.matches; });
        function normalizeImagePath(src){
        if(!src) return '';
            // Skip external URLs: only use local assets
            if(/^https?:\/\//i.test(src)) return '';
            // Remove any leading ../ segments
            src = src.replace(/^(\.\.\/)+/, '');
            // Ensure no leading slash and path begins with assets/
            src = src.replace(/^\//, '');
            return src;
    }

        function pickPrimaryImage(images){
        if(!Array.isArray(images) || images.length===0) return '';
            // prefer first local asset image
            for (const s of images){
                const n = normalizeImagePath(s);
                if(n && n.toLowerCase().startsWith('assets/img')) return n;
            }
            // fallback: any normalized local asset path
            const any = normalizeImagePath(images[0]);
            return any && any.toLowerCase().startsWith('assets/') ? any : 'assets/img/logo.png';
    }

        function buildCards(products){
        const track = document.getElementById('bookCarousel');
        if(!track) return;
        track.innerHTML='';
        products.forEach(p=>{
            const imgSrc = pickPrimaryImage(p.images);
            if(!imgSrc) return;
            const card = document.createElement('div');
            card.className='book-card';
            card.setAttribute('role','group');
            card.setAttribute('aria-label', p.name);
                const href = `/Store/product.html?id=${encodeURIComponent(p.id)}`;
               card.innerHTML=`<a href="${href}" class="block focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-xl">
                        <img loading="lazy" src="${imgSrc}" alt="${p.name} cover" class="book-cover" />
                    </a>
                    <div class="meta">
                        <span class="grade-tag">${p.gradeLabel || p.grade}</span>
                   <div class="text-sm font-semibold book-title"><a href="${href}">${p.name}</a></div>
                    </div>`;
            track.appendChild(card);
        });
    }

        function scaleCards(){
            if(!interactive) return;
        const track = document.getElementById('bookCarousel');
        if(!track) return;
        const centerX = track.getBoundingClientRect().left + track.clientWidth/2;
        const cards = Array.from(track.querySelectorAll('.book-card'));
           let minIdx = 0;
           let minDist = Number.POSITIVE_INFINITY;
           cards.forEach((card, idx)=>{
               const rect = card.getBoundingClientRect();
               const cardCenter = rect.left + rect.width/2;
               const dist = Math.abs(centerX - cardCenter);
               if (dist < minDist) { minDist = dist; minIdx = idx; }
           });
           // apply classes: active for center, near for neighbors
           cards.forEach((card, idx)=>{
               card.classList.toggle('active', idx === minIdx);
               card.classList.toggle('near', Math.abs(idx - minIdx) === 1);
           });
    }

        function scrollByAmount(dir){
            if(!interactive) return;
        const track = document.getElementById('bookCarousel');
        if(!track) return;
        const amount = track.clientWidth * 0.6;
        track.scrollBy({left: amount*dir, behavior:'smooth'});
    }

    function attachEvents(){
        const track = document.getElementById('bookCarousel');
        if(!track) return;
        const prev = document.getElementById('booksPrev');
        const next = document.getElementById('booksNext');
            if(prev) prev.addEventListener('click', ()=> scrollByAmount(-1));
            if(next) next.addEventListener('click', ()=> scrollByAmount(1));
            track.addEventListener('scroll', ()=> { if(interactive) requestAnimationFrame(scaleCards); }, {passive:true});
            window.addEventListener('resize', ()=> requestAnimationFrame(scaleCards));
            // Keyboard navigation (only meaningful on mobile/tablet when focused)
            track.addEventListener('keydown', (e)=>{
                if(!interactive) return;
                if(e.key==='ArrowRight'){ e.preventDefault(); scrollByAmount(1); }
                else if(e.key==='ArrowLeft'){ e.preventDefault(); scrollByAmount(-1); }
            });
            // Drag / pointer navigation
            let isDown=false, startX=0, scrollStart=0;
            track.addEventListener('pointerdown', e=>{ if(!interactive) return; isDown=true; startX=e.pageX; scrollStart=track.scrollLeft; track.setPointerCapture(e.pointerId); });
            track.addEventListener('pointermove', e=>{ if(!interactive || !isDown) return; const dx=e.pageX - startX; track.scrollLeft = scrollStart - dx; });
            track.addEventListener('pointerup', e=>{ if(!interactive) return; isDown=false; try{ track.releasePointerCapture(e.pointerId);}catch(_){} });
            track.addEventListener('pointerleave', ()=>{ isDown=false; });
    }

    function init(){
        const track = document.getElementById('bookCarousel');
        if(!track) return;
        const all = (window.STORE_PRODUCTS || []);
        // Prioritize best sellers + BAC
        let picks = all.filter(p => p.bestseller || (p.gradeLabel && p.gradeLabel.toLowerCase()==='bac'));
        // Fallback: if not enough, append more core products
        if(picks.length < 5){
            const extras = all.filter(p=>p.type==='core' && !picks.includes(p));
            picks = picks.concat(extras).slice(0,8);
        } else {
            picks = picks.slice(0,8);
        }
        buildCards(picks);
            attachEvents();
            scaleCards();
    }

    if(document.readyState==='loading'){
        document.addEventListener('DOMContentLoaded', init);
    } else { init(); }

    // If products-data may load after scripts, poll briefly
    let attempts=0;
    const poll = setInterval(()=>{
        attempts++;
        if(window.STORE_PRODUCTS){ init(); clearInterval(poll); }
        if(attempts>20) clearInterval(poll); // give up after ~2s
    }, 100);
})();

