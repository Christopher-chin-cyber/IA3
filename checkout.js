// Load cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const TAX_RATE = 0.15;
const DISCOUNT_RATE = 0.10;

// Rendering cart summary in checkout
function renderSummary() {
    const summaryItemsContainer = document.getElementById("summary-items");
    const totalAmountElement = document.getElementById("total-amount");
    summaryItemsContainer.innerHTML = "";

    let totalAmount = 0;

    cart.forEach(item => {
        const subTotal = item.price * item.quantity;
        const discount = subTotal * DISCOUNT_RATE;
        const tax = (subTotal - discount) * TAX_RATE;
        const total = subTotal - discount + tax;
        totalAmount += total;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${total.toFixed(2)}</td>
        `;
        summaryItemsContainer.appendChild(row);
    });

    totalAmountElement.innerText = totalAmount.toFixed(2);
}

// Event listener for Cancel button
document.getElementById("cancel-btn").addEventListener("click", () => {
    window.location.href = "cart.html";  // Redirect back to the cart page
});




// --- Function to validate a single input field for Shipping Details ---
function validateField(id, message) {

    const input = document.getElementById(id);
    const shippingError = document.getElementById("shipping-error");

    // Check if the input is empty
    if (input.value.trim() === "") {
        shippingError.innerText = message;      // Show the error text
        return false; // Field invalid
    } 
    // If field is filled in
    else {
        shippingError.innerText = "";     // Clear the error
        return true; // Field valid
    }
}

// --- Real-time input validation listeners ---
["name", "address", "amount-paid"].forEach(id => {

    // Add input listener to each field
    document.getElementById(id).addEventListener("input", () => {

        // Switch to apply the correct message per field
        if (id === "name") 
            validateField("name", "Full name is required.");

        if (id === "address") 
            validateField("address", "Shipping address is required.");

        if (id === "amount-paid") 
            validateField("amount-paid", "Amount paid is required.");
    });
});

// --- Confirm button validation ---
document.getElementById("confirm-btn").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate all required fields
    const validName = validateField("name", "Full name is required.");
    const validAddress = validateField("address", "Shipping address is required.");
    const validAmount = validateField("amount-paid", "Amount paid is required.");

    // Won't progress with order is these fields are left empty
    if (!validName || !validAddress || !validAmount) {
        alert("Purchase not confirmed. Please fill in all shipping details.");
        return;
    }

    // If everything is valid this will be the prompt
    alert("Checkout confirmed. Check your email for the invoice.");
    window.location.href = "products.html"; // Redirect user
});


// Render of cart summary
window.onload = renderSummary;