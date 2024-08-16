const reviews = [
    { name: "Jack", username: "@jack", body: "I've never seen anything like this before. It's amazing. I love it.", img: "https://avatar.vercel.sh/jack" },
    { name: "Jill", username: "@jill", body: "I don't know what to say. I'm speechless. This is amazing.", img: "https://avatar.vercel.sh/jill" },
    { name: "John", username: "@john", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/john" },
    { name: "Jane", username: "@jane", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/jane" },
    { name: "Jenny", username: "@jenny", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/jenny" },
    { name: "James", username: "@james", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/james" },
    { name: "Jack", username: "@jack", body: "I've never seen anything like this before. It's amazing. I love it.", img: "https://avatar.vercel.sh/jack" },
    { name: "Jill", username: "@jill", body: "I don't know what to say. I'm speechless. This is amazing.", img: "https://avatar.vercel.sh/jill" },
    { name: "John", username: "@john", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/john" },
    { name: "Jane", username: "@jane", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/jane" },
    { name: "Jenny", username: "@jenny", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/jenny" },
    { name: "James", username: "@james", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/james" },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

function createReviewCard({ img, name, username, body }) {
    const card = document.createElement('figure');
    card.className = "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] m-4";
    
    card.innerHTML = `
    <div class="reviewCard">
        <div class="flex items-center gap-4">
            <img class="rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm" width="40" height="40" alt="Profile picture of ${name}" src="${img}" />
            <div>
                <figcaption class="text-lg font-semibold text-gray-900 dark:text-white">${name}</figcaption>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">${username}</p>
            </div>
        </div>
        <blockquote class="mt-4 text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">${body}</blockquote>
    </div>
    `;
    return card;
}


const firstMarquee = document.getElementById('firstMarquee');
const secondMarquee = document.getElementById('secondMarquee');

firstRow.forEach(review => {
    firstMarquee.appendChild(createReviewCard(review));
});

secondRow.forEach(review => {
    secondMarquee.appendChild(createReviewCard(review));
});