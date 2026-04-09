const menuItems = [
    {
        id: 1,
        name: "Pastel de Carne",
        category: "salgados",
        price: 12.00,
        description: "Carne moída selecionada, temperada com ervas finas e azeitonas.",
        image: "imgspasteis/pasteldecarne.png"
    },
    {
        id: 2,
        name: "Pastel de Queijo",
        category: "salgados",
        price: 12.00,
        description: "Muçarela de alta qualidade derretida com um toque de orégano.",
        image: "imgspasteis/pastelqueijo.png"
    },
    {
        id: 3,
        name: "Pastel de Presunto e Queijo",
        category: "salgados",
        price: 12.00,
        description: "A clássica combinação de presunto defumado e muçarela derretida.",
        image: "imgspasteis/pastelpizza.png"
    },
    {
        id: 4,
        name: "Pastel de Calabresa",
        category: "salgados",
        price: 12.00,
        description: "Calabresa moída com cebola e tempero especial da casa.",
        image: "imgspasteis/pastelcalabresa.png"
    },
    {
        id: 5,
        name: "Nutella com Morango",
        category: "doces",
        price: 18.00,
        description: "Recheio generoso de Nutella com morangos frescos fatiados.",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Doce de Leite Mineiro",
        category: "doces",
        price: 16.00,
        description: "O legítimo doce de leite mineiro com toque de canela.",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1000&auto=format&fit=crop"
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
