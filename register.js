// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAvqUEeadXULepbEuo77TxqEv8EmoZR0Z0",
  authDomain: "smartcart-c1c20.firebaseapp.com",
  projectId: "smartcart-c1c20",
  storageBucket: "smartcart-c1c20.appspot.com",
  messagingSenderId: "703850020571",
  appId: "1:703850020571:web:4e7793246bd720e5d116fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const authModal = document.getElementById("authModal");
const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.getElementById("toggleText");
const formTitle = document.getElementById("formTitle");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const headerSignInBtn = document.getElementById("headerSignInBtn");
const logoutBtn = document.getElementById("logoutBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const userEmailDisplay = document.getElementById("userEmailDisplay");
const homePage = document.getElementById("homePage");
const productsGrid = document.getElementById("productsGrid");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");

// Show/hide modal
headerSignInBtn.addEventListener("click", () => {
  authModal.classList.remove("hidden");
});
closeModalBtn.addEventListener("click", () => {
  authModal.classList.add("hidden");
});

// Toggle login/signup form
toggleBtn.addEventListener("click", () => {
  const isLogin = loginForm.classList.contains("hidden");
  loginForm.classList.toggle("hidden");
  signupForm.classList.toggle("hidden");
  formTitle.textContent = isLogin ? "Log In" : "Sign Up";
  toggleText.textContent = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  toggleBtn.textContent = isLogin ? "Sign Up" : "Log In";
});

// Sign up
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signupForm.signupEmail.value;
  const password = signupForm.signupPassword.value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    authModal.classList.add("hidden");
    signupForm.reset();
  } catch (err) {
    alert(err.message);
  }
});

// Log in
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.loginEmail.value;
  const password = loginForm.loginPassword.value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    authModal.classList.add("hidden");
    loginForm.reset();
  } catch (err) {
    alert(err.message);
  }
});

// Log out
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (err) {
    alert(err.message);
  }
});

// Auth state handling
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmailDisplay.textContent = user.email;
    logoutBtn.classList.remove("hidden");
    homePage.classList.remove("hidden");
  } else {
    userEmailDisplay.textContent = "Sign In";
    logoutBtn.classList.add("hidden");
    homePage.classList.add("hidden");
  }
});

// Fetch and render products from Firestore
const productsRef = collection(db, "Products");
onSnapshot(productsRef, (snapshot) => {
  const products = snapshot.docs.map(doc => ({
    id: doc.id, // Firestore document ID
    ...doc.data()
  }));
  renderProducts(products);
});

function renderProducts(products) {
  productsGrid.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className =
      "bg-white border border-gray-200 rounded-lg shadow-sm p-3 text-center";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="h-28 w-full object-contain mb-2" />
      <h4 class="text-xs sm:text-sm font-medium">${product.name}</h4>
      <p class="text-[#f97316] font-semibold text-sm sm:text-base mb-2">₱${product.price.toFixed(
        2
      )}</p>
      <button 
        class="bg-[#f97316] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-semibold py-1 px-2 rounded add-to-cart-btn" 
        data-id="${product.id}" 
        data-name="${product.name}" 
        data-price="${product.price}"
        data-description="${product.description}">
        Add to Cart
      </button>
    `;
    productsGrid.appendChild(card);
  });
}

// Cart logic with add, remove, update, quantity controls, and show Firestore product ID
let cart = [];

productsGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const btn = e.target;
    const id = btn.dataset.id; // Firestore document ID
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const description = btn.dataset.description;

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, description, qty: 1 });
    }

    updateCart();
  }
});

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center text-sm border-b pb-2";

    const itemTotal = item.qty * item.price;
    total += itemTotal;
    count += item.qty;

    div.innerHTML = `
      <div>
        <span class="font-medium">${item.name} (ID: ${item.id})</span>
        <p class="text-xs text-gray-500">${item.description}</p>
      </div>
      <div class="flex items-center space-x-2">
        <button class="qty-btn bg-gray-200 px-2 rounded" data-index="${index}" data-action="decrease">-</button>
        <input type="number" min="1" value="${item.qty}" class="w-12 text-center border border-gray-300 rounded" data-index="${index}" />
        <button class="qty-btn bg-gray-200 px-2 rounded" data-index="${index}" data-action="increase">+</button>
        <span>₱${itemTotal.toFixed(2)}</span>
        <button class="remove-btn text-red-600 hover:text-red-800 text-xs ml-4" data-index="${index}">Remove</button>
      </div>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = `₱${total.toFixed(2)}`;
  cartCount.textContent = count;
  checkoutBtn.disabled = cart.length === 0;

  // Attach quantity button listeners
  cartItems.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      if (isNaN(idx)) return;
      if (btn.dataset.action === "increase") {
        cart[idx].qty++;
      } else if (btn.dataset.action === "decrease" && cart[idx].qty > 1) {
        cart[idx].qty--;
      }
      updateCart();
    });
  });

  // Attach quantity input listeners
  cartItems.querySelectorAll("input[type=number]").forEach(input => {
    input.addEventListener("change", () => {
      const idx = parseInt(input.dataset.index);
      if (isNaN(idx)) return;
      let val = parseInt(input.value);
      if (isNaN(val) || val < 1) val = 1;
      cart[idx].qty = val;
      updateCart();
    });
  });

  // Attach remove button listeners
  cartItems.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      if (isNaN(idx)) return;
      cart.splice(idx, 1);
      updateCart();
    });
  });
}

// Cart sidebar open/close
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("translate-x-full");
});
closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
});

// Checkout button click - show receipt summary
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  let receipt = "Order Summary:\n\n";
  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    receipt += `${item.name} (ID: ${item.id}) x ${item.qty} = ₱${itemTotal.toFixed(2)}\n`;
  });
  receipt += `\nTotal: ₱${total.toFixed(2)}`;
  alert(receipt);
  // Clear cart after checkout
  cart = [];
  updateCart();
  cartSidebar.classList.add("translate-x-full");
});
