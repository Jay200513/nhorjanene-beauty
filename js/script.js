
const products = [
    {
        id: 1,
        name: "Liquid Foundation",
        price: 299,
        image: "foundation.png",
        description: "A smooth foundation for an even-looking makeup finish."
    },
    {
        id: 2,
        name: "Cream Concealer",
        price: 199,
        image: "concealer.png",
        description: "A creamy concealer for a fresh makeup look."
    },
    {
        id: 3,
        name: "Pressed Powder",
        price: 249,
        image: "pressed powder.png",
        description: "A pressed powder for a smooth-looking finish."
    },
    {
        id: 4,
        name: "Blush Compact",
        price: 179,
        image: "blush-compact.png",
        description: "Add a lovely touch of color to your cheeks."
    },
    {
        id: 5,
        name: "Bronzer Palette",
        price: 289,
        image: "bronzer palette.png",
        description: "A bronzer palette for a warm makeup look."
    },
    {
        id: 6,
        name: "Highlighter",
        price: 229,
        image: "highlighter.png",
        description: "Give your makeup a beautiful glowing finish."
    },
    {
        id: 7,
        name: "Eyeshadow Palette",
        price: 349,
        image: "eyeshadow palette.png",
        description: "Explore different colors for creative eye looks."
    },
    {
        id: 8,
        name: "Liquid Eyeliner",
        price: 159,
        image: "eyeliner.png",
        description: "Create defined and beautiful eye looks."
    },
    {
        id: 9,
        name: "Mascara",
        price: 189,
        image: "mascara.png",
        description: "Complete your eye makeup routine with mascara."
    },
    {
        id: 10,
        name: "Brow Pencil",
        price: 139,
        image: "brow pencil.png",
        description: "Define and shape your brows with ease."
    },
    {
        id: 11,
        name: "Lipstick",
        price: 169,
        image: "lipstick.png",
        description: "Add a beautiful color to your everyday look."
    },
    {
        id: 12,
        name: "Setting Spray",
        price: 259,
        image: "setting spray.png",
        description: "Finish your makeup routine with setting spray."
    },
    {
        id: 13,
        name: "lipgloss",
        price: 250,
        image: "lipglos.png",
        description: "Adds a glossy finish to your lips."
    },
    {
        id: 14,
        name: "pouch",
        price: 250,
        image: "pouch.png",
        description: "A stylish pouch for organizing beauty products."


    }
];

let cart = [];

// FORMAT PRICE

function formatPrice(price) {
    return "₱" + price.toFixed(2);
}

// IMAGE PLACEHOLDER

function imagePlaceholder(image, name) {
    const url = "images/" + encodeURIComponent(image);
    const placeholder = "https://placehold.co/400x400/f7dce3/9b536b?text=" +
        encodeURIComponent(name);

    return `
        <img src="${url}"
             alt="${name}"
             onerror="this.onerror=null;this.src='${placeholder}'">
    `;
}

// DISPLAY PRODUCTS

function displayProducts(containerId, items) {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = items.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${imagePlaceholder(product.image, product.name)}
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${formatPrice(product.price)}</div>

                <button class="btn" onclick="addToCart(${product.id})">
                    ADD TO CART
                </button>
            </div>
        </div>
    `).join("");
}

// ADD PRODUCT TO CART

function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to your cart!");
}

// CHANGE QUANTITY

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

// REMOVE PRODUCT

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// UPDATE SHOPPING CART

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");
    const countElement = document.getElementById("cart-count");

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
    });

    if (totalElement) {
        totalElement.textContent = formatPrice(total);
    }

    if (countElement) {
        countElement.textContent = count;
    }

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Your shopping cart is currently empty.
            </p>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">

            <div>
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price)} each</p>
                <p>Subtotal: ${formatPrice(item.price * item.quantity)}</p>
            </div>

            <div class="quantity-controls">
                <button onclick="changeQuantity(${item.id}, -1)">−</button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>

            <button class="remove-btn"
                    onclick="removeFromCart(${item.id})">
                REMOVE
            </button>

        </div>
    `).join("");
}

// CHECKOUT DEMONSTRATION

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add products first.");
        return;
    }

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const confirmation = confirm(
        "Thank you for shopping at Nhorjanene Beauty!\n\n" +
        "Your demonstration order total is " + formatPrice(total) +
        ".\n\nThis is a school project demonstration. " +
        "No payment or real order will be processed."
    );

    if (confirmation) {
        cart = [];
        updateCart();
        alert("Demo checkout completed. Thank you!");
    }
}

// FOOTER

function createFooter() {
    const footer = document.getElementById("footer");

    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-grid">

            <div>
                <img src="images/logo.png"
                     alt="Nhorjanene Beauty Logo"
                     class="footer-logo"
                     onerror="this.style.display='none'">

                <h3>Nhorjanene Beauty</h3>

                <p>
                    Discover your favorite beauty essentials
                    and express your unique style with confidence.
                </p>
            </div>

            <div>
                <h3>Quick Links</h3>
                <a href="index.html">Home</a>
                <a href="about.html">About Us</a>
                <a href="services.html">Services</a>
                <a href="products.html">Products</a>
                <a href="contact.html">Contact Us</a>
            </div>

            <div>
                <h3>Follow Us</h3>

                <a href="https://www.facebook.com/profile.php?id=61596061664172"
                   target="_blank" rel="noopener noreferrer">Facebook</a>

                <a href="https://www.instagram.com/nhorjanenebeautyofficial?cplk=MXFrc3hwdjgxNWdsZw=="
                   target="_blank" rel="noopener noreferrer">Instagram</a>

                <a href="https://youtube.com/@nhorjanenebeautyofficial?si=LrBTQoE51OFs2Hho"
                   target="_blank" rel="noopener noreferrer">YouTube</a>

                <a href="https://www.tiktok.com/@nhorjanenebeauty?_r=1&_t=ZS-9BEjH5aTkWM"
                   target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>

            <div>
                <h3>Contact Information</h3>

                <a href="mailto:nhorjanenebeauty@gmail.com">
                    nhorjanenebeauty@gmail.com
                </a>

                <a href="tel:09950533844">09950533844</a>

                <p>Dahican, City of Mati, Davao Oriental, Philippines.</p>
            </div>

        </div>

        <div class="footer-bottom">
            <p>© 2026 Nhorjanene. All rights reserved.</p>
        </div>
    `;
}

// CONTACT FORM DEMONSTRATION

function setupContactForm() {
    const form = document.getElementById("contact-form");

    if (!form) return;

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const response = document.getElementById("form-response");

        response.textContent =
            "Thank you, " + name +
            "! Your demo message has been received on this page. " +
            "It has not been sent to our email.";

        form.reset();
    });
}

// INITIALIZE WEBSITE

document.addEventListener("DOMContentLoaded", function() {

    displayProducts("product-list", products);

    displayProducts("featured-products", products.slice(0, 4));

    updateCart();

    createFooter();

    setupContactForm();

});
