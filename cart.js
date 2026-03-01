/* ============================================
   ARTISAN GALLERY — Cart Management System
   ============================================ */

// ==================== CART STATE ====================
let cart = JSON.parse(localStorage.getItem('ag_cart') || '[]');

// ==================== CART OPERATIONS ====================
function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty = Math.min(10, existing.qty + qty);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            artist: product.artist,
            price: product.price,
            image: product.image,
            qty: qty
        });
    }

    saveCart();
    updateCartUI();
    showToast(`"${product.name}" added to cart`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showToast('Item removed from cart', 'error');
}

function updateCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty = Math.max(1, Math.min(10, item.qty + delta));
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('ag_cart', JSON.stringify(cart));
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

// ==================== CART UI ====================
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const backdrop = document.getElementById('cartBackdrop');
    const isOpen = sidebar.classList.contains('open');

    sidebar.classList.toggle('open');
    backdrop.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
}

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const count = getCartCount();
    const total = getCartTotal();

    // Badge
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';

    // Count text
    document.getElementById('cartCount').textContent = count;

    // Total
    document.getElementById('cartTotal').textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    // Cart items list
    const itemsContainer = document.getElementById('cartItems');
    if (cart.length === 0) {
        itemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <p>Your cart is empty</p>
        <button class="btn btn-outline" style="margin-top:16px" onclick="toggleCart();navigateTo('gallery')">Browse Gallery</button>
      </div>
    `;
    } else {
        itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="artist">${item.artist}</p>
          <div style="display:flex;align-items:center;gap:10px;margin-top:8px">
            <div class="quantity-selector" style="padding:3px">
              <button onclick="updateCartQty(${item.id},-1)" style="width:28px;height:28px;font-size:0.9rem">−</button>
              <input type="text" value="${item.qty}" readonly style="width:30px;font-size:0.85rem">
              <button onclick="updateCartQty(${item.id},1)" style="width:28px;height:28px;font-size:0.9rem">+</button>
            </div>
          </div>
          <p class="price">$${(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `).join('');
    }
}

// ==================== CHECKOUT ====================
function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    toggleCart();
    navigateTo('checkout');
    renderCheckoutSummary();
}

function renderCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 49.99;
    const insurance = Math.round(subtotal * 0.02 * 100) / 100;
    const taxRate = 0.08875;
    const tax = Math.round(subtotal * taxRate * 100) / 100;
    const total = subtotal + shipping + insurance + tax;

    checkoutItems.innerHTML = cart.map(item => `
    <div class="summary-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="info">
        <h4>${item.name}</h4>
        <p class="qty">Qty: ${item.qty}</p>
      </div>
      <span class="item-price">$${(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
    </div>
  `).join('');

    document.getElementById('summarySubtotal').textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById('summaryShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('summaryInsurance').textContent = `$${insurance.toFixed(2)}`;
    document.getElementById('summaryTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById('payAmount').textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

// Initialize cart UI on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
