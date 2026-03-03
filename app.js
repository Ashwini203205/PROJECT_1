/* ============================================
   ARTISAN GALLERY — Core Application Logic
   Product Data, Routing, UI Interactions
   ============================================ */


// ==================== PRODUCT DATA ====================
const products = [
  {
    id: 1, name: "Ethereal Horizon", artist: "Elena Vasquez",
    price: 2400, originalPrice: 3200, category: "paintings",
    medium: "Oil on Canvas", dimensions: "48\" × 36\"", year: 2024,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80",
    description: "A breathtaking abstract composition that captures the fleeting beauty of twilight. Vasquez masterfully blends warm golds with deep indigos, creating a sense of infinite space and possibility."
  },
  {
    id: 2, name: "Silent Reverie", artist: "Marcus Chen",
    price: 1800, category: "paintings",
    medium: "Acrylic on Canvas", dimensions: "40\" × 30\"", year: 2024,
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&q=80",
    description: "A contemplative piece exploring the intersection of emotion and color. Chen's signature technique creates layers of depth that reveal new details with each viewing."
  },
  {
    id: 3, name: "Urban Fragments", artist: "Sofia Andersson",
    price: 3200, category: "mixed",
    medium: "Mixed Media on Panel", dimensions: "52\" × 40\"", year: 2023,
    badge: "New",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80",
    description: "A striking mixed-media work incorporating found materials from city streets. Andersson transforms urban debris into a profound commentary on modern life and beauty in the mundane."
  },
  {
    id: 4, name: "The Wanderer", artist: "James Whitfield",
    price: 4500, originalPrice: 5200, category: "photography",
    medium: "Fine Art Print", dimensions: "36\" × 24\"", year: 2024,
    badge: "Limited Edition",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    description: "Captured during a solo expedition through the Swiss Alps, this limited edition print embodies solitude and the raw power of nature. Only 25 prints available worldwide."
  },
  {
    id: 5, name: "Digital Dreams", artist: "Yuki Tanaka",
    price: 1200, category: "digital",
    medium: "Digital Art Print", dimensions: "30\" × 30\"", year: 2024,
    image: "https://images.unsplash.com/photo-1634017839464-5c339afa60f0?w=600&q=80",
    description: "A mesmerizing digital artwork that blurs the line between reality and imagination. Tanaka's use of algorithmic patterns creates an otherworldly landscape that evolves with the viewer's perspective."
  },
  {
    id: 6, name: "Carved Elegance", artist: "Alessandro Rossi",
    price: 8500, category: "sculpture",
    medium: "Carrara Marble", dimensions: "24\" × 12\" × 12\"", year: 2023,
    badge: "Exclusive",
    image: "https://images.unsplash.com/photo-1544413164-5f1b361f5bfa?w=600&q=80",
    description: "Hand-carved from a single block of Carrara marble, this sculpture captures the fluidity of human emotion in stone. Rossi spent eight months perfecting every curve and contour."
  },
  {
    id: 7, name: "Chromatic Symphony", artist: "Priya Kapoor",
    price: 2800, category: "paintings",
    medium: "Oil on Linen", dimensions: "60\" × 48\"", year: 2024,
    badge: "New",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
    description: "A large-scale abstract painting that vibrates with energy and color. Kapoor's bold palette and dynamic brushwork create a visual rhythm that fills any room with life."
  },
  {
    id: 8, name: "Forgotten Shores", artist: "Thomas Blake",
    price: 1600, category: "photography",
    medium: "Archival Pigment Print", dimensions: "40\" × 26\"", year: 2023,
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80",
    description: "A hauntingly beautiful seascape captured at dawn on the coast of Iceland. Blake's masterful use of long exposure transforms the ocean into liquid silk."
  },
  {
    id: 9, name: "Neural Bloom", artist: "Ada Okonkwo",
    price: 950, category: "digital",
    medium: "Giclée Print", dimensions: "24\" × 24\"", year: 2024,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    description: "Inspired by the patterns of neural networks and organic growth, this piece explores the convergence of technology and nature through stunning visual complexity."
  },
  {
    id: 10, name: "Golden Whisper", artist: "Elena Vasquez",
    price: 3600, category: "paintings",
    medium: "Oil & Gold Leaf on Canvas", dimensions: "44\" × 36\"", year: 2024,
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=80",
    description: "Vasquez's signature gold leaf technique meets sweeping gestural abstraction. The interplay of light on the metallic surface creates a constantly shifting visual experience."
  },
  {
    id: 11, name: "Terra Firma", artist: "Alessandro Rossi",
    price: 12000, category: "sculpture",
    medium: "Bronze", dimensions: "36\" × 18\" × 18\"", year: 2024,
    badge: "Museum Quality",
    image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=600&q=80",
    description: "A monumental bronze sculpture exploring the relationship between humanity and earth. Each casting is unique, with subtle variations in patina that develop over time."
  },
  {
    id: 12, name: "Midnight Garden", artist: "Priya Kapoor",
    price: 2200, category: "paintings",
    medium: "Watercolor on Paper", dimensions: "30\" × 22\"", year: 2024,
    image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600&q=80",
    description: "A luminous watercolor that captures the mystery of a garden at night. Kapoor's transparent washes create a dreamlike atmosphere where flowers seem to glow from within."
  },
  {
    id: 13, name: "Convergence", artist: "Marcus Chen",
    price: 5400, originalPrice: 6200, category: "mixed",
    medium: "Mixed Media Installation", dimensions: "72\" × 48\"", year: 2023,
    image: "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=600&q=80",
    description: "A large-scale mixed media work combining painting, collage, and dimensional elements. Chen's masterwork explores the convergence of Eastern and Western artistic traditions."
  },
  {
    id: 14, name: "Solitude", artist: "James Whitfield",
    price: 2800, category: "photography",
    medium: "C-Type Print", dimensions: "50\" × 33\"", year: 2024,
    badge: "Award Winner",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80",
    description: "Winner of the 2024 International Photography Award. This image captures a lone tree on the horizon, bathed in the golden light of sunset — a meditation on solitude and resilience."
  },
  {
    id: 15, name: "Synthetic Nature", artist: "Yuki Tanaka",
    price: 1800, category: "digital",
    medium: "Metal Print", dimensions: "36\" × 36\"", year: 2024,
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&q=80",
    description: "A stunning digital creation that reimagines natural forms through the lens of technology. Printed on brushed aluminum for a luminous, gallery-quality finish."
  },
  {
    id: 16, name: "Celestial Dance", artist: "Sofia Andersson",
    price: 4200, category: "paintings",
    medium: "Acrylic & Ink on Canvas", dimensions: "56\" × 44\"", year: 2024,
    badge: "New",
    image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=600&q=80",
    description: "An explosive composition of swirling cosmic forms. Andersson's unique technique of pouring and manipulating acrylic creates organic patterns reminiscent of nebulae and galaxies."
  }
];

