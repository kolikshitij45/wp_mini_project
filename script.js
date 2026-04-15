/* ============================================================
   EV REPARTS MARKETPLACE — script.js
   ============================================================ */

// ==================== CATEGORY EMOJI MAP ====================
const CAT_EMOJI = { Battery: '🔋', Motor: '⚙️', Charger: '🔌', Controller: '🖥️', Tire: '🛞', Other: '🔧' };

// ==================== SEED / DEFAULT PRODUCTS ====================
const SEED_PRODUCTS = [
  { id: 1, name: "Tesla Model 3 Battery Pack 75kWh", category: "Battery", vehicle: "Tesla", compat: "Tesla Model 3 2018-2021", price: 240000, condition: "Like New", rating: 4.9, reviews: 28, location: "Mumbai", emoji: "🔋", seller: "ElectroParts Co.", sellerEmail: "seed@ev.com", sellerInitials: "EP", featured: true, photo: null, desc: "Fully tested 75kWh battery pack from a wrecked Tesla Model 3. BMS intact. 94% capacity remaining. Ready to install.", listedAt: "2024-01-10T10:00:00Z" },
  { id: 2, name: "Nissan Leaf Motor Assembly", category: "Motor", vehicle: "Nissan", compat: "Nissan Leaf 2014-2017", price: 89000, condition: "Good", rating: 4.7, reviews: 14, location: "Delhi", emoji: "⚙️", seller: "GreenDrive Parts", sellerEmail: "seed@ev.com", sellerInitials: "GD", featured: true, photo: null, desc: "Complete motor assembly including reduction gear. Tested and running. Removed from a 50k mile vehicle.", listedAt: "2024-01-15T10:00:00Z" },
  { id: 3, name: "Level 2 EV Charger 7.2kW", category: "Charger", vehicle: "Tesla", compat: "Universal / Tesla Model S, X, 3", price: 34000, condition: "Like New", rating: 4.8, reviews: 41, location: "Bengaluru", emoji: "🔌", seller: "VoltHub", sellerEmail: "seed@ev.com", sellerInitials: "VH", featured: true, photo: null, desc: "7.2kW Level 2 wall charger, 240V input. Lightly used for 6 months. Includes mounting hardware and cable.", listedAt: "2024-01-20T10:00:00Z" },
  { id: 4, name: "Chevy Bolt Motor Controller", category: "Controller", vehicle: "Chevy", compat: "Chevy Bolt 2017-2022", price: 65000, condition: "Good", rating: 4.5, reviews: 9, location: "Chennai", emoji: "🖥️", seller: "BoltParts", sellerEmail: "seed@ev.com", sellerInitials: "BP", featured: true, photo: null, desc: "OEM motor controller. Pulled from a collision-damaged Bolt with good drivetrain. Fully functional.", listedAt: "2024-02-01T10:00:00Z" },
  { id: 5, name: "BMW iX All-Season Tires x4", category: "Tire", vehicle: "BMW", compat: "BMW iX 2022-2024", price: 48000, condition: "Good", rating: 4.6, reviews: 7, location: "Hyderabad", emoji: "🛞", seller: "WheelGreen", sellerEmail: "seed@ev.com", sellerInitials: "WG", featured: false, photo: null, desc: "Set of 4 all-season tires from BMW iX. 75% tread remaining. Size 255/50R20.", listedAt: "2024-02-05T10:00:00Z" },
  { id: 6, name: "Hyundai Ioniq 5 Battery Module", category: "Battery", vehicle: "Hyundai", compat: "Hyundai Ioniq 5 2021-2023", price: 180000, condition: "Like New", rating: 4.9, reviews: 5, location: "Pune", emoji: "🔋", seller: "KoreaParts", sellerEmail: "seed@ev.com", sellerInitials: "KP", featured: false, photo: null, desc: "Single battery module from Ioniq 5. 800V architecture. Tested at 96% capacity. Ideal for DIY projects.", listedAt: "2024-02-10T10:00:00Z" },
  { id: 7, name: "Tesla Model S On-board Charger", category: "Charger", vehicle: "Tesla", compat: "Tesla Model S 2013-2020", price: 72000, condition: "Fair", rating: 4.3, reviews: 12, location: "Ahmedabad", emoji: "🔌", seller: "TeslaRecycle", sellerEmail: "seed@ev.com", sellerInitials: "TR", featured: false, photo: null, desc: "Dual on-board charger (OBC) from 2016 Model S. Minor cosmetic damage. Fully functional at 10kW.", listedAt: "2024-02-15T10:00:00Z" },
  { id: 8, name: "Nissan Leaf Inverter", category: "Controller", vehicle: "Nissan", compat: "Nissan Leaf 2011-2017", price: 42000, condition: "Good", rating: 4.6, reviews: 18, location: "Kolkata", emoji: "🖥️", seller: "LeafParts", sellerEmail: "seed@ev.com", sellerInitials: "LP", featured: false, photo: null, desc: "OEM inverter/PDM unit. Works perfectly. Pulled during motor upgrade. Comes with all connectors.", listedAt: "2024-02-20T10:00:00Z" },
  { id: 9, name: "Tesla Model Y Long Range Motor", category: "Motor", vehicle: "Tesla", compat: "Tesla Model Y 2020-2023", price: 320000, condition: "Like New", rating: 5.0, reviews: 3, location: "Mumbai", emoji: "⚙️", seller: "NordicEV", sellerEmail: "seed@ev.com", sellerInitials: "NE", featured: false, photo: null, desc: "Rear drive unit from a Model Y with 8k miles. Replaced due to warranty upgrade. Like-new condition.", listedAt: "2024-03-01T10:00:00Z" },
  { id: 10, name: "Chevy Bolt EV Summer Tires x4", category: "Tire", vehicle: "Chevy", compat: "Chevy Bolt 2017-2022", price: 26000, condition: "Fair", rating: 4.2, reviews: 6, location: "Delhi", emoji: "🛞", seller: "BoltParts", sellerEmail: "seed@ev.com", sellerInitials: "BP", featured: false, photo: null, desc: "Set of 4 summer tires size 215/50R17. 60% tread remaining.", listedAt: "2024-03-05T10:00:00Z" },
  { id: 11, name: "BMW i3 Battery Pack 42.2kWh", category: "Battery", vehicle: "BMW", compat: "BMW i3 2018-2021", price: 310000, condition: "Good", rating: 4.7, reviews: 22, location: "Bengaluru", emoji: "🔋", seller: "BayerEV", sellerEmail: "seed@ev.com", sellerInitials: "BE", featured: false, photo: null, desc: "94Ah Samsung cell battery from 2019 i3s. All 8 modules present. BMS tested. 88% SoH.", listedAt: "2024-03-10T10:00:00Z" },
  { id: 12, name: "Portable DC Fast Charger 50kW", category: "Charger", vehicle: "Tesla", compat: "CCS / CHAdeMO compatible", price: 145000, condition: "Good", rating: 4.8, reviews: 11, location: "Chennai", emoji: "🔌", seller: "VoltHub", sellerEmail: "seed@ev.com", sellerInitials: "VH", featured: false, photo: null, desc: "Commercial 50kW DC fast charger unit. Decommissioned from a closed station. Works perfectly.", listedAt: "2024-03-15T10:00:00Z" },
];

