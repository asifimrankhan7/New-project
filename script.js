// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links li a');
const reservationForm = document.getElementById('reservation-form');
const openStatus = document.getElementById('open-status');

// Inject Toast Container and Modal HTML
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.innerHTML = `
  <div class="modal-content">
    <h3 style="margin-bottom:1rem; font-family: var(--font-heading);">Please Confirm</h3>
    <p id="modal-message">Are you sure?</p>
    <div class="modal-actions">
      <button class="btn btn-secondary" style="background:#ccc; border:none; color:#333;" id="modal-cancel">Cancel</button>
      <button class="btn btn-primary" id="modal-confirm">Confirm</button>
    </div>
  </div>
`;
document.body.appendChild(modalOverlay);

// Utility Functions
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    // Simple icon matching
    let icon = 'ℹ️';
    if(type === 'success') icon = '✅';
    if(type === 'error') icon = '❌';
    
    toast.innerHTML = `<span>${icon}</span> ${message}`;
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

let confirmCallback = null;
const modalConfirmBtn = document.getElementById('modal-confirm');
const modalCancelBtn = document.getElementById('modal-cancel');
const modalMsg = document.getElementById('modal-message');

function showConfirmModal(message, onConfirm) {
    modalMsg.textContent = message;
    modalOverlay.classList.add('active');
    confirmCallback = onConfirm;
}

function closeModal() {
    modalOverlay.classList.remove('active');
    confirmCallback = null;
}

modalConfirmBtn.addEventListener('click', () => {
    if (confirmCallback) confirmCallback();
    closeModal();
});

modalCancelBtn.addEventListener('click', closeModal);

