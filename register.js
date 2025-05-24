<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <title>Home Appliances Store - Signup, Login & Cart</title>
  <script src="https://cdn.tailwindcss.com"></script>
Expand
message.txt
30 KB
yan
Jeweck — 22/05/2025 4:04 pm
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <title>Home Appliances Store - Signup, Login & Cart</title>
  <script src="https://cdn.tailwindcss.com"></script>
Expand
message.txt
31 KB
Jeweck — 22/05/2025 9:49 pm
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <title>Home Appliances Store - Signup, Login & Cart</title>
  <script src="https://cdn.tailwindcss.com"></script>
Expand
message.txt
29 KB
Jeweck — 10:26 pm
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <title>Home Appliances Store - Signup, Login & Cart</title>
  <script src="https://cdn.tailwindcss.com"></script>
Expand
message.txt
29 KB
Jeweck — 11:39 pm
.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword, // Correct function name
  signInWithEmailAndPassword,
  onAuthStateChanged,
Expand
message.txt
15 KB
.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <title>Home Appliances Store - Signup, Login & Cart</title>
Expand
message.txt
13 KB
﻿
Jeweck
jewick_29
 
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword, // Correct function name
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAvqUEeadXULepbEuo77TxqEv8EmoZR0Z0",
  authDomain: "smartcart-c1c20.firebaseapp.com",
  projectId: "smartcart-c1c20",
  storageBucket: "smartcart-c1c20.firebasestorage.app",
  messagingSenderId: "703850020571",
  appId: "1:703850020571:web:4e7793246bd720e5d116fe",
  measurementId: "G-ZW53LF1Y19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.getElementById("toggleText");
