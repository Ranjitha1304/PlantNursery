// shared/cart-count.js
function updateCartCount() {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      const count = Object.values(cart).reduce((sum, item) => sum + (item.quantity || 0), 0);
      document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
      });
    } catch (e) {
      console.error("Error updating cart count:", e);
    }
  }
  
  // Update immediately on load
  updateCartCount();
  
  // Optional: Update when returning to the page
  window.addEventListener('pageshow', updateCartCount);