// sticky navigation logic
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// --- 50 VEG MENU ITEMS ---
const vegMenuItems = [
    { name: "Paneer Butter Masala", price: "$14", tag: "Curry", desc: "Cubes of cottage cheese in a rich tomato gravy." },
    { name: "Vegetable Biryani", price: "$16", tag: "Rice", desc: "Aromatic basmati rice cooked with mixed vegetables and spices." },
    { name: "Aloo Gobi", price: "$12", tag: "Dry", desc: "Potatoes and cauliflower tossed with turmeric and cumin." },
    { name: "Palak Paneer", price: "$14", tag: "Curry", desc: "Cottage cheese cubes in a smooth spinach puree." },
    { name: "Chana Masala", price: "$13", tag: "Curry", desc: "Spicy chickpea curry garnished with coriander." },
    { name: "Dal Makhani", price: "$15", tag: "Lentil", desc: "Creamy black lentils slow-cooked overnight." },
    { name: "Malai Kofta", price: "$16", tag: "Curry", desc: "Fried potato and paneer balls in a creamy cashew sauce." },
    { name: "Baingan Bharta", price: "$13", tag: "Dry", desc: "Smoky roasted eggplant mashed with onions and tomatoes." },
    { name: "Vegetable Korma", price: "$14", tag: "Curry", desc: "Mixed vegetables in a mild, creamy coconut sauce." },
    { name: "Bhindi Masala", price: "$12", tag: "Dry", desc: "Stir-fried okra with onions and spices." },
    { name: "Mushroom Matar", price: "$13", tag: "Curry", desc: "Mushrooms and green peas in a spiced tomato gravy." },
    { name: "Jeera Rice", price: "$8", tag: "Rice", desc: "Basmati rice flavored with cumin seeds." },
    { name: "Garlic Naan", price: "$4", tag: "Bread", desc: "Soft leavened bread topped with minced garlic and butter." },
    { name: "Stuffed Paratha", price: "$6", tag: "Bread", desc: "Whole wheat dates stuffed with spiced potatoes." },
    { name: "Rajma Chawal", price: "$12", tag: "Combo", desc: "Red kidney bean curry served with steamed rice." },
    { name: "Samosa Chaat", price: "$9", tag: "Snack", desc: "Crushed samosas topped with yogurt, chutneys, and spices." },
    { name: "Pani Puri", price: "$8", tag: "Snack", desc: "Crispy hollow balls filled with spicy tamarind water." },
    { name: "Vegetable Hakka Noodles", price: "$13", tag: "Chinese", desc: "Stir-fried noodles with crunchy vegetables." },
    { name: "Gobi Manchurian", price: "$14", tag: "Chinese", desc: "Crispy cauliflower florets in a spicy soy-garlic sauce." },
    { name: "Chilli Paneer", price: "$15", tag: "Chinese", desc: "Cottage cheese cubes tossed in spicy chilli sauce." },
    { name: "Veg Spring Rolls", price: "$10", tag: "Appetizer", desc: "Crispy rolls filled with shredded vegetables." },
    { name: "Hara Bhara Kabab", price: "$11", tag: "Appetizer", desc: "Spinach and green pea patties, pan-fried." },
    { name: "Tandoori Aloo", price: "$12", tag: "Appetizer", desc: "Marinated baby potatoes roasted in a tandoor." },
    { name: "Corn Palak", price: "$13", tag: "Curry", desc: "Sweet corn kernels in a spinach gravy." },
    { name: "Methi Malai Matar", price: "$14", tag: "Curry", desc: "Fenugreek leaves and peas in a rich creamy sauce." },
    { name: "Dum Aloo", price: "$14", tag: "Curry", desc: "Baby potatoes cooked in a spicy yogurt-based gravy." },
    { name: "Kadhi Pakora", price: "$12", tag: "Curry", desc: "Gram flour dumplings in a yogurt-based curry." },
    { name: "Vegetable Pulao", price: "$11", tag: "Rice", desc: "Mildly spiced rice cooked with seasonal vegetables." },
    { name: "Lemon Rice", price: "$10", tag: "Rice", desc: "Tangy rice flavored with lemon, mustard seeds, and curry leaves." },
    { name: "Curd Rice", price: "$9", tag: "Rice", desc: "Soft rice mixed with yogurt and tempered with spices." },
    { name: "Masala Dosa", price: "$11", tag: "South Indian", desc: "Crispy crepe filled with spiced potato mash." },
    { name: "Idli Sambar", price: "$9", tag: "South Indian", desc: "Steamed rice cakes served with lentil soup." },
    { name: "Vada Pav", price: "$6", tag: "Snack", desc: "Spicy potato fritter sandwiched in a bun." },
    { name: "Pav Bhaji", price: "$12", tag: "Street Food", desc: "Spicy vegetable mash served with buttered buns." },
    { name: "Misal Pav", price: "$12", tag: "Street Food", desc: "Sprouts curry topped with farsan, served with bread." },
    { name: "Dhokla", price: "$8", tag: "Snack", desc: "Steamed savory cake made from gram flour." },
    { name: "Khandvi", price: "$9", tag: "Snack", desc: "Rolled gram flour sheets tempered with mustard seeds." },
    { name: "Undhiyu", price: "$15", tag: "Specialty", desc: "Gujarati mixed vegetable delicacy." },
    { name: "Sarson Ka Saag", price: "$14", tag: "Seasonal", desc: "Mustard greens curry." },
    { name: "Makki Di Roti", price: "$5", tag: "Bread", desc: "Cornmeal flatbread." },
    { name: "Chole Bhature", price: "$14", tag: "Combo", desc: "Spiced chickpeas served with fried bread." },
    { name: "Litti Chokha", price: "$13", tag: "Specialty", desc: "Roasted wheat balls served with mashed vegetables." },
    { name: "Vegetable Momos", price: "$10", tag: "Chinese", desc: "Steamed dumplings filled with minced vegetables." },
    { name: "Thukpa", price: "$12", tag: "Soup", desc: "Tibetan noodle soup with vegetables." },
    { name: "Tomato Soup", price: "$7", tag: "Soup", desc: "Classic creamy tomato soup with croutons." },
    { name: "Manchow Soup", price: "$8", tag: "Soup", desc: "Spicy soy-based soup with crispy noodles." },
    { name: "Sweet Corn Soup", price: "$8", tag: "Soup", desc: "Light soup with sweet corn kernels." },
    { name: "Fruit Salad", price: "$9", tag: "Dessert", desc: "Fresh seasonal fruits cut and mixed." },
    { name: "Gulab Jamun", price: "$7", tag: "Dessert", desc: "Deep-fried milk solids soaked in sugar syrup." },
    { name: "Rasgulla", price: "$7", tag: "Dessert", desc: "Spongy cottage cheese balls in light syrup." }
];