// ==================== APP STATE ====================
let currentPage = 'home';
let currentCategory = 'all';
let wishlist = JSON.parse(localStorage.getItem('ag_wishlist') || '[]');
let isLoggedIn = JSON.parse(localStorage.getItem('ag_logged_in') || 'false');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  // Loader
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
    setTimeout(() => document.getElementById('loader').style.display = 'none', 600);
  }, 1800);

  // Render featured products on home
  renderFeaturedProducts();

  // Scroll effects
  window.addEventListener('scroll', handleScroll);

  // Intersection Observer for fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ESC key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllOverlays();
    }
  });

  // Update auth UI
  updateAuthUI();
});

// ==================== NAVIGATION ====================
function navigateTo(page) {
  currentPage = page;
  // Hide all pages
  document.querySelectorAll('[id^="page-"]').forEach(p => p.style.display = 'none');
  // Show target page
  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.style.display = 'block';
    target.style.animation = 'fadeInUp 0.5s ease';
  }

  // Update nav links
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile nav
  document.getElementById('navLinks').classList.remove('mobile-open');
  document.getElementById('hamburger').classList.remove('active');

  // Close cart
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartBackdrop').classList.remove('open');

  // Render gallery if needed
  if (page === 'gallery') {
    renderGalleryProducts();
  }

  // Re-observe fade-in elements
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
  }, 100);

  // Show/hide footer on checkout
  document.getElementById('siteFooter').style.display = page === 'checkout' ? 'none' : 'block';
}

