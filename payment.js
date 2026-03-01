/* ============================================
   ARTISAN GALLERY — Payment Gateway System
   Card, Wallet, PayPal & Bank — Full System
   ============================================ */

// ==================== WALLET STATE ====================
let walletBalance = parseFloat(localStorage.getItem('ag_wallet_balance') || '10000');
let walletHistory = JSON.parse(localStorage.getItem('ag_wallet_history') || '[]');
const WALLET_PIN = '1234'; // Demo PIN

function saveWalletState() {
    localStorage.setItem('ag_wallet_balance', walletBalance.toString());
    localStorage.setItem('ag_wallet_history', JSON.stringify(walletHistory));
}

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ==================== PAYMENT METHOD SELECTION ====================
function selectPaymentMethod(method) {
    document.querySelectorAll('.payment-method').forEach(m => {
        m.classList.toggle('active', m.dataset.method === method);
    });
    document.getElementById('cardPayment').style.display = method === 'card' ? 'block' : 'none';
    document.getElementById('walletPayment').style.display = method === 'wallet' ? 'block' : 'none';
    document.getElementById('paypalPayment').style.display = method === 'paypal' ? 'block' : 'none';
    document.getElementById('bankPayment').style.display = method === 'bank' ? 'block' : 'none';

    // Update pay button text
    const payBtn = document.getElementById('payBtn');
    const amount = document.getElementById('payAmount').textContent;
    if (method === 'wallet') {
        payBtn.innerHTML = `<i class="fas fa-wallet"></i> Pay with Wallet — <span id="payAmount">${amount}</span>`;
        updateWalletUI();
    } else if (method === 'paypal') {
        payBtn.innerHTML = `<i class="fab fa-paypal"></i> Pay with PayPal — <span id="payAmount">${amount}</span>`;
    } else if (method === 'bank') {
        payBtn.innerHTML = `<i class="fas fa-university"></i> Confirm Bank Transfer — <span id="payAmount">${amount}</span>`;
    } else {
        payBtn.innerHTML = `<i class="fas fa-lock"></i> Pay Now — <span id="payAmount">${amount}</span>`;
    }
}

// ==================== WALLET UI ====================
function updateWalletUI() {
    const balanceEl = document.getElementById('walletBalanceDisplay');
    const remainingEl = document.getElementById('walletRemaining');
    const orderTotalEl = document.getElementById('walletOrderTotal');
    const statusEl = document.getElementById('walletStatus');

    if (!balanceEl) return;

    balanceEl.textContent = formatCurrency(walletBalance);

    // Calculate order total from checkout summary
    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 49.99;
    const insurance = Math.round(subtotal * 0.02 * 100) / 100;
    const taxRate = 0.08875;
    const tax = Math.round(subtotal * taxRate * 100) / 100;
    const total = subtotal + shipping + insurance + tax;

    orderTotalEl.textContent = formatCurrency(total);
    const remaining = walletBalance - total;
    remainingEl.textContent = formatCurrency(remaining);

    // Show status
    if (total > walletBalance) {
        statusEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Insufficient balance. Please add money to your wallet.';
        statusEl.className = 'wallet-status wallet-status-error';
        remainingEl.style.color = 'var(--error)';
    } else {
        statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Sufficient balance available';
        statusEl.className = 'wallet-status wallet-status-success';
        remainingEl.style.color = 'var(--success)';
    }
}

function showTopUpModal() {
    const amounts = [500, 1000, 2000, 5000, 10000];
    const html = `
    <div style="text-align:center">
      <h3 style="font-family:var(--font-heading);margin-bottom:20px">Add Money to Wallet</h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
        ${amounts.map(a => `
          <button class="wallet-topup-btn" onclick="topUpWallet(${a})" style="
            padding:14px;background:var(--bg-tertiary);border:1px solid var(--border);
            border-radius:var(--radius-sm);color:var(--text-primary);font-size:0.95rem;
            cursor:pointer;transition:var(--transition);font-family:var(--font-body)
          " onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'"
             onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-primary)'">
            ${formatCurrency(a)}
          </button>
        `).join('')}
        <button onclick="customTopUp()" style="
          padding:14px;background:var(--bg-tertiary);border:1px solid var(--gold);
          border-radius:var(--radius-sm);color:var(--gold);font-size:0.85rem;
          cursor:pointer;font-family:var(--font-body)
        ">Custom</button>
      </div>
      <p style="color:var(--text-muted);font-size:0.82rem">Current Balance: ${formatCurrency(walletBalance)}</p>
    </div>`;

    showToast('Select amount to add to wallet', 'success');

    // Use a simpler inline approach - update wallet status area
    const statusEl = document.getElementById('walletStatus');
    statusEl.innerHTML = html;
    statusEl.className = 'wallet-status';
}

