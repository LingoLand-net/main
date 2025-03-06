    const products = [

        // Forth Grade
        {
            id: "4",
            name: "4th Grade Book",
            price: "35",
            grade: "4",
            images: [
                "https://i.postimg.cc/RCn8Gtnm/5.png",
                "https://i.postimg.cc/QNgKnJYc/4th-grade-book-final-merge-34.png",
                "https://i.postimg.cc/28zLpLgM/4th-grade-book-final-merge-65.png",
                "https://i.postimg.cc/T1cyLT5t/4th-grade-book-final-merge-92.png"
            ]
        },
        
        // Fifth Grade
        {
            id: "5",
            name: "5th Grade Book",
            price: "35",
            grade: "5",
            images: [
                "https://i.postimg.cc/jd011jz7/1.png",
                "https://i.postimg.cc/SND2mNhs/5th-grade-final-book-merge-16.png",
                "https://i.postimg.cc/6pq7qJWh/5th-grade-final-book-merge-26.png",
                "https://i.postimg.cc/Cx2RfPdp/5th-grade-final-book-merge-82.png"
            ]
        },
        
        // Sixth Grade
        {
            id: "2",
            name: "6th Grade Book",
            price: "40",
            grade: "6",
            images: [
                "https://i.postimg.cc/d1gfwspg/9.png",
                "https://i.postimg.cc/5yfyMDKL/6th-grade-final-book-merge-103.png",
                "https://i.postimg.cc/85QsZ7hy/6th-grade-final-book-merge-124.png",
                "https://i.postimg.cc/LXt5wmDm/6th-grade-final-book-merge-80.png"
            ]
        },
        {
            id: "6",
            name: "6th Grade Box",
            price: "60",
            grade: "6",
            contains: ["Note Books", "Game Board", "Flashcards Set"],
            description: "Complete learning package for 6th grade students",
            images: [
                "/assets/img/box.png",
                "/assets/img/boxbox.png",
                "/assets/img/pp.png",
                "/assets/img/ww.png",
                "/assets/img/ff.png",
            ]
        },
        {
            id: "8",
            name: "Words&wonders Note Book",
            price: "20",
            grade: "6",
            contains: ["Note Book", "Workbook"],
            images: [
                "https://i.postimg.cc/Qt3xpR3w/Words-and-wonders-cover-1.png",
                "/assets/img/wordsandwonder.png",
                "/assets/img/ww.png",
            ]
        },
        {
            id: "7",
            name: "Fun&Focus Note Book",
            price: "20",
            grade: "6",
            contains: ["Note Book", "Workbook"],
            images: [
                "https://i.postimg.cc/6p83wrcj/Fun-and-focus-cover-1.png",
                "/assets/img/funandfoucus.png",
                "/assets/img/ff.png",
            ]
        },
        // Ninth Grade
        {
            id: "3",
            name: "9th Grade Book",
            price: "40",
            grade: "9",
            images: [
                "https://i.postimg.cc/Y0gs9cw0/16.png",
                "https://i.postimg.cc/kGw4MwLZ/9th-grade-book-51.png",
                "https://i.postimg.cc/BZCtCQtg/9th-grade-book-60.png",
                "https://i.postimg.cc/qMMqDV3d/9th-grade-book-89.png"
            ]
        },
        
        // Forth Form
        {
            id: "1",
            name: "4th Form Book",
            price: "40",
            grade: "4th-form",
            images: [
                "https://i.postimg.cc/Kz1W6kqn/14.png",
                "https://i.postimg.cc/t48ggsmX/Bac-Class-Book-FINAL-with-numbers-10.png",
                "https://i.postimg.cc/BQY6dYTP/Bac-Class-Book-FINAL-with-numbers-4.png",
                "https://i.postimg.cc/bvbwSqK1/Bac-Class-Book-FINAL-with-numbers-91.png"
            ]
        },
    ];
