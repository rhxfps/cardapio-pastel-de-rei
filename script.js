const menuItems = [
    {
        id: 12,
        name: "Coca-Cola 350ml",
        category: "bebidas",
        type: "refrigerante",
        price: 6.00,
        description: "A clássica Coca-Cola bem gelada.",
        image: "imgspasteis/cocacola.png"
    },
    {
        id: 13,
        name: "Coca-Cola 600ml",
        category: "bebidas",
        type: "refrigerante",
        price: 8.00,
        description: "Coca-Cola original 600ml bem gelada.",
        image: "imgspasteis/coca.png"
    },
    {
        id: 14,
        name: "Guaraná Antarctica 350ml",
        category: "bebidas",
        type: "refrigerante",
        price: 6.00,
        description: "O autêntico sabor do guaraná em lata.",
        image: "imgspasteis/guarananantartida.png"
    },
    {
        id: 15,
        name: "Fanta Laranja 350ml",
        category: "bebidas",
        type: "refrigerante",
        price: 6.00,
        description: "Fanta Laranja refrescante em lata.",
        image: "imgspasteis/fantalaranja.png"
    },
    {
        id: 1,
        name: "Pastel de Carne",
        category: "salgados",
        price: 13.00,
        description: "Carne moída selecionada, temperada com ervas finas e azeitonas.",
        image: "imgspasteis/pasteldecarne.png"
    },
    {
        id: 2,
        name: "Pastel de Queijo",
        category: "salgados",
        price: 13.00,
        description: "Muçarela de alta qualidade derretida com um toque de orégano.",
        image: "imgspasteis/pastelqueijo.png"
    },
    {
        id: 3,
        name: "Pastel de Presunto e Queijo",
        category: "salgados",
        price: 13.00,
        description: "A clássica combinação de presunto defumado e muçarela derretida.",
        image: "imgspasteis/pastelpizza.png"
    },
    {
        id: 4,
        name: "Pastel de Calabresa",
        category: "salgados",
        price: 13.00,
        description: "Calabresa moída com cebola e tempero especial da casa.",
        image: "imgspasteis/pastelcalabresa.png"
    },
    {
        id: 5,
        name: "Nutella com Morango",
        category: "doces",
        price: 13.00,
        description: "Recheio generoso de Nutella com morangos frescos fatiados.",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Doce de Leite Mineiro",
        category: "doces",
        price: 13.00,
        description: "O legítimo doce de leite mineiro com toque de canela.",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Energético TNT Original 473ml",
        category: "bebidas",
        type: "energetico",
        price: 8.00,
        description: "Energia pura para qualquer hora do dia.",
        image: "imgspasteis/energeticotntoriginal.png",
        outOfStock: true
    },
    {
        id: 8,
        name: "Energético TNT Maçã Verde 473ml",
        category: "bebidas",
        type: "energetico",
        price: 8.00,
        description: "Sabor refrescante de maçã verde com a energia do TNT.",
        image: "imgspasteis/energeticotntmacaverd.png"
    },
    {
        id: 9,
        name: "Energético TNT Juice Manga 473ml",
        category: "bebidas",
        type: "energetico",
        price: 8.00,
        description: "O sabor tropical da manga with o boost que você precisa.",
        image: "imgspasteis/energeticotntjuicemanga.png"
    },
    {
        id: 10,
        name: "Energético TNT Açaí com Guaraná 473ml",
        category: "bebidas",
        type: "energetico",
        price: 8.00,
        description: "A energia brasileira do açaí e guaraná.",
        image: "imgspasteis/energeticotnacaicomguarana.png"
    },
    {
        id: 11,
        name: "Energético TNT Tangirina 473ml",
        category: "bebidas",
        type: "energetico",
        price: 8.00,
        description: "Sabor cítrico e marcante de tangerina.",
        image: "imgspasteis/energeticotnttangirina.png",
        outOfStock: true
    },
    {
        id: 16,
        name: "Suco Del Valle Goiaba 290ml",
        category: "bebidas",
        type: "suco",
        price: 7.50,
        description: "Suco de goiaba Del Valle refrescante.",
        image: "imgspasteis/delvalegoiaba.png"
    },
    {
        id: 17,
        name: "Suco Del Valle Manga 290ml",
        category: "bebidas",
        type: "suco",
        price: 7.50,
        description: "Suco de manga Del Valle refrescante.",
        image: "imgspasteis/delvalemanga.png"
    },
    {
        id: 18,
        name: "Suco Del Valle Maracujá 290ml",
        category: "bebidas",
        type: "suco",
        price: 7.50,
        description: "Suco de maracujá Del Valle refrescante.",
        image: "imgspasteis/delvalemaracu.png"
    },
    {
        id: 19,
        name: "Suco Del Valle Pêssego 290ml",
        category: "bebidas",
        type: "suco",
        price: 7.50,
        description: "Suco de pêssego Del Valle refrescante.",
        image: "imgspasteis/delvalepessego.png"
    },
    {
        id: 20,
        name: "Coca-Cola 200ml",
        category: "bebidas",
        type: "refrigerante",
        price: 4.00,
        description: "Coca-Cola original 200ml bem gelada.",
        image: "imgspasteis/cocacola200ml.png"
    },
    {
        id: 21,
        name: "Mocoquinha Chocolate 200ml",
        category: "bebidas",
        type: "outros",
        price: 2.00,
        description: "Bebida láctea sabor chocolate Mocoquinha.",
        image: "imgspasteis/mocoquinha.png"
    },
    {
        id: 101,
        name: "Copo Açaí Pequeno 300ml",
        category: "acai",
        price: 15.00,
        description: "Açaí cremoso de 300ml. Monte do seu jeito!",
        image: "imgspasteis/acai2.png"
    },
    {
        id: 102,
        name: "Copo Açaí Grande 500ml",
        category: "acai",
        price: 20.00,
        description: "Açaí cremoso de 500ml. Monte do seu jeito!",
        image: "imgspasteis/acai2.png"
    }
];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const acaiBuilder = document.getElementById('acai-builder');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');
const subFilterContainer = document.getElementById('sub-filter-container');
const subFilterBtns = document.querySelectorAll('.sub-filter-btn');
const cartModal = document.getElementById('cart-modal');
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const WHATSAPP_NUMBER = "5511966308878";

