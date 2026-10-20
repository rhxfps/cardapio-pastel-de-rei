/* ══════════════════════════════════════════
   DADOS DO CARDÁPIO
══════════════════════════════════════════ */
const defaultData = {
  'pasteis-sal': [
    { id: 'ps1', img: '../imgspasteis/pasteldecarne.png',         n: 'Carne Moída',         d: 'Carne de primeira com tempero caseiro, cebola e tomate frescos.', p: 13.00 },
    { id: 'ps2', img: '../imgspasteis/pastelqueijo.png',          n: 'Queijo',              d: 'Mussarela premium derretida com um toque de orégano. Crocante por fora, cremoso por dentro!', p: 13.00, t: 'Mais Pedido' },
    { id: 'ps3', img: '../imgspasteis/pastelfrango.png',          n: 'Frango com Catupiry', d: 'Frango desfiado suculento com o verdadeiro Catupiry.', p: 13.00 },
    { id: 'ps4', img: '../imgspasteis/pastelpizza.png',           n: 'Pizza',               d: 'Mussarela, presunto, tomate e orégano na medida certa.', p: 13.00 },
    { id: 'ps5', img: '../imgspasteis/pastelcalabresa.png',       n: 'Calabresa',           d: 'Calabresa suculenta com cebola caramelada e pimentão.', p: 13.00 },
    { id: 'ps6', img: '../imgspasteis/calabresacombaccon.png',    n: 'Calabresa com Bacon', d: 'Calabresa com bacon crocante, combinação irresistível.', p: 14.00, t: 'Especial' },
    { id: 'ps7', img: '../imgspasteis/carnecomqueijo.png',        n: 'Carne com Queijo',    d: 'Carne moída temperada com mussarela derretida.', p: 14.00 },
    { id: 'ps8', img: '../imgspasteis/pastelpalmito.png',         n: 'Palmito',             d: 'Palmito pupunha refogado com temperos especiais da casa.', p: 13.00 },
  ],
  'pasteis-doc': [
    { id: 'pd1', img: '../imgspasteis/pastelbanacomcenala.png',   n: 'Banana com Canela',   d: 'Banana nanica fresca caramelada com canela e açúcar cristal.', p: 13.00 },
    { id: 'pd2', img: '../imgspasteis/pastelromeuejulieta.png',   n: 'Romeu e Julieta',     d: 'Goiabada cremosa com queijo minas fresquinho — combinação clássica.', p: 13.00 },
    { id: 'pd3', img: '../imgspasteis/pastelnutela.png',          n: 'Nutella',             d: 'Recheio generoso da legítima Nutella quentinha.', p: 13.00, t: 'Novo' },
    { id: 'pd4', img: '../imgspasteis/pasteldocedeleite.png',     n: 'Doce de Leite',       d: 'Doce de leite argentino com toque de canela.', p: 13.00 },
  ],
  'sal-fritos': [
    { id: 'sf1', img: '../imgspasteis/COXINHA.png',               n: 'Coxinha',             d: 'Massa de batata recheada com frango e catupiry, crocante por fora.', p: 6.00, t: 'Destaque' },
    { id: 'sf2', img: '../imgspasteis/coxinhacatupiry.png',       n: 'Coxinha Catupiry',    d: 'Coxinha recheada com frango e o verdadeiro Catupiry cremoso.', p: 7.00 },
    { id: 'sf3', img: '../imgspasteis/mocoquinha.png',            n: 'Mocoquinha',          d: 'Bolinho crocante com recheio cremoso de mocotó temperado.', p: 6.00 },
    { id: 'sf4', img: '../imgspasteis/risolepresuntoequeijo.png', n: 'Risole de Presunto',  d: 'Risole crocante recheado com presunto e queijo derretido.', p: 6.00 },
    { id: 'sf5', img: '../imgspasteis/salsicha.png',              n: 'Enroladinho',         d: 'Salsicha artesanal em massa folhada crocante.', p: 4.50 },
    { id: 'sf6', img: '../imgspasteis/bolinho de queijo.png',     n: 'Bolinho de Queijo',   d: 'Bolinho frito recheado com queijo derretido, crocante por fora.', p: 5.00 },
  ],
  'sal-assados': [
    { id: 'sa1', img: '../imgspasteis/salsicha.png',              n: 'Enroladinho Assado',  d: 'Salsicha em massa folhada assada na hora, douradinha e crocante.', p: 4.50 },
  ],
};

