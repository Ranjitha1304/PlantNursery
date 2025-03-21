const products = [
    { id: 1, name: "Indoor Snake Plant", originalPrice: 399, price: 349, img: "./assets/images/indoor1.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
    { id: 2, name: "Lucky Money Plant", originalPrice: 799, price: 649, img: "/assets/images/indoor2.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
    { id: 3, name: "Pink Syngonium Plant", originalPrice: 399, price: 349, img: "/assets/images/indoor3.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
    { id: 4, name: "Rubber Plant", originalPrice: 399, price: 249, img: "/assets/images/indoor4.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
    { id: 5, name: "Birkin Plant", originalPrice: 299, price: 249, img: "/assets/images/indoor5.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
    { id: 6, name: "Schefferola Plant", originalPrice: 399, price: 349, img: "/assets/images/indoor6.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
    { id: 7, name: "Aglaonema Green Plant", originalPrice: 199, price: 79, img: "/assets/images/indoor7.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
    { id: 8, name: "Jade Succulent Plant", originalPrice: 399, price: 249, img: "/assets/images/indoor8.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." },
    { id: 9, name: "Optunla Cactus Plant", originalPrice: 399, price: 249, img: "/assets/images/indoor9.jpg", description: "A Flower pot, Planterette, or Plant Pot, is a container in which flowers and other plants are cultivated and displayed." }

];

let cart = {};


function renderProducts(elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = ""; // Clear previous content
    products.forEach(product => {
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
    return products.find(product => product.id === id) || null;
}

function openBuyNowModal(id) {
    const product = findProductById(id);
    if (!product) return;

    let quantity = 1; // Start with 1 before adding to cart

    // let quantity = cart[id] ? cart[id].quantity : 1;
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
                        <button onclick="updateQuantity(${id}, -1, false)">-</button>
                        <span id="buyNow-quantity-${id}">${quantity}</span>
                        <button onclick="updateQuantity(${id}, 1, false)">+</button>
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

function updateQuantity(id, change, fromCart = false) {
  
    if (fromCart) {
        // Update the cart object if the item is already added to the cart
        if (!cart[id]) return;

        let newQuantity = cart[id].quantity + change;

        if (newQuantity < 1) {
            delete cart[id]; // Remove product from cart if qty becomes 0
        } else {
            cart[id].quantity = newQuantity; // Update cart quantity
        }

        renderCart(); // Re-render cart to update UI

    } else {
        // Update quantity in Buy Now Modal before adding to cart
        let quantityElement = document.getElementById(`buyNow-quantity-${id}`);
        if (!quantityElement) return;

        let newQuantity = parseInt(quantityElement.innerText) + change;
        if (newQuantity < 1) newQuantity = 1; // Prevent zero or negative quantity

        quantityElement.innerText = newQuantity; // Update UI
    }






    // if (fromCart) {
    //     // Update the cart object if the item is already added to the cart
    //     if (!cart[id]) return;

    //     let newQuantity = cart[id].quantity + change;
    //     if (newQuantity < 1) newQuantity = 1; // Prevent zero or negative quantity

    //     cart[id].quantity = newQuantity; // Update cart quantity
    //     renderCart(); // Re-render cart to update the UI

    // } else {
    //     // Update quantity in Buy Now Modal before adding to cart
    //     let quantityElement = document.getElementById(`buyNow-quantity-${id}`);
    //     if (!quantityElement) return;

    //     let newQuantity = parseInt(quantityElement.innerText) + change;
    //     if (newQuantity < 1) newQuantity = 1; // Prevent zero or negative quantity

    //     quantityElement.innerText = newQuantity; // Update UI
    // }







    // if (!cart[id]) return; // Ensure product exists in cart

    // let newQuantity = cart[id].quantity + change;
    // if (newQuantity < 1) newQuantity = 1; // Prevent negative or zero quantity

    // cart[id].quantity = newQuantity; // Update cart object

    // document.getElementById(`quantity-${id}`).innerText = newQuantity; // Update UI

    // renderCart(); // Re-render cart to update subtotal and total


    // let quantityElement = document.getElementById(`buyNow-quantity-${id}`);
    // let quantity = parseInt(quantityElement.innerText) + change;

    // if (quantity < 1) quantity = 1; // Prevent quantity from going below 1

    // quantityElement.innerText = quantity;




    // if (!cart[id]) 
    //     return;
    // //     {
    // //     cart[id] = { quantity: 1 };
    // // }
    // cart[id].quantity += change;

    // if (cart[id].quantity <= 0) {
    //     delete cart[id];
    // } 
    // else {
    //     document.getElementById(`quantity-${id}`).innerText = cart[id].quantity;
    // }

    // renderCart();
}

function addToCart(id) {
    const product = findProductById(id);
    if (!product) return;

    let quantity = parseInt(document.getElementById(`buyNow-quantity-${id}`).innerText);

    if (!cart[id]) {
        cart[id] = { ...product, quantity: quantity };
    } else {
        cart[id].quantity += quantity;
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
            <h2>Please Go back and Add Some Products!!!</h2>
            <button onclick="closeModal('cartModal')">Close</button>
        `;
        document.getElementById("checkoutTotal").innerText = "0";
        return;
    }

    cartContent.innerHTML = `<h2>Added to Cart</h2>` +
        Object.entries(cart).map(([id, item]) => {
            const product = findProductById(Number(id));
            if (!product) return '';

            const subtotal = item.quantity * product.price;
            total += subtotal;
            return `
                <div class="border-box">
                    <img src="${product.img}" alt="${product.name}">
                    <div class="qty-box box1">
                        <span>Qty:</span>
                        <button onclick="updateQuantity(${id}, -1, true)">-</button>
                        <span id="quantity-${id}">${item.quantity}</span>
                        <button onclick="updateQuantity(${id}, 1, true)">+</button>
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

function placeOrder() {
    cart = {};
    // renderCart();
    closeModal('checkoutModal');
    openModal('orderSuccessModal');
}

function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function closeAllModals() {
    document.querySelectorAll('.modalOverlay').forEach(modalOverlay => modalOverlay.style.display = 'none');
    renderCart();
}

renderProducts('productList');




















// function renderProducts(elementId) {
//     const productList = document.getElementById("productList");
//     productList.innerHTML = products.map(p => 
//         `<div class="product">
//             <img src="${p.img}" alt="${p.name}">
//             <h1>${p.name}</h1>
//             <h3>Original Price: ₹${p.originalPrice}</h3>
//             <h1>Offer Price: ₹${p.price}</h1>
//             <button onclick="openBuyNowModal(${p.id})">Buy Now</button>
//         </div>`
//     ).join('');
// }

// function openBuyNowModal(id) {
//     const product = products.find(p => p.id === id);
//     const modalContent = document.getElementById("buyNowContent");
//     modalContent.innerHTML = `
//         <img src="${product.img}" alt="${product.name}">
//         <div>
//             <p class="product-name">${product.name}</p>
//             <div class="qty-box">
//                 <span>Qty:</span>
//                 <button onclick="updateQuantity(${id}, -1)">-</button>
//                 <span id="quantity-${id}">${cart[id] ? cart[id].quantity : 1}</span>
//                 <button onclick="updateQuantity(${id}, 1)">+</button>
//             </div>
//             <p class="product-description">${product.description}</p>
//             <button onclick="addToCart(${id})">Add to Cart</button>
//             <button onclick="closeModal('buyNowModal')">Cancel</button>
//         </div>
//     `;
//     openModal("buyNowModal");
// }

// function updateQuantity(id, change) {
//     if (!cart[id]) cart[id] = { quantity: 1 };
//     cart[id].quantity = Math.max(1, cart[id].quantity + change);
//     document.getElementById(`quantity-${id}`).innerText = cart[id].quantity;
//     renderCart();
// }

// function addToCart(id) {
//     if (!cart[id]) cart[id] = { quantity: 1 };
//     closeModal('buyNowModal');
//     renderCart();
//     openModal('cartModal');

// }

// function renderCart() {
//     const cartContent = document.getElementById("cartContent");
//     let total = 0;
//     cartContent.innerHTML = `<h2>Added to Cart</h2>` +
//         Object.entries(cart).map(([id, item]) => {
//             const product = products.find(p => p.id == id);
//             const subtotal = item.quantity * product.price;
//             total += subtotal;
//             return `
//                 <div class="border-box">
//                     <img src="${product.img}" alt="${product.name}" width="50">
//                     <div class="qty-box">
//                         <button onclick="updateQuantity(${id}, -1)">-</button>
//                         <span id="quantity-${id}">${item.quantity}</span>
//                         <button onclick="updateQuantity(${id}, 1)">+</button>
//                     </div>
//                     <div>
//                         <p><strong>Price:</strong> ₹${product.price}</p>
//                         <p><strong>Subtotal:</strong> ₹${subtotal}</p>
//                         <p><strong>Discount:</strong> ₹0</p>
//                     </div>
//                 </div>
//             `;
//         }).join('') + `
//         <p><strong>Total:</strong> ₹<span id="cartTotal">${total}</span></p>
//         <button onclick="openModal('checkoutModal')">Checkout</button>
//         <button onclick="closeModal('cartModal')">Cancel</button>`;
    
//     document.getElementById("checkoutTotal").innerText = total;
// }

// function placeOrder() {
//     cart = {}; // CLEAR CART AFTER PLACING ORDER
//     closeModal('checkoutModal');
//     openModal('orderSuccessModal');
// }


// function openModal(id) { document.getElementById(id).style.display = 'block'; }
// function closeModal(id) { document.getElementById(id).style.display = 'none'; }
// function closeAllModals() { 
//     document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none'); 
//     renderCart(); // REFRESH CART AFTER ORDER SUCCESS
// }

// renderProducts();
