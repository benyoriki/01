/* ============================================
   KONTRAKAN SERUNI 1 — Main App JS
   ============================================ */

'use strict';

// ============================================================
// DEFAULT DATA
// ============================================================
const DEFAULT_ROOMS = [
  {
    id: 'r001', name: 'Kamar Deluxe A1', number: 'A-01',
    price: 900000, priceYear: 9500000,
    status: 'kosong',
    facilities: ['wifi','km_dalam','kasur','lemari','kipas','parkir'],
    description: 'Kamar luas dan bersih dengan kamar mandi dalam, cocok untuk karyawan atau mahasiswa. Pintu langsung menghadap taman belakang.',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    badges: ['best-price'],
    rating: 4.9, area: 12
  },
  {
    id: 'r002', name: 'Kamar Standard B2', number: 'B-02',
    price: 700000, priceYear: 7500000,
    status: 'terisi',
    facilities: ['wifi','kasur','lemari','kipas','parkir'],
    description: 'Kamar standar dengan ventilasi bagus, harga ekonomis namun tetap nyaman untuk tinggal.',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    badges: [],
    rating: 4.7, area: 9
  },
  {
    id: 'r003', name: 'Kamar Premium C3 (AC)', number: 'C-03',
    price: 1200000, priceYear: 13000000,
    status: 'kosong',
    facilities: ['wifi','km_dalam','ac','kasur','lemari','dapur','parkir','cctv'],
    description: 'Kamar premium ber-AC dengan kamar mandi dalam, dapur akses, dan fasilitas lengkap. Paling diminati penghuni.',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    badges: ['popular'],
    rating: 5.0, area: 16
  },
  {
    id: 'r004', name: 'Kamar Deluxe A2', number: 'A-02',
    price: 900000, priceYear: 9500000,
    status: 'booking',
    facilities: ['wifi','km_dalam','kasur','lemari','kipas','parkir'],
    description: 'Kamar deluxe bersebelahan dengan A1, kondisi sama bagus dengan tambahan lemari besar.',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    badges: [],
    rating: 4.8, area: 12
  },
  {
    id: 'r005', name: 'Kamar Standard B3', number: 'B-03',
    price: 700000, priceYear: 7500000,
    status: 'kosong',
    facilities: ['wifi','kasur','kipas','parkir'],
    description: 'Kamar standar baru tersedia, cocok untuk yang mencari hunian terjangkau di area Parung.',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    badges: ['new'],
    rating: 4.6, area: 9
  },
  {
    id: 'r006', name: 'Kamar Premium D1 (AC)', number: 'D-01',
    price: 1350000, priceYear: 14500000,
    status: 'terisi',
    facilities: ['wifi','km_dalam','ac','kasur','lemari','dapur','parkir','cctv','listrik'],
    description: 'Kamar premium terluas, lantai 2, view depan, ber-AC, kamar mandi dalam. Sangat cocok untuk pasangan muda.',
    img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
    badges: ['popular'],
    rating: 5.0, area: 20
  }
];

const DEFAULT_TESTIMONIALS = [
  { name: 'Rina Suryani', room: 'Kamar C3 Premium', stars: 5, text: 'Kamarnya bersih banget, pemiliknya ramah. WiFi kencang, AC dingin. Pokoknya nyaman banget! Sudah 8 bulan disini dan gak mau pindah.' },
  { name: 'Budi Santoso', room: 'Kamar A1 Deluxe', stars: 5, text: 'Harga terjangkau tapi fasilitas lengkap. Lokasi strategis, dekat minimarket dan warung makan. Rekomen banget buat yang cari kos di Parung!' },
  { name: 'Dewi Anggraeni', room: 'Kamar B2 Standard', stars: 4, text: 'Cukup nyaman untuk harga segitu. Pemilik responsif kalau ada masalah. Air selalu lancar, listrik token jadi hemat.' },
  { name: 'Arif Wibowo', room: 'Kamar D1 Premium', stars: 5, text: 'Kamarnya spacious banget untuk kami berdua. Parkir luas, ada CCTV jadi aman. Sangat puas tinggal di Seruni 1!' },
  { name: 'Maya Putri', room: 'Kamar B3 Standard', stars: 4, text: 'Baru pindah minggu lalu, kesan pertama: bersih dan tenang. Tetangga kamar pada baik-baik. Recommended!' },
  { name: 'Hendra Gunawan', room: 'Kamar A2 Deluxe', stars: 5, text: 'Sudah 1 tahun disini. Lingkungan aman, pemilik perhatian. Harga naik sedikit tapi worth it banget lah.' }
];

