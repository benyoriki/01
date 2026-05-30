/* ============================================
   KONTRAKAN SERUNI 1 — Admin JS
   ============================================ */

'use strict';

// ============================================================
// AUTH
// ============================================================
const SESSION_KEY = 'seruni_admin_session';
const SESSION_TIMEOUT = 2 * 60 * 60 * 1000; // 2 jam

function checkSession() {
  const s = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  if (!s) return false;
  if (Date.now() - s.time > SESSION_TIMEOUT) {
    localStorage.removeItem(SESSION_KEY);
    return false;
  }
  return true;
}

function createSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user, time: Date.now() }));
  logAdminActivity(`Login sebagai "${user}"`);
}

function destroySession() {
  logAdminActivity('Logout dari admin panel');
  localStorage.removeItem(SESSION_KEY);
}

function initLogin() {
  const loginScreen = document.getElementById('loginScreen');
  const adminApp = document.getElementById('adminApp');

  if (checkSession()) {
    loginScreen.style.display = 'none';
    adminApp.style.display = 'flex';
    initAdminApp();
    return;
  }

  const toggleBtn = document.getElementById('togglePass');
  const passInput = document.getElementById('loginPass');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const show = passInput.type === 'password';
      passInput.type = show ? 'text' : 'password';
      toggleBtn.querySelector('i').className = show ? 'fas fa-eye-slash' : 'fas fa-eye';
    });
  }

  const loginBtn = document.getElementById('loginBtn');
  const doLogin = () => {
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;
    const settings = getData('settings', DEFAULT_SETTINGS);

    if (!user || !pass) {
      adminToast('Username dan password wajib diisi!', 'error');
      return;
    }
    if (user === settings.adminUser && pass === settings.adminPass) {
      createSession(user);
      loginScreen.style.display = 'none';
      adminApp.style.display = 'flex';
      initAdminApp();
    } else {
      adminToast('Username atau password salah!', 'error');
      document.getElementById('loginPass').value = '';
    }
  };

  loginBtn.addEventListener('click', doLogin);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && loginScreen.style.display !== 'none') doLogin();
  });
}

// ============================================================
// ADMIN TOAST
// ============================================================
function adminToast(msg, type = 'info') {
  const c = document.getElementById('adminToast');
  if (!c) { showToast(msg, type); return; }
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fas ${icons[type]}"></i><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('hide'); setTimeout(() => t.remove(), 300); }, 3000);
}

// ============================================================
// ACTIVITY LOG
// ============================================================
function logAdminActivity(action) {
  const logs = getData('admin_log', []);
  logs.unshift({ action, time: new Date().toISOString() });
  if (logs.length > 200) logs.pop();
  setData('admin_log', logs);
}

// ============================================================
// INIT ADMIN APP
// ============================================================
let currentPage = 'dashboard';

function initAdminApp() {
  initAdminTheme();
  initAdminSidebar();
  initAdminModals();
  renderPage('dashboard');

  document.getElementById('logoutBtn').addEventListener('click', () => {
    showConfirm('Yakin mau logout?', () => {
      destroySession();
      location.reload();
    });
  });

  // Session ping every 10min
  setInterval(() => {
    if (!checkSession()) {
      adminToast('Sesi berakhir. Silakan login ulang.', 'error');
      setTimeout(() => location.reload(), 2000);
    }
  }, 10 * 60 * 1000);
}

// ============================================================
// THEME
// ============================================================
function initAdminTheme() {
  const saved = localStorage.getItem('seruni_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  const icon = document.getElementById('adminThemeIcon');
  if (icon) icon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

  document.getElementById('adminThemeToggle').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('seruni_theme', next);
    const ic = document.getElementById('adminThemeIcon');
    if (ic) ic.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });
}

// ============================================================
// SIDEBAR
// ============================================================
function initAdminSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('menuToggle');
  const close = document.getElementById('sidebarClose');

  toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  close.addEventListener('click', () => sidebar.classList.remove('open'));

  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      renderPage(page);
      if (window.innerWidth < 900) sidebar.classList.remove('open');
    });
  });

  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
  const avatar = document.getElementById('adminAvatar');
  if (avatar) avatar.textContent = (session.user || 'A')[0].toUpperCase();
}

// ============================================================
// PAGE ROUTER
// ============================================================
function renderPage(page) {
  currentPage = page;
  const titles = {
    dashboard: 'Dashboard', rooms: 'Kelola Kamar', bookings: 'Data Booking',
    gallery: 'Kelola Galeri', testimonials: 'Kelola Testimoni', faq: 'Kelola FAQ',
    settings: 'Pengaturan', activity: 'Log Aktivitas'
  };
  document.getElementById('pageTitle').textContent = titles[page] || page;
  const content = document.getElementById('adminContent');

  const pages = {
    dashboard: pageDashboard,
    rooms: pageRooms,
    bookings: pageBookings,
    gallery: pageGallery,
    testimonials: pageTestimonials,
    faq: pageFAQ,
    settings: pageSettings,
    activity: pageActivity
  };

  content.innerHTML = '';
  content.style.opacity = '0';
  setTimeout(() => {
    (pages[page] || pageDashboard)();
    content.style.transition = 'opacity 0.3s ease';
    content.style.opacity = '1';
  }, 80);
}

