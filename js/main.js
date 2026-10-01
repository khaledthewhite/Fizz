// DOM Elements
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const sideCart = document.querySelector('.side-cart');
const cartCountElements = document.querySelectorAll('.cart-count');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total-amount');

// State
let cart = JSON.parse(localStorage.getItem('veez_cart')) || [];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();

    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    if(menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if(cartBtn) cartBtn.addEventListener('click', toggleCart);
    if(closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if(cartOverlay) cartOverlay.addEventListener('click', toggleCart);
    
    // Render Products if container exists
    const featuredContainer = document.getElementById('featured-products');
    if(featuredContainer) {
        renderProducts(products.slice(0, 4), featuredContainer);
    }
    
    // All Products or Search page
    const allProductsContainer = document.getElementById('all-products');
    if(allProductsContainer) {
        renderProducts(products, allProductsContainer);
    }

    // Offers page
    const offersContainer = document.getElementById('offers-products');
    if(offersContainer) {
        const discounted = products.filter(p => p.discount > 0);
        renderProducts(discounted, offersContainer);
    }
});

// Scroll Effect
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Menu Toggle
function toggleMenu() {
    navLinks.classList.toggle('active');
}

// Cart Toggle
function toggleCart(e) {
    if(e) e.preventDefault();
    cartOverlay.classList.toggle('active');
    sideCart.classList.toggle('active');
}

// Products Rendering
function createProductCard(product) {
    const isDiscounted = product.discount > 0;
    
    let priceHtml = `<div class="current-price">$${product.price.toFixed(2)}</div>`;
    if(isDiscounted) {
        priceHtml = `
            <div class="current-price">$${product.price.toFixed(2)}</div>
            <div class="old-price">$${product.oldPrice.toFixed(2)}</div>
        `;
    }

    const badgeHtml = isDiscounted ? `<div class="discount-badge">خصم ${product.discount}%</div>` : '';

    return `
        <div class="product-card">
            ${badgeHtml}
            <div class="product-image-wrap">
                <a href="product-details.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </a>
            </div>
            <div class="product-rating">
                <i class="fa-solid fa-star"></i>
                <span>${product.rating}</span>
                <span class="count">(${product.reviewsCount})</span>
            </div>
            <h3 class="product-title">
                <a href="product-details.html?id=${product.id}">${product.name}</a>
            </h3>
            <div class="product-price-row">
                ${priceHtml}
            </div>
            <div class="product-actions">
                <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-plus"></i> أضف للسلة
                </button>
            </div>
        </div>
    `;
}

function renderProducts(productsList, container) {
    if(!container) return;
    container.innerHTML = productsList.map(p => createProductCard(p)).join('');
}

// Cart Logic
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if(!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    saveCart();
    updateCartCount();
    renderCart();
    
    // Show cart open slightly or show toast
    if(!sideCart.classList.contains('active')) {
        toggleCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if(item) {
        item.quantity += delta;
        if(item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            renderCart();
        }
    }
}

function saveCart() {
    localStorage.setItem('veez_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => el.textContent = totalCount);
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function renderCart() {
    if(!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-basket-shopping"></i>
                <h3>السلة فارغة</h3>
                <p>لم تقم بإضافة أي منتجات بعد.</p>
            </div>
        `;
        if(cartTotalElement) cartTotalElement.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="quantity-control">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">حذف المنتج</button>
            </div>
        </div>
    `).join('');

    if(cartTotalElement) cartTotalElement.textContent = '$' + getCartTotal().toFixed(2);
}

// Utility: get URL Params
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