const DEFAULT_FAQ = [
  { q: 'Bagaimana cara booking kamar?', a: 'Isi form booking di website ini, pilih kamar dan tanggal masuk, lalu kirim via WhatsApp. Admin kami akan konfirmasi dalam 1x24 jam.' },
  { q: 'Apakah ada biaya deposit/jaminan?', a: 'Ya, deposit sebesar 1x harga sewa bulanan. Deposit akan dikembalikan saat keluar, dikurangi kerusakan (jika ada).' },
  { q: 'Apakah boleh masak di kamar?', a: 'Memasak tersedia di dapur bersama. Memasak di kamar tidak diperbolehkan untuk alasan keamanan dan kebersihan.' },
  { q: 'Apakah boleh bawa kendaraan?', a: 'Boleh. Area parkir tersedia untuk motor dan mobil. Parkir termasuk dalam harga sewa.' },
  { q: 'Bagaimana pembayaran listrik dan air?', a: 'Listrik menggunakan token mandiri (bayar sesuai pemakaian). Air sudah termasuk dalam harga sewa bulanan.' },
  { q: 'Apakah boleh bawa tamu?', a: 'Tamu diperbolehkan hingga pukul 22.00 WIB. Tamu menginap tidak diperkenankan tanpa izin pengelola.' }
];

const DEFAULT_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80', caption: 'Area Depan Kontrakan Seruni 1' },
  { src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80', caption: 'Interior Kamar Deluxe' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80', caption: 'Kamar Standard Bersih & Rapi' },
  { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80', caption: 'Kamar Premium Ber-AC' },
  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80', caption: 'Area Ruang Tamu Bersama' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', caption: 'Dapur Bersama Lengkap' }
];

const DEFAULT_SETTINGS = {
  siteName: 'Kontrakan Seruni 1',
  address: 'Jl. Balai Desa Jabon Mekar, Kampung Sawah RT02/03, Jabon Mekar, Kec. Parung, Kabupaten Bogor, Jawa Barat 16330',
  wa: '6281234567890',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.0!2d106.73!3d-6.44!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e920c703f187%3A0x12cb024fb56d925!2sKontrakan+Seruni+1!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
  rules: '1. Bayar sewa tepat waktu (setiap tanggal 1)\n2. Jaga kebersihan kamar dan area bersama\n3. Tidak boleh berisik setelah pukul 22.00\n4. Tamu maksimal sampai pukul 22.00 WIB\n5. Tidak diperbolehkan memelihara hewan\n6. Dilarang membawa barang berbahaya\n7. Lapor pengelola jika ada kerusakan fasilitas\n8. Merokok hanya di area yang telah ditentukan',
  defaultTheme: 'light',
  heroBg: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80',
  adminUser: 'admin',
  adminPass: 'seruni2024'
};