// ============================================================
// PAGE: DASHBOARD
// ============================================================
function pageDashboard() {
  const rooms = getData('rooms', DEFAULT_ROOMS);
  const bookings = getData('bookings', []);
  const visitors = getData('visitors', 856);
  const kosong = rooms.filter(r => r.status === 'kosong').length;
  const terisi = rooms.filter(r => r.status === 'terisi').length;
  const booking = rooms.filter(r => r.status === 'booking').length;

  const estimasi = rooms.filter(r => r.status === 'terisi').reduce((s, r) => s + r.price, 0);

  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <!-- Stats -->
    <div class="dash-stats">
      <div class="dash-stat">
        <div class="dash-stat-icon" style="background:linear-gradient(135deg,rgba(102,126,234,0.15),rgba(118,75,162,0.1))">
          <i class="fas fa-door-open" style="color:var(--primary)"></i>
        </div>
        <div>
          <div class="dash-stat-num">${rooms.length}</div>
          <div class="dash-stat-label">Total Kamar</div>
        </div>
        <span class="dash-stat-badge" style="background:rgba(102,126,234,0.1);color:var(--primary)">${rooms.length} unit</span>
      </div>
      <div class="dash-stat">
        <div class="dash-stat-icon" style="background:linear-gradient(135deg,rgba(67,233,123,0.15),rgba(56,249,215,0.1))">
          <i class="fas fa-check-circle" style="color:#10b759"></i>
        </div>
        <div>
          <div class="dash-stat-num">${kosong}</div>
          <div class="dash-stat-label">Kamar Kosong</div>
        </div>
        <span class="dash-stat-badge" style="background:rgba(67,233,123,0.1);color:#10b759">Tersedia</span>
      </div>
      <div class="dash-stat">
        <div class="dash-stat-icon" style="background:rgba(255,107,107,0.1)">
          <i class="fas fa-users" style="color:var(--danger)"></i>
        </div>
        <div>
          <div class="dash-stat-num">${terisi}</div>
          <div class="dash-stat-label">Kamar Terisi</div>
        </div>
        <span class="dash-stat-badge" style="background:rgba(255,107,107,0.1);color:var(--danger)">${Math.round(terisi/rooms.length*100)}%</span>
      </div>
      <div class="dash-stat">
        <div class="dash-stat-icon" style="background:rgba(246,211,101,0.15)">
          <i class="fas fa-wallet" style="color:#b7791f"></i>
        </div>
        <div>
          <div class="dash-stat-num">${formatPrice(estimasi)}</div>
          <div class="dash-stat-label">Est. Pemasukan/Bulan</div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="dash-grid">
      <!-- Room Status Donut -->
      <div class="dash-card">
        <div class="dash-card-title">Status Kamar <span style="font-size:12px;color:var(--text-muted);font-weight:400">${rooms.length} total</span></div>
        <div class="donut-wrap">
          <svg class="donut-svg" width="100" height="100" viewBox="0 0 100 100">
            ${donutChart(kosong, terisi, booking)}
          </svg>
          <div class="donut-legend">
            <div class="donut-item"><div class="donut-dot" style="background:#43e97b"></div><span>${kosong} Kosong</span></div>
            <div class="donut-item"><div class="donut-dot" style="background:#ff6b6b"></div><span>${terisi} Terisi</span></div>
            <div class="donut-item"><div class="donut-dot" style="background:#f6d365"></div><span>${booking} Booking</span></div>
          </div>
        </div>
      </div>

      <!-- Booking Chart -->
      <div class="dash-card">
        <div class="dash-card-title">Booking 7 Hari Terakhir</div>
        <div class="mini-chart" id="bookingChart"></div>
      </div>

      <!-- Recent Bookings -->
      <div class="dash-card" style="grid-column:1/-1">
        <div class="dash-card-title">
          Booking Terbaru
          <a href="#" onclick="renderPage('bookings');return false" style="font-size:13px;color:var(--primary);font-weight:600">Lihat Semua →</a>
        </div>
        ${bookingTableHTML(bookings.slice(0, 5))}
      </div>

      <!-- Quick Stats -->
      <div class="dash-card">
        <div class="dash-card-title">Info Pengunjung</div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:14px;color:var(--text-muted)"><i class="fas fa-eye" style="color:var(--primary);margin-right:8px"></i>Total Pengunjung</span>
            <strong style="font-size:16px">${visitors.toLocaleString('id-ID')}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:14px;color:var(--text-muted)"><i class="fas fa-calendar-check" style="color:var(--primary);margin-right:8px"></i>Total Booking</span>
            <strong style="font-size:16px">${bookings.length + 48}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:14px;color:var(--text-muted)"><i class="fas fa-percent" style="color:var(--primary);margin-right:8px"></i>Tingkat Hunian</span>
            <strong style="font-size:16px">${Math.round(terisi/rooms.length*100)}%</strong>
          </div>
        </div>
      </div>

      <!-- Room Summary -->
      <div class="dash-card">
        <div class="dash-card-title">Rekap Kamar</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${rooms.map(r => `
            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
              <span style="font-size:13px;color:var(--text);font-weight:500">${r.name}</span>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:12px;color:var(--text-muted)">${formatPrice(r.price)}</span>
                <span class="td-status s-${r.status}">${{kosong:'Kosong',terisi:'Terisi',booking:'Booking'}[r.status]}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  renderBookingChart();
}

function donutChart(k, t, b) {
  const total = k + t + b || 1;
  const r = 40, cx = 50, cy = 50, stroke = 12;
  const circ = 2 * Math.PI * r;
  const pK = k / total, pT = t / total, pB = b / total;

  function arc(pct, offset, color) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
      stroke-dasharray="${pct * circ} ${circ}" stroke-dashoffset="${-offset * circ}"
      transform="rotate(-90 ${cx} ${cy})" style="transition:stroke-dasharray 1s ease"/>`;
  }
  return arc(pK, 0, '#43e97b') + arc(pT, pK, '#ff6b6b') + arc(pB, pK + pT, '#f6d365')
    + `<text x="50" y="54" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">${total}</text>`;
}

function renderBookingChart() {
  const chart = document.getElementById('bookingChart');
  if (!chart) return;
  const bookings = getData('bookings', []);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return { label: d.toLocaleDateString('id-ID', { weekday: 'short' }), date: d.toISOString().split('T')[0] };
  });
  const counts = days.map(d => bookings.filter(b => b.createdAt?.startsWith(d.date)).length);
  const max = Math.max(...counts, 1);

  chart.innerHTML = days.map((d, i) => `
    <div class="mini-bar-wrap">
      <div class="mini-bar" style="height:${Math.max(4, (counts[i] / max) * 90)}px" title="${counts[i]} booking"></div>
      <div class="mini-bar-label">${d.label}</div>
    </div>
  `).join('');
}