// ==================== DATABASE (Express Backend) ====================
let BACKEND_DATA = { users: [], listings: [], saved: {}, messages: [], subscribers: [] };

async function syncBackend(action, payload) {
  if (!action) return;
  try {
    const res = await fetch('http://localhost:3000/api/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload })
    });
    if (res.ok) {
      const parsed = await res.json();
      BACKEND_DATA = parsed.data;
    }
  } catch (e) { console.error('Action failed', e); }
}

const DB = {
  // Users
  getUsers() { return BACKEND_DATA.users || []; },
  saveUsers(u) { BACKEND_DATA.users = u; syncBackend('saveUsers', u); },
  addUser(user) { BACKEND_DATA.users.push(user); syncBackend('addUser', user); },
  findUserByEmail(em) { return this.getUsers().find(u => u.email.toLowerCase() === em.toLowerCase()) || null; },
  updateUser(em, upd) {
    const i = this.getUsers().findIndex(u => u.email.toLowerCase() === em.toLowerCase());
    if (i !== -1) { BACKEND_DATA.users[i] = { ...BACKEND_DATA.users[i], ...upd }; syncBackend('updateUser', { email: em, updates: upd }); }
  },

  // Session
  setSession(user) { localStorage.setItem('evr_session', JSON.stringify({ email: user.email, firstName: user.firstName, lastName: user.lastName, joinedAt: user.joinedAt })); },
  getSession() { try { return JSON.parse(localStorage.getItem('evr_session')); } catch { return null; } },
  clearSession() { localStorage.removeItem('evr_session'); },

  // Listings
  _getUserListingsRaw() { return BACKEND_DATA.listings || []; },
  getAllListings() { return [...SEED_PRODUCTS, ...this._getUserListingsRaw()]; },
  getUserListings(em) { return this._getUserListingsRaw().filter(l => l.sellerEmail === em); },
  addListing(l) {
    if (!BACKEND_DATA.listings) BACKEND_DATA.listings = [];
    BACKEND_DATA.listings.push(l);
    syncBackend('addListing', l);
  },
  removeListing(id) {
    if (!BACKEND_DATA.listings) return;
    BACKEND_DATA.listings = BACKEND_DATA.listings.filter(l => l.id !== id);
    syncBackend('removeListing', id);
  },
  getNextId() { const all = this.getAllListings(); return all.length > 0 ? Math.max(...all.map(l => l.id)) + 1 : 100; },

  // Saved
  getSaved() {
    const session = this.getSession();
    if (!session) return [];
    if (!BACKEND_DATA.saved || Array.isArray(BACKEND_DATA.saved)) BACKEND_DATA.saved = {};
    return BACKEND_DATA.saved[session.email] || [];
  },
  saveSaved(ids) {
    const session = this.getSession();
    if (!session) return;
    if (!BACKEND_DATA.saved || Array.isArray(BACKEND_DATA.saved)) BACKEND_DATA.saved = {};
    BACKEND_DATA.saved[session.email] = ids;
    syncBackend('saveSaved', BACKEND_DATA.saved);
  },

  // Messages
  getMessages(userEmail) {
    return (BACKEND_DATA.messages || []).filter(m => m.to === userEmail || m.fromEmail === userEmail);
  },
  addMessage(msg) {
    if (!BACKEND_DATA.messages) BACKEND_DATA.messages = [];
    BACKEND_DATA.messages.push(msg); syncBackend('addMessage', msg);
  },
  markRead(id) {
    const m = (BACKEND_DATA.messages || []).find(x => x.id === id);
    if (m) { m.read = true; syncBackend('markRead', id); }
  },
  getNextMsgId() {
    const max = (BACKEND_DATA.messages || []).length > 0 ? Math.max(...BACKEND_DATA.messages.map(m => m.id)) : 0;
    return max + 1;
  },

  // Newsletter subscribers
  subscribeEmail(email) {
    if (!BACKEND_DATA.subscribers) BACKEND_DATA.subscribers = [];
    if (!BACKEND_DATA.subscribers.includes(email)) {
      BACKEND_DATA.subscribers.push(email); syncBackend('subscribeEmail', email);
    }
  },
  isSubscribed(email) { return (BACKEND_DATA.subscribers || []).includes(email); },
};

// ==================== STATE ====================
let ALL_PRODUCTS = [];
let SAVED_IDS = [];
let filteredProducts = [];
let currentPage = 'landing';
let currentProductId = null;
let currentFormStep = 1;
let paginationPage = 1;
const PER_PAGE = 8;
let selectedCategory = null;
let pendingPhotoDataURL = null;

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://localhost:3000/api/data');
    if (res.ok) {
      BACKEND_DATA = await res.json();
    }
  } catch (e) { console.warn("Running in static mode, data will not persist globally unless server.js is running."); }

  ALL_PRODUCTS = DB.getAllListings();
  SAVED_IDS = DB.getSaved();
  filteredProducts = [...ALL_PRODUCTS];

  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1800);

  const session = DB.getSession();
  if (session) updateNavForLoggedInUser(session);

  renderFeatured();
  renderBrowse();
  renderDashboard();

  const savedTheme = localStorage.getItem('evr-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  document.getElementById('hamburger').addEventListener('click', () =>
    document.getElementById('navLinks').classList.toggle('open'));

  document.getElementById('sellForm').addEventListener('submit', handleSellSubmit);

  // Restore newsletter subscription state
  (function () {
    const subs = BACKEND_DATA.subscribers || [];
    const emailInput = document.getElementById('newsletterEmail');
    // Pre-fill with session email if subscribed
    const sess = DB.getSession();
    if (sess && subs.includes(sess.email)) {
      const wrap = document.getElementById('newsletterFormWrap');
      const succ = document.getElementById('newsletterSuccess');
      if (wrap) wrap.style.display = 'none';
      if (succ) succ.style.display = 'block';
    }
  })();

  const zone = document.getElementById('uploadZone');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--accent)'; });
  zone.addEventListener('dragleave', () => zone.style.borderColor = '');
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.style.borderColor = '';
    handlePhotos({ files: e.dataTransfer.files });
  });
});

