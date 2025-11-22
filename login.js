const loginForm = document.getElementById('PC-login-form');
const cancelButton = document.getElementById('cancel');
const errorMessage = document.getElementById('error-message');
let loginAttempts = 0;

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Retrieve registered users from localStorage
    const registrationData = JSON.parse(localStorage.getItem('RegistrationData')) || [];

    // Validate username and password
    const user = registrationData.find(user => user.username === username && user.password === password);

    if (user) {
        // Store username in sessionStorage for current session
        sessionStorage.setItem('username', username);

        // Successful login redirect to product catalog
        window.location.href = "products.html";
    } else {
        // If login fails
        loginAttempts++;
        errorMessage.textContent = `Invalid username or password. Attempt ${loginAttempts} of 3.`;

        // Redirect to error page if maximum attempts reach
        if (loginAttempts >= 3) {
            window.location.href = "error.html";
        }
    }
});

// Clear form on 'Cancel' button click
cancelButton.addEventListener('click', () => {
    loginForm.reset();
    errorMessage.textContent = ''; // Clear any error messages
});