const catLabels = {
  'pasteis-sal': '🥟 Pastéis Salgados',
  'pasteis-doc': '🍬 Pastéis Doces',
  'sal-fritos':  '🍗 Salgados Fritos',
  'sal-assados': '🥐 Salgados Assados',
};

/* paletas de cor para slides sem imagem */
const palettes = [
  ['#7B1FA2', '#C62828'],
  ['#1565C0', '#00838F'],
  ['#2E7D32', '#F9A825'],
  ['#BF360C', '#F57F17'],
  ['#1A237E', '#AD1457'],
  ['#004D40', '#1B5E20'],
  ['#880E4F', '#4A148C'],
  ['#E65100', '#B71C1C'],
];

/* ══════════════════════════════════════════
   ESTADO GLOBAL
══════════════════════════════════════════ */
let data       = {};
let cart       = [];
let allSlides  = [];   // lista flat de todos os produtos
let visibleIds = [];   // ids dos slides atualmente no DOM
let observer   = null;
let currentIdx = 0;

/* ══════════════════════════════════════════
   INICIALIZAÇÃO
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Versão do catálogo — força reset do localStorage ao mudar
  const CATALOG_VERSION = '3';
  if (localStorage.getItem('pastel_catalog_v') !== CATALOG_VERSION) {
    localStorage.setItem('pastel_catalog', JSON.stringify(defaultData));
    localStorage.setItem('pastel_catalog_v', CATALOG_VERSION);
  }
  data = JSON.parse(localStorage.getItem('pastel_catalog')) || defaultData;

  // Tema
  initTheme();

  // Monta lista flat
  buildFlatList();

  // Renderiza feed com todos os itens
  renderFeed('all');

  // Filtros de categoria
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFeed(btn.dataset.cat);
    });
  });

  // Carrinho
  document.getElementById('cart-toggle').addEventListener('click', () => openModal('cart-modal'));
  document.getElementById('checkout-btn').addEventListener('click', openCheckout);

  // Masks
  setupMasks();

  // Fecha modal clicando fora
  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) closeModal(e.target.id);
  });

  if (window.lucide) lucide.createIcons();
});

/* ══════════════════════════════════════════
   MONTA LISTA FLAT DE PRODUTOS
══════════════════════════════════════════ */
function buildFlatList() {
  allSlides = [];
  let paletteIdx = 0;
  Object.entries(data).forEach(([cat, items]) => {
    items.forEach(item => {
      const [a, b] = palettes[paletteIdx % palettes.length];
      paletteIdx++;
      allSlides.push({ ...item, cat, colorA: a, colorB: b });
    });
  });
}

/* ══════════════════════════════════════════
   RENDERIZA O FEED
══════════════════════════════════════════ */
function renderFeed(filter) {
  const feed = document.getElementById('tiktok-feed');
  feed.innerHTML = '';

  // Desconecta observer anterior
  if (observer) observer.disconnect();

  const items = filter === 'all'
    ? allSlides
    : allSlides.filter(i => i.cat === filter);

  if (items.length === 0) {
    feed.innerHTML = `
      <div class="slide" style="display:flex;align-items:center;justify-content:center;">
        <p style="color:rgba(255,255,255,.5);font-size:1.1rem;">Nenhum item encontrado.</p>
      </div>`;
    return;
  }

  visibleIds = items.map(i => i.id);

  // Atualiza contador total
  document.getElementById('slide-total').textContent = items.length;
  document.getElementById('slide-current').textContent = '1';
  currentIdx = 0;

  // Cria dots de progresso
  buildProgressDots(items.length);

  // Cria slides
  items.forEach((item, idx) => {
    feed.appendChild(createSlide(item, idx));
  });

  // Scroll para o topo
  feed.scrollTo({ top: 0, behavior: 'instant' });

  // Ativa primeiro slide imediatamente
  activateSlide(0);

  // Esconde scroll-hint depois do primeiro scroll
  const hint = document.getElementById('scroll-hint');
  hint.classList.remove('hidden');

  // Observer para animações e contador
  setupObserver(items.length);

  if (window.lucide) lucide.createIcons();
}

