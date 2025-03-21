const products = [
    { id: 1, 
        name: "Vermicompost-1kg", 
        originalPrice: 15399, 
        price: 13349, 
        img: "./assets/images/soil1.jpg", 
        sold:"1088+ Sold in 30 days",
        description: "Provide Protection Under Cuts, Scrapes, And Punctures From Sharp Objects Such As Thorns, Branches, And Gardening Tools." 
    },
    { id: 2, name: "Nutrient-rich potting soil mix-5", originalPrice: 26399, price: 24349, img: "./assets/images/soil2.jpg", sold:"1088+ Sold in 30 days",description: "Provide Protection Under Cuts, Scrapes, And Punctures From Sharp Objects Such As Thorns, Branches, And Gardening Tools." },
    { id: 3, name: "Plant O Boost (Special flower Booster,10g)", originalPrice: 7024, price: 5349, img: "./assets/images/soil3.jpg", sold:"1088+ Sold in 30 days",description: "Provide Protection Under Cuts, Scrapes, And Punctures From Sharp Objects Such As Thorns, Branches, And Gardening Tools." },
    { id: 4, name: "Coco Peat Block-4 kg (Expands Upto 60-70L)", originalPrice: 15399, price: 13349, img: "./assets/images/soil4.jpg", sold:"1088+ Sold in 30 days",description: "Provide Protection Under Cuts, Scrapes, And Punctures From Sharp Objects Such As Thorns, Branches, And Gardening Tools." },
    { id: 5, name: "Neem Cake-1kg(Set of 2)", originalPrice: 7399, price: 5349, img: "./assets/images/soil5.jpg", sold:"1088+ Sold in 30 days",description: "Provide Protection Under Cuts, Scrapes, And Punctures From Sharp Objects Such As Thorns, Branches, And Gardening Tools." },
    { id: 6, name: "Perlite-500 g", originalPrice: 5399, price: 4349, img: "./assets/images/fert5.avif", sold:"1088+ Sold in 30 days",description: "Provide Protection Under Cuts, Scrapes, And Punctures From Sharp Objects Such As Thorns, Branches, And Gardening Tools." },

];

let cart = {};


function renderProducts(elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = ""; // Clear previous content
    const hoverImage = "./assets/images/hoverimg.jpg"; // Path to hover image
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("item");
        productDiv.innerHTML = `
                    <div class="image-container">
                <img src="${product.img}" alt="${product.name}" class="product-image">
                <img src="${hoverImage}" alt="${product.name}" class="hover-image">
            </div>
            
            <div class = "description">
            <p>${product.name}</p>
            <p class= "price">
            <span class="original-price">Original Price: ₹${product.originalPrice.toLocaleString("en-IN")}</span>
            <span class="offer-price">Offer Price: ₹${product.price.toLocaleString("en-IN")}</span>
            </p>
            <h3>${product.sold}</h3>
            </div>
            <div class="cart-section">
            <img src="./assets/images/cart.png" alt="Cart" class="cart-icon">
            <button class="add-to-cart" onclick="openBuyNowModal(${product.id})">Add To Cart</button>
       </div>
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










