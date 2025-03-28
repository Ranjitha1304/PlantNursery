// Outdoor Plants Products Data
const outdoorPlants = [
    { id: 701, name: "All Color Rose Plant", originalPrice: 399, price: 349, img: "./assets/images/outdoor1.jpg", description: "Beautiful roses in various colors for your garden." },
    { id: 702, name: "Zinnia/White Plant", originalPrice: 799, price: 649, img: "./assets/images/outdoor2.jpg", description: "Bright white zinnias that bloom throughout the season." },
    { id: 703, name: "Kalanchoe/Pink Plant", originalPrice: 399, price: 349, img: "./assets/images/outdoor3.jpg", description: "Vibrant pink flowering plant perfect for outdoor spaces." },
    { id: 704, name: "Sampangi Plant", originalPrice: 399, price: 249, img: "./assets/images/outdoor4.jpg", description: "Fragrant flowering plant ideal for gardens." },
    { id: 705, name: "Vethala Plant", originalPrice: 299, price: 249, img: "./assets/images/outdoor5.jpg", description: "Hardy outdoor plant with medicinal properties." },
    { id: 706, name: "Hibiscus Plant", originalPrice: 399, price: 349, img: "./assets/images/outdoor6.jpg", description: "Tropical flowering plant that thrives outdoors." },
    { id: 707, name: "Marigold Plant", originalPrice: 199, price: 79, img: "./assets/images/outdoor7.jpg", description: "Bright orange flowers that bloom profusely." },
    { id: 708, name: "Aloe vera Plant", originalPrice: 399, price: 249, img: "./assets/images/outdoor8.jpg", description: "Drought-resistant succulent with healing properties." },
    { id: 709, name: "Kanagambaram Plant", originalPrice: 399, price: 249, img: "./assets/images/outdoor9.jpg", description: "Traditional flowering plant with cultural significance." }
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
function renderProducts(elementId, searchTerm = "") {
    const container = document.getElementById(elementId);
    if (!container) return;

    const filteredProducts = searchTerm 
        ? outdoorPlants.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : outdoorPlants;

    container.innerHTML = filteredProducts.map(product => `
        <div class="item">
            <img src="${product.img}" alt="${product.name}">
            <div class="description">
                <h2>${product.name}</h2>
                <p class="price">
                    <h4 class="original-price">Original Price: ₹${product.originalPrice}</h4>
                    <h2 class="offer-price">Offer Price: ₹${product.price}</h2>
                </p>
            </div>
            <div class="cart-section">
                <button class="add-to-cart" onclick="openBuyNowModal(${product.id})">Add To Cart</button>
            </div>
        </div>
    `).join('');
}

// ===== SEARCH FUNCTIONALITY ===== //
function handleSearch(event) {
    const searchTerm = event.target.value.trim();
    const searchContainer = event.target.closest('.search');
    let noResultsMsg = searchContainer.querySelector('.no-results-message');

    // Search products as user types
    searchProducts(searchTerm);
    
    // Show/hide "No results found" message
    const filteredProducts = searchTerm 
        ? outdoorPlants.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : outdoorPlants;

    if (searchTerm && filteredProducts.length === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.textContent = 'No results found';
            searchContainer.appendChild(noResultsMsg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

function searchProducts(searchTerm = "") {
    renderProducts("productList", searchTerm);
}

// ===== PRODUCT UTILITIES ===== //
function findProductById(id) {
    return outdoorPlants.find(product => product.id === id) || null;
}

// ===== MODAL FUNCTIONS ===== //
function openBuyNowModal(id) {
    const product = findProductById(id);
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
                    <h2 class="product-name">${product.name}</h2>
                    <div class="qty-box">
                        <span>Qty:</span>
                        <button onclick="changeQuantity(${id}, -1)">-</button>
                        <span id="buyNow-quantity-${id}">1</span>
                        <button onclick="changeQuantity(${id}, 1)">+</button>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${id})">Add to Cart</button>
                    <button class="productClose" onclick="closeModal('buyNowModal')">Cancel</button>
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
    const product = findProductById(id);
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
    renderProducts('productList');
    
    // Initialize cart count
    updateCartCount();
    
    // Search functionality - now works on input (no need for Enter)
    document.getElementById('searchBox')?.addEventListener('input', function(e) {
        handleSearch(e);
    });
});