function topUpWallet(amount) {
    walletBalance += amount;
    walletHistory.unshift({
        type: 'credit',
        amount: amount,
        description: 'Wallet Top-up',
        date: new Date().toISOString(),
        id: 'WTU-' + Date.now().toString(36).toUpperCase()
    });
    saveWalletState();
    updateWalletUI();
    showToast(`${formatCurrency(amount)} added to your wallet!`, 'success');
}

function customTopUp() {
    const amount = prompt('Enter amount to add ($):');
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
        topUpWallet(parseFloat(amount));
    }
}

function showWalletHistory() {
    if (walletHistory.length === 0) {
        showToast('No transaction history yet', 'error');
        return;
    }

    const html = walletHistory.slice(0, 5).map(t => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)">
          <div>
            <div style="font-size:0.9rem">${t.description}</div>
            <div style="font-size:0.75rem;color:var(--text-muted)">${new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
          </div>
          <div style="color:${t.type === 'credit' ? 'var(--success)' : 'var(--error)'};font-family:var(--font-accent);font-size:1.1rem">
            ${t.type === 'credit' ? '+' : '-'}${formatCurrency(t.amount)}
          </div>
        </div>
    `).join('');

    const statusEl = document.getElementById('walletStatus');
    statusEl.innerHTML = `
        <h4 style="font-family:var(--font-heading);margin-bottom:12px;font-size:1rem">Recent Transactions</h4>
        ${html}
    `;
    statusEl.className = 'wallet-status';
}

// ==================== CARD FORMATTING ====================
function formatCard(input) {
    let value = input.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < value.length && i < 16; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += value[i];
    }
    input.value = formatted;
    // Update preview
    const preview = document.getElementById('cardPreviewNumber');
    if (value.length > 0) {
        let display = '';
        for (let i = 0; i < 16; i++) {
            if (i > 0 && i % 4 === 0) display += ' ';
            display += i < value.length ? value[i] : '•';
        }
        preview.textContent = display;
    } else {
        preview.textContent = '•••• •••• •••• ••••';
    }

    // Detect card type and update icon
    const icon = input.parentElement.querySelector('.card-icon i');
    const type = detectCardType(value);
    switch (type) {
        case 'visa':
            icon.className = 'fab fa-cc-visa';
            icon.style.color = '#1a1f71';
            break;
        case 'mastercard':
            icon.className = 'fab fa-cc-mastercard';
            icon.style.color = '#eb001b';
            break;
        case 'amex':
            icon.className = 'fab fa-cc-amex';
            icon.style.color = '#2e77bc';
            break;
        case 'discover':
            icon.className = 'fab fa-cc-discover';
            icon.style.color = '#ff6000';
            break;
        default:
            icon.className = 'fas fa-credit-card';
            icon.style.color = 'var(--text-muted)';
    }
}

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
    // Update preview
    document.getElementById('cardPreviewExpiry').textContent = value || 'MM/YY';
}

function updateCardPreview() {
    const name = document.getElementById('cardName').value;
    document.getElementById('cardPreviewName').textContent = name.toUpperCase() || 'YOUR NAME';
}

// ==================== CARD TYPE DETECTION ====================
function detectCardType(number) {
    const patterns = {
        visa: /^4/,
        mastercard: /^(5[1-5]|2[2-7])/,
        amex: /^3[47]/,
        discover: /^6(?:011|5)/
    };
    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(number)) return type;
    }
    return 'unknown';
}

// ==================== LUHN ALGORITHM (Card Validation) ====================
function luhnCheck(cardNumber) {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length < 13 || digits.length > 19) return false;

    let sum = 0;
    let alternate = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let n = parseInt(digits[i], 10);
        if (alternate) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
        alternate = !alternate;
    }
    return sum % 10 === 0;
}

// ==================== FORM VALIDATION ====================
function validateShippingForm() {
    const fields = [
        { id: 'shipFirst', label: 'First Name' },
        { id: 'shipLast', label: 'Last Name' },
        { id: 'shipEmail', label: 'Email' },
        { id: 'shipAddress', label: 'Address' },
        { id: 'shipCity', label: 'City' },
        { id: 'shipZip', label: 'ZIP Code' }
    ];

    for (const field of fields) {
        const el = document.getElementById(field.id);
        if (!el.value.trim()) {
            highlightError(el);
            showToast(`Please enter your ${field.label}`, 'error');
            return false;
        }
    }

    // Validate email format
    const email = document.getElementById('shipEmail').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        highlightError(document.getElementById('shipEmail'));
        showToast('Please enter a valid email address', 'error');
        return false;
    }

    return true;
}

function validatePaymentForm() {
    const activeMethod = document.querySelector('.payment-method.active').dataset.method;

    if (activeMethod === 'paypal' || activeMethod === 'bank') {
        return true; // These redirect to external services
    }

    if (activeMethod === 'wallet') {
        return validateWalletPayment();
    }

    // Card validation
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiry = document.getElementById('cardExpiry').value;
    const cvv = document.getElementById('cardCVV').value;
    const name = document.getElementById('cardName').value;

    if (!cardNumber || cardNumber.length < 13) {
        highlightError(document.getElementById('cardNumber'));
        showToast('Please enter a valid card number', 'error');
        return false;
    }

    // Luhn check (skip for demo — accept test cards)
    if (cardNumber.length === 16 && !luhnCheck(cardNumber)) {
        const testCards = ['4242424242424242', '5555555555554444', '4111111111111111', '3782822463100050'];
        if (!testCards.includes(cardNumber)) {
            highlightError(document.getElementById('cardNumber'));
            showToast('Invalid card number. Try: 4242 4242 4242 4242', 'error');
            return false;
        }
    }

    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
        highlightError(document.getElementById('cardExpiry'));
        showToast('Please enter a valid expiry date (MM/YY)', 'error');
        return false;
    }

    // Check expiry is in future
    const [month, year] = expiry.split('/').map(Number);
    const now = new Date();
    const expiryDate = new Date(2000 + year, month);
    if (expiryDate <= now) {
        highlightError(document.getElementById('cardExpiry'));
        showToast('Card has expired', 'error');
        return false;
    }

    if (!cvv || cvv.length < 3) {
        highlightError(document.getElementById('cardCVV'));
        showToast('Please enter a valid CVV', 'error');
        return false;
    }

    if (!name.trim()) {
        highlightError(document.getElementById('cardName'));
        showToast('Please enter the name on card', 'error');
        return false;
    }

    return true;
}

function validateWalletPayment() {
    const pin = document.getElementById('walletPin').value;

    // Calculate total
    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 49.99;
    const insurance = Math.round(subtotal * 0.02 * 100) / 100;
    const taxRate = 0.08875;
    const tax = Math.round(subtotal * taxRate * 100) / 100;
    const total = subtotal + shipping + insurance + tax;

    if (total > walletBalance) {
        showToast('Insufficient wallet balance! Please add money.', 'error');
        return false;
    }

    if (!pin || pin.length < 4) {
        highlightError(document.getElementById('walletPin'));
        showToast('Please enter your 4-digit wallet PIN', 'error');
        return false;
    }

    if (pin !== WALLET_PIN) {
        highlightError(document.getElementById('walletPin'));
        showToast('Invalid PIN. Demo PIN is 1234', 'error');
        return false;
    }

    return true;
}

function highlightError(element) {
    element.style.borderColor = 'var(--error)';
    element.focus();
    setTimeout(() => { element.style.borderColor = ''; }, 3000);
}

// ==================== PAYMENT PROCESSING ====================
function processPayment() {
    // Validate shipping
    if (!validateShippingForm()) return;

    // Validate payment
    if (!validatePaymentForm()) return;

    const activeMethod = document.querySelector('.payment-method.active').dataset.method;

    // Show loading state
    const payBtn = document.getElementById('payBtn');
    const originalText = payBtn.innerHTML;
    payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    payBtn.disabled = true;
    payBtn.style.opacity = '0.7';

    // Simulate payment processing
    setTimeout(() => {
        let success = false;

        if (activeMethod === 'wallet') {
            success = processWalletPayment();
        } else {
            success = simulatePaymentGateway();
        }

        if (success) {
            // Generate order ID
            const orderId = 'AG-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
            document.getElementById('orderId').textContent = `Order #${orderId}`;

            // Clear cart
            cart = [];
            saveCart();
            updateCartUI();

            // Show success
            document.getElementById('successOverlay').classList.add('active');

            // Reset payment form
            payBtn.innerHTML = originalText;
            payBtn.disabled = false;
            payBtn.style.opacity = '1';
        } else {
            payBtn.innerHTML = originalText;
            payBtn.disabled = false;
            payBtn.style.opacity = '1';
            if (activeMethod !== 'wallet') {
                showToast('Payment declined. Please try again.', 'error');
            }
        }
    }, 2000);
}

