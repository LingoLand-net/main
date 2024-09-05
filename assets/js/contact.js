const buttons = document.querySelectorAll(".question-btn");
console.log(buttons);

const toggleAnswer = function clickEvent(e) {
	const questionBoxElement = e.currentTarget.parentElement.parentElement;
	console.log(questionBoxElement.classList.toggle('show'));
};

buttons.forEach((button) => {
	button.addEventListener("click", toggleAnswer);
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbzoyrA_EWaF-LEpaLBEU3Yb12ETCVqSB8QX4jpSSJKlItsz2FMxkn0zdPRKP7kZm8jP/exec';

$(document).ready(function () {
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();

        Swal.fire({
            icon: 'info',
            title: 'Please wait...',
            text: 'Sending your message',
            willOpen: () => {
                Swal.showLoading();
            },
            showConfirmButton: false,
            allowOutsideClick: false,
            background: "#00ACA8"
        });

        const formData = new FormData(this);

        $.ajax({
            url: scriptURL,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log("Response from Google Sheets:", data);

                if (data.result === 'success') {
                    Swal.fire({
                        imageUrl: "assets/img/Lingoland_logo.png",
                        imageAlt: "Custom Success Icon",
                        title: 'Success!',
                        text: 'Your message is sent. Thank you for reaching out.',
                        width: 600,
                        padding: "3em",
                        timer: 5000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        color: "#000",
                        background: "#00ACA8",
                        backdrop: "rgba(0,0,0,0.4)",
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    console.error('Error:', data.error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Please try again later.',
                    });
                }
            },
            error: function (error) {
                console.error('Error!', error);
                Swal.fire({
                        imageUrl: "assets/img/Lingoland_logo.png",
                        imageAlt: "Custom Success Icon",
                        title: 'Success!',
                        text: 'Your message is sent. Thank you for reaching out.',
                        width: 600,
                        padding: "3em",
                        timer: 5000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        color: "#000",
                        background: "#00ACA8",
                        backdrop: "rgba(0,0,0,0.4)",
                    }).then(() => {
                        window.location.reload();
                    });
            }
        });
    });
});