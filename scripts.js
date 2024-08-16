document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', function() {
        if (nav.classList.contains('hidden')) {
            // Show the nav and start the slide-in animation
            nav.classList.remove('hidden');
            setTimeout(() => {
                nav.classList.remove('-translate-x-full');
                nav.classList.add('translate-x-0');
            }, 10); // Small delay to ensure the transition is applied
        } else {
            // Slide out the nav
            nav.classList.remove('translate-x-0');
            nav.classList.add('-translate-x-full');

            // Hide the nav after the transition
            nav.addEventListener('transitionend', function() {
                nav.classList.add('hidden');
            }, { once: true });
        }
    });
});


document.getElementById('logo').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    window.location.reload(); // Reload the page
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
        const grade = tab.getAttribute('data-grade');
        
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        document.querySelectorAll('.video-section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(`grade-${grade}`).classList.add('active');
    });
});