// ============================================================
// STORAGE HELPERS
// ============================================================
function getData(key, fallback) {
  try {
    const raw = localStorage.getItem('seruni_' + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function setData(key, val) {
  try { localStorage.setItem('seruni_' + key, JSON.stringify(val)); } catch (e) {}
}
function initData() {
  if (!localStorage.getItem('seruni_rooms')) setData('rooms', DEFAULT_ROOMS);
  if (!localStorage.getItem('seruni_testimonials')) setData('testimonials', DEFAULT_TESTIMONIALS);
  if (!localStorage.getItem('seruni_faq')) setData('faq', DEFAULT_FAQ);
  if (!localStorage.getItem('seruni_gallery')) setData('gallery', DEFAULT_GALLERY);
  if (!localStorage.getItem('seruni_settings')) setData('settings', DEFAULT_SETTINGS);
  if (!localStorage.getItem('seruni_bookings')) setData('bookings', []);
  if (!localStorage.getItem('seruni_visitors')) {
    const v = getData('visitors', 0) + 1;
    setData('visitors', v);
  } else {
    const v = getData('visitors', 0) + 1;
    setData('visitors', v);
  }
}

// ============================================================
// THEME
// ============================================================
function initTheme() {
  const settings = getData('settings', DEFAULT_SETTINGS);
  const saved = localStorage.getItem('seruni_theme');
  const preferred = saved || settings.defaultTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(preferred);
}
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('seruni_theme', t);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  applyTheme(cur === 'dark' ? 'light' : 'dark');
}

// ============================================================
// LOADING SCREEN
// ============================================================
function hideLoading() {
  setTimeout(() => {
    const ls = document.getElementById('loadingScreen');
    if (ls) ls.classList.add('hide');
  }, 2000);
}

// ============================================================
// SECRET ADMIN TRIGGER
// ============================================================
let secretClicks = 0, secretTimer = null;
function initSecretTrigger() {
  const trigger = document.getElementById('secretTrigger');
  const navLogo = document.getElementById('navLogo');
  [trigger, navLogo].forEach(el => {
    if (!el) return;
    el.addEventListener('click', (e) => {
      if (el === navLogo) e.preventDefault();
      secretClicks++;
      if (secretClicks === 1) {
        secretTimer = setTimeout(() => { secretClicks = 0; }, 3000);
      }
      if (secretClicks >= 5) {
        clearTimeout(secretTimer);
        secretClicks = 0;
        showToast('🔐 Membuka panel admin...', 'info');
        setTimeout(() => { window.location.href = 'admin.html'; }, 800);
      }
    });
  });
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    navbar.classList.remove('menu-open');
    if (navOverlay) navOverlay.classList.remove('show');
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Back to top
    const btt = document.getElementById('backToTop');
    if (btt) {
      if (window.scrollY > 400) btt.classList.add('show');
      else btt.classList.remove('show');
    }

    // Active bottom nav
    updateBottomNav();
  });

  hamburger.addEventListener('click', () => {
    const isOpen = !navLinks.classList.contains('open');
    hamburger.classList.toggle('active', isOpen);
    navLinks.classList.toggle('open', isOpen);
    navbar.classList.toggle('menu-open', isOpen);
    if (navOverlay) navOverlay.classList.toggle('show', isOpen);
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', closeMenu);
  });

  // Close menu on overlay click
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);

  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function updateBottomNav() {
  const sections = ['hero','rooms','gallery','booking','contact'];
  const items = document.querySelectorAll('.bottom-nav-item');
  let active = 0;
  sections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) active = i;
  });
  items.forEach((it, i) => {
    it.classList.toggle('active', i === active);
  });
}

// ============================================================
// HERO
// ============================================================
function initHero() {
  const settings = getData('settings', DEFAULT_SETTINGS);
  const rooms = getData('rooms', DEFAULT_ROOMS);
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    heroBg.style.backgroundImage = `url('${settings.heroBg}')`;
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  // WA buttons
  const waUrl = `https://wa.me/${settings.wa}?text=Halo%20Seruni%201%2C%20saya%20ingin%20menanyakan%20kamar%20yang%20tersedia.`;
  const heroWa = document.getElementById('heroWa');
  const floatingWa = document.getElementById('floatingWa');
  if (heroWa) heroWa.href = waUrl;
  if (floatingWa) floatingWa.href = waUrl;

  // Stats
  const empty = rooms.filter(r => r.status === 'kosong').length;
  const heroEmpty = document.getElementById('heroEmptyRooms');
  const heroTotal = document.getElementById('heroTotalRooms');
  if (heroEmpty) heroEmpty.textContent = empty;
  if (heroTotal) heroTotal.textContent = rooms.length;

  // Particles
  createParticles();
}