// ==================== SCROLL HANDLING ====================
function handleScroll() {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
}

// ==================== MOBILE NAV ====================
function toggleMobile() {
  document.getElementById('navLinks').classList.toggle('mobile-open');
  document.getElementById('hamburger').classList.toggle('active');
}

// ==================== PRODUCT RENDERING ====================
function createProductCard(product) {
  const isWished = wishlist.includes(product.id);
  const card = document.createElement('div');
  card.className = 'product-card fade-in';
  card.innerHTML = `
    <div class="product-image" onclick="openProductModal(${product.id})">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <div class="product-actions">
        <button class="wishlist-btn ${isWished ? 'active' : ''}" onclick="event.stopPropagation();toggleWishlist(${product.id},this)" title="Add to Wishlist">
          <i class="fas fa-heart"></i>
        </button>
        <button onclick="event.stopPropagation();addToCart(${product.id})" title="Add to Cart">
          <i class="fas fa-shopping-bag"></i>
        </button>
        <button onclick="event.stopPropagation();buyNow(${product.id})" title="Buy Now" class="buy-now-action">
          <i class="fas fa-bolt"></i>
        </button>
        <button onclick="event.stopPropagation();openProductModal(${product.id})" title="Quick View">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>
    <div class="product-info">
      <div class="product-artist">${product.artist}</div>
      <h3>${product.name}</h3>
      <div class="product-medium">${product.medium}</div>
      <div class="product-meta">
        <div class="product-price">
          ${product.originalPrice ? `<span class="original">$${product.originalPrice.toLocaleString()}</span>` : ''}
          $${product.price.toLocaleString()}
        </div>
      </div>
    </div>
  `;
  return card;
}

function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  grid.innerHTML = '';
  const featured = products.filter(p => p.badge).slice(0, 8);
  featured.forEach(p => grid.appendChild(createProductCard(p)));
  // Trigger animations
  setTimeout(() => {
    grid.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100);
    });
  }, 200);
}

function renderGalleryProducts(category = currentCategory) {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  let filtered = category === 'all' ? [...products] : products.filter(p => p.category === category);

  // Apply sort
  const sortVal = document.getElementById('sortSelect')?.value || 'featured';
  filtered = applySorting(filtered, sortVal);

  filtered.forEach(p => grid.appendChild(createProductCard(p)));
  setTimeout(() => {
    grid.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, 100);
}

function applySorting(arr, sortVal) {
  switch (sortVal) {
    case 'price-low': return arr.sort((a, b) => a.price - b.price);
    case 'price-high': return arr.sort((a, b) => b.price - a.price);
    case 'name': return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest': return arr.sort((a, b) => b.year - a.year);
    default: return arr;
  }
}

// ==================== FILTERS ====================
function filterProducts(category) {
  currentCategory = category;
  document.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.category === category);
  });
  renderGalleryProducts(category);
}

function filterByCategory(category) {
  navigateTo('gallery');
  setTimeout(() => filterProducts(category), 100);
}

function sortProducts(value) {
  renderGalleryProducts(currentCategory);
}