// ==================== NAVIGATION ====================
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
  document.getElementById('navLinks').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  currentPage = page;
  if (page === 'landing') { ALL_PRODUCTS = DB.getAllListings(); renderFeatured(); }
  if (page === 'browse') { ALL_PRODUCTS = DB.getAllListings(); applyFilters(); }
  if (page === 'dashboard') { renderDashboard(); }
}

// ==================== THEME ====================
function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('evr-theme', next);
  updateThemeIcon(next);
}
function updateThemeIcon(t) { document.getElementById('themeToggle').textContent = t === 'dark' ? '🌙' : '☀️'; }

// ==================== PRODUCT CARD ====================
function conditionClass(c) {
  if (c === 'Like New') return 'condition-like';
  if (c === 'Good') return 'condition-good';
  return 'condition-fair';
}

function createProductCard(p) {
  const saved = SAVED_IDS.includes(p.id);
  const imgContent = p.photo
    ? `<img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" />`
    : `<span>${p.emoji || CAT_EMOJI[p.category] || '🔧'}</span>`;

  return `
    <div class="product-card" onclick="openProduct(${p.id})">
      <div class="product-img" style="${p.photo ? 'padding:0;overflow:hidden;' : ''}">
        ${imgContent}
        <span class="product-badge">${p.category}</span>
      </div>
      <div class="product-body">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-compat">Fits: ${p.compat}</div>
        <div class="product-meta">
          <span class="product-price">₹${Number(p.price).toLocaleString('en-IN')}</span>
          <div class="product-info">
            <span class="product-condition ${conditionClass(p.condition)}">${p.condition}</span>
            <span class="product-rating">★ ${p.rating || 'New'} (${p.reviews || 0})</span>
          </div>
        </div>
        <div class="product-location">📍 ${p.location}</div>
        <div class="product-actions" style="display:flex; gap:0.5rem; margin-top:0.5rem; z-index:2; position:relative;">
          <button class="btn-primary" style="flex:1; padding:0.5rem; font-size:0.9rem;" onclick="buyItem(event, ${p.id})">Buy Item</button>
          <button class="btn-ghost" style="flex:1; padding:0.5rem; font-size:0.9rem;" onclick="toggleCart(event, ${p.id})" id="cart-btn-${p.id}">${saved ? 'Remove from Cart' : 'Add to Cart'}</button>
        </div>
      </div>
    </div>`;
}

// ==================== FEATURED ====================
function renderFeatured() {
  const userListings = DB._getUserListingsRaw()
    .slice().sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt)).slice(0, 4);
  const seedFeatured = SEED_PRODUCTS.filter(p => p.featured);
  const userIds = new Set(userListings.map(p => p.id));
  const filler = seedFeatured.filter(p => !userIds.has(p.id));
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  if (userListings.length > 0) {
    grid.innerHTML =
      '<div class="featured-section-label" style="grid-column:1/-1">' +
      '<span class="new-label-pill">🆕 Recently Listed</span>' +
      '</div>' +
      userListings.map(createProductCard).join('') +
      (filler.length ? (
        '<div class="featured-section-label" style="grid-column:1/-1;margin-top:0.5rem">' +
        '<span class="new-label-pill seed-pill">⭐ Staff Picks</span>' +
        '</div>' +
        filler.map(createProductCard).join('')
      ) : '');
  } else {
    grid.innerHTML = [...seedFeatured].slice(0, 8).map(createProductCard).join('');
  }
}

// ==================== BROWSE + FILTERS ====================
function applyFilters() {
  const search = (document.getElementById('browseSearch')?.value || '').toLowerCase();
  const priceMin = parseFloat(document.getElementById('priceMin')?.value) || 0;
  const priceMax = parseFloat(document.getElementById('priceMax')?.value) || Infinity;
  const condition = document.getElementById('conditionFilter')?.value || '';
  const vehicle = document.getElementById('vehicleFilter')?.value || '';
  const location = document.getElementById('locationFilter')?.value || '';
  const sort = document.getElementById('sortSelect')?.value || 'default';
  const cats = Array.from(document.querySelectorAll('#categoryFilters input[type="checkbox"]:checked')).map(b => b.value);

  filteredProducts = ALL_PRODUCTS.filter(p => {
    if (search && !p.name.toLowerCase().includes(search) && !p.category.toLowerCase().includes(search) && !(p.desc || '').toLowerCase().includes(search)) return false;
    if (p.price < priceMin || p.price > priceMax) return false;
    if (condition && p.condition !== condition) return false;
    if (vehicle && !(p.vehicle || '').toLowerCase().includes(vehicle.toLowerCase()) && !(p.compat || '').toLowerCase().includes(vehicle.toLowerCase())) return false;
    if (location && !(p.location || '').toLowerCase().includes(location.toLowerCase())) return false;
    if (cats.length > 0 && !cats.includes(p.category)) return false;
    if (selectedCategory && p.category !== selectedCategory) return false;
    return true;
  });

  if (sort === 'price-asc') filteredProducts.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filteredProducts.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  else filteredProducts.sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt));

  paginationPage = 1;
  renderBrowse();
}

function renderBrowse() {
  const grid = document.getElementById('browseGrid');
  const countEl = document.getElementById('resultCount');
  if (!grid) return;
  const paginated = filteredProducts.slice((paginationPage - 1) * PER_PAGE, paginationPage * PER_PAGE);

  grid.innerHTML = paginated.length === 0
    ? `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><p>No parts found. Try adjusting your filters.</p></div>`
    : paginated.map(createProductCard).join('');

  if (countEl) countEl.textContent = `Showing ${paginated.length} of ${filteredProducts.length} parts`;
  renderPagination();
}