function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${4 + Math.random() * 6}s;
      --delay: ${Math.random() * 4}s;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
    `;
    container.appendChild(p);
  }
}

// ============================================================
// COUNTERS
// ============================================================
function initCounters() {
  const rooms = getData('rooms', DEFAULT_ROOMS);
  const visitors = getData('visitors', 856);
  const bookings = getData('bookings', []);

  const counters = document.querySelectorAll('.stat-number');
  const targets = [
    rooms.length,
    rooms.filter(r => r.status === 'kosong').length,
    visitors,
    bookings.length + 48
  ];
  counters.forEach((el, i) => {
    el.setAttribute('data-target', targets[i] || el.getAttribute('data-target'));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target).toLocaleString('id-ID');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ============================================================
// ROOMS
// ============================================================
let currentFilter = 'all', currentSearch = '', currentPrice = '', currentFacility = '';

function initRooms() {
  renderRooms();
  initRoomFilters();
  populateBookingRoomSelect();
}

function renderRooms() {
  const grid = document.getElementById('roomsGrid');
  if (!grid) return;

  // Show skeletons
  grid.innerHTML = Array(6).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-line"></div>
        <div class="skeleton skeleton-line short"></div>
        <div class="skeleton skeleton-line shorter"></div>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    let rooms = getData('rooms', DEFAULT_ROOMS);

    // Filter
    if (currentFilter !== 'all') rooms = rooms.filter(r => r.status === currentFilter);
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      rooms = rooms.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.facilities.some(f => f.includes(q))
      );
    }
    if (currentPrice) {
      const [min, max] = currentPrice.split('-').map(Number);
      rooms = rooms.filter(r => r.price >= min && r.price <= max);
    }
    if (currentFacility) {
      rooms = rooms.filter(r => r.facilities.includes(currentFacility));
    }

    const emptyState = document.getElementById('emptyState');

    if (rooms.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }
    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = rooms.map(r => roomCardHTML(r)).join('');

    // Observe for reveal
    grid.querySelectorAll('.room-card').forEach((card, i) => {
      card.style.setProperty('--delay', `${i * 0.07}s`);
      card.classList.add('reveal-up');
      revealObserver.observe(card);
      card.addEventListener('click', () => openRoomModal(r.id));
    });
  }, 600);
}

function roomCardHTML(r) {
  const allRooms = getData('rooms', DEFAULT_ROOMS);
  const room = allRooms.find(x => x.id === r.id) || r;
  const priceStr = formatPrice(room.price);
  const statusLabel = { kosong: 'Tersedia', terisi: 'Terisi', booking: 'Di-booking' };
  const badgeMap = { popular: 'Paling Diminati', 'best-price': 'Harga Terbaik', new: 'Baru Tersedia' };

  const facIcons = { wifi: 'fa-wifi', km_dalam: 'fa-bath', ac: 'fa-snowflake', kasur: 'fa-bed', lemari: 'fa-archive', dapur: 'fa-utensils', parkir: 'fa-car', cctv: 'fa-video', kipas: 'fa-fan', listrik: 'fa-bolt', air: 'fa-tint' };
  const facLabel = { wifi: 'WiFi', km_dalam: 'KM Dalam', ac: 'AC', kasur: 'Kasur', lemari: 'Lemari', dapur: 'Dapur', parkir: 'Parkir', cctv: 'CCTV', kipas: 'Kipas', listrik: 'Listrik', air: 'Air' };

  const facHTML = room.facilities.slice(0, 4).map(f => `
    <span class="room-fac"><i class="fas ${facIcons[f] || 'fa-check'}"></i>${facLabel[f] || f}</span>
  `).join('');

  const imgHTML = room.img
    ? `<img src="${room.img}" alt="${room.name}" class="room-img" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';

  const badgeHTML = [
    `<span class="room-badge badge-${room.status}">${statusLabel[room.status]}</span>`,
    ...room.badges.map(b => `<span class="room-badge badge-${b}">${badgeMap[b] || b}</span>`)
  ].join('');

  return `
    <div class="room-card ripple" data-id="${room.id}">
      <div class="room-img-wrap">
        ${imgHTML}
        <div class="room-img-placeholder" style="display:${room.img ? 'none' : 'flex'}">
          <i class="fas fa-home"></i>
        </div>
        <div class="room-badges">${badgeHTML}</div>
      </div>
      <div class="room-info">
        <h3 class="room-name">${room.name}</h3>
        <p class="room-location"><i class="fas fa-map-marker-alt"></i> No. ${room.number} · ${room.area || 9}m²</p>
        <div class="room-facilities">${facHTML}</div>
        <div class="room-footer">
          <div class="room-price">
            <div class="room-price-label">Mulai dari</div>
            <div class="room-price-value">${priceStr}</div>
            <div class="room-price-period">/bulan</div>
          </div>
          <button class="btn-room-detail" onclick="event.stopPropagation();openRoomModal('${room.id}')">Detail</button>
        </div>
      </div>
    </div>
  `;
}