let isCartEnabled = true; // Default to true

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check for no-cart parameter in URL or Hash
    const fullUrl = window.location.href;
    if (fullUrl.includes('no-cart=true')) {
        isCartEnabled = false;
        document.body.classList.add('no-cart-mode'); // Add class to body for CSS hiding
    }

    renderMenu('todos');
    initTheme();
    if (isCartEnabled) {
        updateCart();
        initCartEvents();
    }
});

// Cart Logic
function initCartEvents() {
    cartToggle.addEventListener('click', () => cartModal.classList.add('active'));
    closeCart.addEventListener('click', () => cartModal.classList.remove('active'));
    
    // Close cart if clicking outside the content
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) cartModal.classList.remove('active');
    });

    checkoutBtn.addEventListener('click', sendOrder);
}

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const cartItem = cart.find(i => i.id === itemId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCart();
    showToast(`${item.name} adicionado!`);
}

function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    updateCart();
}

function changeQuantity(itemId, delta) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
    updateCartTotal();
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
        return;
    }

    cart.forEach(item => {
        const itemHtml = `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">R$ ${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHtml;
    });
}

function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartTotal() {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('active'), 100);
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function sendOrder() {
    if (cart.length === 0) {
        showToast('Adicione itens antes de finalizar!');
        return;
    }

    let message = "👑 *Novo Pedido - Pastel de Rei* 👑\n\n";
    cart.forEach(item => {
        message += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `\n*Total: R$ ${total.toFixed(2)}*\n\n`;
    message += "Por favor, informe o endereço de entrega ou se deseja retirar.";

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Clear cart
    cart = [];
    updateCart();
    cartModal.classList.remove('active');
    showToast('Pedido enviado com sucesso!');
}

// Theme Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Render Menu
function renderMenu(category, subCategory = 'todos') {
    menuGrid.innerHTML = '';
    
    // Show/Hide Açaí Builder
    if (category === 'acai') {
        acaiBuilder.classList.add('active');
        menuGrid.style.display = 'none';
    } else {
        acaiBuilder.classList.remove('active');
        menuGrid.style.display = 'grid';
    }
    
    let filteredItems;
    if (category === 'todos') {
        // Only show food (salgados and doces) as requested
        filteredItems = menuItems.filter(item => item.category === 'salgados' || item.category === 'doces');
    } else if (category === 'acai') {
        filteredItems = menuItems.filter(item => item.category === 'acai');
    } else {
        filteredItems = menuItems.filter(item => item.category === category);
    }

    if (category === 'bebidas' && subCategory !== 'todos') {
        filteredItems = filteredItems.filter(item => item.type === subCategory);
    }

    filteredItems.forEach(item => {
        const itemCard = `
            <div class="menu-item ${item.outOfStock ? 'out-of-stock' : ''}" data-category="${item.category}">
                <div class="item-img">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    ${item.outOfStock ? '<div class="out-of-stock-badge">Esgotado</div>' : ''}
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="item-price">
                        <span class="price">R$ ${item.price.toFixed(2)}</span>
                        ${isCartEnabled ? `
                        <button class="add-to-cart-btn" onclick="addToCart(${item.id})" ${item.outOfStock ? 'disabled' : ''}>
                            <i class="fas ${item.outOfStock ? 'fa-times' : 'fa-plus'}"></i> ${item.outOfStock ? 'Indisponível' : 'Adicionar'}
                        </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        menuGrid.innerHTML += itemCard;
    });
}

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter');
        
        // Show/Hide sub-filters for beverages
        if (category === 'bebidas') {
            subFilterContainer.classList.add('active');
            // Reset sub-filters to 'todos' when clicking main 'Bebidas'
            subFilterBtns.forEach(b => b.classList.remove('active'));
            subFilterBtns[0].classList.add('active');
        } else {
            subFilterContainer.classList.remove('active');
        }

        renderMenu(category);
    });
});

// Sub-filter Functionality
subFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        subFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const subCategory = btn.getAttribute('data-subfilter');
        renderMenu('bebidas', subCategory);
    });
});