function renderPagination() {
  const container = document.getElementById('pagination');
  if (!container) return;
  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE);
  if (totalPages <= 1) { container.innerHTML = ''; return; }
  let html = '';
  if (paginationPage > 1) html += `<button class="page-btn" onclick="goPage(${paginationPage - 1})">←</button>`;
  for (let i = 1; i <= totalPages; i++)
    html += `<button class="page-btn ${i === paginationPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
  if (paginationPage < totalPages) html += `<button class="page-btn" onclick="goPage(${paginationPage + 1})">→</button>`;
  container.innerHTML = html;
}

function goPage(n) {
  paginationPage = n; renderBrowse();
  document.querySelector('.browse-main')?.scrollIntoView({ behavior: 'smooth' });
}

function resetFilters() {
  ['browseSearch', 'priceMin', 'priceMax'].forEach(id => document.getElementById(id).value = '');
  ['conditionFilter', 'vehicleFilter', 'locationFilter', 'sortSelect'].forEach(id => document.getElementById(id).value = '');
  document.querySelectorAll('#categoryFilters input[type="checkbox"]').forEach(b => b.checked = false);
  selectedCategory = null;
  ALL_PRODUCTS = DB.getAllListings();
  filteredProducts = [...ALL_PRODUCTS];
  paginationPage = 1;
  renderBrowse();
}

function filterCategory(cat) {
  selectedCategory = cat;
  showPage('browse');
  setTimeout(() => {
    document.querySelectorAll('#categoryFilters input[type="checkbox"]').forEach(b => b.checked = b.value === cat);
    applyFilters();
  }, 100);
}

function doHeroSearch() {
  const val = document.getElementById('heroSearch').value;
  showPage('browse');
  setTimeout(() => { document.getElementById('browseSearch').value = val; applyFilters(); }, 100);
}

// ==================== SAVE/CART TOGGLE ====================
function toggleCart(e, id) {
  if(e) e.stopPropagation();
  const idx = SAVED_IDS.indexOf(id);
  if (idx === -1) { SAVED_IDS.push(id); showToast('🛒 Added to cart!'); }
  else { SAVED_IDS.splice(idx, 1); showToast('🗑️ Removed from cart.', 'info'); }
  DB.saveSaved([...SAVED_IDS]);
  document.querySelectorAll(`#cart-btn-${id}`).forEach(btn => btn.textContent = SAVED_IDS.includes(id) ? 'Remove from Cart' : 'Add to Cart');
  updateDetailCart(id);
  if(currentPage === 'dashboard') renderDashboard();
}

function buyItem(e, id) {
  if(e) e.stopPropagation();
  showToast('💳 Redirecting to checkout...', 'info');
}

// ==================== PRODUCT DETAIL ====================
function openProduct(id) {
  const all = DB.getAllListings();
  const p = all.find(x => x.id === id);
  if (!p) return;
  currentProductId = id;

  const similar = all.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const saved = SAVED_IDS.includes(p.id);

  const mainImg = p.photo
    ? `<img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-lg)" />`
    : `<span style="font-size:7rem">${p.emoji || CAT_EMOJI[p.category] || '🔧'}</span>`;

  // Resolve seller info from users DB
  const sellerUser = p.sellerEmail !== 'seed@ev.com' ? DB.findUserByEmail(p.sellerEmail) : null;
  const sellerName = sellerUser ? `${sellerUser.firstName} ${sellerUser.lastName}` : p.seller;
  const sellerInit = sellerUser ? (sellerUser.firstName[0] + sellerUser.lastName[0]).toUpperCase() : p.sellerInitials;
  const joinYear = sellerUser ? new Date(sellerUser.joinedAt).getFullYear() : 2022;

  document.getElementById('productDetailContent').innerHTML = `
    <div class="product-detail-grid">
      <div>
        <div class="product-gallery-main" id="galleryMain">${mainImg}</div>
        <div class="product-gallery-thumbs">
          <div class="gallery-thumb active">${p.photo ? `<img src="${p.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:6px"/>` : p.emoji || '🔧'}</div>
        </div>
      </div>
      <div class="product-detail-info">
        <div class="detail-cat">${p.category}</div>
        <h1 class="detail-title">${p.name}</h1>
        <div class="detail-price">₹${Number(p.price).toLocaleString('en-IN')}</div>
        <div class="detail-meta">
          <span class="detail-tag ${conditionClass(p.condition)}">${p.condition}</span>
          <span class="detail-tag">★ ${p.rating || 'New'} (${p.reviews || 0} reviews)</span>
          <span class="detail-tag">📍 ${p.location}</span>
        </div>
        <p class="detail-desc">${p.desc}</p>
        <div class="detail-meta" style="margin-bottom:1.5rem">
          <span class="detail-tag">🚗 Fits: ${p.compat}</span>
          ${p.year ? `<span class="detail-tag">📅 ${p.year}</span>` : ''}
          ${p.mileage ? `<span class="detail-tag">🛣️ ${Number(p.mileage).toLocaleString()} mi</span>` : ''}
        </div>
        <div class="detail-cta">
          <button class="btn-primary" onclick="buyItem(event, ${p.id})">💳 Buy Item</button>
          <button class="btn-ghost" id="detail-cart-btn" onclick="toggleCart(event,${p.id})">${saved ? '🛒 Remove from Cart' : '🛒 Add to Cart'}</button>
          <button class="btn-ghost" onclick="contactSeller(${p.id})">💬 Contact Seller</button>
        </div>
        <div class="seller-card">
          <h4>Seller Information</h4>
          <div class="seller-info">
            <div class="seller-avatar">${sellerInit}</div>
            <div>
              <div class="seller-name">${sellerName}</div>
              <div class="seller-stats">★ ${p.rating || 'New'} · ${p.reviews || 0} reviews · Member since ${joinYear}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ${similar.length ? `
    <div class="section" style="padding-top:0">
      <div class="section-header"><h2>Similar Parts</h2></div>
      <div class="products-grid">${similar.map(createProductCard).join('')}</div>
    </div>` : ''}`;

  showPage('product');
}

function updateDetailCart(id) {
  const btn = document.getElementById('detail-cart-btn');
  if (btn) btn.textContent = SAVED_IDS.includes(id) ? '🛒 Remove from Cart' : '🛒 Add to Cart';
}