/* ══════════════════════════════════════════
   CRIA UM SLIDE
══════════════════════════════════════════ */
function createSlide(item, idx) {
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.dataset.idx = idx;
  slide.dataset.id  = item.id;

  // Background
  const bg = document.createElement('div');
  bg.className = 'slide-bg';
  if (item.img) {
    bg.style.backgroundImage = `url('${item.img}')`;
  } else {
    // Aplica gradiente direto no style para evitar herança de CSS custom properties
    bg.style.background = `linear-gradient(145deg, ${item.colorA}, ${item.colorB})`;
  }

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'slide-overlay';

  // Ícone central (sem imagem) — z-index 2 para ficar sobre bg/overlay mas sob conteúdo
  let iconHtml = '';
  if (!item.img) {
    iconHtml = `<i data-lucide="${item.i}" class="slide-icon"></i>`;
  }

  // Tag
  const tagHtml = item.t
    ? `<div class="slide-tag">${item.t}</div>`
    : '';

  // Label categoria
  const catHtml = `<div class="slide-cat-label">${catLabels[item.cat] || item.cat}</div>`;

  // Botões laterais
  const actionsHtml = `
    <div class="slide-actions">
      <button class="action-btn" onclick="openProductDetails('${item.id}')" title="Ver detalhes">
        <i data-lucide="info"></i>
        <span>Detalhes</span>
      </button>
      <button class="action-btn add-btn" onclick="addToCart('${item.id}','${escHtml(item.n)}',${item.p})" title="Adicionar ao carrinho">
        <i data-lucide="shopping-cart"></i>
        <span>Adicionar</span>
      </button>
    </div>
  `;

  // Conteúdo inferior
  const contentHtml = `
    <div class="slide-content">
      <span class="slide-category">${catLabels[item.cat] || item.cat}</span>
      <h2 class="slide-name">${item.n}</h2>
      <p class="slide-desc">${item.d}</p>
      <div class="slide-price-row">
        <div class="slide-price">
          <small>A partir de</small>
          R$ ${formatPrice(item.p)}
        </div>
      </div>
    </div>
  `;

  slide.innerHTML = tagHtml + catHtml + iconHtml + actionsHtml + contentHtml;
  slide.prepend(overlay);
  slide.prepend(bg);

  return slide;
}

/* ══════════════════════════════════════════
   INTERSECTION OBSERVER
══════════════════════════════════════════ */
function setupObserver(total) {
  const feed = document.getElementById('tiktok-feed');
  const hint = document.getElementById('scroll-hint');

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        const idx = parseInt(entry.target.dataset.idx, 10);
        activateSlide(idx);

        // Atualiza contador
        document.getElementById('slide-current').textContent = idx + 1;

        // Esconde dica de scroll após 1º scroll
        if (idx > 0) hint.classList.add('hidden');
      }
    });
  }, {
    root: feed,
    threshold: 0.6,
  });

  feed.querySelectorAll('.slide').forEach(slide => observer.observe(slide));
}

/* ══════════════════════════════════════════
   ATIVA / DESATIVA SLIDE
══════════════════════════════════════════ */
function activateSlide(idx) {
  const feed = document.getElementById('tiktok-feed');
  feed.querySelectorAll('.slide').forEach((s, i) => {
    if (i === idx) {
      s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });

  currentIdx = idx;
  updateProgressDots(idx);

  // Re-init lucide nos slides recém-ativados
  if (window.lucide) lucide.createIcons();
}

/* ══════════════════════════════════════════
   DOTS DE PROGRESSO
══════════════════════════════════════════ */
function buildProgressDots(total) {
  // Remove dots anteriores
  document.querySelectorAll('.slide-progress').forEach(el => el.remove());

  // Só exibe dots até 20 itens (mais que isso fica pequeno demais)
  if (total > 20) return;

  const container = document.createElement('div');
  container.className = 'slide-progress';

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
    dot.dataset.dotIdx = i;
    container.appendChild(dot);
  }

  document.body.appendChild(container);
}

function updateProgressDots(idx) {
  document.querySelectorAll('.progress-dot').forEach(dot => {
    dot.classList.toggle('active', parseInt(dot.dataset.dotIdx, 10) === idx);
  });
}

/* ══════════════════════════════════════════
   DETALHES DO PRODUTO
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
    ? `<img src="${product.img}" class="pd-img" alt="${escHtml(product.n)}">`
    : `<i data-lucide="${product.i}"></i>`;

  content.innerHTML = `
    <div class="pd-hero">${mediaHtml}</div>
    <div class="pd-body">
      <h2 class="pd-name">${product.n}</h2>
      <p class="pd-desc">${product.d}</p>
      <div class="pd-action">
        <span class="pd-price">R$ ${formatPrice(product.p)}</span>
        <button class="btn-order"
          onclick="addToCart('${product.id}','${escHtml(product.n)}',${product.p}); closeModal('product-modal')">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `;

  openModal('product-modal');
  if (window.lucide) lucide.createIcons();
}

/* ══════════════════════════════════════════
   CARRINHO
══════════════════════════════════════════ */
function addToCart(id, name, price) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  updateCart();
  animateCartBadge();
}

