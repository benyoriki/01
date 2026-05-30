/*!
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   BILLIARD 805 — NOTIFIKASI PROMO PREMIUM                   ║
 * ║   Dark Neon · Glassmorphism · Cinematic Animations          ║
 * ║   by benyoriki.com                                          ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

(function () {
  'use strict';

  /* ── Inject CSS ─────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.id = 'byn-notif-style';
  style.textContent = `

    /* ===== STACK CONTAINER ===== */
    #byn-stack {
      position: fixed;
      bottom: 90px;
      right: 20px;
      z-index: 999999;
      display: flex;
      flex-direction: column-reverse;
      gap: 12px;
      pointer-events: none;
      width: 360px;
      max-width: calc(100vw - 32px);
    }

    /* ===== CARD BASE ===== */
    .byn-card {
      position: relative;
      background: rgba(10, 10, 20, 0.82);
      backdrop-filter: blur(28px) saturate(180%);
      -webkit-backdrop-filter: blur(28px) saturate(180%);
      border-radius: 20px;
      overflow: hidden;
      pointer-events: all;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow:
        0 0 0 1px rgba(102, 126, 234, 0.2),
        0 8px 32px rgba(0, 0, 0, 0.6),
        0 24px 64px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
      transform: translateX(calc(100% + 40px)) scale(0.88) rotateY(-8deg);
      opacity: 0;
      transition:
        transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 0.45s ease,
        box-shadow 0.3s ease;
      will-change: transform, opacity;
      transform-origin: right center;
      transform-style: preserve-3d;
    }

    /* ── Enter ── */
    .byn-card.byn-show {
      transform: translateX(0) scale(1) rotateY(0deg);
      opacity: 1;
    }

    /* ── Exit ── */
    .byn-card.byn-hide {
      transform: translateX(calc(100% + 40px)) scale(0.85) rotateY(8deg);
      opacity: 0;
      transition:
        transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.35s ease;
    }

    /* ── Hover lift ── */
    .byn-card:hover {
      transform: translateX(-8px) scale(1.025) !important;
      box-shadow:
        0 0 0 1px rgba(102, 126, 234, 0.45),
        0 12px 40px rgba(0, 0, 0, 0.7),
        0 32px 80px rgba(0, 0, 0, 0.5),
        0 0 60px rgba(102, 126, 234, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      transition: transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.3s ease !important;
    }

    /* ===== TOP NEON ACCENT BAR ===== */
    .byn-accent {
      height: 2px;
      width: 100%;
      position: relative;
      z-index: 2;
    }
    .byn-accent::after {
      content: '';
      position: absolute;
      top: 0; left: 10%; right: 10%;
      height: 8px;
      background: inherit;
      filter: blur(8px);
      opacity: 0.8;
      border-radius: 0 0 8px 8px;
    }

    /* ===== AMBIENT GLOW BG ===== */
    .byn-glow-bg {
      position: absolute;
      top: -40px; right: -40px;
      width: 200px; height: 200px;
      border-radius: 50%;
      opacity: 0.07;
      pointer-events: none;
      filter: blur(40px);
      z-index: 0;
      animation: byn-glow-pulse 3s ease-in-out infinite;
    }
    @keyframes byn-glow-pulse {
      0%, 100% { opacity: 0.06; transform: scale(1); }
      50%       { opacity: 0.12; transform: scale(1.15); }
    }

    /* ===== SHIMMER SWEEP ===== */
    .byn-shimmer {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        110deg,
        transparent 30%,
        rgba(255, 255, 255, 0.04) 48%,
        rgba(255, 255, 255, 0.08) 50%,
        rgba(255, 255, 255, 0.04) 52%,
        transparent 70%
      );
      background-size: 300% 100%;
      animation: byn-shimmer-sweep 3.5s ease-in-out infinite;
      pointer-events: none;
      z-index: 1;
      border-radius: inherit;
    }
    @keyframes byn-shimmer-sweep {
      0%   { background-position: 200% center; }
      100% { background-position: -200% center; }
    }

    /* ===== CLOSE BUTTON ===== */
    .byn-close {
      position: absolute;
      top: 12px; right: 12px;
      width: 26px; height: 26px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.1);
      cursor: pointer;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.4);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s ease;
      z-index: 10;
      font-weight: 700;
      line-height: 1;
    }
    .byn-close:hover {
      background: rgba(255, 255, 255, 0.14);
      color: rgba(255, 255, 255, 0.9);
      transform: scale(1.15) rotate(90deg);
      border-color: rgba(255, 255, 255, 0.25);
    }

    /* ===== INNER CONTENT ===== */
    .byn-inner {
      padding: 14px 16px 10px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      position: relative;
      z-index: 2;
    }

    /* ===== ICON WRAP ===== */
    .byn-icon-wrap {
      width: 48px; height: 48px;
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px;
      flex-shrink: 0;
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .byn-icon-ring {
      position: absolute;
      inset: -4px;
      border-radius: 18px;
      border: 1.5px solid transparent;
      background-clip: padding-box;
      opacity: 0;
      animation: byn-ring-spin 3s linear infinite;
    }
    @keyframes byn-ring-spin {
      0%   { opacity: 0; transform: rotate(0deg) scale(1); }
      20%  { opacity: 0.5; }
      80%  { opacity: 0.5; }
      100% { opacity: 0; transform: rotate(360deg) scale(1); }
    }
    .byn-icon-pulse {
      position: absolute;
      inset: -5px;
      border-radius: 19px;
      opacity: 0;
      animation: byn-icon-pulse-anim 2.5s ease-in-out infinite;
    }
    @keyframes byn-icon-pulse-anim {
      0%, 100% { transform: scale(1); opacity: 0; }
      50%       { transform: scale(1.2); opacity: 0.15; }
    }

    /* ===== TEXT BODY ===== */
    .byn-body { flex: 1; min-width: 0; }

    .byn-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      gap: 6px;
    }
    .byn-source {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      display: flex; align-items: center; gap: 5px;
    }
    .byn-age {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.3);
      white-space: nowrap;
    }

    /* Live dot */
    .byn-live {
      display: inline-block;
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #39ff14;
      box-shadow: 0 0 8px #39ff14;
      flex-shrink: 0;
      animation: byn-live-blink 1.4s ease-in-out infinite;
    }
    @keyframes byn-live-blink {
      0%, 100% { opacity: 1; box-shadow: 0 0 8px #39ff14; }
      50%       { opacity: 0.4; box-shadow: 0 0 3px #39ff14; }
    }

    .byn-title {
      font-size: 14px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.35;
      margin-bottom: 5px;
      letter-spacing: -0.1px;
    }
    .byn-desc {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.55);
      line-height: 1.6;
    }
    .byn-desc strong {
      color: rgba(255, 255, 255, 0.85);
      font-weight: 700;
    }

    /* ===== BADGE ===== */
    .byn-badge {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 8px 2px 6px;
      border-radius: 99px;
      margin-left: 6px;
      vertical-align: middle;
      letter-spacing: 0.3px;
      white-space: nowrap;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    /* ===== SOCIAL PROOF ROW ===== */
    .byn-proof {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0 4px;
    }
    .byn-avatars {
      display: flex;
      flex-shrink: 0;
    }
    .byn-av {
      width: 24px; height: 24px;
      border-radius: 50%;
      border: 2px solid rgba(10, 10, 20, 0.9);
      margin-left: -7px;
      font-size: 9px;
      font-weight: 800;
      display: flex; align-items: center; justify-content: center;
      color: white;
      flex-shrink: 0;
      text-transform: uppercase;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    }
    .byn-av:first-child { margin-left: 0; }

    .byn-proof-text {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.35);
      line-height: 1.3;
    }
    .byn-proof-num {
      color: rgba(255, 255, 255, 0.75);
      font-weight: 700;
    }

    /* ===== DIVIDER ===== */
    .byn-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
      margin: 0 16px;
      position: relative;
      z-index: 2;
    }

    /* ===== CTA FOOTER ===== */
    .byn-footer {
      padding: 10px 14px 14px;
      display: flex;
      gap: 8px;
      position: relative;
      z-index: 2;
    }

    .byn-cta {
      flex: 1;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 12.5px;
      font-weight: 800;
      border: none;
      cursor: pointer;
      color: white;
      transition: all 0.25s cubic-bezier(0.34, 1.4, 0.64, 1);
      letter-spacing: 0.2px;
      position: relative;
      overflow: hidden;
      text-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    .byn-cta::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transition: left 0.4s ease;
    }
    .byn-cta:hover::before { left: 100%; }
    .byn-cta:hover {
      transform: translateY(-2px) scale(1.02);
      filter: brightness(1.1);
    }
    .byn-cta:active { transform: scale(0.97); }

    .byn-dismiss {
      padding: 10px 13px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.09);
      cursor: pointer;
      color: rgba(255, 255, 255, 0.35);
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .byn-dismiss:hover {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* ===== COUNTDOWN BAR ===== */
    .byn-timer-bar {
      position: absolute;
      bottom: 0; left: 0;
      height: 2px;
      border-radius: 0 0 20px 20px;
      animation: byn-drain var(--byn-life, 9s) linear forwards;
      z-index: 10;
    }
    @keyframes byn-drain {
      from { width: 100%; }
      to   { width: 0%; }
    }

    /* ===== NEON BORDER ANIMATION ===== */
    .byn-card::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 21px;
      background: var(--byn-border-gradient, linear-gradient(135deg, rgba(0,212,255,0.3), rgba(180,0,255,0.3)));
      z-index: -1;
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .byn-card.byn-show::before {
      opacity: 1;
      animation: byn-border-shimmer 4s ease-in-out infinite;
    }
    @keyframes byn-border-shimmer {
      0%, 100% { opacity: 0.6; }
      50%       { opacity: 1; }
    }

    /* ===== NOTIFICATION COUNT BADGE ===== */
    .byn-count-badge {
      position: absolute;
      top: -6px; left: -6px;
      width: 20px; height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      font-size: 10px;
      font-weight: 900;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid rgba(10,10,20,0.9);
      z-index: 10;
      animation: byn-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes byn-pop {
      from { transform: scale(0) rotate(-180deg); }
      to   { transform: scale(1) rotate(0deg); }
    }

    /* ===== PARTICLES ON ENTER ===== */
    .byn-particle {
      position: absolute;
      width: 4px; height: 4px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 20;
      animation: byn-particle-burst 0.8s ease-out forwards;
    }
    @keyframes byn-particle-burst {
      0%   { transform: translate(0,0) scale(1); opacity: 1; }
      100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
    }

    /* ===== MOBILE ===== */
    @media (max-width: 480px) {
      #byn-stack {
        bottom: 80px;
        right: 12px;
        left: 12px;
        width: auto;
      }
      .byn-card { border-radius: 18px; }
      .byn-title { font-size: 13.5px; }
      .byn-desc  { font-size: 11.5px; }
      .byn-cta   { font-size: 12px; padding: 9px 12px; }
      .byn-icon-wrap { width: 42px; height: 42px; font-size: 21px; }
    }

    /* ===== SCROLL HIDE: notif menyembunyikan diri waktu scroll ke atas ===== */
    #byn-stack.byn-collapsed .byn-card:not(:last-child) {
      transform: translateX(0) scale(0.95) translateY(8px) !important;
      opacity: 0.5;
    }

  `;
  document.head.appendChild(style);

  /* ── Konfigurasi ─────────────────────────────────────────────── */
  var CFG = {
    targetURL    : 'https://benyoriki.com/',   // ← semua klik menuju benyoriki.com
    intervalSec  : 20,
    firstDelaySec: 5,
    autoLifeSec  : 9,
    maxVisible   : 3,
  };

  /* ── Data notifikasi → semua mengarah ke benyoriki.com ─────── */
  var NOTIFS = [

    /* 1 ── Hook utama: harga murah + cepat */
    {
      accent      : 'linear-gradient(90deg, #667eea, #764ba2)',
      borderGrad  : 'linear-gradient(135deg, rgba(102,126,234,0.5), rgba(118,75,162,0.5))',
      glowColor   : '#667eea',
      iconBg      : 'linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))',
      iconPulse   : 'linear-gradient(135deg, #667eea, #764ba2)',
      iconBorder  : 'rgba(102,126,234,0.4)',
      emoji       : '🚀',
      source      : 'BENYORIKI.COM',
      sourceClr   : '#a78bfa',
      badge       : '🔥 Mulai Rp 200rb',
      badgeBg     : 'rgba(167,139,250,0.15)',
      badgeClr    : '#c4b5fd',
      title       : 'Website Bisnis Siap 2–6 Hari Kerja!',
      desc        : 'Kasir online, toko digital, dashboard live — <strong>demo dulu baru bayar.</strong> Tidak suka? Tidak perlu bayar sepeser pun!',
      cta         : '🎯 Minta Penawaran Gratis',
      ctaBg       : 'linear-gradient(135deg, #667eea, #764ba2)',
      ctaShadow   : 'rgba(102,126,234,0.45)',
      timerColor  : 'linear-gradient(90deg, #667eea, #764ba2)',
      proof       : ['S','R','D'],
      proofColors : ['#a78bfa', '#f093fb', '#667eea'],
      proofText   : '<span class="byn-proof-num">127 orang</span> baru request penawaran hari ini',
    },

    /* 2 ── Sosial proof: sudah dipercaya UMKM */
    {
      accent      : 'linear-gradient(90deg, #43e97b, #38f9d7)',
      borderGrad  : 'linear-gradient(135deg, rgba(67,233,123,0.45), rgba(56,249,215,0.45))',
      glowColor   : '#43e97b',
      iconBg      : 'linear-gradient(135deg, rgba(67,233,123,0.18), rgba(56,249,215,0.15))',
      iconPulse   : 'linear-gradient(135deg, #43e97b, #38f9d7)',
      iconBorder  : 'rgba(67,233,123,0.35)',
      emoji       : '🏆',
      source      : 'BENYORIKI · REVIEW',
      sourceClr   : '#34d399',
      badge       : '⭐ 5/5 Rating',
      badgeBg     : 'rgba(52,211,153,0.12)',
      badgeClr    : '#6ee7b7',
      title       : 'Dipercaya Puluhan UMKM Lokal!',
      desc        : 'Toko frozen food, tattoo studio, preseller aqua, kasir warung — <strong>semua sudah live</strong> dan bisa dicoba sekarang!',
      cta         : '🎨 Lihat Portofolio Live',
      ctaBg       : 'linear-gradient(135deg, #059669, #10b981)',
      ctaShadow   : 'rgba(16,185,129,0.42)',
      timerColor  : 'linear-gradient(90deg, #43e97b, #38f9d7)',
      proof       : ['A','B','C'],
      proofColors : ['#34d399', '#10b981', '#6ee7b7'],
      proofText   : '<span class="byn-proof-num">Klien puas</span> & balik lagi order',
    },

    /* 3 ── Zero risk: demo dulu baru bayar */
    {
      accent      : 'linear-gradient(90deg, #f093fb, #f5576c)',
      borderGrad  : 'linear-gradient(135deg, rgba(240,147,251,0.45), rgba(245,87,108,0.45))',
      glowColor   : '#f093fb',
      iconBg      : 'linear-gradient(135deg, rgba(240,147,251,0.18), rgba(245,87,108,0.15))',
      iconPulse   : 'linear-gradient(135deg, #f093fb, #f5576c)',
      iconBorder  : 'rgba(240,147,251,0.35)',
      emoji       : '👁️',
      source      : 'BENYORIKI · GARANSI',
      sourceClr   : '#f9a8d4',
      badge       : '✅ No Risk',
      badgeBg     : 'rgba(249,168,212,0.12)',
      badgeClr    : '#fbcfe8',
      title       : 'Lihat Demo Dulu, Baru Bayar!',
      desc        : 'Tidak suka hasilnya? <strong>Tidak perlu bayar sepeser pun.</strong> 100% aman, 100% transparan — tanpa kontrak ribet.',
      cta         : '👀 Coba Demo Gratis',
      ctaBg       : 'linear-gradient(135deg, #db2777, #f43f5e)',
      ctaShadow   : 'rgba(244,63,94,0.42)',
      timerColor  : 'linear-gradient(90deg, #f093fb, #f5576c)',
      proof       : ['M','T','F'],
      proofColors : ['#f9a8d4', '#f093fb', '#f5576c'],
      proofText   : '<span class="byn-proof-num">Semua klien</span> puas sebelum bayar',
    },

    /* 4 ── Dashboard bisnis real-time */
    {
      accent      : 'linear-gradient(90deg, #4facfe, #00f2fe)',
      borderGrad  : 'linear-gradient(135deg, rgba(79,172,254,0.45), rgba(0,242,254,0.45))',
      glowColor   : '#4facfe',
      iconBg      : 'linear-gradient(135deg, rgba(79,172,254,0.18), rgba(0,242,254,0.15))',
      iconPulse   : 'linear-gradient(135deg, #4facfe, #00f2fe)',
      iconBorder  : 'rgba(79,172,254,0.35)',
      emoji       : '📊',
      source      : 'BENYORIKI · FITUR',
      sourceClr   : '#7dd3fc',
      badge       : '📈 Real-Time',
      badgeBg     : 'rgba(125,211,252,0.12)',
      badgeClr    : '#bae6fd',
      title       : 'Dashboard Live dari HP Kamu!',
      desc        : 'Pantau <strong>omzet, stok & penjualan</strong> kapan saja dari HP. Data sinkron otomatis, grafik langsung update tanpa refresh.',
      cta         : '📲 Lihat Portofolio',
      ctaBg       : 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      ctaShadow   : 'rgba(14,165,233,0.42)',
      timerColor  : 'linear-gradient(90deg, #4facfe, #00f2fe)',
      proof       : ['H','I','J'],
      proofColors : ['#7dd3fc', '#38bdf8', '#0ea5e9'],
      proofText   : '<span class="byn-proof-num">Fitur unggulan</span> di setiap paket kami',
    },

    /* 5 ── Toko online siap 2 hari */
    {
      accent      : 'linear-gradient(90deg, #f6d365, #fda085)',
      borderGrad  : 'linear-gradient(135deg, rgba(246,211,101,0.45), rgba(253,160,133,0.45))',
      glowColor   : '#fda085',
      iconBg      : 'linear-gradient(135deg, rgba(246,211,101,0.18), rgba(253,160,133,0.15))',
      iconPulse   : 'linear-gradient(135deg, #f6d365, #fda085)',
      iconBorder  : 'rgba(253,160,133,0.35)',
      emoji       : '🛒',
      source      : 'BENYORIKI · TOKO',
      sourceClr   : '#fdba74',
      badge       : '⏰ 2 Hari Jadi',
      badgeBg     : 'rgba(253,186,116,0.12)',
      badgeClr    : '#fed7aa',
      title       : 'Toko Online Siap dalam 2 Hari!',
      desc        : 'Katalog produk, cart, checkout, <strong>order via WhatsApp</strong> — hosting & domain sudah termasuk. <strong>Langsung jualan!</strong>',
      cta         : '🛍️ Lihat Paket Toko',
      ctaBg       : 'linear-gradient(135deg, #f59e0b, #f97316)',
      ctaShadow   : 'rgba(249,115,22,0.42)',
      timerColor  : 'linear-gradient(90deg, #f6d365, #fda085)',
      proof       : ['U','V','W'],
      proofColors : ['#fdba74', '#fb923c', '#f97316'],
      proofText   : '<span class="byn-proof-num">3 toko baru</span> launch hari ini',
    },

    /* 6 ── Kasir online tanpa software mahal */
    {
      accent      : 'linear-gradient(90deg, #34d399, #059669)',
      borderGrad  : 'linear-gradient(135deg, rgba(52,211,153,0.45), rgba(5,150,105,0.45))',
      glowColor   : '#34d399',
      iconBg      : 'linear-gradient(135deg, rgba(52,211,153,0.18), rgba(5,150,105,0.15))',
      iconPulse   : 'linear-gradient(135deg, #34d399, #059669)',
      iconBorder  : 'rgba(52,211,153,0.35)',
      emoji       : '⚡',
      source      : 'BENYORIKI · KASIR',
      sourceClr   : '#6ee7b7',
      badge       : '🧾 Kasir Online',
      badgeBg     : 'rgba(110,231,183,0.12)',
      badgeClr    : '#a7f3d0',
      title       : 'Kasir Online Tanpa Software Mahal!',
      desc        : 'Berbasis web, <strong>stok auto-update</strong>, laporan harian & bulanan — cocok untuk <strong>warung & UMKM</strong> semua skala.',
      cta         : '🖥️ Coba Kasir Demo',
      ctaBg       : 'linear-gradient(135deg, #059669, #34d399)',
      ctaShadow   : 'rgba(5,150,105,0.42)',
      timerColor  : 'linear-gradient(90deg, #34d399, #059669)',
      proof       : ['G','Q','Z'],
      proofColors : ['#34d399', '#10b981', '#6ee7b7'],
      proofText   : '<span class="byn-proof-num">Lebih hemat</span> dari kasir konvensional',
    },

    /* 7 ── Slot terbatas / urgensi */
    {
      accent      : 'linear-gradient(90deg, #fb7185, #f43f5e)',
      borderGrad  : 'linear-gradient(135deg, rgba(251,113,133,0.5), rgba(244,63,94,0.5))',
      glowColor   : '#fb7185',
      iconBg      : 'linear-gradient(135deg, rgba(251,113,133,0.2), rgba(244,63,94,0.15))',
      iconPulse   : 'linear-gradient(135deg, #fb7185, #f43f5e)',
      iconBorder  : 'rgba(251,113,133,0.4)',
      emoji       : '🎯',
      source      : 'BENYORIKI · SLOT',
      sourceClr   : '#fda4af',
      badge       : '🔴 Slot Terbatas',
      badgeBg     : 'rgba(253,164,175,0.12)',
      badgeClr    : '#fecdd3',
      title       : 'Slot Proyek Hampir Penuh!',
      desc        : 'Kami batasi klien baru agar kualitas tetap terjaga. <strong>Daftar sekarang</strong> sebelum slot minggu ini habis.',
      cta         : '🚨 Amankan Slotku',
      ctaBg       : 'linear-gradient(135deg, #f43f5e, #e11d48)',
      ctaShadow   : 'rgba(244,63,94,0.45)',
      timerColor  : 'linear-gradient(90deg, #fb7185, #f43f5e)',
      proof       : ['P','Q','R'],
      proofColors : ['#fb7185', '#f43f5e', '#fda4af'],
      proofText   : '<span class="byn-proof-num">Hanya 3 slot</span> tersisa minggu ini',
    },

    /* 8 ── Hosting + domain sudah termasuk */
    {
      accent      : 'linear-gradient(90deg, #a78bfa, #c084fc)',
      borderGrad  : 'linear-gradient(135deg, rgba(167,139,250,0.45), rgba(192,132,252,0.45))',
      glowColor   : '#a78bfa',
      iconBg      : 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(192,132,252,0.15))',
      iconPulse   : 'linear-gradient(135deg, #a78bfa, #c084fc)',
      iconBorder  : 'rgba(167,139,250,0.35)',
      emoji       : '💰',
      source      : 'BENYORIKI · HEMAT',
      sourceClr   : '#c4b5fd',
      badge       : '⚡ All-In',
      badgeBg     : 'rgba(196,181,253,0.12)',
      badgeClr    : '#ddd6fe',
      title       : 'Hosting & Domain Sudah Termasuk!',
      desc        : 'Tidak perlu bayar lagi di tempat lain. Semua paket <strong>langsung online</strong> tanpa biaya tersembunyi — beneran all-in!',
      cta         : '💸 Lihat Paket Harga',
      ctaBg       : 'linear-gradient(135deg, #7c3aed, #a855f7)',
      ctaShadow   : 'rgba(124,58,237,0.42)',
      timerColor  : 'linear-gradient(90deg, #a78bfa, #c084fc)',
      proof       : ['K','L','N'],
      proofColors : ['#a78bfa', '#c084fc', '#d8b4fe'],
      proofText   : '<span class="byn-proof-num">89 UMKM</span> sudah pakai paket all-in ini',
    },

  ];

  /* ── State ──────────────────────────────────────────────────── */
  var idx       = 0;
  var countdown = CFG.intervalSec;
  var notifNum  = 0;
  var stack     = document.getElementById('byn-stack');

  if (!stack) {
    stack = document.createElement('div');
    stack.id = 'byn-stack';
    document.body.appendChild(stack);
  }

  /* ── Spawn burst particles ──────────────────────────────────── */
  function spawnParticles(card, color) {
    var count = 6;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'byn-particle';
      var angle = (360 / count) * i;
      var dist  = 30 + Math.random() * 20;
      var dx = Math.cos(angle * Math.PI / 180) * dist + 'px';
      var dy = Math.sin(angle * Math.PI / 180) * dist + 'px';
      p.style.cssText = [
        'background:' + color,
        'box-shadow: 0 0 6px ' + color,
        'left: 24px',
        'top: 24px',
        '--dx:' + dx,
        '--dy:' + dy,
        'animation-delay:' + (Math.random() * 0.1) + 's',
      ].join(';');
      card.appendChild(p);
      setTimeout(function(el){ el.remove(); }, 900, p);
    }
  }

  /* ── Build card HTML ────────────────────────────────────────── */
  function buildCard(d, num) {
    var avatars = d.proof.map(function(l, i) {
      return '<div class="byn-av" style="background:' + d.proofColors[i] + ';box-shadow:0 0 8px ' + d.proofColors[i] + '66">' + l + '</div>';
    }).join('');

    var html = [
      /* glow bg */
      '<div class="byn-glow-bg" style="background:' + d.glowColor + '"></div>',

      /* shimmer sweep */
      '<div class="byn-shimmer"></div>',

      /* neon accent bar */
      '<div class="byn-accent" style="background:' + d.accent + '"></div>',

      /* close btn */
      '<button class="byn-close" aria-label="Tutup">✕</button>',

      /* count badge */
      num > 1 ? '<div class="byn-count-badge">' + num + '</div>' : '',

      /* main row */
      '<div class="byn-inner">',
        '<div class="byn-icon-wrap" style="background:' + d.iconBg + ';border-color:' + d.iconBorder + '">',
          '<div class="byn-icon-pulse" style="background:' + d.iconPulse + '"></div>',
          d.emoji,
        '</div>',
        '<div class="byn-body">',
          '<div class="byn-meta">',
            '<span class="byn-source" style="color:' + d.sourceClr + '">',
              '<span class="byn-live"></span>',
              d.source,
            '</span>',
            '<span class="byn-age">Baru saja</span>',
          '</div>',
          '<div class="byn-title">',
            d.title,
            '<span class="byn-badge" style="background:' + d.badgeBg + ';color:' + d.badgeClr + ';border-color:' + d.badgeClr + '44">' + d.badge + '</span>',
          '</div>',
          '<div class="byn-desc">' + d.desc + '</div>',
          '<div class="byn-proof">',
            '<div class="byn-avatars">' + avatars + '</div>',
            '<span class="byn-proof-text">' + d.proofText + '</span>',
          '</div>',
        '</div>',
      '</div>',

      /* divider */
      '<div class="byn-divider"></div>',

      /* footer */
      '<div class="byn-footer">',
        '<button class="byn-cta" style="background:' + d.ctaBg + ';box-shadow:0 6px 20px ' + d.ctaShadow + '">' + d.cta + ' →</button>',
        '<button class="byn-dismiss">Nanti</button>',
      '</div>',

      /* countdown timer bar */
      '<div class="byn-timer-bar" style="background:' + d.timerColor + ';--byn-life:' + CFG.autoLifeSec + 's"></div>',
    ].join('');

    return html;
  }

  /* ── Show notification ──────────────────────────────────────── */
  function show() {
    var data = NOTIFS[idx % NOTIFS.length];
    idx++;
    notifNum++;

    /* Limit stack */
    var cards = stack.querySelectorAll('.byn-card');
    if (cards.length >= CFG.maxVisible) {
      dismiss(cards[cards.length - 1]);
    }

    var card = document.createElement('div');
    card.className = 'byn-card';
    card.setAttribute('role', 'alert');
    card.setAttribute('aria-live', 'polite');
    card.style.setProperty('--byn-border-gradient', data.borderGrad);
    card.innerHTML = buildCard(data, notifNum);
    stack.prepend(card);

    /* Entrance animation (double rAF for reliable transition) */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        card.classList.add('byn-show');
        /* Particle burst */
        setTimeout(function() { spawnParticles(card, data.glowColor); }, 300);
      });
    });

    /* Click anywhere on card (not buttons) */
    card.addEventListener('click', function (e) {
      if (!e.target.closest('button')) navigate();
    });

    /* CTA */
    card.querySelector('.byn-cta').addEventListener('click', function (e) {
      e.stopPropagation();
      navigate();
    });

    /* Dismiss */
    card.querySelector('.byn-dismiss').addEventListener('click', function (e) {
      e.stopPropagation();
      dismiss(card);
    });
    card.querySelector('.byn-close').addEventListener('click', function (e) {
      e.stopPropagation();
      dismiss(card);
    });

    /* Swipe right to dismiss (mobile) */
    var startX = 0;
    card.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    card.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (dx > 80) dismiss(card);
    }, { passive: true });

    /* Auto-dismiss */
    setTimeout(function () { dismiss(card); }, CFG.autoLifeSec * 1000);
    countdown = CFG.intervalSec;
  }

  /* ── Dismiss ────────────────────────────────────────────────── */
  function dismiss(card) {
    if (!card || !card.parentNode) return;
    card.classList.remove('byn-show');
    card.classList.add('byn-hide');
    setTimeout(function () {
      if (card.parentNode) card.remove();
    }, 500);
  }

  /* ── Navigate ───────────────────────────────────────────────── */
  function navigate() {
    window.open(CFG.targetURL, '_blank', 'noopener,noreferrer');
  }

  /* ── Countdown tick ─────────────────────────────────────────── */
  function tick() {
    countdown--;
    if (countdown <= 0) {
      show();
      countdown = CFG.intervalSec;
    }
  }

  /* ── Visibility API: pause when tab hidden ──────────────────── */
  var tickTimer = null;
  function startTick()  { if (!tickTimer) tickTimer = setInterval(tick, 1000); }
  function pauseTick()  { clearInterval(tickTimer); tickTimer = null; }

  document.addEventListener('visibilitychange', function() {
    document.hidden ? pauseTick() : startTick();
  });

  /* ── Scroll: collapse stack when scrolling up ───────────────── */
  var lastScrollY = 0;
  window.addEventListener('scroll', function() {
    var sy = window.scrollY;
    stack.classList.toggle('byn-collapsed', sy < lastScrollY && sy > 200);
    lastScrollY = sy;
  }, { passive: true });

  /* ── Init ───────────────────────────────────────────────────── */
  function init() {
    setTimeout(show, CFG.firstDelaySec * 1000);
    startTick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());