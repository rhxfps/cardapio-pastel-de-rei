/* ══════════════════════════════════════════
   DADOS DO CARDÁPIO
══════════════════════════════════════════ */
const defaultData = {
  'pasteis-sal': [
    { id: 'ps1', img: 'imgspasteis/pasteldecarne.png',         n: 'Carne Moída',         d: 'Carne de primeira com tempero caseiro, cebola e tomate frescos.', p: 13.00 },
    { id: 'ps2', img: 'imgspasteis/pastelqueijo.png',          n: 'Queijo',              d: 'Mussarela premium derretida com um toque de orégano. Crocante por fora, cremoso por dentro!', p: 13.00, t: 'Mais Pedido' },
    { id: 'ps3', img: 'imgspasteis/pastelfrango.png',          n: 'Frango com Catupiry', d: 'Frango desfiado suculento com o verdadeiro Catupiry.', p: 13.00 },
    { id: 'ps4', img: 'imgspasteis/pastelpizza.png',           n: 'Pizza',               d: 'Mussarela, presunto, tomate e orégano na medida certa.', p: 13.00 },
    { id: 'ps5', img: 'imgspasteis/pastelcalabresa.png',       n: 'Calabresa',           d: 'Calabresa suculenta com cebola caramelada e pimentão.', p: 13.00 },
    { id: 'ps6', img: 'imgspasteis/calabresacombaccon.png',    n: 'Calabresa com Bacon', d: 'Calabresa com bacon crocante, combinação irresistível.', p: 14.00, t: 'Especial' },
    { id: 'ps7', img: 'imgspasteis/carnecomqueijo.png',        n: 'Carne com Queijo',    d: 'Carne moída temperada com mussarela derretida.', p: 14.00 },
    { id: 'ps8', img: 'imgspasteis/pastelpalmito.png',         n: 'Palmito',             d: 'Palmito pupunha refogado com temperos especiais da casa.', p: 13.00 },
  ],
  'pasteis-doc': [
    { id: 'pd1', img: 'imgspasteis/pastelbanacomcenala.png',   n: 'Banana com Canela',   d: 'Banana nanica fresca caramelada com canela e açúcar cristal.', p: 13.00 },
    { id: 'pd2', img: 'imgspasteis/pastelromeuejulieta.png',   n: 'Romeu e Julieta',     d: 'Goiabada cremosa com queijo minas fresquinho — combinação clássica.', p: 13.00 },
    { id: 'pd3', img: 'imgspasteis/pastelnutela.png',          n: 'Nutella',             d: 'Recheio generoso da legítima Nutella quentinha.', p: 13.00, t: 'Novo' },
    { id: 'pd4', img: 'imgspasteis/pasteldocedeleite.png',     n: 'Doce de Leite',       d: 'Doce de leite argentino com toque de canela.', p: 13.00 },
  ],
  'sal-fritos': [
    { id: 'sf1', img: 'imgspasteis/COXINHA.png',               n: 'Coxinha',             d: 'Massa de batata recheada com frango e catupiry, crocante por fora.', p: 6.00, t: 'Destaque' },
    { id: 'sf2', img: 'imgspasteis/coxinhacatupiry.png',       n: 'Coxinha Catupiry',    d: 'Coxinha recheada com frango e o verdadeiro Catupiry cremoso.', p: 7.00 },
    { id: 'sf3', img: 'imgspasteis/mocoquinha.png',            n: 'Mocoquinha',          d: 'Bolinho crocante com recheio cremoso de mocotó temperado.', p: 6.00 },
    { id: 'sf4', img: 'imgspasteis/risolepresuntoequeijo.png', n: 'Risole de Presunto',  d: 'Risole crocante recheado com presunto e queijo derretido.', p: 6.00 },
    { id: 'sf5', img: 'imgspasteis/salsicha.png',              n: 'Enroladinho',         d: 'Salsicha artesanal em massa folhada crocante.', p: 4.50 },
    { id: 'sf6', img: 'imgspasteis/bolinho de queijo.png',     n: 'Bolinho de Queijo',   d: 'Bolinho frito recheado com queijo derretido, crocante por fora.', p: 5.00 },
  ],
  'sal-assados': [
    { id: 'sa1', img: 'imgspasteis/salsicha.png',              n: 'Enroladinho Assado',  d: 'Salsicha em massa folhada assada na hora, douradinha e crocante.', p: 4.50 },
  ],
};

