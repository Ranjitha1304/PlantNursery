// Indoor Plants Products Data
const indoorPlants = [
    { id: 601, name: "Indoor Snake Plant", originalPrice: 399, price: 349, img: "./assets/images/indoor1.jpg", description: "Hardy indoor plant that purifies air and requires minimal care." },
    { id: 602, name: "Lucky Money Plant", originalPrice: 799, price: 649, img: "./assets/images/indoor2.jpg", description: "Believed to bring good luck and prosperity to your home." },
    { id: 603, name: "Pink Syngonium Plant", originalPrice: 399, price: 349, img: "./assets/images/indoor3.jpg", description: "Beautiful pink foliage perfect for brightening indoor spaces." },
    { id: 604, name: "Rubber Plant", originalPrice: 399, price: 249, img: "./assets/images/indoor4.jpg", description: "Low-maintenance plant with large, glossy leaves." },
    { id: 605, name: "Birkin Plant", originalPrice: 299, price: 249, img: "./assets/images/indoor5.jpg", description: "Striking variegated leaves make this a stunning indoor plant." },
    { id: 606, name: "Schefferola Plant", originalPrice: 399, price: 349, img: "./assets/images/indoor6.jpg", description: "Tropical plant that thrives in indoor conditions." },
    { id: 607, name: "Aglaonema Green Plant", originalPrice: 199, price: 79, img: "./assets/images/indoor7.jpg", description: "Easy-to-grow plant with beautiful green foliage." },
    { id: 608, name: "Jade Succulent Plant", originalPrice: 399, price: 249, img: "./assets/images/indoor8.jpg", description: "Symbol of good luck and requires minimal watering." },
    { id: 609, name: "Optunla Cactus Plant", originalPrice: 399, price: 249, img: "./assets/images/indoor9.jpg", description: "Perfect for sunny spots and requires little maintenance." }
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
        ? indoorPlants.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : indoorPlants;

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
        ? indoorPlants.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : indoorPlants;

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
    return indoorPlants.find(product => product.id === id) || null;
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
    
    // Search functionality - now works on input
    document.getElementById('searchBox')?.addEventListener('input', function(e) {
        handleSearch(e);
    });
});






