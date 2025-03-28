// Fertilizer Products Data
 const fertilizerProducts = [
     { id: 401, name: "Vermicompost-1kg", originalPrice: 15399, price: 13349, img: "./assets/images/soil1.jpg",imgFlash:"./assets/images/flash.png" ,sold: "1088+ Sold in 30 days", description: "Organic vermicompost for healthy plant growth." },
     { id: 402, name: "Nutrient-rich potting soil mix-5", originalPrice: 26399, price: 24349, img: "./assets/images/soil2.jpg",imgFlash:"./assets/images/flash.png" , sold: "1088+ Sold in 30 days", description: "Premium potting mix with essential nutrients." },
     { id: 403, name: "Plant O Boost (Special flower Booster,10g)", originalPrice: 7024, price: 5349, img: "./assets/images/soil3.jpg",imgFlash:"./assets/images/flash.png" , sold: "1088+ Sold in 30 days", description: "Special flower booster for vibrant blooms." },
     { id: 404, name: "Coco Peat Block-4 kg (Expands Upto 60-70L)", originalPrice: 15399, price: 13349, img: "./assets/images/soil4.jpg",imgFlash:"./assets/images/flash.png" , sold: "1088+ Sold in 30 days", description: "Excellent water retention coco peat." },
     { id: 405, name: "Neem Cake-1kg(Set of 2)", originalPrice: 7399, price: 5349, img: "./assets/images/soil5.jpg",imgFlash:"./assets/images/flash.png" , sold: "1088+ Sold in 30 days", description: "Natural pest control with neem cake." },
     { id: 406, name: "Perlite-500 g", originalPrice: 5399, price: 4349, img: "./assets/images/fert5.avif",imgFlash:"./assets/images/flash.png" , sold: "1088+ Sold in 30 days", description: "Improves soil aeration and drainage." }
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
        ? fertilizerProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : fertilizerProducts;

    container.innerHTML = filteredProducts.map(product => `
        <div class="item">
            <div class="image-container">
                <img src="${product.img}" alt="${product.name}" class="product-image">
                <img src="./assets/images/hoverimg.jpg" alt="${product.name} Hover" class="hover-image">
            </div>
            <div class="descriptionContainer">
                <div class="description">
                    <p>${product.name}</p>
                    <p class="price">
                        <span class="original-price">Original Price: ₹${product.originalPrice.toLocaleString("en-IN")}</span>
                        <span class="offer-price">Offer Price: ₹${product.price.toLocaleString("en-IN")}</span>
                    </p>
                    <img src="${product.imgFlash}" class="product-flash">
                    <h3>${product.sold}</h3>
                </div>
                <div class="cart-section">
                    <button class="add-to-cart" onclick="openBuyNowModal(${product.id})">Add To Cart</button>
                </div>
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
        ? fertilizerProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : fertilizerProducts;

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
    return fertilizerProducts.find(product => product.id === id) || null;
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
                    <p class="product-name">${product.name}</p>
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
                        <p>₹${item.price.toLocaleString("en-IN")}</p>
                        <div class="qty-box">
                            <button onclick="updateCartItem(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartItem(${item.id}, 1)">+</button>
                        </div>
                        <p>Subtotal: ₹${subtotal.toLocaleString("en-IN")}</p>
                    </div>
                </div>
            `;
        }).join('')}
        <div class="cart-total">
            <strong>Total: ₹${total.toLocaleString("en-IN")}</strong>
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

