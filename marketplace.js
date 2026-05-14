

// Complete product database with all items
const allProducts = [
     // Grains (6)
    { name: "Basmati Rice", category: "grain", price: 3500, origin: "Uganda", image: "images/rice.png", badge: "Grain", unit: "kg" },
    { name: "Hard Winter Wheat", category: "grain", price: 2800, origin: "Uganda", image: "images/wheat.png", badge: "Grain", unit: "kg" },
    { name: "Pearl Millet", category: "grain", price: 1800, origin: "Uganda", image: "images/millet.png", badge: "Grain", unit: "kg" },
    { name: "Red Sorghum", category: "grain", price: 1100, origin: "Uganda", image: "images/sorghum.png", badge: "Grain", unit: "kg" },
    { name: "Malt Barley", category: "grain", price: 2200, origin: "Uganda", image: "images/barley.png", badge: "Grain", unit: "kg" },
    { name: "Yellow Corn", category: "grain", price: 1200, origin: "Uganda", image: "images/corn.png", badge: "Grain", unit: "kg" },
    
    // Fruits (10)
    { name: "Sweet Oranges", category: "fruit", price: 1000, origin: "Uganda", image: "images/oranges.jpg", badge: "Fruit", unit: "pc" },
    { name: "Green Grapes", category: "fruit", price: 8000, origin: "Uganda", image: "images/grapes.jpg", badge: "Fruit", unit: "kg" },
    { name: "Guavas", category: "fruit", price: 2000, origin: "Uganda", image: "images/gauvas.jpg", badge: "Fruit", unit: "kg" },
    { name: "Pawpaw", category: "fruit", price: 3000, origin: "Uganda", image: "images/pawpaw.jpg", badge: "Fruit", unit: "pc" },
    { name: "Jackfruit", category: "fruit", price: 15000, origin: "Uganda", image: "images/jackfruit.jpg", badge: "Fruit", unit: "pc" },
    { name: "Pineapples", category: "fruit", price: 4000, origin: "Uganda", image: "images/pineapple.png", badge: "Fruit", unit: "pc" },
    { name: "Mangoes", category: "fruit", price: 2500, origin: "Uganda", image: "images/mangoes.png", badge: "Fruit", unit: "kg" },
    { name: "Bananas", category: "fruit", price: 15000, origin: "Uganda", image: "images/banana.png", badge: "Fruit", unit: "bunch" },
      { name: "Avocado", category: "fruit", price: 1000, origin: "Uganda", image: "images/avocado.png", badge: "Fruit", unit: "pc" },

    // Vegetables (13)
    { name: "Fresh Tomatoes", category: "vegetable", price: 2500, origin: "Uganda", image: "images/tomatoes.jpg", badge: "Vegetable", unit: "kg" },
    { name: "Red Cabbage", category: "vegetable", price: 3000, origin: "Uganda", image: "images/red-cabbages.jpg", badge: "Vegetable", unit: "kg" },
    { name: "Carrots", category: "vegetable", price: 2000, origin: "Uganda", image: "images/carrots.jpg", badge: "Vegetable", unit: "kg" },
    { name: "Red Onions", category: "vegetable", price: 1500, origin: "Uganda", image: "images/red-onions.jpg", badge: "Vegetable", unit: "kg" },
    { name: "White Onions", category: "vegetable", price: 1800, origin: "Uganda", image: "images/white-onions.jpg", badge: "Vegetable", unit: "kg" },
    { name: "Spring Onions", category: "vegetable", price: 1000, origin: "Uganda", image: "images/spring-onions.jpg", badge: "Vegetable", unit: "bunch" },
    { name: "Green Cabbage", category: "vegetable", price: 2000, origin: "Uganda", image: "images/green-cabbages.jpg", badge: "Vegetable", unit: "kg" },
    { name: "Green Capsicum", category: "vegetable", price: 4000, origin: "Uganda", image: "images/green-cupsicums.jpg", badge: "Vegetable", unit: "kg" },
    { name: "Yellow Capsicum", category: "vegetable", price: 5000, origin: "Uganda", image: "images/yellow-cupsicums.png", badge: "Vegetable", unit: "kg" },
    { name: "Cucumber", category: "vegetable", price: 2000, origin: "Uganda", image: "images/cucumber.jpg", badge: "Vegetable", unit: "pc" },
    { name: "Eggplant", category: "vegetable", price: 3000, origin: "Uganda", image: "images/eggplant.jpg", badge: "Vegetable", unit: "kg" },
    { name: "Lemons", category: "vegetable", price: 500, origin: "Uganda", image: "images/lemons.jpg", badge: "Vegetable", unit: "pc" },
    { name: "Chili Peppers", category: "vegetable", price: 8000, origin: "Uganda", image: "images/green-chill.jpg", badge: "Vegetable", unit: "kg" },
    
    // Other (2)
    { name: "Arabica Coffee", category: "other", price: 12000, origin: "Uganda", image: "images/coffee.png", badge: "Other", unit: "kg" },
    { name: "Olive Oil", category: "other", price: 45000, origin: "Uganda", image: "images/image.png", badge: "Other", unit: "L" }
];
  
