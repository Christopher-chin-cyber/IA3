const registerForm = document.getElementById('register');
const registerError = document.getElementById('register-error');
const cancelButton = document.getElementById('cancel');

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if password match
    if (password !== confirmPassword) {
        registerError.textContent = "Passwords do not match.";
        return;
    }

    // Check if age is over 18
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18 || (age === 18 && today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()))) {
        registerError.textContent = "You must be at least 18 years old to register.";
        return;
    }

    // Retrieve existing registrations from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('RegistrationData')) || [];

    // Check if username already exists
    const usernameExists = existingUsers.some(user => user.username === username);
    if (usernameExists) {
        registerError.textContent = "Username already registered.";
        return;
    }

    // Create new user object
    const newUser = {
        firstName,
        lastName,
        dob,
        gender,
        phone,
        email,
        username,
        password,
        dateOfRegistration: new Date().toISOString(),
        cart: {},
        shipdetails: []
    };

    // Add new user to the array and save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('RegistrationData', JSON.stringify(existingUsers));

    // Notify user of successful registration
    registerError.style.color = "red";
    registerError.textContent = "Registration successful! Redirecting to homepage within 3 seconds";

    // Redirect to index.html after 3 seconds
    setTimeout(() => {
        window.location.href = "index.html";
    }, 3000);
});

// Clear form data on Cancel button click
cancelButton.addEventListener('click', () => {
    registerForm.reset();
    registerError.textContent = "";
    registerError.style.color = "red";
});

