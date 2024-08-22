const reviews = [
    { name: "Hela Hawari", username: "English teacher / parent", body: "LingoLand is the creation of one of the most creative and innovative teachers I've ever known. The content is varied and rich. The books are designed in a way that comforts the eyes with their joyful colors. Lingoland helps us teach English in an artistic way.", img: "assets/img/testppl/Hela Hawari.jpg" },
    { name: "Hamdi Dkhil", username: "English teacher/ entrepreneur", body: "As a teacher, I am thrilled to have had the opportunity to teach with this innovative English book. Its interactive approach and creative use of AI have transformed my classroom experience, engaging students in ways that traditional materials simply cannot. The thoughtfully designed activities foster critical thinking and collaboration, making learning both enjoyable and effective. I wholeheartedly recommend this book to fellow educators looking to inspire their students!", img: "assets/img/testppl/hamdi.jpg" },
    { name: "Najoua Ben Jazia Regaieg", username: "French teacher / parent", body: "En tant qu'enseignante, je trouve que LingoLand est un outil pédagogique innovant, motivant et unique. Il explicite et facilite l'apprentissage de l'anglais aux jeunes apprenants, les motive à travers des activités ludiques et enrichissantes. Je recommande LingoLand à tous les jeunes qui désirent vraiment améliorer leur acquisition de l'anglais.", img: "assets/img/testppl/Najoua.jpg" },
    { name: "Hela Hawari", username: "English teacher / parent", body: "LingoLand is the creation of one of the most creative and innovative teachers I've ever known. The content is varied and rich. The books are designed in a way that comforts the eyes with their joyful colors. Lingoland helps us teach English in an artistic way.", img: "assets/img/testppl/Hela Hawari.jpg" },
    { name: "Hamdi Dkhil", username: "English teacher/ entrepreneur", body: "As a teacher, I am thrilled to have had the opportunity to teach with this innovative English book. Its interactive approach and creative use of AI have transformed my classroom experience, engaging students in ways that traditional materials simply cannot. The thoughtfully designed activities foster critical thinking and collaboration, making learning both enjoyable and effective. I wholeheartedly recommend this book to fellow educators looking to inspire their students!", img: "assets/img/testppl/hamdi.jpg" },
    { name: "Najoua Ben Jazia Regaieg", username: "French teacher / parent", body: "En tant qu'enseignante, je trouve que LingoLand est un outil pédagogique innovant, motivant et unique. Il explicite et facilite l'apprentissage de l'anglais aux jeunes apprenants, les motive à travers des activités ludiques et enrichissantes. Je recommande LingoLand à tous les jeunes qui désirent vraiment améliorer leur acquisition de l'anglais.", img: "assets/img/testppl/Najoua.jpg" },
];

function createReviewCard({ img, name, username, body }) {
    const card = document.createElement('div');
    card.className = "relative cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-200 bg-gray-50 shadow-ms transition-transform duration-300 transform hover:scale-105";
    
    card.innerHTML = `
    <div class="flex items-center gap-4 reviewCard" style="margin-right:5px">
        <img class="rounded-full border-2 border-gray-300 shadow-sm" width="40" height="40" alt="Profile picture of ${name}" src="${img}" />
        <div class="flex-1">
            <figcaption class="text-lg font-semibold text-gray-900">${name}</figcaption>
            <p class="text-sm font-medium text-gray-500">${username}</p>
        </div>
    </div>
    <blockquote class="mt-4 text-sm text-gray-700 leading-relaxed">${body}</blockquote>
    `;
    return card;
}

$(document).ready(function(){
    const carousel = $('.slick-carousel');
    reviews.forEach(review => {
        carousel.append(createReviewCard(review));
    });

    carousel.slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1400,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 600,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});