function bookingTableHTML(bookings) {
  if (!bookings.length) return `<p style="text-align:center;color:var(--text-muted);padding:24px;font-size:14px">Belum ada booking</p>`;
  return `
    <div class="table-wrapper">
      <table>
        <thead><tr>
          <th>Nama</th><th>WhatsApp</th><th>Kamar</th><th>Tgl Masuk</th><th>Durasi</th><th>Status</th>
        </tr></thead>
        <tbody>
          ${bookings.map(b => `
            <tr>
              <td style="font-weight:600">${b.name}</td>
              <td><a href="https://wa.me/${b.wa}" target="_blank" style="color:var(--primary)">${b.wa}</a></td>
              <td>${b.room}</td>
              <td>${new Date(b.date).toLocaleDateString('id-ID')}</td>
              <td>${b.duration}</td>
              <td><span class="td-status s-${b.status || 'pending'}">${b.status || 'Pending'}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ============================================================
// PAGE: ROOMS
// ============================================================
function pageRooms() {
  const rooms = getData('rooms', DEFAULT_ROOMS);
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="page-header">
      <h2>Kelola Kamar <span class="badge-count">${rooms.length}</span></h2>
      <button class="btn-add" onclick="openRoomEditor()"><i class="fas fa-plus"></i> Tambah Kamar</button>
    </div>
    <div class="table-card">
      <div class="table-toolbar">
        <div class="table-search">
          <i class="fas fa-search"></i>
          <input type="text" id="roomSearch" placeholder="Cari kamar..." oninput="filterAdminRooms(this.value)"/>
        </div>
      </div>
      <div class="table-wrapper">
        <table id="roomsTable">
          <thead><tr>
            <th>Foto</th><th>Nama</th><th>No.</th><th>Harga/Bulan</th><th>Status</th><th>Fasilitas</th><th>Aksi</th>
          </tr></thead>
          <tbody id="roomsTableBody"></tbody>
        </table>
      </div>
    </div>
  `;
  renderRoomsTable(rooms);
}

function renderRoomsTable(rooms) {
  const tbody = document.getElementById('roomsTableBody');
  if (!tbody) return;
  const facLabel = { wifi:'WiFi',km_dalam:'KM Dalam',ac:'AC',kasur:'Kasur',lemari:'Lemari',dapur:'Dapur',parkir:'Parkir',cctv:'CCTV',kipas:'Kipas',listrik:'Listrik',air:'Air' };
  tbody.innerHTML = rooms.map(r => `
    <tr>
      <td>${r.img ? `<img src="${r.img}" class="td-img" onerror="this.style.display='none'">` : '<i class="fas fa-home" style="font-size:24px;color:var(--primary)"></i>'}</td>
      <td><strong>${r.name}</strong></td>
      <td>${r.number}</td>
      <td>${formatPrice(r.price)}</td>
      <td>
        <select class="btn-status" onchange="changeRoomStatus('${r.id}', this.value)" style="border:1px solid var(--border);border-radius:8px;padding:5px 8px;background:var(--bg-input);color:var(--text);font-size:12px">
          <option value="kosong" ${r.status==='kosong'?'selected':''}>Kosong</option>
          <option value="terisi" ${r.status==='terisi'?'selected':''}>Terisi</option>
          <option value="booking" ${r.status==='booking'?'selected':''}>Booking</option>
        </select>
      </td>
      <td style="max-width:180px">${r.facilities.slice(0,3).map(f=>`<span style="display:inline-block;background:var(--bg-input);border-radius:6px;padding:2px 8px;font-size:11px;margin:2px">${facLabel[f]||f}</span>`).join('')}${r.facilities.length>3?`<span style="font-size:11px;color:var(--text-muted)">+${r.facilities.length-3}</span>`:''}</td>
      <td>
        <div class="td-actions">
          <button class="btn-edit" onclick="openRoomEditor('${r.id}')"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn-del" onclick="deleteRoom('${r.id}')"><i class="fas fa-trash"></i> Hapus</button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.filterAdminRooms = function(q) {
  const rooms = getData('rooms', DEFAULT_ROOMS);
  const filtered = q ? rooms.filter(r => r.name.toLowerCase().includes(q.toLowerCase())) : rooms;
  renderRoomsTable(filtered);
};

window.changeRoomStatus = function(id, status) {
  const rooms = getData('rooms', DEFAULT_ROOMS);
  const room = rooms.find(r => r.id === id);
  if (room) {
    room.status = status;
    setData('rooms', rooms);
    logAdminActivity(`Ubah status "${room.name}" → ${status}`);
    adminToast(`Status kamar diperbarui!`, 'success');
  }
};

window.deleteRoom = function(id) {
  const rooms = getData('rooms', DEFAULT_ROOMS);
  const room = rooms.find(r => r.id === id);
  showConfirm(`Hapus kamar "${room?.name}"? Tindakan ini tidak bisa dibatalkan.`, () => {
    const updated = rooms.filter(r => r.id !== id);
    setData('rooms', updated);
    logAdminActivity(`Hapus kamar: ${room?.name}`);
    adminToast('Kamar berhasil dihapus!', 'success');
    pageRooms();
  });
};

// ============================================================
// ROOM EDITOR MODAL
// ============================================================
let editingRoomId = null;

window.openRoomEditor = function(id) {
  editingRoomId = id || null;
  const modal = document.getElementById('roomEditorModal');
  const title = document.getElementById('roomEditorTitle');
  title.textContent = id ? 'Edit Kamar' : 'Tambah Kamar';

  // Clear form
  ['ae_name','ae_number','ae_price','ae_priceyear','ae_area','ae_img','ae_desc','ae_rating'].forEach(k => {
    const el = document.getElementById(k);
    if (el) el.value = '';
  });
  document.getElementById('ae_status').value = 'kosong';
  document.querySelectorAll('#ae_facilities input[type=checkbox]').forEach(cb => cb.checked = false);
  document.getElementById('ae_badge_popular').checked = false;
  document.getElementById('ae_badge_best').checked = false;
  document.getElementById('ae_badge_new').checked = false;

  if (id) {
    const rooms = getData('rooms', DEFAULT_ROOMS);
    const room = rooms.find(r => r.id === id);
    if (room) {
      document.getElementById('ae_name').value = room.name || '';
      document.getElementById('ae_number').value = room.number || '';
      document.getElementById('ae_price').value = room.price || '';
      document.getElementById('ae_priceyear').value = room.priceYear || '';
      document.getElementById('ae_area').value = room.area || '';
      document.getElementById('ae_status').value = room.status || 'kosong';
      document.getElementById('ae_img').value = room.img || '';
      document.getElementById('ae_desc').value = room.description || '';
      document.getElementById('ae_rating').value = room.rating || 4.8;
      room.facilities.forEach(f => {
        const cb = document.querySelector(`#ae_facilities input[value="${f}"]`);
        if (cb) cb.checked = true;
      });
      if (room.badges) {
        if (room.badges.includes('popular')) document.getElementById('ae_badge_popular').checked = true;
        if (room.badges.includes('best-price')) document.getElementById('ae_badge_best').checked = true;
        if (room.badges.includes('new')) document.getElementById('ae_badge_new').checked = true;
      }
    }
  }
  modal.classList.add('open');
};

function initAdminModals() {
  const roomModal = document.getElementById('roomEditorModal');
  document.getElementById('roomEditorClose').addEventListener('click', () => roomModal.classList.remove('open'));
  document.getElementById('roomEditorCancel').addEventListener('click', () => roomModal.classList.remove('open'));
  roomModal.addEventListener('click', e => { if (e.target === roomModal) roomModal.classList.remove('open'); });

  document.getElementById('roomEditorSave').addEventListener('click', saveRoomEditor);

  const confirmModal = document.getElementById('confirmModal');
  document.getElementById('confirmClose').addEventListener('click', () => confirmModal.classList.remove('open'));
  document.getElementById('confirmCancel').addEventListener('click', () => confirmModal.classList.remove('open'));
}

function saveRoomEditor() {
  const name = document.getElementById('ae_name').value.trim();
  const number = document.getElementById('ae_number').value.trim();
  const price = parseInt(document.getElementById('ae_price').value) || 0;
  const priceYear = parseInt(document.getElementById('ae_priceyear').value) || 0;
  const area = parseInt(document.getElementById('ae_area').value) || 9;
  const status = document.getElementById('ae_status').value;
  const img = document.getElementById('ae_img').value.trim();
  const description = document.getElementById('ae_desc').value.trim();
  const rating = parseFloat(document.getElementById('ae_rating').value) || 4.8;

  if (!name) { adminToast('Nama kamar wajib diisi!', 'error'); return; }
  if (!price) { adminToast('Harga wajib diisi!', 'error'); return; }

  const facilities = Array.from(document.querySelectorAll('#ae_facilities input:checked')).map(cb => cb.value);
  const badges = [
    document.getElementById('ae_badge_popular').checked ? 'popular' : null,
    document.getElementById('ae_badge_best').checked ? 'best-price' : null,
    document.getElementById('ae_badge_new').checked ? 'new' : null
  ].filter(Boolean);

  const rooms = getData('rooms', DEFAULT_ROOMS);

  if (editingRoomId) {
    const idx = rooms.findIndex(r => r.id === editingRoomId);
    if (idx !== -1) {
      rooms[idx] = { ...rooms[idx], name, number, price, priceYear, area, status, img, description, rating, facilities, badges };
      logAdminActivity(`Edit kamar: ${name}`);
    }
  } else {
    rooms.push({
      id: 'r' + Date.now(), name, number, price, priceYear, area, status, img, description, rating, facilities, badges
    });
    logAdminActivity(`Tambah kamar baru: ${name}`);
  }

  setData('rooms', rooms);
  document.getElementById('roomEditorModal').classList.remove('open');
  adminToast(editingRoomId ? 'Kamar berhasil diperbarui!' : 'Kamar berhasil ditambahkan!', 'success');
  pageRooms();
}

// ============================================================
// CONFIRM MODAL
// ============================================================
let confirmCallback = null;

function showConfirm(msg, onOk) {
  confirmCallback = onOk;
  document.getElementById('confirmBody').innerHTML = `<p style="font-size:15px;color:var(--text-muted);line-height:1.6">${msg}</p>`;
  document.getElementById('confirmModal').classList.add('open');
  document.getElementById('confirmOk').onclick = () => {
    document.getElementById('confirmModal').classList.remove('open');
    if (confirmCallback) confirmCallback();
  };
}

// ============================================================
// PAGE: BOOKINGS
// ============================================================
function pageBookings() {
  const bookings = getData('bookings', []).reverse();
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="page-header">
      <h2>Data Booking <span class="badge-count">${bookings.length}</span></h2>
    </div>
    <div class="table-card">
      <div class="table-toolbar">
        <div class="table-search">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Cari nama atau kamar..." oninput="filterBookings(this.value)"/>
        </div>
      </div>
      <div class="table-wrapper" id="bookingsTableWrap">
        ${bookingsTableHTML(bookings)}
      </div>
    </div>
  `;
}

function bookingsTableHTML(bookings) {
  if (!bookings.length) return `<p style="text-align:center;color:var(--text-muted);padding:40px;font-size:14px">Belum ada data booking</p>`;
  return `
    <table>
      <thead><tr>
        <th>#</th><th>Nama</th><th>WhatsApp</th><th>Kamar</th><th>Tgl Masuk</th><th>Durasi</th><th>Catatan</th><th>Status</th><th>Aksi</th>
      </tr></thead>
      <tbody>
        ${bookings.map((b, i) => `
          <tr>
            <td style="color:var(--text-muted)">${i + 1}</td>
            <td style="font-weight:600">${b.name}</td>
            <td><a href="https://wa.me/${b.wa}" target="_blank" style="color:var(--primary)"><i class="fab fa-whatsapp"></i> ${b.wa}</a></td>
            <td>${b.room}</td>
            <td>${b.date ? new Date(b.date).toLocaleDateString('id-ID') : '-'}</td>
            <td>${b.duration}</td>
            <td style="max-width:150px;overflow:hidden;text-overflow:ellipsis">${b.note || '-'}</td>
            <td>
              <select onchange="updateBookingStatus('${b.id}', this.value)" style="border:1px solid var(--border);border-radius:8px;padding:4px 8px;background:var(--bg-input);color:var(--text);font-size:12px">
                <option value="pending" ${(b.status||'pending')==='pending'?'selected':''}>Pending</option>
                <option value="confirmed" ${b.status==='confirmed'?'selected':''}>Konfirmasi</option>
                <option value="cancelled" ${b.status==='cancelled'?'selected':''}>Batal</option>
              </select>
            </td>
            <td>
              <button class="btn-del" onclick="deleteBooking('${b.id}')"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

window.filterBookings = function(q) {
  const bookings = getData('bookings', []).reverse();
  const filtered = q ? bookings.filter(b => b.name.toLowerCase().includes(q.toLowerCase()) || b.room.toLowerCase().includes(q.toLowerCase())) : bookings;
  document.getElementById('bookingsTableWrap').innerHTML = bookingsTableHTML(filtered);
};

window.updateBookingStatus = function(id, status) {
  const bookings = getData('bookings', []);
  const b = bookings.find(x => x.id === id);
  if (b) {
    b.status = status;
    setData('bookings', bookings);
    logAdminActivity(`Update status booking ${b.name} → ${status}`);
    adminToast('Status booking diperbarui!', 'success');
  }
};

window.deleteBooking = function(id) {
  showConfirm('Hapus data booking ini?', () => {
    const bookings = getData('bookings', []).filter(b => b.id !== id);
    setData('bookings', bookings);
    logAdminActivity('Hapus data booking');
    adminToast('Booking dihapus!', 'success');
    pageBookings();
  });
};

// ============================================================
// PAGE: GALLERY
// ============================================================
function pageGallery() {
  const gallery = getData('gallery', DEFAULT_GALLERY);
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="page-header">
      <h2>Kelola Galeri <span class="badge-count">${gallery.length}</span></h2>
    </div>
    <div class="dash-card" style="margin-bottom:20px">
      <div class="dash-card-title">Tambah Foto</div>
      <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
        <div class="form-g" style="flex:2;min-width:200px;margin:0">
          <label>URL Foto</label>
          <input type="url" id="g_url" placeholder="https://images.unsplash.com/..." />
        </div>
        <div class="form-g" style="flex:1;min-width:150px;margin:0">
          <label>Keterangan</label>
          <input type="text" id="g_caption" placeholder="Deskripsi foto..." />
        </div>
        <button class="btn-add" onclick="addGalleryItem()" style="height:42px">
          <i class="fas fa-plus"></i> Tambah
        </button>
      </div>
    </div>
    <div class="gallery-admin-grid" id="galleryAdminGrid">
      ${gallery.map((g, i) => `
        <div class="gallery-admin-item">
          <img src="${g.src}" alt="${g.caption}" loading="lazy" onerror="this.style.background='var(--bg-input)'">
          <div class="gallery-admin-caption">${g.caption}</div>
          <button class="gallery-admin-del" onclick="deleteGalleryItem(${i})"><i class="fas fa-times"></i></button>
        </div>
      `).join('')}
    </div>
  `;
}

window.addGalleryItem = function() {
  const url = document.getElementById('g_url').value.trim();
  const caption = document.getElementById('g_caption').value.trim();
  if (!url) { adminToast('URL foto wajib diisi!', 'error'); return; }
  const gallery = getData('gallery', DEFAULT_GALLERY);
  gallery.push({ src: url, caption: caption || 'Foto Kontrakan Seruni 1' });
  setData('gallery', gallery);
  logAdminActivity('Tambah foto galeri');
  adminToast('Foto berhasil ditambahkan!', 'success');
  pageGallery();
};

window.deleteGalleryItem = function(idx) {
  showConfirm('Hapus foto ini dari galeri?', () => {
    const gallery = getData('gallery', DEFAULT_GALLERY);
    gallery.splice(idx, 1);
    setData('gallery', gallery);
    logAdminActivity('Hapus foto galeri');
    adminToast('Foto dihapus!', 'success');
    pageGallery();
  });
};

// ============================================================
// PAGE: TESTIMONIALS
// ============================================================
function pageTestimonials() {
  const testimonials = getData('testimonials', DEFAULT_TESTIMONIALS);
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="page-header">
      <h2>Kelola Testimoni <span class="badge-count">${testimonials.length}</span></h2>
      <button class="btn-add" onclick="openTestiModal()"><i class="fas fa-plus"></i> Tambah</button>
    </div>
    <div class="table-card">
      <div class="table-wrapper">
        <table>
          <thead><tr>
            <th>Nama</th><th>Kamar</th><th>Bintang</th><th>Ulasan</th><th>Aksi</th>
          </tr></thead>
          <tbody>
            ${testimonials.map((t, i) => `
              <tr>
                <td style="font-weight:600">${t.name}</td>
                <td>${t.room}</td>
                <td>${'★'.repeat(t.stars)}</td>
                <td style="max-width:250px;font-size:13px;color:var(--text-muted)">${t.text.substring(0, 80)}...</td>
                <td>
                  <div class="td-actions">
                    <button class="btn-edit" onclick="openTestiModal(${i})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn-del" onclick="deleteTestimonial(${i})"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

let editingTestiIdx = null;
window.openTestiModal = function(idx) {
  editingTestiIdx = idx !== undefined ? idx : null;
  const testimonials = getData('testimonials', DEFAULT_TESTIMONIALS);
  const t = idx !== undefined ? testimonials[idx] : null;

  const html = `
    <div class="form-g"><label>Nama</label><input type="text" id="ti_name" value="${t?.name||''}" placeholder="Nama penghuni"/></div>
    <div class="form-g"><label>Kamar</label><input type="text" id="ti_room" value="${t?.room||''}" placeholder="Nama kamar yang dihuni"/></div>
    <div class="form-g"><label>Bintang (1-5)</label>
      <select id="ti_stars">${[5,4,3,2,1].map(s=>`<option value="${s}" ${t?.stars===s?'selected':''}>${s} Bintang</option>`).join('')}</select>
    </div>
    <div class="form-g"><label>Ulasan</label><textarea id="ti_text" rows="4" placeholder="Cerita pengalaman menginap...">${t?.text||''}</textarea></div>
  `;

  showInlineModal(t ? 'Edit Testimoni' : 'Tambah Testimoni', html, saveTestimonial);
};

function saveTestimonial() {
  const name = document.getElementById('ti_name')?.value.trim();
  const room = document.getElementById('ti_room')?.value.trim();
  const stars = parseInt(document.getElementById('ti_stars')?.value) || 5;
  const text = document.getElementById('ti_text')?.value.trim();
  if (!name || !text) { adminToast('Nama dan ulasan wajib diisi!', 'error'); return; }

  const testimonials = getData('testimonials', DEFAULT_TESTIMONIALS);
  const entry = { name, room, stars, text };
  if (editingTestiIdx !== null) {
    testimonials[editingTestiIdx] = entry;
    logAdminActivity(`Edit testimoni: ${name}`);
  } else {
    testimonials.push(entry);
    logAdminActivity(`Tambah testimoni: ${name}`);
  }
  setData('testimonials', testimonials);
  closeInlineModal();
  adminToast('Testimoni disimpan!', 'success');
  pageTestimonials();
}

window.deleteTestimonial = function(idx) {
  showConfirm('Hapus testimoni ini?', () => {
    const t = getData('testimonials', DEFAULT_TESTIMONIALS);
    t.splice(idx, 1);
    setData('testimonials', t);
    adminToast('Testimoni dihapus!', 'success');
    pageTestimonials();
  });
};

// ============================================================
// PAGE: FAQ
// ============================================================
function pageFAQ() {
  const faqs = getData('faq', DEFAULT_FAQ);
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="page-header">
      <h2>Kelola FAQ <span class="badge-count">${faqs.length}</span></h2>
      <button class="btn-add" onclick="openFaqModal()"><i class="fas fa-plus"></i> Tambah</button>
    </div>
    <div class="table-card">
      <div class="table-wrapper">
        <table>
          <thead><tr><th>Pertanyaan</th><th>Jawaban</th><th>Aksi</th></tr></thead>
          <tbody>
            ${faqs.map((f, i) => `
              <tr>
                <td style="font-weight:600;max-width:250px">${f.q}</td>
                <td style="max-width:300px;font-size:13px;color:var(--text-muted)">${f.a.substring(0, 100)}...</td>
                <td>
                  <div class="td-actions">
                    <button class="btn-edit" onclick="openFaqModal(${i})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn-del" onclick="deleteFaq(${i})"><i class="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

let editingFaqIdx = null;
window.openFaqModal = function(idx) {
  editingFaqIdx = idx !== undefined ? idx : null;
  const faqs = getData('faq', DEFAULT_FAQ);
  const f = idx !== undefined ? faqs[idx] : null;
  const html = `
    <div class="form-g"><label>Pertanyaan</label><input type="text" id="fq_q" value="${f?.q||''}" placeholder="Tulis pertanyaan..."/></div>
    <div class="form-g"><label>Jawaban</label><textarea id="fq_a" rows="4" placeholder="Tulis jawaban lengkap...">${f?.a||''}</textarea></div>
  `;
  showInlineModal(f ? 'Edit FAQ' : 'Tambah FAQ', html, saveFaq);
};

function saveFaq() {
  const q = document.getElementById('fq_q')?.value.trim();
  const a = document.getElementById('fq_a')?.value.trim();
  if (!q || !a) { adminToast('Pertanyaan dan jawaban wajib diisi!', 'error'); return; }
  const faqs = getData('faq', DEFAULT_FAQ);
  if (editingFaqIdx !== null) {
    faqs[editingFaqIdx] = { q, a };
  } else {
    faqs.push({ q, a });
  }
  setData('faq', faqs);
  closeInlineModal();
  adminToast('FAQ disimpan!', 'success');
  pageFAQ();
}

window.deleteFaq = function(idx) {
  showConfirm('Hapus FAQ ini?', () => {
    const faqs = getData('faq', DEFAULT_FAQ);
    faqs.splice(idx, 1);
    setData('faq', faqs);
    adminToast('FAQ dihapus!', 'success');
    pageFAQ();
  });
};

// ============================================================
// INLINE MODAL (reusable for testi/faq)
// ============================================================
let inlineModalSaveCallback = null;

function showInlineModal(title, bodyHTML, onSave) {
  inlineModalSaveCallback = onSave;
  const existing = document.getElementById('inlineModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'inlineModal';
  modal.className = 'a-modal-overlay';
  modal.innerHTML = `
    <div class="a-modal" style="max-width:520px">
      <div class="a-modal-header">
        <h3>${title}</h3>
        <button class="a-modal-close" onclick="closeInlineModal()"><i class="fas fa-times"></i></button>
      </div>
      <div class="a-modal-body">${bodyHTML}</div>
      <div class="a-modal-footer">
        <button class="btn-a-cancel" onclick="closeInlineModal()">Batal</button>
        <button class="btn-a-save" onclick="inlineModalSaveCallback()"><i class="fas fa-save"></i> Simpan</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('open'), 10);
  modal.addEventListener('click', e => { if (e.target === modal) closeInlineModal(); });
}

window.closeInlineModal = function() {
  const modal = document.getElementById('inlineModal');
  if (modal) { modal.classList.remove('open'); setTimeout(() => modal.remove(), 300); }
};

// ============================================================
// PAGE: SETTINGS
// ============================================================
function pageSettings() {
  const settings = getData('settings', DEFAULT_SETTINGS);
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="page-header"><h2>Pengaturan Website</h2></div>
    <div class="settings-grid">
      <!-- Info Utama -->
      <div class="settings-card full">
        <h3><i class="fas fa-info-circle"></i> Informasi Utama</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-g">
            <label>Nama Kontrakan</label>
            <input type="text" id="s_name" value="${settings.siteName}" />
          </div>
          <div class="form-g">
            <label>Nomor WhatsApp (tanpa +)</label>
            <input type="text" id="s_wa" value="${settings.wa}" placeholder="628123456789"/>
          </div>
          <div class="form-g" style="grid-column:1/-1">
            <label>Alamat Lengkap</label>
            <input type="text" id="s_address" value="${settings.address}" />
          </div>
          <div class="form-g" style="grid-column:1/-1">
            <label>URL Background Hero</label>
            <input type="url" id="s_herobg" value="${settings.heroBg}" placeholder="https://images.unsplash.com/..."/>
          </div>
        </div>
        <button class="btn-save-settings" onclick="saveMainSettings()"><i class="fas fa-save"></i> Simpan Informasi</button>
      </div>

      <!-- Maps & Peraturan -->
      <div class="settings-card">
        <h3><i class="fas fa-map"></i> Google Maps Embed URL</h3>
        <div class="form-g">
          <label>URL Embed Google Maps</label>
          <textarea id="s_maps" rows="3">${settings.mapsEmbed}</textarea>
        </div>
        <button class="btn-save-settings" onclick="saveMapsSettings()"><i class="fas fa-save"></i> Simpan Maps</button>
      </div>

      <div class="settings-card">
        <h3><i class="fas fa-list-ul"></i> Peraturan Kos</h3>
        <div class="form-g">
          <label>Isi Peraturan (satu baris = satu aturan)</label>
          <textarea id="s_rules" rows="7">${settings.rules}</textarea>
        </div>
        <button class="btn-save-settings" onclick="saveRulesSettings()"><i class="fas fa-save"></i> Simpan Peraturan</button>
      </div>

      <!-- Admin Account -->
      <div class="settings-card">
        <h3><i class="fas fa-user-shield"></i> Akun Admin</h3>
        <div class="form-g">
          <label>Username</label>
          <input type="text" id="s_user" value="${settings.adminUser}" />
        </div>
        <div class="form-g">
          <label>Password Baru</label>
          <input type="password" id="s_pass" placeholder="Kosongkan jika tidak ubah" />
        </div>
        <div class="form-g">
          <label>Konfirmasi Password</label>
          <input type="password" id="s_pass2" placeholder="Ulangi password baru" />
        </div>
        <button class="btn-save-settings" onclick="saveAdminAccount()"><i class="fas fa-save"></i> Simpan Akun</button>
      </div>

      <!-- Theme & Display -->
      <div class="settings-card">
        <h3><i class="fas fa-palette"></i> Tampilan Default</h3>
        <div class="form-g">
          <label>Tema Default Website</label>
          <select id="s_theme">
            <option value="light" ${settings.defaultTheme==='light'?'selected':''}>Light Mode</option>
            <option value="dark" ${settings.defaultTheme==='dark'?'selected':''}>Dark Mode</option>
          </select>
        </div>
        <button class="btn-save-settings" onclick="saveThemeSettings()"><i class="fas fa-save"></i> Simpan Tema</button>
      </div>

      <!-- Data Management -->
      <div class="settings-card full">
        <h3><i class="fas fa-database"></i> Manajemen Data</h3>
        <div class="data-actions">
          <button class="btn-export" onclick="exportData()"><i class="fas fa-download"></i> Export JSON</button>
          <button class="btn-import" onclick="document.getElementById('importFile').click()"><i class="fas fa-upload"></i> Import JSON</button>
          <button class="btn-reset" onclick="resetAllData()"><i class="fas fa-trash-alt"></i> Reset Semua Data</button>
          <button class="btn-export" onclick="backupData()" style="background:rgba(102,126,234,0.1);color:var(--primary);border-color:var(--border)">
            <i class="fas fa-cloud-upload-alt"></i> Backup localStorage
          </button>
        </div>
        <input type="file" id="importFile" accept=".json" style="display:none" onchange="importData(this)"/>
        <p style="font-size:12px;color:var(--text-muted);margin-top:12px">
          <i class="fas fa-info-circle"></i> Export/import untuk backup dan restore data kamar, booking, dan pengaturan.
        </p>
      </div>
    </div>
  `;
}

window.saveMainSettings = function() {
  const s = getData('settings', DEFAULT_SETTINGS);
  s.siteName = document.getElementById('s_name').value.trim() || s.siteName;
  s.wa = document.getElementById('s_wa').value.trim().replace(/\D/g, '');
  s.address = document.getElementById('s_address').value.trim() || s.address;
  s.heroBg = document.getElementById('s_herobg').value.trim() || s.heroBg;
  setData('settings', s);
  logAdminActivity('Simpan pengaturan utama');
  adminToast('Pengaturan disimpan!', 'success');
};

window.saveMapsSettings = function() {
  const s = getData('settings', DEFAULT_SETTINGS);
  s.mapsEmbed = document.getElementById('s_maps').value.trim() || s.mapsEmbed;
  setData('settings', s);
  adminToast('Pengaturan maps disimpan!', 'success');
};

window.saveRulesSettings = function() {
  const s = getData('settings', DEFAULT_SETTINGS);
  s.rules = document.getElementById('s_rules').value;
  setData('settings', s);
  adminToast('Peraturan disimpan!', 'success');
};

window.saveAdminAccount = function() {
  const user = document.getElementById('s_user').value.trim();
  const pass = document.getElementById('s_pass').value;
  const pass2 = document.getElementById('s_pass2').value;
  if (!user) { adminToast('Username tidak boleh kosong!', 'error'); return; }
  if (pass && pass !== pass2) { adminToast('Password tidak cocok!', 'error'); return; }
  const s = getData('settings', DEFAULT_SETTINGS);
  s.adminUser = user;
  if (pass) s.adminPass = pass;
  setData('settings', s);
  logAdminActivity('Ubah akun admin');
  adminToast('Akun admin diperbarui!', 'success');
};

window.saveThemeSettings = function() {
  const theme = document.getElementById('s_theme').value;
  const s = getData('settings', DEFAULT_SETTINGS);
  s.defaultTheme = theme;
  setData('settings', s);
  adminToast('Pengaturan tema disimpan!', 'success');
};

window.exportData = function() {
  const data = {
    rooms: getData('rooms', DEFAULT_ROOMS),
    bookings: getData('bookings', []),
    testimonials: getData('testimonials', DEFAULT_TESTIMONIALS),
    faq: getData('faq', DEFAULT_FAQ),
    gallery: getData('gallery', DEFAULT_GALLERY),
    settings: getData('settings', DEFAULT_SETTINGS),
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `seruni1-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  logAdminActivity('Export data JSON');
  adminToast('Data berhasil diekspor!', 'success');
};

window.importData = function(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      showConfirm('Import data akan mengganti semua data saat ini. Lanjutkan?', () => {
        if (data.rooms) setData('rooms', data.rooms);
        if (data.bookings) setData('bookings', data.bookings);
        if (data.testimonials) setData('testimonials', data.testimonials);
        if (data.faq) setData('faq', data.faq);
        if (data.gallery) setData('gallery', data.gallery);
        if (data.settings) setData('settings', data.settings);
        logAdminActivity('Import data JSON');
        adminToast('Data berhasil diimpor!', 'success');
        renderPage('dashboard');
      });
    } catch {
      adminToast('File JSON tidak valid!', 'error');
    }
  };
  reader.readAsText(file);
  input.value = '';
};

window.resetAllData = function() {
  showConfirm('⚠️ RESET semua data? Ini akan menghapus semua kamar, booking, dan pengaturan. Tindakan TIDAK BISA dibatalkan!', () => {
    const keys = ['rooms','bookings','testimonials','faq','gallery','settings','activity_log','admin_log','visitors'];
    keys.forEach(k => localStorage.removeItem('seruni_' + k));
    logAdminActivity('Reset semua data');
    adminToast('Semua data direset!', 'success');
    setTimeout(() => renderPage('dashboard'), 800);
  });
};

window.backupData = function() {
  window.exportData();
  adminToast('Backup dibuat dan diunduh!', 'success');
};

// ============================================================
// PAGE: ACTIVITY LOG
// ============================================================
function pageActivity() {
  const adminLogs = getData('admin_log', []);
  const userLogs = getData('activity_log', []);
  const allLogs = [...adminLogs, ...userLogs]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 100);

  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="page-header">
      <h2>Log Aktivitas <span class="badge-count">${allLogs.length}</span></h2>
      <button class="btn-add" style="background:rgba(255,107,107,0.1);color:var(--danger);box-shadow:none;border:1px solid rgba(255,107,107,0.3)" onclick="clearLogs()">
        <i class="fas fa-trash"></i> Bersihkan Log
      </button>
    </div>
    <div class="dash-card">
      <div class="activity-list">
        ${allLogs.length ? allLogs.map(l => `
          <div class="activity-item">
            <div class="activity-dot"></div>
            <div class="activity-text">${l.action}</div>
            <div class="activity-time">${timeAgo(l.time)}</div>
          </div>
        `).join('') : '<p style="text-align:center;color:var(--text-muted);padding:40px;font-size:14px">Belum ada aktivitas</p>'}
      </div>
    </div>
  `;
}

window.clearLogs = function() {
  showConfirm('Hapus semua log aktivitas?', () => {
    setData('activity_log', []);
    setData('admin_log', []);
    adminToast('Log dibersihkan!', 'success');
    pageActivity();
  });
};

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60000) return 'Baru saja';
  if (diff < 3600000) return Math.floor(diff / 60000) + ' mnt lalu';
  if (diff < 86400000) return Math.floor(diff / 3600000) + ' jam lalu';
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initLogin();
});