function initRoomFilters() {
  const searchInput = document.getElementById('searchInput');
  const priceFilter = document.getElementById('priceFilter');
  const facilityFilter = document.getElementById('facilityFilter');
  const chips = document.querySelectorAll('.chip');

  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentSearch = e.target.value.trim();
        renderRooms();
      }, 300);
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.filter;
      renderRooms();
    });
  });

  if (priceFilter) priceFilter.addEventListener('change', e => { currentPrice = e.target.value; renderRooms(); });
  if (facilityFilter) facilityFilter.addEventListener('change', e => { currentFacility = e.target.value; renderRooms(); });
}

function resetFilters() {
  currentFilter = 'all'; currentSearch = ''; currentPrice = ''; currentFacility = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('priceFilter').value = '';
  document.getElementById('facilityFilter').value = '';
  document.querySelectorAll('.chip').forEach((c, i) => c.classList.toggle('active', i === 0));
  renderRooms();
}
window.resetFilters = resetFilters;

// ============================================================
// ROOM MODAL
// ============================================================
function openRoomModal(id) {
  const rooms = getData('rooms', DEFAULT_ROOMS);
  const room = rooms.find(r => r.id === id);
  if (!room) return;

  const settings = getData('settings', DEFAULT_SETTINGS);
  const waMsg = encodeURIComponent(`Halo, saya tertarik dengan *${room.name}* (No. ${room.number}) seharga ${formatPrice(room.price)}/bulan. Apakah masih tersedia?`);
  const waUrl = `https://wa.me/${settings.wa}?text=${waMsg}`;

  const facIcons = { wifi: 'fa-wifi', km_dalam: 'fa-bath', ac: 'fa-snowflake', kasur: 'fa-bed', lemari: 'fa-archive', dapur: 'fa-utensils', parkir: 'fa-car', cctv: 'fa-video', kipas: 'fa-fan', listrik: 'fa-bolt', air: 'fa-tint' };
  const facLabel = { wifi: 'WiFi', km_dalam: 'KM Dalam', ac: 'AC', kasur: 'Kasur', lemari: 'Lemari', dapur: 'Dapur', parkir: 'Parkir', cctv: 'CCTV', kipas: 'Kipas', listrik: 'Listrik', air: 'Air' };

  const statusLabel = { kosong: 'Tersedia', terisi: 'Terisi', booking: 'Di-booking' };
  const stars = '⭐'.repeat(Math.floor(room.rating || 5));

  const body = document.getElementById('modalBody');
  body.innerHTML = `
    ${room.img ? `<img src="${room.img}" alt="${room.name}" class="modal-room-img">` : ''}
    <div style="padding:0 4px">
      <h2 class="modal-room-title">${room.name}</h2>
      <div class="modal-room-price">${formatPrice(room.price)}<span style="font-size:18px;font-weight:400">/bulan</span></div>
      <div class="modal-room-price-year">atau ${formatPrice(room.priceYear)}/tahun (hemat ${formatPrice(room.price * 12 - room.priceYear)})</div>
      <div class="modal-status-row">
        <span class="room-badge badge-${room.status}">${statusLabel[room.status]}</span>
        <span style="font-size:13px;color:var(--text-muted)">${stars} (${room.rating})</span>
        <span style="font-size:13px;color:var(--text-muted)">· ${room.area || 9}m²</span>
      </div>

      <div class="modal-section-title">Fasilitas</div>
      <div class="modal-facilities">
        ${room.facilities.map(f => `<span class="modal-fac"><i class="fas ${facIcons[f] || 'fa-check'}"></i>${facLabel[f] || f}</span>`).join('')}
      </div>

      <div class="modal-section-title">Deskripsi</div>
      <p class="modal-desc">${room.description}</p>

      <div class="modal-cta">
        <a href="${waUrl}" target="_blank" class="btn-modal-book">
          <i class="fab fa-whatsapp"></i> Tanya via WhatsApp
        </a>
        <button class="btn-modal-share" onclick="shareRoom('${room.id}')">
          <i class="fas fa-share-alt"></i> Bagikan
        </button>
      </div>
    </div>
  `;

  const modal = document.getElementById('roomModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Log activity
  logActivity(`Melihat detail kamar: ${room.name}`);
}

window.shareRoom = function(id) {
  const rooms = getData('rooms', DEFAULT_ROOMS);
  const room = rooms.find(r => r.id === id);
  if (!room) return;
  const text = `🏠 *${room.name}* - Kontrakan Seruni 1\n💰 ${formatPrice(room.price)}/bulan\n📍 Parung, Bogor\n\nHubungi kami untuk info lebih lanjut!`;
  if (navigator.share) {
    navigator.share({ title: room.name, text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => showToast('Info kamar disalin!', 'success'));
  }
};

function initModals() {
  document.getElementById('modalClose').addEventListener('click', closeRoomModal);
  document.getElementById('roomModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeRoomModal();
  });
  document.getElementById('rulesModalClose').addEventListener('click', () => {
    document.getElementById('rulesModal').classList.remove('open');
    document.body.style.overflow = '';
  });
  document.getElementById('rulesModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('rulesModal').classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  document.getElementById('footerRules').addEventListener('click', (e) => {
    e.preventDefault();
    openRulesModal();
  });
}