// ==================== DASHBOARD ====================
function renderDashboard() {
  const session = DB.getSession();

  // Profile sidebar
  const profileEl = document.getElementById('dashProfile');
  if (profileEl) {
    if (session) {
      const initials = (session.firstName[0] + session.lastName[0]).toUpperCase();
      const joinYear = session.joinedAt ? new Date(session.joinedAt).getFullYear() : new Date().getFullYear();
      profileEl.innerHTML = `
        <div class="dash-avatar">${initials}</div>
        <div>
          <strong>${session.firstName} ${session.lastName}</strong>
          <span>⭐ Member since ${joinYear}</span>
        </div>`;
    } else {
      profileEl.innerHTML = `
        <div class="dash-avatar">?</div>
        <div><strong>Guest</strong><span><a href="#" onclick="openModal('login')">Log in</a></span></div>`;
    }
  }

  // Settings form — fill with real user data
  if (session) {
    const user = DB.findUserByEmail(session.email) || session;
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
    setVal('settingFirst', user.firstName);
    setVal('settingLast', user.lastName);
    setVal('settingEmail', user.email);
    setVal('settingPhone', user.phone);
    setVal('settingBio', user.bio);
    setVal('settingLocation', user.location);
    setVal('settingMember', user.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '');
  }

  // My listings
  const ml = document.getElementById('myListingsGrid');
  if (ml) {
    if (!session) {
      ml.innerHTML = `<div class="empty-state"><div class="empty-icon">🔒</div><p>Please <a href="#" onclick="openModal('login')">log in</a> to see your listings.</p></div>`;
    } else {
      const myListings = DB.getUserListings(session.email);
      if (myListings.length === 0) {
        ml.innerHTML = `<div class="empty-state"><div class="empty-icon">📦</div><p>No listings yet. <a href="#" onclick="showPage('sell')">List your first part →</a></p></div>`;
      } else {
        ml.innerHTML = myListings.map(l => `
          <div class="my-listing-item">
            <div class="my-listing-img">
              ${l.photo
            ? `<img src="${l.photo}" alt="${l.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px"/>`
            : `<span style="font-size:1.8rem">${l.emoji || CAT_EMOJI[l.category] || '🔧'}</span>`}
            </div>
            <div class="my-listing-info">
              <strong>${l.name}</strong>
              <span>${l.category} · ${l.condition} · 📍${l.location}</span>
            </div>
            <span class="my-listing-price">₹${Number(l.price).toLocaleString('en-IN')}</span>
            <span class="listing-status status-active">🟢 Active</span>
            <button class="btn-ghost btn-sm" onclick="openProduct(${l.id})">View</button>
            <button class="btn-ghost btn-sm" onclick="deleteMyListing(${l.id})">🗑</button>
          </div>`).join('');
      }
    }
  }

  // Cart parts
  const savedEl = document.getElementById('savedGrid');
  if (savedEl) {
    const items = DB.getAllListings().filter(p => SAVED_IDS.includes(p.id));
    let total = 0;
    items.forEach(i => total += i.price);
    savedEl.innerHTML = items.length === 0
      ? `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🛒</div><p>Your cart is empty.</p></div>`
      : `<div style="grid-column:1/-1; margin-bottom:1rem; padding:1.5rem; background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--border); display:flex; justify-content:space-between; align-items:center;">
           <h3>Cart Total: ₹${total.toLocaleString('en-IN')}</h3>
           <button class="btn-primary" onclick="buyItem(null, null)">Checkout All</button>
         </div>` + items.map(createProductCard).join('');
  }
}

function deleteMyListing(id) {
  if (!confirm('Remove this listing from the marketplace?')) return;
  DB.removeListing(id);
  ALL_PRODUCTS = DB.getAllListings();
  renderDashboard();
  showToast('🗑 Listing removed.', 'info');
}

function switchTab(tab, el) {
  event.preventDefault();
  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.dash-link').forEach(l => l.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  el.classList.add('active');
  if (tab === 'messages') renderMessages();
  else renderDashboard();
}

// ==================== SELL FORM ====================
function nextStep(step) {
  if (!validateStep(step)) return;
  document.getElementById(`formStep${step}`).classList.remove('active');
  document.getElementById(`formStep${step + 1}`).classList.add('active');
  document.querySelectorAll('.sell-step').forEach((s, i) => {
    if (i < step) s.classList.add('done');
    if (i === step) s.classList.add('active');
  });
  currentFormStep = step + 1;
}

function prevStep(step) {
  document.getElementById(`formStep${step}`).classList.remove('active');
  document.getElementById(`formStep${step - 1}`).classList.add('active');
  document.querySelectorAll('.sell-step').forEach((s, i) => { if (i === step - 1) s.classList.remove('active'); });
  currentFormStep = step - 1;
}

function validateStep(step) {
  let valid = true;
  if (step === 1) {
    [{ id: 'partName', label: 'Part name' }, { id: 'partCategory', label: 'Category' }, { id: 'partVehicle', label: 'Vehicle compatibility' }, { id: 'partCondition', label: 'Condition' }, { id: 'partPrice', label: 'Price' }, { id: 'partLocation', label: 'Country' }]
      .forEach(f => {
        const el = document.getElementById(f.id), err = document.getElementById(`err-${f.id}`);
        if (!el.value.trim()) { err.textContent = `${f.label} is required.`; el.style.borderColor = 'var(--red)'; valid = false; }
        else { err.textContent = ''; el.style.borderColor = ''; }
      });
    const price = parseFloat(document.getElementById('partPrice').value);
    if (price && price <= 0) { document.getElementById('err-partPrice').textContent = 'Must be > 0.'; valid = false; }
  }
  if (step === 2) {
    const desc = document.getElementById('partDesc'), err = document.getElementById('err-partDesc');
    if (!desc.value.trim() || desc.value.trim().length < 20) {
      err.textContent = 'Please write at least 20 characters.'; desc.style.borderColor = 'var(--red)'; valid = false;
    } else { err.textContent = ''; desc.style.borderColor = ''; }
  }
  return valid;
}