// ==================== PRODUCT MODAL ====================
function openProductModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const body = document.getElementById('productModalBody');
  body.innerHTML = `
    <div class="modal-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="modal-details">
      <div class="product-artist">${product.artist}</div>
      <h2>${product.name}</h2>
      <div class="price">
        ${product.originalPrice ? `<span style="text-decoration:line-through;color:var(--text-muted);font-size:1.2rem;margin-right:10px">$${product.originalPrice.toLocaleString()}</span>` : ''}
        $${product.price.toLocaleString()}
      </div>
      <p class="description">${product.description}</p>
      <div class="detail-specs">
        <div class="spec-item"><span>Medium</span>${product.medium}</div>
        <div class="spec-item"><span>Dimensions</span>${product.dimensions}</div>
        <div class="spec-item"><span>Year</span>${product.year}</div>
        <div class="spec-item"><span>Category</span>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
      </div>
      <div class="quantity-selector">
        <button onclick="changeModalQty(-1)">−</button>
        <input type="number" id="modalQty" value="1" min="1" max="10" readonly>
        <button onclick="changeModalQty(1)">+</button>
      </div>
      <div style="display:flex;gap:12px;margin-top:auto">
        <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="addToCart(${product.id},getModalQty());closeProductModal()">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
        <button class="btn btn-outline buy-now-btn" style="flex:1;justify-content:center" onclick="buyNow(${product.id},getModalQty())">
          <i class="fas fa-bolt"></i> Buy Now
        </button>
        <button class="btn btn-outline" onclick="toggleWishlist(${product.id})">
          <i class="fas fa-heart"></i>
        </button>
      </div>
    </div>
  `;
  document.getElementById('productModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
  document.body.style.overflow = '';
}

function changeModalQty(delta) {
  const inp = document.getElementById('modalQty');
  const val = Math.max(1, Math.min(10, parseInt(inp.value) + delta));
  inp.value = val;
}

function getModalQty() {
  return parseInt(document.getElementById('modalQty')?.value || 1);
}

// ==================== WISHLIST ====================
function toggleWishlist(id, btn) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'error');
  } else {
    wishlist.push(id);
    showToast('Added to wishlist ❤️', 'success');
  }
  localStorage.setItem('ag_wishlist', JSON.stringify(wishlist));
  // Update all wishlist buttons for this product
  document.querySelectorAll('.wishlist-btn').forEach(b => {
    // Check if this button belongs to this product
    const onclickAttr = b.getAttribute('onclick');
    if (onclickAttr && onclickAttr.includes(id)) {
      b.classList.toggle('active', wishlist.includes(id));
    }
  });
}

// ==================== SEARCH ====================
function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.toggle('active');
  if (overlay.classList.contains('active')) {
    document.getElementById('searchInput').focus();
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function handleSearch(query) {
  const results = document.getElementById('searchResults');
  if (!query.trim()) { results.innerHTML = ''; return; }
  const q = query.toLowerCase();
  const matches = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.artist.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.medium.toLowerCase().includes(q)
  );
  results.innerHTML = matches.length ? matches.map(p => `
    <div class="search-result-item" onclick="toggleSearch();openProductModal(${p.id})">
      <img src="${p.image}" alt="${p.name}">
      <div class="info">
        <h4>${p.name}</h4>
        <p>${p.artist} — $${p.price.toLocaleString()}</p>
      </div>
    </div>
  `).join('') : '<p style="text-align:center;color:var(--text-muted);padding:20px">No results found</p>';
}

// ==================== AUTH ====================
function toggleAuth() {
  document.getElementById('authOverlay').classList.toggle('active');
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
}

function handleLogin() {
  isLoggedIn = true;
  localStorage.setItem('ag_logged_in', 'true');
  toggleAuth();
  updateAuthUI();
  showToast('Welcome back! You\'re signed in.', 'success');
}

function handleRegister() {
  isLoggedIn = true;
  localStorage.setItem('ag_logged_in', 'true');
  toggleAuth();
  updateAuthUI();
  showToast('Account created successfully!', 'success');
}

function updateAuthUI() {
  const btn = document.getElementById('userBtn');
  if (isLoggedIn) {
    btn.innerHTML = '<i class="fas fa-user-check" style="color:var(--gold)"></i>';
  }
}

// ==================== TOASTS ====================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ==================== NEWSLETTER ====================
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address', 'error');
    return;
  }
  showToast('Welcome to the Collector Circle! 🎨', 'success');
  document.getElementById('newsletterEmail').value = '';
}

// ==================== HELPERS ====================
function closeAllOverlays() {
  document.getElementById('searchOverlay').classList.remove('active');
  document.getElementById('authOverlay').classList.remove('active');
  closeProductModal();
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnBackdrop(event, id) {
  if (event.target.id === id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
  }
}
