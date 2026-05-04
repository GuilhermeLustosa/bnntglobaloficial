// ─── CART STATE ───
const BnnT = {
  cart: JSON.parse(localStorage.getItem('bnnt_cart') || '[]'),

  saveCart() { localStorage.setItem('bnnt_cart', JSON.stringify(this.cart)) },

  addItem(product) {
    const existing = this.cart.find(i => i.id === product.id);
    if (existing) existing.qty++;
    else this.cart.push({ ...product, qty: 1 });
    this.saveCart();
    this.updateCartUI();
    showToast(`✅ ${product.name} adicionado ao carrinho!`);
  },

  removeItem(id) {
    this.cart = this.cart.filter(i => i.id !== id);
    this.saveCart();
    this.updateCartUI();
  },

  updateQty(id, delta) {
    const item = this.cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.removeItem(id);
    else { this.saveCart(); this.updateCartUI(); }
  },

  getTotal() {
    return this.cart.reduce((s, i) => s + i.price * i.qty, 0);
  },

  getCount() {
    return this.cart.reduce((s, i) => s + i.qty, 0);
  },

  updateCartUI() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = this.getCount();
      el.style.display = this.getCount() > 0 ? 'flex' : 'none';
    });
  }
};

// ─── TOAST ───
function showToast(msg, type = 'success') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = `toast ${type} show`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ─── NAV SCROLL ───
function initNav() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 60);
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Hamburger
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mobileMenu');
  if (ham && mob) {
    ham.addEventListener('click', () => mob.classList.toggle('open'));
  }

  // Active link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Cart count
  BnnT.updateCartUI();
}

// ─── SCROLL REVEAL ───
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    obs.observe(el);
  });

  // staggered children
  document.querySelectorAll('.reveal-grid').forEach(grid => {
    [...grid.children].forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(24px)';
      child.style.transition = `opacity .6s ${i * 0.1}s ease, transform .6s ${i * 0.1}s ease`;
      obs.observe(child);
    });
  });
}

// ─── CIRCUIT BG ───
function circuitBg() {
  return `<div class="circuit-bg">
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><style>.cl{stroke:#7dc432;stroke-width:.5;fill:none}</style></defs>
    <line class="cl" x1="80" y1="0" x2="80" y2="180" opacity=".5"/>
    <line class="cl" x1="80" y1="180" x2="280" y2="180" opacity=".5"/>
    <circle cx="280" cy="180" r="3" fill="#7dc432" opacity=".6"/>
    <line class="cl" x1="280" y1="180" x2="280" y2="380" opacity=".4"/>
    <line class="cl" x1="280" y1="380" x2="520" y2="380" opacity=".4"/>
    <circle cx="520" cy="380" r="3" fill="#7dc432" opacity=".5"/>
    <line class="cl" x1="1360" y1="0" x2="1360" y2="140" opacity=".5"/>
    <line class="cl" x1="1360" y1="140" x2="1080" y2="140" opacity=".5"/>
    <circle cx="1080" cy="140" r="3" fill="#7dc432" opacity=".6"/>
    <line class="cl" x1="1080" y1="140" x2="1080" y2="420" opacity=".4"/>
    <line class="cl" x1="1080" y1="420" x2="860" y2="420" opacity=".4"/>
    <circle cx="860" cy="420" r="4" fill="#7dc432" opacity=".4"/>
    <line class="cl" x1="40" y1="620" x2="40" y2="900" opacity=".4"/>
    <line class="cl" x1="40" y1="620" x2="230" y2="620" opacity=".4"/>
    <circle cx="230" cy="620" r="3" fill="#7dc432" opacity=".5"/>
    <line class="cl" x1="230" y1="620" x2="230" y2="760" opacity=".3"/>
    <line class="cl" x1="1410" y1="520" x2="1180" y2="520" opacity=".4"/>
    <circle cx="1180" cy="520" r="3" fill="#7dc432" opacity=".5"/>
    <line class="cl" x1="1180" y1="520" x2="1180" y2="720" opacity=".3"/>
    <line class="cl" x1="1180" y1="720" x2="980" y2="720" opacity=".3"/>
    <rect x="77" y="177" width="6" height="6" fill="none" stroke="#7dc432" stroke-width=".5" opacity=".4"/>
    <rect x="227" y="617" width="6" height="6" fill="none" stroke="#7dc432" stroke-width=".5" opacity=".4"/>
    <rect x="1177" y="717" width="6" height="6" fill="none" stroke="#7dc432" stroke-width=".5" opacity=".4"/>
    <line class="cl" x1="600" y1="0" x2="600" y2="80" opacity=".3"/>
    <line class="cl" x1="600" y1="80" x2="740" y2="80" opacity=".3"/>
    <circle cx="740" cy="80" r="2" fill="#7dc432" opacity=".4"/>
  </svg>
</div>`;
}

