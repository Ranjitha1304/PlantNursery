const categories = {
    basic: [
        { id: 1, name: "Basic Plant Pot", originalPrice: 99, price: 49, img: "./assets/images/basic1.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
        { id: 2, name: "Basic Plant Pot", originalPrice: 99, price: 149, img: "./assets/images/basic2.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
        { id: 3, name: "Basic Plant Pot", originalPrice: 99, price: 159, img: "./assets/images/basic3.webp", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." }
    ],
    ceramic: [
        { id: 4, name: "Ceramic Plant Pot", originalPrice: 99, price: 99, img: "./assets/images/ceramic1.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
        { id: 5, name: "Ceramic Plant Pot", originalPrice: 99, price: 199, img: "./assets/images/ceramic2.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
        { id: 6, name: "Ceramic Plant Pot", originalPrice: 99, price: 199, img: "./assets/images/ceramic3.avif", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." }

    ],
    designer: [
        { id: 7, name: "Designer Plant Pot", originalPrice: 99, price: 249, img: "./assets/images/design1.webp", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
        { id: 8, name: "Designer Plant Pot", originalPrice: 99, price: 299, img: "./assets/images/design2.webp", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
        { id: 9, name: "Designer Plant Pot", originalPrice: 99, price: 299, img: "./assets/images/design3.webp", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." }


    ],
    metal: [
        { id: 10, name: "Metal Plant Pot", originalPrice: 99, price: 349, img: "./assets/images/metal1.webp", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
        { id: 11, name: "Metal Plant Pot", originalPrice: 99, price: 399, img: "./assets/images/metal2.webp", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
        { id: 12, name: "Metal Plant Pot", originalPrice: 99, price: 399, img: "./assets/images/metal3.webp", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." }

    ],
    potStand: [
        { id: 13, name: "Pot Stand", originalPrice: 99, price: 449, img: "./assets/images/stand1.webp", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
        { id: 14, name: "Pot Stand", originalPrice: 99, price: 499, img: "./assets/images/stand2.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
        { id: 15, name: "Pot Stand", originalPrice: 99, price: 499, img: "./assets/images/stand3.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." }

    ]
};

let cart = {};


function renderProducts(category, elementId) {
    const container = document.getElementById(elementId);
    categories[category].forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <h4>Original Price: ₹${product.originalPrice}</h4>
            <h2>Offer Price: ₹${product.price}</h2>
            <button onclick="openBuyNowModal(${product.id})">Buy Now</button>
        `;
        container.appendChild(productDiv);
    });
}


function findProductById(id) {
    for (let category in categories) {
        const product = categories[category].find(p => p.id === id);
        if (product) return product;
    }
    return null;
}




function openBuyNowModal(id) {
    // const product = products.find(p => p.id === id);
    const product = findProductById(id);
    if (!product) return;




    let quantity = cart[id] ? cart[id].quantity : 1; // Ensure correct quantity
    const modalContent = document.getElementById("buyNowContent");

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
                    <button onclick="updateQuantity(${id}, -1)">-</button>
                    
                    
                    
                    <span id="quantity-${id}">${quantity}</span>

                    <button onclick="updateQuantity(${id}, 1)">+</button>
                </div>
                <p class="product-description">${product.description}</p>
                <button onclick="addToCart(${id})">Add to Cart</button>
                <button onclick="closeModal('buyNowModal')">Cancel</button>
            </div>
        </div>
        </div>
    `;
    openModal("buyNowModal");
}

// function updateQuantity(id, change) {
//     if (!cart[id]) cart[id] = { quantity: 1 };
//     cart[id].quantity = Math.max(1, cart[id].quantity + change);
//     document.getElementById(`quantity-${id}`).innerText = cart[id].quantity;
//     renderCart();
// }

function updateQuantity(id, change) {
    if (!cart[id]) {
        cart[id] = { quantity: 1 };
    }

    cart[id].quantity += change;

    // If quantity becomes 0 or less, remove the item
    if (cart[id].quantity <= 0) {
        delete cart[id]; // Remove the product from the cart
    } else {
        document.getElementById(`quantity-${id}`).innerText = cart[id].quantity;
    }

    renderCart(); // Update the cart UI
}



// function addToCart(id) {
//     if (!cart[id]) cart[id] = { quantity: 1 };




function addToCart(id) {
    const product = findProductById(id);
    if (!product) return;

    if (!cart[id]) {
        cart[id] = { ...product, quantity: 1 }; // Store full product details
    } else {
        cart[id].quantity += 1;
    }


    renderCart();
    closeModal('buyNowModal');
    openModal('cartModal');
}


function renderCart() {
    const cartContent = document.getElementById("cartContent");
    let total = 0;


    if (Object.keys(cart).length === 0) {
        cartContent.innerHTML = `
        <h1>No items are added in cart!!</h1>
        <h2>Please Go back and Add Some Products!!!<h2>
         <button onclick="closeModal('cartModal')">Close</button>
        `;
        document.getElementById("checkoutTotal").innerText = "0";
        return;
    }


    cartContent.innerHTML = `<h2>Added to Cart</h2>` +
        Object.entries(cart).map(([id, item]) => {
            // const product = products.find(p => p.id == id);
            const product = findProductById(Number(id));
            if (!product) return '';

            const subtotal = item.quantity * product.price;
            total += subtotal;
            return `
                <div class="border-box">
                    <img src="${product.img}" alt="${product.name}">
                    <div class="qty-box box1">
                        <span>Qty:</span>
                        <button onclick="updateQuantity(${id}, -1)">-</button>
                        <span id="quantity-${id}">${item.quantity}</span>
                        <button onclick="updateQuantity(${id}, 1)">+</button>
                    </div>
                    <div>
                        <p><strong>Price:</strong> ₹${product.price}</p>
                        <p><strong>Discount:</strong> ₹0</p>
                        <p><strong>Subtotal:</strong> ₹${subtotal}</p>
                    </div>
                </div>
            `;
        }).join('') + `
        <p><strong>Total:</strong> ₹<span id="cartTotal">${total}</span></p>
        <button onclick="openModal('checkoutModal')">Checkout</button>
        <button onclick="closeModal('cartModal')">Cancel</button>`;

    document.getElementById("checkoutTotal").innerText = total;
}




// function renderCart() {
//     const cartContent = document.getElementById("cartContent");
//     cartContent.innerHTML = `<h2>Cart</h2><p>Items will be displayed here...</p>`;
// }

function placeOrder() {
    cart = {}; // CLEAR CART AFTER PLACING ORDER
    renderCart();
    closeModal('checkoutModal');
    openModal('orderSuccessModal');
}

function openModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function closeAllModals() {
    document.querySelectorAll('.modalOverlay').forEach(modalOverlay => modalOverlay.style.display = 'none');
    renderCart(); // REFRESH CART AFTER ORDER SUCCESS

}



renderProducts('basic', 'productList');
renderProducts('ceramic', 'ceramicProductList');
renderProducts('designer', 'designerProductList');
renderProducts('metal', 'metalProductList');
renderProducts('potStand', 'potStandProductList');