function animateCartBadge() {
  const badge = document.getElementById('cart-count');
  badge.style.transform = 'scale(1.5)';
  setTimeout(() => badge.style.transform = 'scale(1)', 200);
}

function updateCart() {
  const countEl    = document.getElementById('cart-count');
  const itemsEl    = document.getElementById('cart-items-list');
  const totalEl    = document.getElementById('cart-total-val');
  const checkoutBtn = document.getElementById('checkout-btn');

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  countEl.textContent = totalItems;

  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="empty-cart-msg">Seu carrinho está vazio.</div>`;
    totalEl.textContent = 'R$ 0,00';
    checkoutBtn.disabled = true;
  } else {
    let total = 0;
    itemsEl.innerHTML = cart.map(item => {
      total += item.price * item.quantity;
      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">R$ ${formatPrice(item.price)}</div>
          </div>
          <div class="cart-item-controls">
            <button class="control-btn" onclick="changeQty('${item.id}',-1)">−</button>
            <span>${item.quantity}</span>
            <button class="control-btn" onclick="changeQty('${item.id}',1)">+</button>
          </div>
        </div>
      `;
    }).join('');
    totalEl.textContent = `R$ ${formatPrice(total)}`;
    checkoutBtn.disabled = false;
  }

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
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

/* ══════════════════════════════════════════
   CHECKOUT
══════════════════════════════════════════ */
function openCheckout() {
  closeModal('cart-modal');

  const summaryEl  = document.getElementById('checkout-items-summary');
  const subtotalEl = document.getElementById('summary-subtotal-val');
  let subtotal = 0;

  summaryEl.innerHTML = cart.map(item => {
    const sub = item.price * item.quantity;
    subtotal += sub;
    return `
      <div class="summary-item">
        <span>${item.quantity}× ${item.name}</span>
        <span>R$ ${formatPrice(sub)}</span>
      </div>
    `;
  }).join('');

  const deliveryFee = 5.00;
  subtotalEl.textContent = `R$ ${formatPrice(subtotal)}`;
  document.getElementById('summary-total-val').textContent = `R$ ${formatPrice(subtotal + deliveryFee)}`;

  openModal('checkout-modal');
  if (window.lucide) lucide.createIcons();
}

/* ══════════════════════════════════════════
   BUSCA CEP
══════════════════════════════════════════ */
async function buscarCEP(cep) {
  const clean = cep.replace(/\D/g, '');
  if (clean.length !== 8) return;

  const streetInput       = document.getElementById('cust-street');
  const neighborhoodInput = document.getElementById('cust-neighborhood');
  const numberInput       = document.getElementById('cust-number');
  const original          = streetInput.placeholder;
  streetInput.placeholder = 'Buscando...';

  try {
    const res  = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    const json = await res.json();
    if (json.erro) {
      alert('CEP não encontrado!');
    } else {
      streetInput.value       = json.logradouro;
      neighborhoodInput.value = json.bairro;
      numberInput.focus();
    }
  } catch {
    alert('Erro ao buscar CEP. Tente novamente.');
  } finally {
    streetInput.placeholder = original;
  }
}

