/* ── LÓGICA DO PAINEL ADMIN ── */

function showAdminSection(sectionId, element) {
  // Oculta todas as seções
  document.getElementById('dashboard-section').style.display = 'none';
  document.getElementById('produtos-section').style.display = 'none';
  document.getElementById('pedidos-section').style.display = 'none';
  
  // Mostra a selecionada
  document.getElementById(`${sectionId}-section`).style.display = 'block';
  
  // Atualiza classes ativas
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  element.classList.add('active');

  if (sectionId === 'produtos') {
    loadProducts();
  } else {
    loadOrders();
  }
}

/* ── GERENCIAMENTO DE PEDIDOS ── */
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem('pastel_orders') || '[]');
  const dashboardTbody = document.getElementById('orders-tbody');
  const allOrdersTbody = document.getElementById('all-orders-tbody');
  
  if (orders.length === 0) {
    const emptyMsg = '<tr><td colspan="6" style="text-align: center; padding: 3rem;">Nenhum pedido encontrado.</td></tr>';
    if (dashboardTbody) dashboardTbody.innerHTML = emptyMsg;
    if (allOrdersTbody) allOrdersTbody.innerHTML = emptyMsg;
    updateStats(0, 0, 0);
    return;
  }

  let pendingCount = 0;
  let doneCount = 0;
  let revenue = 0;

  const rowsHtml = orders.map(order => {
    if (order.status === 'Concluído') {
      doneCount++;
      revenue += order.total;
    } else {
      pendingCount++;
    }

    const statusClass = order.status === 'Concluído' ? 'status-done' : 'status-pending';
    
    return `
      <tr id="order-${order.id}">
        <td>#${order.id.slice(-4)}</td>
        <td>
          <div style="font-weight: 700;">${order.client}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted)">${order.payment}</div>
        </td>
        <td>
          <div style="font-size: 0.85rem;">${order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</div>
        </td>
        <td style="font-weight: 700; color: var(--primary)">R$ ${order.total.toFixed(2).replace('.', ',')}</td>
        <td>
          <span class="status-badge ${statusClass}">${order.status}</span>
        </td>
        <td>
          <div class="action-btns">
            <button class="action-btn" onclick="viewOrderDetails('${order.id}')" title="Ver Detalhes">
              <i data-lucide="eye"></i>
            </button>
            <button class="action-btn" onclick="updateOrderStatus('${order.id}', 'Concluído')" title="Concluir">
              <i data-lucide="check"></i>
            </button>
            <button class="action-btn" onclick="deleteOrder('${order.id}')" title="Excluir">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (dashboardTbody) dashboardTbody.innerHTML = rowsHtml;
  if (allOrdersTbody) allOrdersTbody.innerHTML = rowsHtml;

  updateStats(pendingCount, doneCount, revenue);
  if (window.lucide) lucide.createIcons();
}

function viewOrderDetails(id) {
  const orders = JSON.parse(localStorage.getItem('pastel_orders') || '[]');
  const order = orders.find(o => o.id === id);
  if (!order) return;

  const content = document.getElementById('order-details-content');
  const date = new Date(order.date).toLocaleString('pt-BR');
  
  content.innerHTML = `
    <div style="border-bottom: 2px dashed #eee; padding-bottom: 1rem; margin-bottom: 1rem;">
      <h3 style="color: var(--primary); margin-bottom: 5px;">Pedido #${order.id.slice(-4)}</h3>
      <p style="font-size: 0.85rem; color: #666;">Data: ${date}</p>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
        <i data-lucide="user" style="width: 18px;"></i> Cliente
      </h4>
      <p><strong>${order.client}</strong></p>
      ${order.cpf ? `<p style="font-size: 0.9rem; color: #666;">CPF: ${order.cpf}</p>` : ''}
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
        <i data-lucide="map-pin" style="width: 18px;"></i> Entrega
      </h4>
      <p>${order.address.street}, ${order.address.number}</p>
      <p>${order.address.neighborhood}</p>
      <p>CEP: ${order.address.cep}</p>
      ${order.address.ref ? `<p style="font-size: 0.9rem; color: #666; font-style: italic;">Ref: ${order.address.ref}</p>` : ''}
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 10px; display: flex; align-items: center; gap: 8px; color: var(--text-main);">
        <i data-lucide="shopping-basket" style="width: 18px;"></i> Itens do Pedido
      </h4>
      <div style="background: var(--bg-soft); padding: 15px; border-radius: 12px; border: 1px solid var(--border-color);">
        ${order.items.map(i => `
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 1rem; color: var(--text-main); border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 8px;">
            <span><strong style="color: var(--primary);">${i.quantity}x</strong> ${i.name}</span>
            <span style="font-weight: 600;">R$ ${(i.price * i.quantity).toFixed(2).replace('.', ',')}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="border-top: 2px solid #eee; padding-top: 1rem; margin-top: 1rem;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <span>Pagamento:</span>
        <strong>${order.payment}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.2rem; color: var(--primary); font-weight: 800;">
        <span>Total:</span>
        <span>R$ ${order.total.toFixed(2).replace('.', ',')}</span>
      </div>
    </div>
  `;

  openModal('order-details-modal');
  if (window.lucide) lucide.createIcons();
}

function printOrder() {
  const printContents = document.getElementById('printable-order').innerHTML;
  const originalContents = document.body.innerHTML;

  // Criar uma janela temporária para impressão ou usar um estilo @media print
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Imprimir Pedido</title>');
  printWindow.document.write('<style>body{font-family: sans-serif; padding: 20px;} .close-modal{display:none;} i{display:none;}</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write(printContents);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

function updateStats(pending, done, revenue) {
  document.getElementById('stat-pending').innerText = pending;
  document.getElementById('stat-done').innerText = done;
  document.getElementById('stat-revenue').innerText = `R$ ${revenue.toFixed(2).replace('.', ',')}`;
}

function updateOrderStatus(id, status) {
  const orders = JSON.parse(localStorage.getItem('pastel_orders') || '[]');
  const orderIndex = orders.findIndex(o => o.id === id);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    localStorage.setItem('pastel_orders', JSON.stringify(orders));
    loadOrders();
  }
}

function deleteOrder(id) {
  if (!confirm('Tem certeza que deseja excluir este pedido?')) return;
  
  let orders = JSON.parse(localStorage.getItem('pastel_orders') || '[]');
  orders = orders.filter(o => o.id !== id);
  localStorage.setItem('pastel_orders', JSON.stringify(orders));
  loadOrders();
}

function clearOrders() {
  if (!confirm('Deseja limpar todos os pedidos? Esta ação não pode ser desfeita.')) return;
  localStorage.removeItem('pastel_orders');
  loadOrders();
}

/* ── GERENCIAMENTO DE PRODUTOS ── */
function loadProducts() {
  const catalog = JSON.parse(localStorage.getItem('pastel_catalog'));
  const tbody = document.getElementById('products-tbody');
  let html = '';

  for (const category in catalog) {
    const products = catalog[category];
    products.forEach((product, index) => {
      const imgHtml = product.img 
        ? `<img src="${product.img}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover;">`
        : `<i data-lucide="${product.i}"></i>`;

      html += `
        <tr>
          <td>${imgHtml}</td>
          <td>
            <div style="font-weight: 700;">${product.n}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted)">${product.d}</div>
          </td>
          <td><span class="status-badge status-preparing" style="font-size: 0.7rem;">${category}</span></td>
          <td style="font-weight: 700;">R$ ${product.p.toFixed(2).replace('.', ',')}</td>
          <td>
            <div class="action-btns">
              <button class="action-btn" onclick="moveProduct('${category}', ${index}, -1)" title="Subir" ${index === 0 ? 'disabled' : ''}>
                <i data-lucide="arrow-up"></i>
              </button>
              <button class="action-btn" onclick="moveProduct('${category}', ${index}, 1)" title="Descer" ${index === products.length - 1 ? 'disabled' : ''}>
                <i data-lucide="arrow-down"></i>
              </button>
              <button class="action-btn" onclick="openEditProductModal('${category}', '${product.id}')" title="Editar">
                <i data-lucide="edit"></i>
              </button>
              <button class="action-btn" onclick="deleteProduct('${category}', '${product.id}')" title="Excluir">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    });
  }

  tbody.innerHTML = html;
  if (window.lucide) lucide.createIcons();
}

function moveProduct(category, index, direction) {
  const catalog = JSON.parse(localStorage.getItem('pastel_catalog'));
  const products = catalog[category];
  
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= products.length) return;

  // Troca os elementos de posição
  const temp = products[index];
  products[index] = products[targetIndex];
  products[targetIndex] = temp;

  localStorage.setItem('pastel_catalog', JSON.stringify(catalog));
  loadProducts();
}

function openEditProductModal(category, id) {
  const catalog = JSON.parse(localStorage.getItem('pastel_catalog'));
  const product = catalog[category].find(p => p.id === id);
  
  if (!product) return;

  document.getElementById('modal-title').innerText = 'Editar Produto';
  document.getElementById('edit-product-id').value = product.id;
  document.getElementById('edit-product-category').value = category;
  document.getElementById('category-group').style.display = 'none'; // Esconde categoria na edição
  document.getElementById('edit-product-name').value = product.n;
  document.getElementById('edit-product-desc').value = product.d;
  document.getElementById('edit-product-price').value = product.p;
  document.getElementById('edit-product-tag').value = product.t || '';
  
  // Imagem
  const preview = document.getElementById('edit-img-preview');
  const placeholder = document.getElementById('upload-placeholder');
  if (product.img) {
    preview.src = product.img;
    preview.style.display = 'block';
    placeholder.style.display = 'none';
  } else {
    preview.style.display = 'none';
    placeholder.style.display = 'block';
  }

  openModal('product-edit-modal');
}

function openAddProductModal() {
  document.getElementById('modal-title').innerText = 'Novo Produto';
  document.getElementById('edit-product-id').value = 'new-' + Date.now();
  document.getElementById('edit-product-category').value = 'pasteis-sal'; // Default
  document.getElementById('category-group').style.display = 'block'; // Mostra categoria no novo
  document.getElementById('edit-product-name').value = '';
  document.getElementById('edit-product-desc').value = '';
  document.getElementById('edit-product-price').value = '';
  document.getElementById('edit-product-tag').value = '';
  
  // Reset Imagem
  document.getElementById('edit-img-preview').style.display = 'none';
  document.getElementById('upload-placeholder').style.display = 'block';

  openModal('product-edit-modal');
}

function saveProduct() {
  const id = document.getElementById('edit-product-id').value;
  const category = document.getElementById('edit-product-category').value;
  const catalog = JSON.parse(localStorage.getItem('pastel_catalog'));
  const imgPreview = document.getElementById('edit-img-preview');
  
  const newProduct = {
    id: id,
    n: document.getElementById('edit-product-name').value,
    d: document.getElementById('edit-product-desc').value,
    p: parseFloat(document.getElementById('edit-product-price').value),
    t: document.getElementById('edit-product-tag').value || undefined,
    img: imgPreview.style.display === 'block' ? imgPreview.src : undefined
  };

  // Mantém o ícone original se estiver editando, ou usa um padrão se for novo
  if (!id.startsWith('new-')) {
    const oldProduct = catalog[category].find(p => p.id === id);
    if (oldProduct) newProduct.i = oldProduct.i;
  } else {
    newProduct.i = 'package';
  }

  if (!newProduct.n || isNaN(newProduct.p)) {
    alert('Preencha pelo menos o nome e o preço!');
    return;
  }

  if (id.startsWith('new-')) {
    catalog[category].push(newProduct);
  } else {
    const index = catalog[category].findIndex(p => p.id === id);
    if (index !== -1) catalog[category][index] = newProduct;
  }

  localStorage.setItem('pastel_catalog', JSON.stringify(catalog));
  closeModal('product-edit-modal');
  loadProducts();
}

function deleteProduct(category, id) {
  if (!confirm('Tem certeza que deseja remover este produto do cardápio?')) return;
  
  const catalog = JSON.parse(localStorage.getItem('pastel_catalog'));
  catalog[category] = catalog[category].filter(p => p.id !== id);
  
  localStorage.setItem('pastel_catalog', JSON.stringify(catalog));
  loadProducts();
}

/* ── LOGICA DE UPLOAD ── */
function initUploadLogic() {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const preview = document.getElementById('edit-img-preview');
  const placeholder = document.getElementById('upload-placeholder');

  if (!dropZone) return;

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, e => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'));
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'));
  });

  dropZone.addEventListener('drop', e => {
    const file = e.dataTransfer.files[0];
    handleFile(file);
  });

  fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    handleFile(file);
  });

  function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  }
}

/* ── MODAIS GERAIS ── */
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

/* ── TEMA ── */
function initAdminTheme() {
  document.body.setAttribute('data-theme', 'dark');
}

/* ── INICIALIZAÇÃO ── */
document.addEventListener('DOMContentLoaded', () => {
  initAdminTheme();
  initUploadLogic();
  loadOrders();
  
  // Atualiza pedidos a cada 30 segundos se estiver no dashboard
  setInterval(() => {
    if (document.getElementById('dashboard-section').style.display !== 'none') {
      loadOrders();
    }
  }, 30000);

  // Fechar modal ao clicar fora
  window.onclick = (event) => {
    if (event.target.classList.contains('modal')) {
      closeModal(event.target.id);
    }
  };
});