const formTitle = document.getElementById("formTitle");
const homePage = document.getElementById("homePage");
const logoutBtn = document.getElementById("logoutBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const headerSignInBtn = document.getElementById("headerSignInBtn");
const authModal = document.getElementById("authModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const userEmailDisplay = document.getElementById("userEmailDisplay");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const homeBtnBreadcrumb = document.getElementById("homeBtnBreadcrumb");
const receiptModal = document.getElementById("receiptModal");
const receiptContent = document.getElementById("receiptContent");
const closeReceiptBtn = document.getElementById("closeReceiptBtn");

// Sample products data
const products = [
  {
    id: "p1",
    name: "Samsung 7kg Front Load Washing Machine",
    price: 15000,
    img: "https://storage.googleapis.com/a1aa/image/c3edb4ef-7665-4c5f-ec1d-3f3fdc65d0b5.jpg",
    alt: "Samsung 7kg Front Load Washing Machine, white washing machine with digital display",
  },
  {
    id: "p2",
    name: "LG 1.5HP Inverter Air Conditioner",
    price: 25000,
    img: "https://storage.googleapis.com/a1aa/image/2b922c66-e57c-4e09-201d-2505a7e0e366.jpg",
    alt: "LG 1.5HP Inverter Air Conditioner, white wall-mounted aircon unit",
  },
  {
    id: "p3",
    name: "Panasonic 32L Microwave Oven",
    price: 8000,
    img: "https://storage.googleapis.com/a1aa/image/db4b3d31-1cd3-44ff-5d18-6bf171ba92f9.jpg",
    alt: "Panasonic 32L Microwave Oven, black microwave oven with digital display",
  },
  {
    id: "p4",
    name: "Sharp Door Refrigerator",
    price: 18000,
    img: "https://storage.googleapis.com/a1aa/image/81e36be0-9de4-46ad-0db5-f66997b01f5f.jpg",
    alt: "Sharp Door Refrigerator, silver refrigerator with freezer on top",
  },
  {
    id: "p5",
    name: "Dyson V11 Cordless Vacuum Cleaner",
    price: 22000,
    img: "https://storage.googleapis.com/a1aa/image/79ccf047-91bc-4a03-4025-56479420f198.jpg",
    alt: "Dyson V11 Cordless Vacuum Cleaner, purple and silver vacuum cleaner",
  },
  {
    id: "p6",
    name: "Philips Air Fryer XXL",
    price: 12000,
    img: "https://storage.googleapis.com/a1aa/image/9486c6bc-2375-46fc-0429-f056bcf8f7c4.jpg",
    alt: "Philips Air Fryer XXL, black air fryer with digital controls",
  },
  {
    id: "p7",
    name: "Toshiba 1.2L Electric Kettle",
    price: 1500,
    img: "https://storage.googleapis.com/a1aa/image/29bf6796-765c-4bc1-3ff4-fd90329eb102.jpg",
    alt: "Toshiba 1.2L Electric Kettle, white electric kettle with blue water level indicator",
  },
  {
    id: "p8",
    name: "Sony 55-inch 4K Smart TV",
    price: 35000,
    img: "https://storage.googleapis.com/a1aa/image/8054e36f-0427-45e0-2835-4ac857fb9da0.jpg",
    alt: "Sony 55-inch 4K Smart TV, black flat screen TV",
  },
];

// Cart data structure: { productId: quantity }
let cart = {};

// Render products to the grid
function renderProducts(productsToRender) {
  productsGrid.innerHTML = "";
  if (productsToRender.length === 0) {
    productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-500">No products found.</p>';
    return;
  }
  productsToRender.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "border border-gray-200 rounded bg-white p-2 flex flex-col";
    productCard.innerHTML = `
      <img src="${product.img}" alt="${product.alt}" class="w-full h-36 object-cover mb-2" height="150" width="150" />
      <p class="text-[9px] sm:text-xs leading-tight mb-1 flex-1">${product.name}</p>
      <p class="text-xs font-semibold mb-2">₱${product.price.toLocaleString()}</p>
      <button class="bg-[#f97316] hover:bg-[#ea580c] text-white py-1 rounded text-xs transition add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;
    productsGrid.appendChild(productCard);
  });
  // Attach event listeners to add to cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      addToCart(id);
    });
  });
}

// Add product to cart
function addToCart(productId) {
  if (!cart[productId]) {
    cart[productId] = 1;
  } else {
    cart[productId]++;
  }
  saveCart();
  renderCart();
  alert("Product added to cart!");
}

// Remove product from cart
function removeFromCart(productId) {
  delete cart[productId];
  saveCart();
  renderCart();
}

// Change quantity in cart
function changeQuantity(productId, newQty) {
  if (newQty < 1) return;
  cart[productId] = newQty;
  saveCart();
  renderCart();
}

// Render cart items
function renderCart() {
  cartItemsContainer.innerHTML = "";
  const productIds = Object.keys(cart);
  if (productIds.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
    cartCount.textContent = "0";
    cartTotal.textContent = "₱0.00";
    checkoutBtn.disabled = true;
    return;
  }
  let total = 0;
  productIds.forEach((id) => {
    const product = products.find((p) => p.id === id);
    const qty = cart[id];
    const itemTotal = product.price * qty;
    total += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "flex items-center space-x-4";

    itemDiv.innerHTML = `
      <img src="${product.img}" alt="${product.alt}" class="w-16 h-16 object-cover rounded" />
      <div class="flex-1">
        <p class="text-sm font-semibold">${product.name}</p>
        <p class="text-xs text-gray-600">₱${product.price.toLocaleString()} each</p>
        <div class="flex items-center space-x-2 mt-1">
          <button class="qty-btn bg-gray-200 px-2 rounded" data-id="${id}" data-action="decrease">-</button>
          <input type="number" min="1" value="${qty}" class="w-12 text-center border border-gray-300 rounded" data-id="${id}" />
          <button class="qty-btn bg-gray-200 px-2 rounded" data-id="${id}" data-action="increase">+</button>
        </div>
      </div>
      <div class="text-right">
        <p class="text-sm font-semibold">₱${itemTotal.toLocaleString()}</p>
        <button class="remove-btn text-red-600 hover:text-red-800 text-xs mt-1" data-id="${id}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });
  cartCount.textContent = productIds.length.toString();
  cartTotal.textContent = `₱${total.toLocaleString()}`;
  checkoutBtn.disabled = false;

  // Attach event listeners for quantity buttons and inputs
  cartItemsContainer.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const action = btn.getAttribute("data-action");
      let currentQty = cart[id];
      if (action === "increase") {
        changeQuantity(id, currentQty + 1);
      } else if (action === "decrease" && currentQty > 1) {
        changeQuantity(id, currentQty - 1);
      }
    });
  });
  cartItemsContainer.querySelectorAll("input[type=number]").forEach((input) => {
    input.addEventListener("change", () => {
      const id = input.getAttribute("data-id");
      let val = parseInt(input.value);
      if (isNaN(val) || val < 1) {
        val = 1;
        input.value = val;
      }
      changeQuantity(id, val);
    });
  });
  cartItemsContainer.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      removeFromCart(id);
    });
  });
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("shoppingCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Filter products by search input
function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderProducts(products);
    return;
  }
  const filtered = products.filter((p) => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

// Cart sidebar toggle
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("translate-x-full");
});
closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
});

