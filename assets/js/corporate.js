// Corporate Products Data
const corporateProducts = [
    { id: 301, name: "Air Purifier Plants- Corporate Gifts(Set of 30)", originalPrice: 15399, price: 13349, img: "./assets/images/gift1.jpg", description: "Premium air purifying plants for office spaces." },
    { id: 302, name: "Aglaonema Lipstick Plant- Corporate Gifts(Set of 30)", originalPrice: 26399, price: 24349, img: "./assets/images/gift2.jpg", description: "Beautiful low-maintenance plants for corporate gifting." },
    { id: 303, name: "Pleasant Vinca Seeds- Garden Kit(Set of 30)", originalPrice: 7024, price: 5349, img: "./assets/images/gift3.webp", description: "Colorful flowering seeds for corporate gifts." },
    { id: 304, name: "Sansevieria Plant- Corporate Gifts(Set of 30)", originalPrice: 15399, price: 13349, img: "./assets/images/gift4.jpg", description: "Hardy snake plants perfect for office environments." },
    { id: 305, name: "Flowering Seed Balls- Corporate Gifts(Set of 30)", originalPrice: 7399, price: 5349, img: "./assets/images/gift5.jpg", description: "Eco-friendly seed balls for corporate gifting." },
    { id: 306, name: "Lucky Bamboo Sticks- Corporate Gifts(Set of 30)", originalPrice: 5399, price: 4349, img: "./assets/images/gift6.jpg", description: "Symbolic lucky bamboo arrangements for offices." }
];

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// ===== CART MANAGEMENT ===== //
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = Object.values(cart).reduce((sum, item) => sum + (item.quantity || 0), 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

// ===== PRODUCT RENDERING ===== //
function renderProducts() {
    const container = document.getElementById('productList');
    if (!container) return;

    container.innerHTML = corporateProducts.map(product => `
        <div class="item">
            <img src="${product.img}" alt="${product.name}">
            <div class="description">
                <p>${product.name}</p>
                <p class="price">
                    <span class="original-price">Original Price: ₹${product.originalPrice}</span>
                    <span class="offer-price">Offer Price: ₹${product.price}</span>
                </p>
            </div>
            <div class="cart-section">
                <button class="add-to-cart" onclick="openBuyNowModal(${product.id})">Add To Cart</button>
            </div>
        </div>
    `).join('');
}

// ===== MODAL FUNCTIONS ===== //
function openBuyNowModal(id) {
    const product = corporateProducts.find(p => p.id === id);
    if (!product) return;

    const modalContent = document.getElementById('buyNowContent');
    modalContent.innerHTML = `
        <div class="product-description-header">
            <h2>Product Description</h2>
            <button onclick="closeModal('buyNowModal')">X</button>
        </div>
        <div class="productDescription">
            <div class="modal-flex">
                <img src="${product.img}" alt="${product.name}">
                <div>
                    <p class="product-name">${product.name}</p>
                    <div class="qty-box">
                        <span>Qty:</span>
                        <button onclick="changeQuantity(${id}, -1)">-</button>
                        <span id="buyNow-quantity-${id}">1</span>
                        <button onclick="changeQuantity(${id}, 1)">+</button>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${id})">Add to Cart</button>
                    <button onclick="closeModal('buyNowModal')">Cancel</button>
                </div>
            </div>
        </div>
    `;
    openModal('buyNowModal');
}

function changeQuantity(id, delta) {
    const quantityElement = document.getElementById(`buyNow-quantity-${id}`);
    if (!quantityElement) return;
    
    let newQty = parseInt(quantityElement.textContent) + delta;
    if (newQty < 1) newQty = 1;
    quantityElement.textContent = newQty;
}

// ===== CART OPERATIONS ===== //
function addToCart(id) {
    const product = corporateProducts.find(p => p.id === id);
    if (!product) return;

    const quantity = parseInt(document.getElementById(`buyNow-quantity-${id}`).textContent);
    
    if (cart[id]) {
        cart[id].quantity += quantity;
    } else {
        cart[id] = {
            ...product,
            quantity: quantity
        };
    }

    saveCart();
    closeModal('buyNowModal');
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${product.name} added to cart!`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

function renderCart() {
    const cartContent = document.getElementById('cartContent');
    let total = 0;

    if (Object.keys(cart).length === 0) {
        cartContent.innerHTML = `
            <h1>No items in cart</h1>
            <button onclick="closeModal('cartModal')">Continue Shopping</button>
        `;
        return;
    }

    cartContent.innerHTML = `
        <h2>Your Cart</h2>
        ${Object.values(cart).map(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            return `
                <div class="border-box">
                    <img src="${item.img}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>₹${item.price}</p>
                        <div class="qty-box">
                            <button onclick="updateCartItem(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartItem(${item.id}, 1)">+</button>
                        </div>
                        <p>Subtotal: ₹${subtotal}</p>
                    </div>
                </div>
            `;
        }).join('')}
        <div class="cart-total">
            <strong>Total: ₹${total}</strong>
        </div>
        <button onclick="openModal('checkoutModal')">Proceed to Checkout</button>
    `;
}

function updateCartItem(id, change) {
    if (!cart[id]) return;
    
    cart[id].quantity += change;
    
    if (cart[id].quantity <= 0) {
        delete cart[id];
    }
    
    saveCart();
    renderCart();
}

// ===== SEARCH FUNCTIONALITY ===== //
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchMessage = document.createElement('div');
    searchMessage.className = 'search-message';
    searchMessage.style.display = 'none';
    searchInput.parentNode.appendChild(searchMessage);

    searchInput.addEventListener('input', function(e) {
        const term = e.target.value.trim().toLowerCase();
        const productList = document.getElementById('productList');
        
        // Hide message initially
        searchMessage.style.display = 'none';
        searchMessage.textContent = '';
        
        if (term === '') {
            renderProducts();
            return;
        }
        
        const filtered = corporateProducts.filter(p => 
            p.name.toLowerCase().includes(term)
        );
        
        if (filtered.length === 0) {
            productList.innerHTML = '';
            searchMessage.textContent = 'No products found';
            searchMessage.style.display = 'block';
        } else {
            productList.innerHTML = filtered.map(product => `
                <div class="item">
                    <img src="${product.img}" alt="${product.name}">
                    <div class="description">
                        <p>${product.name}</p>
                        <p class="price">
                            <span class="original-price">Original Price: ₹${product.originalPrice}</span>
                            <span class="offer-price">Offer Price: ₹${product.price}</span>
                        </p>
                    </div>
                    <div class="cart-section">
                        <button class="add-to-cart" onclick="openBuyNowModal(${product.id})">Add To Cart</button>
                    </div>
                </div>
            `).join('');
        }
    });
}

// ===== UTILITY FUNCTIONS ===== //
function openModal(id) {
    document.getElementById(id).style.display = 'block';
    if (id === 'cartModal') renderCart();
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function closeAllModals() {
    document.querySelectorAll('.modalOverlay').forEach(modal => {
        modal.style.display = 'none';
    });
}

function placeOrder() {
    cart = {};
    saveCart();
    closeModal('checkoutModal');
    openModal('orderSuccessModal');
}

// ===== INITIALIZATION ===== //
document.addEventListener('DOMContentLoaded', function() {
    // Initialize product listing
    renderProducts();
    
    // Initialize cart count
    updateCartCount();
    
    // Setup search functionality
    setupSearch();
});