const catLabels = {
  'pasteis-sal': 'Pastéis Salgados',
  'pasteis-doc': 'Pastéis Doces',
  'sal-fritos':  'Salgados Fritos',
  'sal-assados': 'Salgados Assados',
};

/* ══════════════════════════════════════════
   ESTADO GLOBAL
══════════════════════════════════════════ */
let data      = {};
let cart      = [];
let allItems  = [];
let observer  = null;

/* ══════════════════════════════════════════
   INICIALIZAÇÃO
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const CATALOG_VERSION = '4';
  if (localStorage.getItem('pastel_catalog_v') !== CATALOG_VERSION) {
    localStorage.setItem('pastel_catalog', JSON.stringify(defaultData));
    localStorage.setItem('pastel_catalog_v', CATALOG_VERSION);
  }
  data = JSON.parse(localStorage.getItem('pastel_catalog')) || defaultData;

  buildFlatList();
  renderFeed('all');

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFeed(btn.dataset.cat);
    });
  });

  document.getElementById('cart-toggle').addEventListener('click', () => openModal('cart-modal'));
  document.getElementById('checkout-btn').addEventListener('click', openCheckout);
  setupMasks();

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) closeModal(e.target.id);
  });

  if (window.lucide) lucide.createIcons();
});

/* ══════════════════════════════════════════
   LISTA FLAT
══════════════════════════════════════════ */
function buildFlatList() {
  allItems = [];
  Object.entries(data).forEach(([cat, items]) => {
    items.forEach(item => allItems.push({ ...item, cat }));
  });
}

/* ══════════════════════════════════════════
   RENDERIZA O FEED
══════════════════════════════════════════ */
function renderFeed(filter) {
  const feed = document.getElementById('tiktok-feed');
  feed.innerHTML = '';
  if (observer) observer.disconnect();

  const items = filter === 'all'
    ? allItems
    : allItems.filter(i => i.cat === filter);

  if (!items.length) {
    feed.innerHTML = `<div class="feed-item" style="display:flex;align-items:center;justify-content:center;">
      <p style="color:rgba(255,255,255,.5);font-size:1.1rem;">Nenhum item encontrado.</p>
    </div>`;
    return;
  }

  items.forEach((item, idx) => feed.appendChild(createFeedItem(item, idx)));

  feed.scrollTo({ top: 0, behavior: 'instant' });

  buildProgressDots(items.length);
  setupObserver();
  if (window.lucide) lucide.createIcons();
}

/* ══════════════════════════════════════════
   CRIA UM FEED ITEM  (classes do CSS atual)
══════════════════════════════════════════ */
function createFeedItem(item, idx) {
  const el = document.createElement('div');
  el.className = 'feed-item';
  el.dataset.idx = idx;
  el.dataset.id  = item.id;

  /* background */
  const bgHtml = item.img
    ? `<img class="feed-bg" src="${item.img}" alt="${escHtml(item.n)}" loading="${idx < 3 ? 'eager' : 'lazy'}">`
    : `<div class="feed-bg-fallback">
         <i data-lucide="utensils"></i>
       </div>`;

  /* tag */
  const tagHtml = item.t
    ? `<div class="feed-tag">${item.t}</div>`
    : '';

  /* categoria pill */
  const catHtml = `<div class="feed-category">${catLabels[item.cat] || item.cat}</div>`;

  el.innerHTML = `
    ${bgHtml}
    <div class="feed-overlay"></div>
    ${tagHtml}

    <div class="feed-content">
      <div class="feed-text">
        ${catHtml}
        <h2 class="feed-name">${item.n}</h2>
        <p class="feed-desc">${item.d}</p>
      </div>
      <div class="feed-footer">
        <div class="feed-price-group">
          <span class="feed-price-label">A partir de</span>
          <span class="feed-price">R$ ${formatPrice(item.p)}</span>
        </div>
        <div class="feed-actions">
          <button class="feed-details" onclick="openProductDetails('${item.id}')" title="Ver detalhes">
            <i data-lucide="info"></i>
          </button>
          <button class="feed-btn" onclick="addToCart('${item.id}','${escHtml(item.n)}',${item.p})">
            <i data-lucide="shopping-cart"></i>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  `;

  return el;
}

