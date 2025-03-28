/**
 * CART MANAGEMENT SYSTEM
 * Handles all cart operations including:
 * - Displaying cart items
 * - Quantity adjustments
 * - Checkout process
 * - LocalStorage synchronization
 * - Enhanced form validation
 */

document.addEventListener('DOMContentLoaded', initCart);

function initCart() {
    // Initialize cart from localStorage or empty object
    let cart = loadCart();
    
    // Set up initial display
    displayCart(cart);
    
    // Set up event listeners
    setupEventDelegation(cart);
    
    // Initialize form validation
    initFormValidation();
}

function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || {};
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function setupEventDelegation(cart) {
    document.addEventListener('click', (event) => {
        handleCartEvents(event, cart);
    });
}

function handleCartEvents(event, cart) {
    if (event.target.classList.contains('increase-btn')) {
        const id = parseInt(event.target.dataset.id);
        adjustQuantity(cart, id, 1);
    } 
    else if (event.target.classList.contains('decrease-btn')) {
        const id = parseInt(event.target.dataset.id);
        adjustQuantity(cart, id, -1);
    }
    else if (event.target.id === 'checkout-btn') {
        proceedToCheckout(cart);
    }
}

function adjustQuantity(cart, id, change) {
    if (!cart[id]) return;
    
    cart[id].quantity += change;
    
    if (cart[id].quantity <= 0) {
        delete cart[id];
    }
    
    saveCart(cart);
    updateCartCount(cart);
    displayCart(cart);
}

function displayCart(cart) {
    const cartContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (!cartContainer) return;
    
    cartContainer.innerHTML = Object.keys(cart).length === 0 
        ? renderEmptyCart() 
        : renderCartItems(cart);
    
    updateCartTotal(cart, cartTotalElement);
}

function renderEmptyCart() {
    return `
        <div class="empty-cart">
            <h2>Your cart is empty</h2>
            <a href="accessories.html" class="back-to-shopping">Continue Shopping</a>
        </div>
    `;
}

function renderCartItems(cart) {
    let total = 0;
    let itemsHTML = '';
    
    Object.values(cart).forEach(item => {
        if (!item || !item.price || !item.quantity) return;
        
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);
        const subtotal = price * quantity;
        total += subtotal;
        
        itemsHTML += `
            <div class="cart-item">
                <img src="${item.img || ''}" alt="${item.name || 'Product'}">
                <div class="item-details">
                    <h3>${item.name || 'Unknown Product'}</h3>
                    <p>₹${price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease-btn" data-id="${item.id}">−</button>
                        <span class="quantity">${quantity}</span>
                        <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                    </div>
                    <p class="item-total">₹${subtotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    });
    
    itemsHTML += `
        <div class="cart-summary">
            <div class="cart-actions">
                <a href="accessories.html" class="back-to-shopping">← Continue Shopping</a>
            </div>
        </div>
    `;
    
    return itemsHTML;
}

function updateCartTotal(cart, totalElement) {
    if (!totalElement) return;
    
    const total = Object.values(cart).reduce((sum, item) => {
        return sum + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);
    
    totalElement.textContent = `₹${total.toFixed(2)}`;
}

function updateCartCount(cart) {
    const count = Object.values(cart).reduce((sum, item) => sum + (item.quantity || 0), 0);
    document.querySelectorAll('#cart-count').forEach(element => {
        element.textContent = count;
    });
}

function proceedToCheckout() {
    const cart = loadCart();
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty. Please add items before checkout.');
        return;
    }
    
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'flex';
}

function initFormValidation() {
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;
    
    // Add input event listeners for real-time validation
    const formInputs = checkoutForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateCheckoutForm()) {
            processOrder();
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    field.style.borderColor = '#ddd';
    const existingError = field.nextElementSibling;
    if (existingError && existingError.classList.contains('cart-error-message')) {
        existingError.remove();
    }
    
    // Validate based on field type
    switch(field.id) {
        case 'full-name':
            isValid = /^[a-zA-Z ]{3,}$/.test(value);
            errorMessage = isValid ? '' : 'Name must be at least 3 letters (letters and spaces only)';
            break;
            
        case 'address':
            isValid = value.length >= 10;
            errorMessage = isValid ? '' : 'Address must be at least 10 characters';
            break;
            
        case 'city':
            isValid = /^[a-zA-Z ]{2,}$/.test(value);
            errorMessage = isValid ? '' : 'Please enter a valid city name (letters only)';
            break;
            
        case 'state':
            isValid = /^[a-zA-Z ]{2,}$/.test(value);
            errorMessage = isValid ? '' : 'Please enter a valid state name (letters only)';
            break;
            
        case 'country':
            isValid = /^[a-zA-Z ]{2,}$/.test(value);
            errorMessage = isValid ? '' : 'Please enter a valid country name (letters only)';
            break;
            
        case 'pincode':
            isValid = /^[6][0-9]{5}$/.test(value);
            errorMessage = isValid ? '' : 'Please enter a valid 6-digit pincode starting with 6';
            break;
            
        case 'phone':
            isValid = /^[789][0-9]{9}$/.test(value);
            errorMessage = isValid ? '' : 'Please enter a valid 10-digit phone number starting with 7, 8 or 9';
            break;
            
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            errorMessage = isValid ? '' : 'Please enter a valid email address';
            break;
            
        default:
            // For other fields, just check if not empty
            isValid = value !== '';
            errorMessage = isValid ? '' : 'This field is required';
    }
    
    // Show error if invalid
    if (!isValid) {
        field.style.borderColor = '#f44336';
        if (errorMessage) {
            const errorElement = document.createElement('span');
            errorElement.className = 'cart-error-message';
            errorElement.textContent = errorMessage;
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
    }
    
    return isValid;
}

function validateCheckoutForm() {
    const requiredFields = [
        'full-name', 'address', 'city', 
        'state', 'country', 'pincode', 
        'phone', 'email'
    ];
    
    let isFormValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const isValid = validateField(field);
        if (!isValid) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

function processOrder() {
    // Close checkout modal
    document.getElementById('checkout-modal').style.display = 'none';
    
    // Clear the cart
    localStorage.removeItem('cart');
    
    // Show success modal
    document.getElementById('success-modal').style.display = 'flex';
    
    // Update cart display
    displayCart({});
    updateCartCount({});
}

function closeSuccessModal() {
    document.getElementById('success-modal').style.display = 'none';
    window.location.href = 'accessories.html'; 
}