function handleSellSubmit(e) {
  e.preventDefault();
  const agree = document.getElementById('agreeTerms');
  const err = document.getElementById('err-agreeTerms');
  if (!agree.checked) { err.textContent = 'You must agree to the Terms of Service.'; return; }
  err.textContent = '';

  const session = DB.getSession();
  const name = document.getElementById('partName').value.trim();
  const category = document.getElementById('partCategory').value;
  const vehicle = document.getElementById('partVehicle').value.trim();
  const condition = document.getElementById('partCondition').value;
  const price = parseFloat(document.getElementById('partPrice').value);
  const location = document.getElementById('partLocation').value;
  const desc = document.getElementById('partDesc').value.trim();
  const year = document.getElementById('partYear').value || '';
  const mileage = document.getElementById('partMileage').value || '';
  const shipLocal = document.getElementById('shipLocal').checked;
  const shipNational = document.getElementById('shipNational').checked;

  const sellerName = session ? `${session.firstName} ${session.lastName}` : 'Anonymous Seller';
  const sellerEmail = session ? session.email : 'guest@ev.com';
  const sellerInitials = session ? (session.firstName[0] + session.lastName[0]).toUpperCase() : 'AN';

  const newListing = {
    id: DB.getNextId(),
    name, category, vehicle, compat: vehicle,
    price, condition, location, desc, year, mileage,
    shipLocal, shipNational,
    emoji: CAT_EMOJI[category] || '🔧',
    photo: pendingPhotoDataURL || null,
    seller: sellerName, sellerEmail, sellerInitials,
    rating: 0, reviews: 0,
    featured: false,
    listedAt: new Date().toISOString(),
    status: 'active',
  };

  DB.addListing(newListing);
  ALL_PRODUCTS = DB.getAllListings();

  document.getElementById('sellForm').classList.add('hidden');
  document.getElementById('sellSuccess').classList.remove('hidden');
  showToast('🎉 Your part is now live on the marketplace!');
}

function resetSellForm() {
  document.getElementById('sellForm').reset();
  document.getElementById('sellForm').classList.remove('hidden');
  document.getElementById('sellSuccess').classList.add('hidden');
  document.querySelectorAll('.form-step').forEach((s, i) => s.classList.toggle('active', i === 0));
  document.querySelectorAll('.sell-step').forEach((s, i) => { s.classList.toggle('active', i === 0); s.classList.remove('done'); });
  document.getElementById('photoPreview').innerHTML = '';
  pendingPhotoDataURL = null;
  currentFormStep = 1;
}

function handlePhotos(input) {
  const preview = document.getElementById('photoPreview');
  const files = Array.from(input.files).slice(0, 8);
  preview.innerHTML = '';
  pendingPhotoDataURL = null;

  files.forEach((file, i) => {
    const reader = new FileReader();
    reader.onload = ev => {
      if (i === 0) pendingPhotoDataURL = ev.target.result;
      const thumb = document.createElement('div');
      thumb.className = 'photo-thumb';
      thumb.innerHTML = `<img src="${ev.target.result}" alt="Part photo" />`;
      preview.appendChild(thumb);
    };
    reader.readAsDataURL(file);
  });
  if (files.length > 0) showToast(`📷 ${files.length} photo${files.length > 1 ? 's' : ''} uploaded!`);
}

// ==================== AUTH ====================
function handleSignup() {
  ['signupFirst', 'signupLast', 'signupEmail', 'signupPassword'].forEach(id => {
    document.getElementById(`err-${id}`).textContent = ''; document.getElementById(id).style.borderColor = '';
  });
  document.getElementById('err-signupGlobal').textContent = '';

  const firstName = document.getElementById('signupFirst').value.trim();
  const lastName = document.getElementById('signupLast').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;

  let valid = true;
  if (!firstName) { setFieldError('signupFirst', 'First name is required.'); valid = false; }
  if (!lastName) { setFieldError('signupLast', 'Last name is required.'); valid = false; }
  if (!isValidEmail(email)) { setFieldError('signupEmail', 'Enter a valid email.'); valid = false; }
  if (password.length < 6) { setFieldError('signupPassword', 'Min. 6 characters.'); valid = false; }
  if (!valid) return;

  if (DB.findUserByEmail(email)) {
    document.getElementById('err-signupGlobal').textContent = '⚠️ Email already registered. Please log in.'; return;
  }

  const newUser = { firstName, lastName, email, passwordHash: simpleHash(password), joinedAt: new Date().toISOString(), phone: '', bio: '', location: '' };
  DB.addUser(newUser);
  DB.setSession(newUser);
  showAuthSuccess(`Welcome, ${firstName}! 🎉`, 'Your account has been created. Start buying and selling EV parts today!');
  updateNavForLoggedInUser(newUser);
  showToast(`🎉 Account created! Welcome, ${firstName}!`);
}

function handleLogin() {
  ['loginEmail', 'loginPassword'].forEach(id => {
    document.getElementById(`err-${id}`).textContent = ''; document.getElementById(id).style.borderColor = '';
  });
  document.getElementById('err-loginGlobal').textContent = '';

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  let valid = true;
  if (!isValidEmail(email)) { setFieldError('loginEmail', 'Enter a valid email.'); valid = false; }
  if (!password) { setFieldError('loginPassword', 'Password is required.'); valid = false; }
  if (!valid) return;

  const user = DB.findUserByEmail(email);
  if (!user) { document.getElementById('err-loginGlobal').textContent = '❌ No account found with this email.'; return; }
  if (user.passwordHash !== simpleHash(password)) {
    document.getElementById('err-loginGlobal').textContent = '❌ Incorrect password.';
    document.getElementById('loginPassword').style.borderColor = 'var(--red)'; return;
  }

  DB.setSession(user);
  showAuthSuccess(`Welcome back, ${user.firstName}! ⚡`, 'You have signed in successfully.');
  updateNavForLoggedInUser(user);
  showToast(`✅ Signed in! Welcome back, ${user.firstName}!`);
}

function showAuthSuccess(title, msg) {
  document.querySelectorAll('.modal-form').forEach(f => f.classList.remove('active'));
  document.getElementById('modal-success').classList.add('active');
  document.querySelector('.modal-tabs').style.display = 'none';
  document.getElementById('authSuccessTitle').textContent = title;
  document.getElementById('authSuccessMsg').textContent = msg;
}

function updateNavForLoggedInUser(user) {
  SAVED_IDS = DB.getSaved();
  const actions = document.querySelector('.nav-actions');
  if (!actions) return;
  actions.querySelectorAll('.btn-ghost,.btn-primary,.user-nav-avatar').forEach(b => b.remove());
  const initials = (user.firstName[0] + user.lastName[0]).toUpperCase();
  const avatar = document.createElement('div');
  avatar.className = 'user-nav-avatar'; avatar.innerHTML = `<span>${initials}</span>`;
  avatar.title = `${user.firstName} ${user.lastName}`; avatar.onclick = () => showPage('dashboard');
  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'btn-ghost'; logoutBtn.textContent = 'Logout'; logoutBtn.onclick = handleLogout;
  actions.appendChild(avatar); actions.appendChild(logoutBtn);
}