/* ══════════════════════════════════════════
   DOTS DE PROGRESSO
══════════════════════════════════════════ */
function buildProgressDots(total) {
  // remove container anterior se existir
  document.querySelectorAll('.feed-progress').forEach(el => el.remove());

  // acima de 25 itens os dots ficam minúsculos, não vale
  if (total > 25) return;

  const container = document.createElement('div');
  container.className = 'feed-progress';

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = 'feed-progress-dot' + (i === 0 ? ' active' : '');
    dot.dataset.dotIdx = i;
    container.appendChild(dot);
  }

  document.body.appendChild(container);
}

function updateProgressDots(idx) {
  document.querySelectorAll('.feed-progress-dot').forEach(dot => {
    dot.classList.toggle('active', parseInt(dot.dataset.dotIdx, 10) === idx);
  });
}

/* ══════════════════════════════════════════
   INTERSECTION OBSERVER
══════════════════════════════════════════ */
function setupObserver() {
  const feed = document.getElementById('tiktok-feed');

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const idx = parseInt(entry.target.dataset.idx, 10);
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        // Ativa o item atual
        entry.target.classList.add('active');
        updateProgressDots(idx);
        if (window.lucide) lucide.createIcons();
      } else {
        // Remove ao sair para que a animação reexecute na volta
        entry.target.classList.remove('active');
      }
    });
  }, { root: feed, threshold: 0.5 });

  feed.querySelectorAll('.feed-item').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   DETALHES DO PRODUTO — visual dark glass