// ==================== WALLET PAYMENT PROCESSING ====================
function processWalletPayment() {
    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 49.99;
    const insurance = Math.round(subtotal * 0.02 * 100) / 100;
    const taxRate = 0.08875;
    const tax = Math.round(subtotal * taxRate * 100) / 100;
    const total = subtotal + shipping + insurance + tax;

    // Deduct from wallet
    walletBalance -= total;

    // Record transaction
    walletHistory.unshift({
        type: 'debit',
        amount: total,
        description: `Purchase — ${cart.length} artwork(s)`,
        date: new Date().toISOString(),
        id: 'WPY-' + Date.now().toString(36).toUpperCase()
    });

    saveWalletState();

    console.log('💰 Wallet Payment Processed:', {
        total: formatCurrency(total),
        remainingBalance: formatCurrency(walletBalance),
        items: cart.length
    });

    return true;
}

// ==================== PAYMENT GATEWAY SIMULATION ====================
function simulatePaymentGateway() {
    /* 
     * DUMMY PAYMENT GATEWAY
     * 
     * Test Card Numbers:
     * ✅ 4242 4242 4242 4242 — Visa (Success)
     * ✅ 5555 5555 5555 4444 — Mastercard (Success)
     * ✅ 4111 1111 1111 1111 — Visa (Success)
     * ❌ 4000 0000 0000 0002 — Visa (Decline)
     * 
     * Any other 16-digit number: Success (for demo)
     */

    const activeMethod = document.querySelector('.payment-method.active').dataset.method;

    if (activeMethod === 'paypal' || activeMethod === 'bank') {
        console.log(`🔗 Redirecting to ${activeMethod.toUpperCase()} gateway...`);
        return true;
    }

    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');

    // Simulate decline for specific test card
    if (cardNumber === '4000000000000002') {
        return false;
    }

    // Log transaction (in production, this goes to your server)
    const transaction = {
        id: 'txn_' + Date.now(),
        amount: getCartTotal(),
        currency: 'USD',
        status: 'succeeded',
        card_last4: cardNumber.slice(-4),
        card_brand: detectCardType(cardNumber),
        timestamp: new Date().toISOString(),
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty
        }))
    };

    console.log('💳 Payment Gateway Response:', transaction);
    console.log('✅ Transaction ID:', transaction.id);
    console.log('📦 Items:', transaction.items.length, 'artwork(s)');

    return true;
}

// ==================== BUY NOW (Instant Checkout) ====================
function buyNow(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Clear existing cart and add only this product
    cart = [{
        id: product.id,
        name: product.name,
        artist: product.artist,
        price: product.price,
        image: product.image,
        qty: qty
    }];

    saveCart();
    updateCartUI();

    // Close any open modals
    closeProductModal();

    // Navigate to checkout
    navigateTo('checkout');
    renderCheckoutSummary();

    showToast(`Buying "${product.name}" — Complete checkout to finish`, 'success');
}

// ==================== SUCCESS HANDLING ====================
function closeSuccess() {
    document.getElementById('successOverlay').classList.remove('active');
    navigateTo('home');

    // Reset checkout form
    ['shipFirst', 'shipLast', 'shipEmail', 'shipAddress', 'shipCity', 'shipZip',
        'cardNumber', 'cardExpiry', 'cardCVV', 'cardName', 'walletPin'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

    // Reset card preview
    document.getElementById('cardPreviewNumber').textContent = '•••• •••• •••• ••••';
    document.getElementById('cardPreviewName').textContent = 'YOUR NAME';
    document.getElementById('cardPreviewExpiry').textContent = 'MM/YY';

    // Reset to card payment
    selectPaymentMethod('card');
}