// Checkout button click - show receipt summary
checkoutBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }
  let receipt = "Order Summary:\n\n";
  let total = 0;
  Object.entries(cart).forEach(([id, qty]) => {
    const product = products.find(p => p.id === id);
    const itemTotal = product.price * qty;
    total += itemTotal;
    receipt += `${product.name} x ${qty} = ₱${itemTotal.toLocaleString()}\n`;
  });
  receipt += `\nTotal: ₱${total.toLocaleString()}`;
  alert(receipt);
  // Clear cart after checkout
  cart = {};
  saveCart();
  renderCart();
  cartSidebar.classList.add("translate-x-full");
});

// Show modal on header sign in click
headerSignInBtn.addEventListener("click", () => {
  authModal.classList.remove("hidden");
  showSignup();
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  authModal.classList.add("hidden");
});

// Toggle between signup and login forms
toggleBtn.addEventListener("click", () => {
  if (signupForm.classList.contains("hidden")) {
    showSignup();
  } else {
    showLogin();
  }
});

function showSignup() {
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  formTitle.textContent = "Sign Up";
  toggleText.textContent = "Already have an account?";
  toggleBtn.textContent = "Log In";
}

function showLogin() {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  formTitle.textContent = "Log In";
  toggleText.textContent = "Don't have an account?";
  toggleBtn.textContent = "Sign Up";
}

// Signup handler
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signupEmail.value.trim();
  const password = signupPassword.value.trim();

  try {
    await createUserWithEmailAndPassword(auth, email, password); // Correct function name
    alert("Signup successful! You are now logged in.");
    signupForm.reset();
    authModal.classList.add("hidden");
  } catch (error) {
    alert(error.message);
  }
});

// Login handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginForm.reset();
    authModal.classList.add("hidden");
  } catch (error) {
    alert(error.message);
  }
});

// Logout handler
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(error.message);
  }
});

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    userEmailDisplay.textContent = user.email;
    logoutBtn.classList.remove("hidden");
    headerSignInBtn.classList.add("hidden");
    homePage.classList.remove("hidden");
    authModal.classList.add("hidden");
    loadCart();
    renderCart();
    renderProducts(products);
  } else {
    // User is signed out
    userEmailDisplay.textContent = "Sign In";
    logoutBtn.classList.add("hidden");
    headerSignInBtn.classList.remove("hidden");
    homePage.classList.add("hidden");
    cartSidebar.classList.add("translate-x-full");
  }
});

// Make the "Home" button in breadcrumb functional
homeBtnBreadcrumb.addEventListener("click", () => {
  // Show homepage section
  homePage.classList.remove("hidden");
  // Clear search input
  searchInput.value = "";
  // Render all products
  renderProducts(products);
  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Initial render (in case user is already logged in)
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderProducts(products);
});
