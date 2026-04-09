const menuItems = [
    {
        id: 1,
        name: "Carne Premium",
        category: "salgados",
        price: 14.00,
        description: "Carne moída selecionada, temperada com ervas finas e azeitonas chilenas.",
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Quatro Queijos",
        category: "salgados",
        price: 13.00,
        description: "Blend especial de muçarela, provolone, parmesão e catupiry original.",
        image: "https://images.unsplash.com/photo-1628815870980-f436169ad0ca?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Frango com Catupiry",
        category: "salgados",
        price: 14.00,
        description: "Frango desfiado suculento com o autêntico requeijão Catupiry.",
        image: "https://images.unsplash.com/photo-1619194472461-a129d2b6324c?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Nutella com Morango",
        category: "doces",
        price: 18.00,
        description: "Recheio generoso de Nutella com morangos frescos fatiados.",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Doce de Leite Mineiro",
        category: "doces",
        price: 16.00,
        description: "O legítimo doce de leite mineiro com toque de canela.",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Caldo de Cana Gelado",
        category: "bebidas",
        price: 10.00,
        description: "Extraído na hora, servido bem gelado com opção de limão ou abacaxi.",
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Suco Natural",
        category: "bebidas",
        price: 12.00,
        description: "Laranja, Limão ou Maracujá. 100% fruta, sem conservantes.",
        image: "https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=1000&auto=format&fit=crop"
    }
];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu('todos');
    initTheme();
});

// Theme Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
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
function renderMenu(category) {
    menuGrid.innerHTML = '';
    
    const filteredItems = category === 'todos' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const itemCard = `
            <div class="menu-item" data-category="${item.category}">
                <div class="item-img">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="item-price">
                        <span class="price">R$ ${item.price.toFixed(2)}</span>
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
        renderMenu(category);
    });
});