function renderVegMenu() {
    // Only render on the full menu page
    const menuGrid = document.getElementById('full-menu-grid');
    if (!menuGrid) return;
    
    vegMenuItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item fade-in';
        itemDiv.style.animationDelay = `${(index % 10) * 0.1}s`; // Staggered animation effect
        
        // Generate a unique ID for the input
        const inputId = `qty-${index}`;

        itemDiv.innerHTML = `
            <div class="item-header">
                <h3>${item.name}</h3>
                <span class="price">${item.price}</span>
            </div>
            <p class="item-desc">${item.desc}</p>
            <div class="item-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                <div class="item-tags">
                    <span class="tag tag-green">${item.tag}</span>
                </div>
                <div class="order-actions" style="display: flex; gap: 5px; align-items: center;">
                    <input type="number" id="${inputId}" value="1" min="1" class="qty-input" style="width: 50px; padding: 5px;">
                    <button class="btn-add-order" onclick="addToOrder('${item.name}', '${item.price}', '${inputId}')">Add</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(itemDiv);
    });
}

function addToOrder(name, price, inputId) {
    const qtyInput = document.getElementById(inputId);
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;
    
    // Create item object
    const item = {
        name: name,
        price: price,
        qty: qty
    };

    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists
    const existingItemIndex = cart.findIndex(i => i.name === name);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].qty += qty;
    } else {
        cart.push(item);
    }

    // Save back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    showToast(`Added ${qty} x ${name} to your cart!`, 'success');
}

// Render after DOM load
document.addEventListener('DOMContentLoaded', () => {
   renderVegMenu(); 
   renderCart();
});

// "Logic by your own": Check if restaurant is open
function checkOpenStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday
    const hour = now.getHours();

    // Hours: 11 AM - 10 PM (22:00)
    const openingHour = 11;
    const closingHour = 22;

    const isOpen = hour >= openingHour && hour < closingHour;

    if (isOpen) {
        openStatus.textContent = 'We are currently OPEN';
        openStatus.className = 'status-badge status-open';
    } else {
        openStatus.textContent = 'We are currently CLOSED';
        openStatus.className = 'status-badge status-closed';
    }
}

// Run status check on load
checkOpenStatus();
// Update every minute
setInterval(checkOpenStatus, 60000);

// Smooth Scroll for anchor links (polyfill support not strictly needed for modern browsers but good practice)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Simulation
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get values
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;

        // Simple Validation logic
        if(!guests) {
            showToast('Please select number of guests', 'error');
            return;
        }

        // Simulate API call
        const btn = reservationForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Booking...';
        btn.disabled = true;

        setTimeout(() => {
            showToast(`Thank you, ${name}! Table for ${guests} reserved.`, 'success');
            reservationForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// --- CART LOGIC ---
function renderCart() {
    const cartContent = document.getElementById('cart-content');
    const cartSummary = document.getElementById('cart-summary');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContent) return; // Not on cart page

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContent.innerHTML = '<div class="empty-cart-msg"><h3>Your cart is empty</h3><a href="menu.html" class="btn btn-primary">Browse Menu</a></div>';
        if(cartSummary) cartSummary.style.display = 'none';
        return;
    }

    if(cartSummary) cartSummary.style.display = 'block';

    let total = 0;
    let html = '<table class="cart-table"><thead><tr><th>Item</th><th>Price</th><th>Quantity</th><th>Total</th><th>Action</th></tr></thead><tbody>';

    cart.forEach((item, index) => {
        // Price string "$14" -> 14
        const priceVal = parseFloat(item.price.replace('$', ''));
        const itemTotal = priceVal * item.qty;
        total += itemTotal;

        html += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="btn-remove" onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    cartContent.innerHTML = html;
    if(cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    showConfirmModal('Are you sure you want to clear your cart?', () => {
        localStorage.removeItem('cart');
        renderCart();
        showToast('Cart cleared', 'info');
    });
}

function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Simulate order placement
    const confirmOrder = confirm(`Place order for total ${document.getElementById('cart-total').textContent}?`);
    if(confirmOrder) {
        alert('Order placed successfully! Thank you for dining with Bistro 26.');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    }
}