/* ══════════════════════════════════════════
   ENVIAR PEDIDO (WHATSAPP + DISCORD)
══════════════════════════════════════════ */
async function sendWhatsAppOrder() {
  const name         = document.getElementById('cust-name').value.trim();
  const cpf          = document.getElementById('cust-cpf').value.trim();
  const cep          = document.getElementById('cust-cep').value.trim();
  const street       = document.getElementById('cust-street').value.trim();
  const number       = document.getElementById('cust-number').value.trim();
  const neighborhood = document.getElementById('cust-neighborhood').value.trim();
  const ref          = document.getElementById('cust-ref').value.trim();
  const payment      = document.querySelector('input[name="payment"]:checked').value;

  if (!name || !street || !number || !cep) {
    alert('Por favor, preencha nome, CEP, rua e número.');
    return;
  }

  const confirmBtn        = document.querySelector('.confirm-btn');
  const originalContent   = confirmBtn.innerHTML;
  confirmBtn.disabled     = true;
  confirmBtn.innerHTML    = '<i data-lucide="loader" class="animate-spin"></i> Processando...';
  if (window.lucide) lucide.createIcons();

  const subtotal    = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = 5.00;
  const finalTotal  = subtotal + deliveryFee;

  // Discord webhook
  const webhookUrl = 'https://discord.com/api/webhooks/1491598777172234330/P_hXAJz1q2f4NBhodSTNN34kRhEY1ITJiDob2Ee3y7ARz59IWGp7HsHrDoFCfyb2oigB';
  const discordPayload = {
    username: 'Sistema de Pedidos - Pastel de Rei',
    embeds: [{
      title: '🔔 NOVO PEDIDO RECEBIDO!',
      color: 13002792,
      fields: [
        { name: '👤 Cliente',    value: name,                                                               inline: true },
        { name: '🆔 CPF',        value: cpf || 'Não informado',                                             inline: true },
        { name: '💳 Pagamento',  value: payment,                                                            inline: true },
        { name: '📍 Endereço',   value: `${street}, ${number}\n${neighborhood}\nCEP: ${cep}`,              inline: false },
        { name: '🏢 Referência', value: ref || 'Nenhuma',                                                   inline: false },
        { name: '🛒 Itens',      value: cart.map(i => `• ${i.quantity}× ${i.name} (R$ ${formatPrice(i.price * i.quantity)})`).join('\n'), inline: false },
        { name: '💰 Total',      value: `**R$ ${formatPrice(finalTotal)}**`,                                inline: false },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'Pastel de Rei — Pedido via Web' },
    }],
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });
  } catch { /* Discord é opcional, não bloqueia o fluxo */ }

  // Mensagem WhatsApp
  const phone = '5511999990000';
  let msg = `🍕 *Novo Pedido - Pastel de Rei*\n\n`;
  msg += `👤 *Cliente:* ${name}\n`;
  if (cpf) msg += `🆔 *CPF:* ${cpf}\n`;
  msg += `📍 *Endereço:* ${street}, ${number}\n`;
  msg += `🏙️ *Bairro:* ${neighborhood}\n`;
  msg += `📮 *CEP:* ${cep}\n`;
  if (ref) msg += `🏢 *Ref:* ${ref}\n`;
  msg += `💳 *Pagamento:* ${payment}\n\n`;
  msg += `🛒 *Itens:*\n`;
  cart.forEach(i => {
    msg += `• ${i.quantity}× ${i.name} (R$ ${formatPrice(i.price * i.quantity)})\n`;
  });
  msg += `\n📦 *Entrega:* R$ 5,00`;
  msg += `\n💰 *Total: R$ ${formatPrice(finalTotal)}*`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');

  // Salva no localStorage (painel admin)
  const newOrder = {
    id: Date.now().toString(),
    client: name, cpf,
    address: { street, number, neighborhood, cep, ref },
    items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
    total: finalTotal,
    payment,
    status: 'Pendente',
    date: new Date().toISOString(),
  };
  const orders = JSON.parse(localStorage.getItem('pastel_orders') || '[]');
  orders.unshift(newOrder);
  localStorage.setItem('pastel_orders', JSON.stringify(orders));

  // Feedback visual
  confirmBtn.innerHTML = '<i data-lucide="check-circle"></i> Pedido Enviado!';
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    cart = [];
    updateCart();
    closeModal('checkout-modal');
    confirmBtn.disabled  = false;
    confirmBtn.innerHTML = originalContent;
    if (window.lucide) lucide.createIcons();
  }, 2200);
}

/* ══════════════════════════════════════════
   TEMA
══════════════════════════════════════════ */
function initTheme() {
  const btn  = document.getElementById('theme-toggle');
  const body = document.body;
  const saved = localStorage.getItem('theme') || 'dark'; // feed escuro por padrão
  body.setAttribute('data-theme', saved);
  setThemeIcon(saved);

  btn.addEventListener('click', () => {
    const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setThemeIcon(next);
  });
}

function setThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  btn.innerHTML = theme === 'dark'
    ? '<i data-lucide="sun"></i>'
    : '<i data-lucide="moon"></i>';
  if (window.lucide) lucide.createIcons();
}

/* ══════════════════════════════════════════
   MÁSCARAS DE FORMULÁRIO
══════════════════════════════════════════ */
function setupMasks() {
  const cpf = document.getElementById('cust-cpf');
  const cep = document.getElementById('cust-cep');

  cpf?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    e.target.value = v;
  });

  cep?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    e.target.value = v;
  });
}

/* ══════════════════════════════════════════
   UTILIDADES
══════════════════════════════════════════ */
function formatPrice(n) {
  return n.toFixed(2).replace('.', ',');
}

function escHtml(str) {
  return str.replace(/'/g, "\\'");
}