// ─── NAV HTML ───
function navHTML(current) {
  return `
<nav id="navbar">
  <a class="nav-logo" href="index.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="#7dc432" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/><path d="M16 7l4-2" stroke-linecap="round"/></svg>
    BnnT<span>Global</span>
  </a>
  <ul class="nav-links">
    <li><a href="index.html" ${current==='home'?'class="active"':''}>Home</a></li>
    <li><a href="produtos.html" ${current==='produtos'?'class="active"':''}>Produtos</a></li>
    <li><a href="sobre.html" ${current==='sobre'?'class="active"':''}>Sobre</a></li>
    <li><a href="blog.html" ${current==='blog'?'class="active"':''}>Blog</a></li>
    <li><a href="contato.html" ${current==='contato'?'class="active"':''}>Contato</a></li>
  </ul>
  <div class="nav-right">
    <button class="nav-cart" onclick="window.location='carrinho.html'" title="Carrinho">
      🛒
      <span class="cart-count" style="display:none">0</span>
    </button>
    <a class="nav-cta" href="contato.html">Consultoria Grátis</a>
    <button class="hamburger" id="ham"><span></span><span></span><span></span></button>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="index.html">Home</a>
  <a href="produtos.html">Produtos</a>
  <a href="sobre.html">Sobre</a>
  <a href="blog.html">Blog</a>
  <a href="contato.html">Contato</a>
  <a href="carrinho.html">🛒 Carrinho</a>
</div>`;
}

// ─── FOOTER HTML ───
function footerHTML() {
  return `
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">BnnT<span>Global</span></div>
        <p class="footer-tagline">Tecnologia com segurança, para o Brasil e para o mundo. Curadoria especializada em produtos tech das melhores plataformas globais.</p>
        <div class="footer-social">
          <a class="social-btn" href="https://instagram.com/bnntglobal" target="_blank" title="Instagram">📸</a>
          <a class="social-btn" href="https://wa.me/5500000000000" target="_blank" title="WhatsApp">📱</a>
          <a class="social-btn" href="https://t.me/bnntglobal" target="_blank" title="Telegram">✈️</a>
          <a class="social-btn" href="https://youtube.com/@bnntglobal" target="_blank" title="YouTube">▶️</a>
          <a class="social-btn" href="https://linkedin.com/company/bnntglobal" target="_blank" title="LinkedIn">💼</a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Navegação</h5>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="produtos.html">Produtos</a></li>
          <li><a href="sobre.html">Sobre nós</a></li>
          <li><a href="blog.html">Blog & Dicas</a></li>
          <li><a href="contato.html">Contato</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Plataformas</h5>
        <ul>
          <li><a href="#">Amazon</a></li>
          <li><a href="#">Shopee</a></li>
          <li><a href="#">AliExpress</a></li>
          <li><a href="#">Mercado Livre</a></li>
          <li><a href="#">Temu</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Categorias</h5>
        <ul>
          <li><a href="produtos.html">Smartphones</a></li>
          <li><a href="produtos.html">Áudio & Fones</a></li>
          <li><a href="produtos.html">Wearables</a></li>
          <li><a href="produtos.html">Gaming</a></li>
          <li><a href="produtos.html">Notebooks</a></li>
          <li><a href="produtos.html">Acessórios</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 BnnT Global · bnntglobal.com · CNPJ 00.000.000/0001-00 · Todos os direitos reservados</p>
      <div class="footer-badges">
        <span class="f-badge">Compra Segura</span>
        <span class="f-badge">Afiliado Oficial</span>
        <span class="f-badge">Global</span>
      </div>
    </div>
  </div>
</footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
});