function closeRoomModal() {
  document.getElementById('roomModal').classList.remove('open');
  document.body.style.overflow = '';
}

function openRulesModal() {
  const settings = getData('settings', DEFAULT_SETTINGS);
  const body = document.getElementById('rulesBody');
  body.innerHTML = `
    <h2 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--text);margin-bottom:20px;margin-top:8px">
      📋 Peraturan Kos Seruni 1
    </h2>
    <div style="font-size:14px;line-height:2;color:var(--text-muted);white-space:pre-line">${settings.rules}</div>
  `;
  document.getElementById('rulesModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ============================================================
// GALLERY
// ============================================================
let galleryIndex = 0;
let galleryImages = [];

function initGallery() {
  galleryImages = getData('gallery', DEFAULT_GALLERY);
  const track = document.getElementById('galleryTrack');
  const dots = document.getElementById('galleryDots');
  if (!track) return;

  track.innerHTML = galleryImages.map((g, i) => `
    <div class="gallery-slide">
      <img src="${g.src}" alt="${g.caption}" loading="lazy" onclick="openLightbox(${i})">
      <div class="gallery-caption">${g.caption}</div>
    </div>
  `).join('');

  dots.innerHTML = galleryImages.map((_, i) => `
    <div class="gallery-dot ${i === 0 ? 'active' : ''}" onclick="goGallery(${i})"></div>
  `).join('');

  document.getElementById('galleryPrev').addEventListener('click', () => goGallery(galleryIndex - 1));
  document.getElementById('galleryNext').addEventListener('click', () => goGallery(galleryIndex + 1));

  // Touch swipe
  let touchStart = 0;
  const slider = document.getElementById('gallerySlider');
  slider.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goGallery(diff > 0 ? galleryIndex + 1 : galleryIndex - 1);
  });

  // Auto slide
  setInterval(() => goGallery(galleryIndex + 1), 5000);

  // Lightbox
  initLightbox();
}