══════════════════════════════════════════ */
function openProductDetails(productId) {
  let product = null;
  for (const cat in data) {
    product = data[cat].find(p => p.id === productId);
    if (product) break;
  }
  if (!product) return;

  const content = document.getElementById('product-details-content');

  const mediaHtml = product.img
    ? `<img src="${product.img}" alt="${escHtml(product.n)}">`
    : `<div class="pd-hero-fallback"><i data-lucide="utensils"></i></div>`;

  const tagHtml = product.t
    ? `<span class="pd-tag">${product.t}</span>`
    : '';

  content.innerHTML = `
    <div class="pd-hero">
      ${mediaHtml}
      <div class="pd-hero-gradient"></div>
      <div class="pd-hero-text">
        ${tagHtml}
        <p class="pd-cat">${catLabels[product.cat] || product.cat}</p>
        <h2 class="pd-name">${product.n}</h2>
      </div>
    </div>

    <div class="pd-body">
      <p class="pd-desc">${product.d}</p>

      <div class="pd-chips">
        <span class="pd-chip">🔥 Feito na hora</span>
        <span class="pd-chip">⭐ Alta qualidade</span>
        <span class="pd-chip">🛵 Delivery rápido</span>
      </div>

      <div class="pd-divider"></div>

      <div class="pd-footer">
        <div class="pd-price-block">
          <span class="pd-price-label">A partir de</span>
          <span class="pd-price">R$ ${formatPrice(product.p)}</span>
        </div>
        <div class="pd-order-row">
          <div class="pd-qty">
            <button class="pd-qty-btn" onclick="pdQty(-1,${product.p})">
              <i data-lucide="minus"></i>
            </button>
            <span id="pd-qty-val">1</span>
            <button class="pd-qty-btn" onclick="pdQty(1,${product.p})">
              <i data-lucide="plus"></i>
            </button>
          </div>
          <button class="pd-add-btn"
            onclick="addToCart('${product.id}','${escHtml(product.n)}',${product.p},document.getElementById('pd-qty-val').textContent); closeModal('product-modal')">
            <i data-lucide="shopping-cart"></i>
            Adicionar · R$ <span id="pd-total">${formatPrice(product.p)}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  openModal('product-modal');
  if (window.lucide) lucide.createIcons();
}

function pdQty(delta, unitPrice) {
  const el  = document.getElementById('pd-qty-val');
  const tot = document.getElementById('pd-total');
  let q = Math.min(99, Math.max(1, parseInt(el.textContent, 10) + delta));
  el.textContent  = q;
  tot.textContent = formatPrice(unitPrice * q);
}

/* ══════════════════════════════════════════
   CARRINHO
══════════════════════════════════════════ */
function addToCart(id, name, price, qty = 1) {
  const q = parseInt(qty, 10) || 1;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.quantity += q;
  else cart.push({ id, name, price, quantity: q });
  updateCart();
  animateBadge();
}

function animateBadge() {
  const b = document.getElementById('cart-count');
  b.style.transform = 'scale(1.5)';
  setTimeout(() => b.style.transform = 'scale(1)', 200);
}

function updateCart() {
  const btn      = document.getElementById('cart-toggle');
  const countEl  = document.getElementById('cart-count');
  const itemsEl  = document.getElementById('cart-items-list');
  const totalEl  = document.getElementById('cart-total-val');
  const checkout = document.getElementById('checkout-btn');

  const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
  countEl.textContent = totalQty;

  /* badge visível só com itens */
  btn.classList.toggle('has-items', cart.length > 0);

  if (!cart.length) {
    itemsEl.innerHTML = `<div class="empty-cart-msg">Seu carrinho está vazio.</div>`;
    totalEl.textContent = 'R$ 0,00';
    checkout.disabled = true;
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    const sub = item.price * item.quantity;
    total += sub;
    /* encontra a imagem do produto */
    let imgSrc = '';
    for (const cat in data) {
      const p = data[cat].find(p => p.id === item.id);
      if (p) { imgSrc = p.img || ''; break; }
    }
    const thumbHtml = imgSrc
      ? `<img class="cart-item-thumb" src="${imgSrc}" alt="${item.name}">`
      : `<div class="cart-item-thumb" style="display:flex;align-items:center;justify-content:center;"><i data-lucide="utensils" style="width:22px;height:22px;opacity:.4"></i></div>`;

    return `
      <div class="cart-item">
        ${thumbHtml}
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-unit">R$ ${formatPrice(item.price)} / un.</div>
          <div class="cart-item-subtotal">R$ ${formatPrice(sub)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="control-btn" onclick="changeQty('${item.id}',-1)">−</button>
          <span>${item.quantity}</span>
          <button class="control-btn" onclick="changeQty('${item.id}',1)">+</button>
        </div>
      </div>`;
  }).join('');

  totalEl.textContent = `R$ ${formatPrice(total)}`;
  checkout.disabled = false;
  if (window.lucide) lucide.createIcons();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
  updateCart();
}

/* ══════════════════════════════════════════
   MODAIS
══════════════════════════════════════════ */
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

/* ══════════════════════════════════════════
   CHECKOUT
══════════════════════════════════════════ */
function openCheckout() {
  closeModal('cart-modal');
  const summaryEl  = document.getElementById('checkout-items-summary');
  const subtotalEl = document.getElementById('summary-subtotal-val');
  let sub = 0;

  summaryEl.innerHTML = cart.map(item => {
    const s = item.price * item.quantity;
    sub += s;
    return `<div class="summary-item"><span>${item.quantity}× ${item.name}</span><span>R$ ${formatPrice(s)}</span></div>`;
  }).join('');

  subtotalEl.textContent = `R$ ${formatPrice(sub)}`;
  document.getElementById('summary-total-val').textContent = `R$ ${formatPrice(sub + 5)}`;
  openModal('checkout-modal');
  if (window.lucide) lucide.createIcons();
}

/* ══════════════════════════════════════════
   BUSCA CEP
══════════════════════════════════════════ */
async function buscarCEP(cep) {
  const clean = cep.replace(/\D/g, '');
  if (clean.length !== 8) return;
  const street = document.getElementById('cust-street');
  const orig = street.placeholder;
  street.placeholder = 'Buscando...';
  try {
    const r = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    const j = await r.json();
    if (j.erro) { alert('CEP não encontrado!'); return; }
    street.value = j.logradouro;
    document.getElementById('cust-neighborhood').value = j.bairro;
    document.getElementById('cust-number').focus();
  } catch { alert('Erro ao buscar CEP.'); }
  finally   { street.placeholder = orig; }
}

/* ══════════════════════════════════════════
   WHATSAPP + DISCORD
══════════════════════════════════════════ */
async function sendWhatsAppOrder() {
  const name   = document.getElementById('cust-name').value.trim();
  const cpf    = document.getElementById('cust-cpf').value.trim();
  const cep    = document.getElementById('cust-cep').value.trim();
  const street = document.getElementById('cust-street').value.trim();
  const number = document.getElementById('cust-number').value.trim();
  const hood   = document.getElementById('cust-neighborhood').value.trim();
  const ref    = document.getElementById('cust-ref').value.trim();
  const pay    = document.querySelector('input[name="payment"]:checked').value;

  if (!name || !street || !number || !cep) {
    alert('Preencha nome, CEP, rua e número.'); return;
  }

  const btn  = document.querySelector('.confirm-btn');
  const orig = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Processando...';

  const sub   = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = sub + 5;

  const webhook = 'https://discord.com/api/webhooks/1491598777172234330/P_hXAJz1q2f4NBhodSTNN34kRhEY1ITJiDob2Ee3y7ARz59IWGp7HsHrDoFCfyb2oigB';
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Pastel de Rei',
        embeds: [{ title: '🔔 NOVO PEDIDO', color: 13002792,
          fields: [
            { name: '👤 Cliente',   value: name, inline: true },
            { name: '💳 Pagamento', value: pay,  inline: true },
            { name: '📍 Endereço',  value: `${street}, ${number} — ${hood} — CEP ${cep}` },
            { name: '🛒 Itens',     value: cart.map(i => `• ${i.quantity}× ${i.name} R$${formatPrice(i.price*i.quantity)}`).join('\n') },
            { name: '💰 Total',     value: `**R$ ${formatPrice(total)}**` },
          ],
          timestamp: new Date().toISOString(),
        }],
      }),
    });
  } catch { /* Discord é opcional */ }

  const phone = '5511999990000';
  let msg = `🍕 *Pastel de Rei — Novo Pedido*\n\n👤 ${name}`;
  if (cpf) msg += ` | CPF: ${cpf}`;
  msg += `\n📍 ${street}, ${number} — ${hood} — CEP ${cep}`;
  if (ref) msg += ` (${ref})`;
  msg += `\n💳 ${pay}\n\n🛒 *Itens:*\n`;
  cart.forEach(i => { msg += `• ${i.quantity}× ${i.name} — R$ ${formatPrice(i.price*i.quantity)}\n`; });
  msg += `\n📦 Entrega: R$ 5,00\n💰 *Total: R$ ${formatPrice(total)}*`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');

  const orders = JSON.parse(localStorage.getItem('pastel_orders') || '[]');
  orders.unshift({ id: Date.now().toString(), client: name, cpf,
    address: { street, number, neighborhood: hood, cep, ref },
    items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
    total, payment: pay, status: 'Pendente', date: new Date().toISOString() });
  localStorage.setItem('pastel_orders', JSON.stringify(orders));

  btn.innerHTML = '✓ Pedido Enviado!';
  setTimeout(() => {
    cart = []; updateCart(); closeModal('checkout-modal');
    btn.disabled = false; btn.innerHTML = orig;
    if (window.lucide) lucide.createIcons();
  }, 2200);
}


/* ══════════════════════════════════════════
   MÁSCARAS
══════════════════════════════════════════ */
function setupMasks() {
  document.getElementById('cust-cpf')?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/,'$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/,'$1.$2');
    e.target.value = v;
  });
  document.getElementById('cust-cep')?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g,'').slice(0,8);
    if (v.length > 5) v = v.replace(/(\d{5})(\d{1,3})/,'$1-$2');
    e.target.value = v;
  });
}

/* ══════════════════════════════════════════
   UTILS
══════════════════════════════════════════ */
function formatPrice(n) { return Number(n).toFixed(2).replace('.',','); }
function escHtml(s) { return s.replace(/'/g,"\\'"); }