function handleLogout() {
  DB.clearSession(); showToast('👋 Logged out.', 'info');
  SAVED_IDS = [];
  const actions = document.querySelector('.nav-actions');
  actions.querySelectorAll('.user-nav-avatar,.btn-ghost,.btn-primary').forEach(b => b.remove());
  const ghost = document.createElement('button'); ghost.className = 'btn-ghost'; ghost.textContent = 'Login'; ghost.onclick = () => openModal('login');
  const primary = document.createElement('button'); primary.className = 'btn-primary'; primary.textContent = 'Sign Up'; primary.onclick = () => openModal('signup');
  actions.appendChild(ghost); actions.appendChild(primary);

  // Clear all form fields upon logout
  resetSellForm();
  document.querySelectorAll('.settings-form input, .settings-form textarea').forEach(el => el.value = '');
  document.querySelectorAll('.modal-form input').forEach(el => el.value = '');
  clearModalErrors();

  showPage('landing');
}

// ==================== MODAL ====================
function openModal(tab) {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('open');
  document.querySelector('.modal-tabs').style.display = '';
  document.getElementById('modal-success').classList.remove('active');
  clearModalErrors(); switchModalTab(tab);
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  const session = DB.getSession();
  if (session && document.getElementById('modal-success').classList.contains('active'))
    setTimeout(() => showPage('dashboard'), 200);
}
function switchModalTab(tab) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.modal-form').forEach(f => f.classList.remove('active'));
  document.getElementById(`tab-${tab}-btn`).classList.add('active');
  document.getElementById(`modal-${tab}`).classList.add('active');
  clearModalErrors();
}
function clearModalErrors() {
  ['loginEmail', 'loginPassword', 'signupFirst', 'signupLast', 'signupEmail', 'signupPassword'].forEach(id => {
    const e = document.getElementById(`err-${id}`), i = document.getElementById(id);
    if (e) e.textContent = ''; if (i) { i.style.borderColor = ''; i.value = ''; }
  });
  ['err-loginGlobal', 'err-signupGlobal'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ''; });
}

// ==================== SETTINGS SAVE ====================
function saveSettings(e) {
  e.preventDefault();
  const session = DB.getSession();
  if (!session) { showToast('Please log in first.', 'error'); return; }
  const updates = {
    firstName: document.getElementById('settingFirst')?.value.trim() || session.firstName,
    lastName: document.getElementById('settingLast')?.value.trim() || session.lastName,
    phone: document.getElementById('settingPhone')?.value.trim() || '',
    bio: document.getElementById('settingBio')?.value.trim() || '',
    location: document.getElementById('settingLocation')?.value.trim() || '',
  };
  DB.updateUser(session.email, updates);
  const freshUser = DB.findUserByEmail(session.email);
  DB.setSession(freshUser);
  updateNavForLoggedInUser(freshUser);
  renderDashboard();
  showToast('✅ Profile saved!');
}

// ==================== UTILITIES ====================
function setFieldError(id, msg) {
  document.getElementById(`err-${id}`).textContent = msg;
  document.getElementById(id).style.borderColor = 'var(--red)';
}
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
  return h.toString(16);
}

// Google Sign-In Callback
function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);
  const email = responsePayload.email;
  const firstName = responsePayload.given_name || email.split('@')[0];
  const lastName = responsePayload.family_name || '';

  let user = DB.findUserByEmail(email);
  if (!user) {
    user = { firstName, lastName, email, passwordHash: 'GOOGLE_AUTH', joinedAt: new Date().toISOString(), phone: '', bio: '', location: '' };
    DB.addUser(user);
  }

  DB.setSession(user);
  showAuthSuccess(`Welcome, ${user.firstName}! ⚡`, 'You have successfully signed in using Google.');
  updateNavForLoggedInUser(user);
  showToast(`✅ Signed in! Welcome, ${user.firstName}!`);
}