function goGallery(idx) {
  galleryIndex = (idx + galleryImages.length) % galleryImages.length;
  document.getElementById('galleryTrack').style.transform = `translateX(-${galleryIndex * 100}%)`;
  document.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('active', i === galleryIndex));
}
window.goGallery = goGallery;

function initLightbox() {
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxOverlay').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => openLightbox(galleryIndex - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => openLightbox(galleryIndex + 1));
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(galleryIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(galleryIndex + 1);
  });
}

function openLightbox(idx) {
  galleryIndex = (idx + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lightboxImg');
  img.src = galleryImages[galleryIndex].src;
  img.alt = galleryImages[galleryIndex].caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openLightbox = openLightbox;

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// BOOKING
// ============================================================
function populateBookingRoomSelect() {
  const select = document.getElementById('bookRoom');
  if (!select) return;
  const rooms = getData('rooms', DEFAULT_ROOMS);
  const available = rooms.filter(r => r.status === 'kosong');
  select.innerHTML = `<option value="">Pilih kamar yang diinginkan</option>` +
    available.map(r => `<option value="${r.name}">${r.name} — ${formatPrice(r.price)}/bulan</option>`).join('');
}

function initBooking() {
  const btn = document.getElementById('bookingSubmit');
  if (!btn) return;

  // Set min date to today
  const dateInput = document.getElementById('bookDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  btn.addEventListener('click', submitBooking);

  // Add ripple effect
  btn.classList.add('ripple');
  btn.addEventListener('click', rippleEffect);
}

function submitBooking() {
  const name = document.getElementById('bookName').value.trim();
  const wa = document.getElementById('bookWa').value.trim();
  const room = document.getElementById('bookRoom').value;
  const date = document.getElementById('bookDate').value;
  const duration = document.getElementById('bookDuration').value;
  const note = document.getElementById('bookNote').value.trim();

  if (!name) { showToast('Nama lengkap wajib diisi!', 'error'); return; }
  if (!wa || wa.length < 10) { showToast('Nomor WhatsApp tidak valid!', 'error'); return; }
  if (!room) { showToast('Pilih kamar yang diinginkan!', 'error'); return; }
  if (!date) { showToast('Tanggal masuk wajib diisi!', 'error'); return; }

  // Save booking
  const bookings = getData('bookings', []);
  const booking = {
    id: 'bk_' + Date.now(),
    name: sanitize(name),
    wa: sanitize(wa),
    room: sanitize(room),
    date, duration,
    note: sanitize(note),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  bookings.push(booking);
  setData('bookings', bookings);

  logActivity(`Booking baru: ${name} - ${room}`);

  // Open WhatsApp
  const settings = getData('settings', DEFAULT_SETTINGS);
  const dateFormatted = new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const msg = `Halo Admin Seruni 1 👋\n\nSaya ingin *booking kamar* dengan detail:\n\n📋 *Data Penyewa:*\n• Nama: ${name}\n• WhatsApp: ${wa}\n\n🏠 *Detail Kamar:*\n• Kamar: ${room}\n• Tanggal Masuk: ${dateFormatted}\n• Durasi: ${duration}\n${note ? `\n📝 Catatan: ${note}` : ''}\n\nMohon konfirmasinya. Terima kasih! 🙏`;
  const waUrl = `https://wa.me/${settings.wa}?text=${encodeURIComponent(msg)}`;

  showToast('Booking berhasil! Membuka WhatsApp...', 'success');
  setTimeout(() => window.open(waUrl, '_blank'), 1000);

  // Reset form
  document.getElementById('bookName').value = '';
  document.getElementById('bookWa').value = '';
  document.getElementById('bookRoom').value = '';
  document.getElementById('bookNote').value = '';
}

// ============================================================
// TESTIMONIALS
// ============================================================
function initTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;
  const testimonials = getData('testimonials', DEFAULT_TESTIMONIALS);
  grid.innerHTML = testimonials.map((t, i) => `
    <div class="testimonial-card reveal-up" style="--delay:${i * 0.1}s">
      <div class="testimonial-header">
        <div class="testimonial-avatar">${t.name[0]}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-room">${t.room}</div>
        </div>
      </div>
      <div class="testimonial-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p class="testimonial-text">"${t.text}"</p>
    </div>
  `).join('');

  grid.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
}

// ============================================================
// FAQ
// ============================================================
function initFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;
  const faqs = getData('faq', DEFAULT_FAQ);
  list.innerHTML = faqs.map((f, i) => `
    <div class="faq-item reveal-up" style="--delay:${i * 0.08}s">
      <div class="faq-question" onclick="toggleFAQ(this)">
        <span>${f.q}</span>
        <div class="faq-icon"><i class="fas fa-plus"></i></div>
      </div>
      <div class="faq-answer"><p>${f.a}</p></div>
    </div>
  `).join('');

  list.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
}

window.toggleFAQ = function(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
};

// ============================================================
// CONTACT
// ============================================================
function initContact() {
  const settings = getData('settings', DEFAULT_SETTINGS);
  const addr = document.getElementById('contactAddress');
  const waEl = document.getElementById('contactWa');
  const maps = document.getElementById('mapsEmbed');
  if (addr) addr.textContent = settings.address;
  if (waEl) waEl.textContent = '+' + settings.wa;
  if (maps) maps.src = settings.mapsEmbed;
}

// ============================================================
// REVEAL ON SCROLL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

function initReveal() {
  document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
window.showToast = showToast;

// ============================================================
// RIPPLE EFFECT
// ============================================================
function rippleEffect(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height);
  ripple.className = 'ripple-effect';
  ripple.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${e.clientX - rect.left - size/2}px;
    top: ${e.clientY - rect.top - size/2}px;
  `;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function initRipples() {
  document.querySelectorAll('.ripple').forEach(el => {
    el.addEventListener('click', rippleEffect);
  });
}

// ============================================================
// CUSTOM CURSOR (Desktop only)
// ============================================================
function initCursor() {
  if (window.matchMedia('(hover: hover)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .room-card, .facility-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }
}

// ============================================================
// PARALLAX HERO
// ============================================================
function initParallax() {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

// ============================================================
// ACTIVITY LOG
// ============================================================
function logActivity(action) {
  const logs = getData('activity_log', []);
  logs.unshift({ action, time: new Date().toISOString() });
  if (logs.length > 100) logs.pop();
  setData('activity_log', logs);
}

// ============================================================
// SANITIZE INPUT
// ============================================================
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============================================================
// FORMAT PRICE
// ============================================================
function formatPrice(n) {
  if (!n) return 'Rp0';
  if (n >= 1000000) return 'Rp' + (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'jt';
  return 'Rp' + n.toLocaleString('id-ID');
}
window.formatPrice = formatPrice;

// ============================================================
// OPEN ROOM MODAL FROM OUTSIDE
// ============================================================
window.openRoomModal = openRoomModal;

// ============================================================
// INIT ALL
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initData();
  initTheme();
  hideLoading();
  initNavbar();
  initHero();
  initCounters();
  initRooms();
  initGallery();
  initBooking();
  initTestimonials();
  initFAQ();
  initContact();
  initReveal();
  initModals();
  initRipples();
  initCursor();
  initParallax();
  initSecretTrigger();

  // Detect color scheme change
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('seruni_theme')) applyTheme(e.matches ? 'dark' : 'light');
  });
});