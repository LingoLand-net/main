
document.addEventListener('DOMContentLoaded', function () {
    // Function to hide sign-up and login forms
    function hideForms() {
        document.getElementById('loginForm').style.display = 'none';
    }
    // Function to hide login form
    function ShowLogin() {
        document.getElementById('loginForm').style.display = 'block';
    }
    // Function to show dashboard
    function showDashboard() {
        document.getElementById('dashboard').style.display = 'block';
    }

    var google = 'https://script.google.com/macros/s/AKfycbwVHmvvLlfpVXbGHDxTNGKCJbcha7XvITiBKE32jEqtCTx4Y71n-V227hRcfJxUL9oz0Q/exec';

    // Login button click event
    document.getElementById('loginButton').addEventListener('click', function (event) {
        event.preventDefault();
        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;

        // Regular expression for email validation
        var emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                title:'Wrong email format',
                showConfirmButton: false,
                allowOutsideClick: true,
            });
            return;
        }

        // Regular expression for password validation
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            Swal.fire({
                title:'Wrong Password format',
                showConfirmButton: false,
                allowOutsideClick: true,
            });
            return;
        }

        Swal.fire({
            icon: 'info',
            title: 'Please wait...',
            text: 'Logging you in',
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        fetch(google, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'action=checkCredentials&email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password)
        })
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok.');
            })
            .then(function (data) {
                if (data.trim() === "Success") {
                    hideForms();
                    showDashboard();
                    Swal.fire({
                        icon:'Success!',
                        title: 'You have successfully logged in.',
                        text: 'success',
                        showConfirmButton: false,
                        allowOutsideClick: true,
                    });
                    showDashboard(); // Show dashboard upon successful login
                    hideForms();
                } else {
                    Swal.fire(
                        'Error!',
                        'Incorrect email or password. Please try again.',
                        'error'
                    );
                }
            })
            .catch(function (error) {
                console.error(error);
                Swal.fire(
                    'Error!',
                    'An error occurred while logging in. Please try again later.',
                    'error'
                );
            });
    });
});