// Function to render products based on the selected grade
// This dynamically updates the product list when a grade tab is clicked
const renderProducts = (grade) => {
    const container = document.querySelector('.products-container');
    
    // Filter products by the selected grade and generate HTML for each product
    container.innerHTML = products
        .filter(product => product.grade === grade)
        .map(product => `
            <div class="product-card border rounded-lg shadow-md" data-product-id="${product.id}">
                <div class="product-carousel">
                    ${product.images.map(image => `
                        <div>
                            <img src="${image}" alt="${product.name}" >
                        </div>
                    `).join('')}
                </div>
                <h2 class="text-xl font-bold mt-4 mb-2">${product.name}</h2>
                <p class="price flex items-center gap-1 text-lg font-semibold">
                    ${product.price} د.ت
                </p>
                <div class="flex flex-col sm:flex-row items-center gap-2 mt-3 w-full">
                    <button class="add-to-cart w-full text-white font-medium px-6 py-2 rounded-md transition duration-200">
                        Add to Cart
                    </button>
                    ${product.contains ? 
                        `<button class="show-contents w-full hover:text-gray-800 font-medium px-6 py-2 rounded-md transition duration-200" data-id="${product.id}">
                            View Contents
                        </button>` 
                        : ""}
                </div>
            </div>
        `).join('');

    // Initialize the Slick carousel for product images
    document.querySelectorAll('.product-carousel').forEach(carousel => {
        $(carousel).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: true,
            adaptiveHeight: true
        });
    });
};

let previousModal = null; // Stores the last opened modal data

// Function to open a modal and allow reopening the previous one
function openModal(options, reopenData = null) {
    Swal.fire({
        ...options,
        didClose: () => {
            if (reopenData) {
                openModal(reopenData); // Reopen the previous modal if available
            }
        }
    });
}

// Function to display the contents of a product package
const showBoxContents = (id) => {
    const product = products.find(p => p.id === id);
    if (product && product.contains) {
        previousModal = { // Save current modal data to reopen later
            title: `${product.name}`,
            html: `
                <div class="box-contents-modal">
                    <div class="content-section">
                        <h3 class="text-xl font-semibold mb-4 text-gray-800">Contents:</h3>
                        <ul class="list-none space-y-2 mb-6">
                            ${product.contains.map(item => `
                                <center>
                                <li class="flex items-center">
                                    <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-gray-700">${item}</span>
                                </li>
                                </center>
                            `).join('')}
                        </ul>
                        ${product.description ? `<p class="text-gray-600 mb-4">${product.description}</p>` : ''}
                    </div>
                    <div class="preview-section mt-6">
                        <h3 class="text-xl font-semibold mb-4 text-gray-800">Pictures:</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            ${product.images.map(image => `
                                <img src="${image}" 
                                     alt="Preview" 
                                     class="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                                     onclick="previewImage('${image}', '${product.name}')"
                                >
                            `).join('')}
                        </div>
                    </div>
                </div>
            `,
            width: 600,
            padding: '2rem',
            background: '#ffffff',
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
                container: 'box-contents-container',
                popup: 'box-contents-popup',
                closeButton: 'box-contents-close'
            }
        };

        openModal(previousModal); // Open the box contents modal
    }
};

// Function to preview an enlarged image in a modal
function previewImage(imageUrl, productName) {
    openModal({
        title: `Preview ${productName} Item`,
        imageUrl: imageUrl,
        imageAlt: productName,
        width: 'max-25',
        background: '#fff',
        showCloseButton: true,
        closeButtonAriaLabel: 'Close preview',
        closeButtonColor: '#f00', // Red close button
        showConfirmButton: false,
        padding: '1rem'
    }, previousModal); // Reopen the previous modal after closing
}

// Event listener to switch between tabs and update displayed products
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(t => 
            t.classList.remove('active-tab'));
        
        // Add active class to clicked tab
        e.target.classList.add('active-tab');
        
        const grade = tab.getAttribute('data-grade');
        renderProducts(grade);
    });
});

// Event delegation for handling clicks on "View Contents" and "Add to Cart"
document.querySelector('.products-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('show-contents')) {
        const id = e.target.getAttribute('data-id');
        showBoxContents(id);
    }
});

// Initialize with default grade when page loads
document.addEventListener('DOMContentLoaded', () => {
    const defaultTab = document.querySelector('.tab[data-grade="4"]');
    if (defaultTab) {
        defaultTab.classList.add('active-tab');
        renderProducts("4");
    }
});
