document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', function() {
        if (nav.classList.contains('hidden')) {
            nav.classList.remove('hidden');
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
    let hideTimeout;

    videoContainer.addEventListener('mouseenter', () => {
        playPauseBtn.style.display = 'block';
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            playPauseBtn.style.display = 'none';
        }, 4000);
    });

    videoContainer.addEventListener('mouseleave', () => {
        clearTimeout(hideTimeout);
        playPauseBtn.style.display = 'none';
    });

    playPauseBtn.addEventListener('click', () => {
        const video = document.getElementById('myVideo');
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '▶';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Play';
        }
    });
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

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      let grade = tab.getAttribute('data-grade');
      console.log(`Tab clicked: ${grade}`);
      
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      document.querySelectorAll('.video-section').forEach(section => {
        section.classList.remove('active');
      });
      
      if (grade === '4th-form') {
        console.log('Activating 4th Form section');
        document.getElementById('4th-form').classList.add('active');
      } else if (grade === '6th-GE') {
        console.log('Activating Grade 6 Grammar Explainers');
        document.getElementById('6th-GE').classList.add('active');
      } else {
        console.log(`Activating grade-${grade} section`);
        document.getElementById(`grade-${grade}`).classList.add('active');
      }
    });
  });


//Google ads

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