function decodeJwtResponse(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ==================== TOAST ====================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`; toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0'; toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'opacity 0.3s,transform 0.3s';
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

// ==================== NAVBAR SCROLL ====================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 40
    ? (document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(10,13,18,0.97)' : 'rgba(244,246,251,0.97)') : '';
});

// ==================== MESSAGES ====================
function renderMessages() {
  const session = DB.getSession();
  const container = document.getElementById('messagesList');
  const badge = document.getElementById('msgUnreadBadge');
  if (!container) return;

  if (!session) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🔒</div><p>Please <a href="#" onclick="openModal('login')">log in</a> to see your messages.</p></div>`;
    return;
  }

  const msgs = DB.getMessages(session.email).sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
  const unreadCount = msgs.filter(m => !m.read && m.to === session.email).length;

  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = `${unreadCount} unread`;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }

  // Update nav badge
  const navBadge = document.getElementById('msgNavBadge');
  if (navBadge) {
    navBadge.textContent = unreadCount > 0 ? unreadCount : '';
    navBadge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
  }

  if (msgs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">💬</div>
        <p>No messages yet. When buyers contact you about your listings, they'll appear here.</p>
      </div>`;
    return;
  }

  container.innerHTML = `<div class="messages-list">${msgs.map(m => {
    const isSentByMe = m.fromEmail === session.email;
    const displayName = isSentByMe ? (m.toName || m.to) : m.fromName;
    return `
    <div class="message-item ${m.read || isSentByMe ? '' : 'unread'}" onclick="openMessage(${m.id})">
      <div class="msg-avatar" style="background:${avatarColor(displayName)}">${getInitials(displayName)}</div>
      <div class="msg-body">
        <div class="msg-top">
          <strong>${isSentByMe ? 'To: ' + displayName : m.fromName}</strong>
          <span>${timeAgo(m.sentAt)}</span>
        </div>
        <p>${isSentByMe ? 'You: ' + m.text : m.text}</p>
        ${m.partName ? `<span class="msg-part-ref">Re: ${m.partName}</span>` : ''}
      </div>
      ${!m.read && m.to === session.email ? '<span class="msg-unread-dot"></span>' : ''}
    </div>`}).join('')}</div>`;
}

// The old contactSeller function has been superseded by the one at the end of the file.

// ==================== NEWSLETTER ====================
function subscribeNewsletter() {
  const input = document.getElementById('newsletterEmail');
  const email = input ? input.value.trim() : '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    input.style.borderColor = 'var(--red)';
    input.placeholder = 'Please enter a valid email';
    setTimeout(() => { input.style.borderColor = ''; input.placeholder = 'Enter your email address'; }, 2000);
    return;
  }
  DB.subscribeEmail(email);
  document.getElementById('newsletterFormWrap').style.display = 'none';
  const success = document.getElementById('newsletterSuccess');
  success.style.display = 'block';
  // Animate in
  success.style.opacity = '0';
  success.style.transform = 'translateY(10px)';
  setTimeout(() => {
    success.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    success.style.opacity = '1';
    success.style.transform = 'translateY(0)';
  }, 10);
  showToast('📧 Subscribed! Welcome to the community.');
}

// ==================== HELPERS ====================
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function avatarColor(name) {
  const colors = ['#00e87a', '#3d8bff', '#ff6b6b', '#ffbb00', '#a78bfa', '#34d399'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function timeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(isoStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ==================== REPLY TO MESSAGE ====================
function openMessage(id) {
  const session = DB.getSession();
  if (!session) return;

  // Get the message (fixed to use BACKEND_DATA instead of localStorage)
  const msg = (BACKEND_DATA.messages || []).find(m => m.id === id);
  if (!msg) { renderMessages(); return; }

  // Mark read if we are the recipient
  if (msg.to === session.email) {
    DB.markRead(id);
  }

  const container = document.getElementById('messagesList');
  const isSentByMe = msg.fromEmail === session.email;
  const displayName = isSentByMe ? (msg.toName || msg.to) : msg.fromName;

  // Re-render badge since we might have marked a message as read
  const msgs2 = DB.getMessages(session.email);
  const unread = msgs2.filter(m => !m.read && m.to === session.email).length;
  const nb = document.getElementById('msgNavBadge');
  const mb = document.getElementById('msgUnreadBadge');
  if (nb) { nb.textContent = unread > 0 ? unread : ''; nb.style.display = unread > 0 ? 'inline-flex' : 'none'; }
  if (mb) { mb.textContent = unread > 0 ? `${unread} unread` : ''; mb.style.display = unread > 0 ? 'inline-flex' : 'none'; }

  // Show the thread
  container.innerHTML = `
    <div class="msg-thread">
      <button class="back-btn" onclick="renderMessages()" style="margin-bottom:1.25rem">← Back to Messages</button>
      <div class="msg-thread-card">
        <div class="msg-thread-header">
          <div class="msg-avatar" style="background:${avatarColor(displayName)};width:48px;height:48px;font-size:0.9rem">${getInitials(displayName)}</div>
          <div>
            <strong>${isSentByMe ? 'To: ' + displayName : msg.fromName}</strong>
            <span style="font-size:0.78rem;color:var(--text3);display:block">${new Date(msg.sentAt).toLocaleString()}</span>
          </div>
        </div>
        ${msg.partName ? `<div class="msg-part-banner">📦 Re: <strong>${msg.partName}</strong></div>` : ''}
        <p class="msg-thread-body">${msg.text}</p>
      </div>
      <div class="msg-reply-box">
        <h4>${isSentByMe ? 'Send another message to ' + displayName : 'Reply to ' + msg.fromName}</h4>
        <textarea id="replyText" rows="4" placeholder="${isSentByMe ? 'Type your message...' : 'Type your reply...'}" class="msg-reply-input"></textarea>
        <div class="msg-reply-actions">
          <button class="btn-ghost" onclick="renderMessages()">← Back</button>
          <button class="btn-primary" onclick="sendReply(${msg.id},'${isSentByMe ? msg.to : msg.fromEmail}','${(isSentByMe ? displayName : msg.fromName).replace(/'/g, "\\'")}','${(msg.partName || '').replace(/'/g, "\\'")}')">${isSentByMe ? 'Send Message ⚡' : 'Send Reply ⚡'}</button>
        </div>
      </div>
    </div>`;
}

function sendReply(originalMsgId, toEmail, toName, partName) {
  const session = DB.getSession();
  if (!session) return;
  const text = document.getElementById('replyText')?.value.trim();
  if (!text) { showToast('Please write a reply first.', 'info'); return; }

  const reply = {
    id: DB.getNextMsgId(),
    to: toEmail,
    toName: toName,
    fromEmail: session.email,
    fromName: `${session.firstName} ${session.lastName}`,
    partName: partName || '',
    text,
    sentAt: new Date().toISOString(),
    read: false,
    replyTo: originalMsgId,
  };
  DB.addMessage(reply);
  showToast(`✅ Message sent to ${toName}!`);
  renderMessages();
}

// ==================== CONTACT SELLER ====================
function contactSeller(id) {
  const p = DB.getAllListings().find(x => x.id === id);
  if (!p) return;
  const session = DB.getSession();
  if (!session) {
    showToast('Please log in to message the seller.');
    openModal('login');
    return;
  }
  if (session.email === p.sellerEmail) {
    showToast('You cannot message yourself!');
    return;
  }
  showToast(`Messaging ${p.sellerName || p.seller}...`);
  // Navigate to Dashboard > Messages
  showPage('dashboard');
  setTimeout(() => {
    const tabs = document.querySelectorAll('.dash-link');
    if (tabs.length >= 3) {
      switchTab('messages', tabs[2]);

      const container = document.getElementById('messagesList');
      if (container) {
        container.innerHTML = `
            <div class="msg-thread">
              <button class="back-btn" onclick="renderMessages()" style="margin-bottom:1.25rem">← Back to Messages</button>
              <div class="msg-reply-box">
                <h4>Message ${p.sellerName || p.seller} regarding ${p.name}</h4>
                <textarea id="replyText" rows="4" placeholder="Hello, I am interested..." class="msg-reply-input">Hi ${p.sellerName || p.seller}, I'm interested in your ${p.name} listed for ₹${Number(p.price).toLocaleString('en-IN')}. Is it still available?</textarea>
                <div class="msg-reply-actions">
                  <button class="btn-ghost" onclick="renderMessages()">Cancel</button>
                  <button class="btn-primary" onclick="sendReply(null, '${p.sellerEmail}', '${p.seller.replace(/'/g, "\\'")}', '${p.name.replace(/'/g, "\\'")}')">Send Message ⚡</button>
                </div>
              </div>
            </div>`;
      }
    }
  }, 100);
}