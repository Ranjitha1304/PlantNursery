// Pots Products Data
const categories = {
    basic: [
        { id: 801, name: "Basic Plant Pot", originalPrice: 99, price: 49, img: "./assets/images/basic1.jpg", description: "Simple and affordable plant pot for all your gardening needs." },
        { id: 802, name: "Basic Plant Pot", originalPrice: 99, price: 149, img: "./assets/images/basic2.jpg", description: "Durable basic pot with good drainage." },
        { id: 803, name: "Basic Printed Pots", originalPrice: 99, price: 159, img: "./assets/images/basic3.webp", description: "Colorful printed designs to brighten your space." }
    ],
    ceramic: [
        { id: 804, name: "Printed Ceramic Planters", originalPrice: 99, price: 99, img: "./assets/images/ceramic1.jpg", description: "Elegant ceramic pots with beautiful patterns." },
        { id: 805, name: "Ceramic Plant Pot", originalPrice: 99, price: 199, img: "./assets/images/ceramic2.jpg", description: "High-quality ceramic with glossy finish." },
        { id: 806, name: "Ceramic Pot 5 Inch", originalPrice: 99, price: 199, img: "./assets/images/ceramic3.avif", description: "Perfect size for small plants and succulents." }
    ],
    designer: [
        { id: 807, name: "Designer Plant Pots", originalPrice: 99, price: 249, img: "./assets/images/design1.webp", description: "Unique designer pots for a stylish look." },
        { id: 808, name: "Golden Designer Pots", originalPrice: 99, price: 299, img: "./assets/images/design2.webp", description: "Luxurious gold-accented designer pots." },
        { id: 809, name: "Owl Designer Pot", originalPrice: 99, price: 299, img: "./assets/images/design3.webp", description: "Whimsical owl-shaped planter." }
    ],
    metal: [
        { id: 810, name: "Metal Plant Pot", originalPrice: 99, price: 349, img: "./assets/images/metal1.webp", description: "Durable metal pot with rustic charm." },
        { id: 811, name: "Rustic Gold Metal Planter", originalPrice: 99, price: 399, img: "./assets/images/metal2.webp", description: "Elegant gold-finished metal planter." },
        { id: 812, name: "Basic Metal Planter", originalPrice: 99, price: 399, img: "./assets/images/metal3.webp", description: "Simple yet stylish metal container." }
    ],
    potStand: [
        { id: 813, name: "Round Planter Stand", originalPrice: 99, price: 449, img: "./assets/images/stand1.webp", description: "Elevate your plants with this stand." },
        { id: 814, name: "Multiple Planter Stand", originalPrice: 99, price: 499, img: "./assets/images/stand2.jpg", description: "Display multiple plants together." },
        { id: 815, name: "Pot Stand", originalPrice: 99, price: 499, img: "./assets/images/stand3.jpg", description: "Sturdy stand for your favorite pots." }
    ]
};

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
function renderProducts(category, elementId, products = null) {
    const container = document.getElementById(elementId);
    if (!container) return;

    const itemsToRender = products || categories[category];
    
    // if (itemsToRender.length === 0) {
    //     container.innerHTML = "<div class='no-products'>No products found in this category</div>";
    //     return;
    // }

    container.innerHTML = itemsToRender.map(product => `
        <div class="item">
            <img src="${product.img}" alt="${product.name}" onerror="this.src='./assets/images/placeholder.jpg'">
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
    let hasResults = false;
    for (const category in categories) {
        const filtered = categories[category].filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (filtered.length > 0) hasResults = true;
    }

    if (searchTerm && !hasResults) {
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
    if (!searchTerm) {
        // If search is empty, show all products and headings
        Object.keys(categories).forEach(category => {
            document.getElementById(`${category}Heading`).style.display = 'block';
            document.getElementById(`${category}ProductList`).style.display = 'flex';
            renderProducts(category, `${category}ProductList`);
        });
        document.getElementById("noResultsMessage").style.display = "none";
        return;
    }
    let hasResults = false;
    for (const category in categories) {
        const filteredProducts = categories[category].filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
            const headingElement = document.getElementById(`${category}Heading`);
            const productListElement = document.getElementById(`${category}ProductList`);

            if (filteredProducts.length > 0) {
                hasResults = true;
                headingElement.style.display = 'block';
                productListElement.style.display = 'grid';
                renderProducts(category, `${category}ProductList`, filteredProducts);
            } else {
                headingElement.style.display = 'none';
                productListElement.style.display = 'none';
                productListElement.innerHTML = "";
            }
    }

    // Show no results message if nothing found
    document.getElementById("noResultsMessage").style.display = hasResults ? "none" : "block";
}

// ===== FILTER FUNCTIONS ===== //
function filterByCategory(category) {
    // Hide all product lists first
    document.querySelectorAll('.product-list').forEach(list => {
        list.style.display = 'none';
    });

    if (category === 'all') {
        // Show all categories
        document.querySelectorAll('.product-list').forEach(list => {
            list.style.display = 'grid';
        });
    } else {
        // Show selected category
        document.getElementById(`${category}ProductList`).style.display = 'grid';
    }
}

// ===== PRODUCT UTILITIES ===== //
function findProductById(id) {
    for (let category in categories) {
        const product = categories[category].find(p => p.id === id);
        if (product) return product;
    }
    return null;
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
                <img src="${product.img}" alt="${product.name}" onerror="this.src='./assets/images/placeholder.jpg'">
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
                    <img src="${item.img}" alt="${item.name}" onerror="this.src='./assets/images/placeholder.jpg'">
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
    // Initialize product listings for all categories
    Object.keys(categories).forEach(category => {
        renderProducts(category, `${category}ProductList`);
    });
    
    // Initialize cart count
    updateCartCount();
    
    // Search functionality
    document.getElementById('searchBox')?.addEventListener('input', function(e) {
        handleSearch(e);
    });

    // Category filter buttons
    document.querySelectorAll('.category-filter').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
});