// Global variables
let currentProducts = [...allProducts];
let currentCategory = "all";
let currentSearch = "";

// Render products to grid
function renderProducts() {
    const grid = document.getElementById("productsGrid");
    const countSpan = document.getElementById("productCount");
    
    if (!grid) return;
    
    countSpan.textContent = currentProducts.length;
    
    if (currentProducts.length === 0) {
        grid.innerHTML = '<div class="no-results">No products found.</div>';
        return;
    }
    
    grid.innerHTML = currentProducts.map(product => {
        let badgeStyle = "";
        if (product.category === "other") badgeStyle = "style='background:#00bcd4;'";
        if (product.category === "vegetable") badgeStyle = "style='background:#4caf50;'";
        
        return `
            <div class="product-card ${product.category}">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.png'">
                <span class="product-badge" ${badgeStyle}>${product.badge}</span>
                <h3>${product.name}</h3>
                <p class="product-origin">📍 ${product.origin}</p>
                <div class="product-price">UGX ${product.price.toLocaleString()}/${product.unit}</div>
                <a href="contact.html" class="bid-btn">Place Bid</a>
            </div>
        `;
    }).join("");
}

// Filter and sort products
function filterAndSort() {
    let filtered = [...allProducts];
    
    // Filter by category
    if (currentCategory !== "all") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    // Filter by search
    if (currentSearch) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(currentSearch) ||
            p.origin.toLowerCase().includes(currentSearch)
        );
    }
    
    // Apply sorting
    const sortSelect = document.getElementById("sortSelect");
    const sortValue = sortSelect ? sortSelect.value : "default";
    
    if (sortValue === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    currentProducts = filtered;
    renderProducts();
}

// Search function
function performSearch() {
    const searchInput = document.getElementById("searchInput");
    currentSearch = searchInput ? searchInput.value.toLowerCase() : "";
    filterAndSort();
}

// Sort function
function applySort() {
    filterAndSort();
}

// Set category (for sidebar links)
function setCategory(category, element) {
    currentCategory = category;
    
    // Update active class on sidebar links
    document.querySelectorAll(".category-list a").forEach(link => {
        link.classList.remove("active");
    });
    if (element) {
        element.classList.add("active");
    }
    
    // Update button active class if buttons exist
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.getAttribute("data-category") === category || 
            (category === "grain" && btn.textContent === "Grains") ||
            (category === "fruit" && btn.textContent === "Fruits") ||
            (category === "vegetable" && btn.textContent === "Vegetables") ||
            (category === "other" && btn.textContent === "Other")) {
            btn.classList.add("active");
        }
    });
    
    filterAndSort();
}

// For button-based category filtering
function filterByCategory(category, button) {
    currentCategory = category;
    
    // Update button active class
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    if (button) {
        button.classList.add("active");
    }
    
    // Also update sidebar links if they exist
    document.querySelectorAll(".category-list a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("data-category") === category) {
            link.classList.add("active");
        }
    });
    
    filterAndSort();
}

// Initialize event listeners
function initEventListeners() {
    // Search functionality
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
        searchBtn.addEventListener("click", performSearch);
    }
    
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                performSearch();
            }
        });
    }
    
    // Sidebar category links
    document.querySelectorAll(".category-list a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = link.getAttribute("data-category");
            setCategory(category, link);
        });
    });
    
    // Button category filters
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.getAttribute("data-category");
            if (category) {
                filterByCategory(category, btn);
            }
        });
    });
    
    // Sort select
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", applySort);
    }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    initEventListeners();
    filterAndSort();
});