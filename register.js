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
  onSnapshot,
  setDoc,
  doc,
  getDoc, // <-- add this
  deleteDoc // <-- add this for real delete
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

// Add Product Modal Logic
const openAddProductBtn = document.getElementById("openAddProductBtn");
const addProductModal = document.getElementById("addProductModal");
const closeAddProductModalBtn = document.getElementById("closeAddProductModalBtn");
const addProductForm = document.getElementById("addProductForm");

// Edit Product Modal Elements
const editProductModal = document.getElementById("editProductModal");
const closeEditProductModalBtn = document.getElementById("closeEditProductModalBtn");
const editProductForm = document.getElementById("editProductForm");
const editProductId = document.getElementById("editProductId");
const editProductName = document.getElementById("editProductName");
const editProductImage = document.getElementById("editProductImage");
const editProductPrice = document.getElementById("editProductPrice");
const editProductDescription = document.getElementById("editProductDescription");
const editProductCategory = document.getElementById("editProductCategory"); // New category field

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

let allProducts = []; // Store all products for filtering

// Fetch and render products
const productsRef = collection(db, "Products");
onSnapshot(productsRef, (snapshot) => {
  allProducts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  renderProducts(allProducts);
});

function renderProducts(products) {
  productsGrid.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className =
      "bg-white border border-gray-200 rounded-lg shadow-sm p-3 flex flex-col h-full";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="h-28 w-full object-contain mb-2" />
      <h4 class="text-xs sm:text-sm font-medium">${product.name}</h4>
      <p class="text-[#f97316] font-semibold text-sm sm:text-base mb-2">₱${product.price.toFixed(2)}</p>
      <div class="flex justify-center gap-2 mb-2">
        <button class="edit-product-btn bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded" data-id="${product.id}">Edit</button>
        <button class="delete-product-btn bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded" data-id="${product.id}">Delete</button>
      </div>
      <button class="bg-[#f97316] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-semibold py-1 px-2 rounded" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
    `;
    productsGrid.appendChild(card);
  });
}

// Category filter logic
const categoryList = document.getElementById("categoryList");
if (categoryList) {
  categoryList.addEventListener("click", (e) => {
    const li = e.target.closest(".category-item");
    if (li) {
      const category = li.getAttribute("data-category");
      if (category === "all") {
        renderProducts(allProducts);
      } else {
        // Filter products by category (case-sensitive, must match Firestore exactly)
        const filtered = allProducts.filter(p => p.category === category);
        renderProducts(filtered);
      }
    }
  });
}

// Optional: Add event listeners for edit/delete (basic example)
productsGrid.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-product-btn")) {
    const id = e.target.dataset.id;
    const productDoc = await getDoc(doc(db, "Products", id));
    if (productDoc.exists()) {
      const product = productDoc.data();
      editProductId.value = id;
      editProductName.value = product.name;
      editProductImage.value = product.image;
      editProductPrice.value = product.price;
      editProductDescription.value = product.description;
      editProductCategory.value = product.category || ""; // Set category value
      editProductForm.setAttribute("data-old-id", id); // Store old ID
      editProductModal.classList.remove("hidden");
    } else {
      alert("Product not found!");
    }
  }
  if (e.target.classList.contains("delete-product-btn")) {
    const id = e.target.dataset.id;
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "Products", id));
        alert("Product deleted!");
      } catch (err) {
        alert("Error deleting product: " + err.message);
      }
    }
  }
  // ...existing Add to Cart logic...
  if (e.target.tagName === "BUTTON" && e.target.textContent === "Add to Cart") {
    const btn = e.target;
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCart();
  }
});

// Cart logic
let cart = [];

productsGrid.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.textContent === "Add to Cart") {
    const btn = e.target;
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCart();
  }
});

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "flex justify-between text-sm border-b pb-2";

    const itemTotal = item.qty * item.price;
    total += itemTotal;
    count += item.qty;

    div.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>₱${itemTotal.toFixed(2)}</span>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = `₱${total.toFixed(2)}`;
  cartCount.textContent = count;
  checkoutBtn.disabled = cart.length === 0;
}

// Cart sidebar open/close
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("translate-x-full");
});
closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
});

// Add Product Modal Logic
openAddProductBtn.addEventListener("click", () => {
  addProductModal.classList.remove("hidden");
});
closeAddProductModalBtn.addEventListener("click", () => {
  addProductModal.classList.add("hidden");
});
addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = addProductForm.productId.value.trim();
  const name = addProductForm.productName.value.trim();
  const image = addProductForm.productImage.value.trim();
  const price = parseFloat(addProductForm.productPrice.value);
  const description = addProductForm.productDescription.value.trim();
  const category = addProductForm.productCategory.value.trim(); // <-- get category

  if (!id || !name || !image || !description || !category || isNaN(price)) {
    alert("Please fill all fields correctly.");
    return;
  }

  try {
    // Add product to Firestore with custom ID
    await setDoc(doc(db, "Products", id), {
      name,
      image,
      price,
      description,
      category // <-- save category
    });
    alert("Product added!");
    addProductForm.reset();
    addProductModal.classList.add("hidden");
  } catch (err) {
    alert("Error adding product: " + err.message);
  }
});

// Close Edit Modal
closeEditProductModalBtn.addEventListener("click", () => {
  editProductModal.classList.add("hidden");
});

// Save changes (allow editing Product ID)
editProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const oldId = editProductForm.getAttribute("data-old-id"); // Store old ID in a data attribute
  const newId = editProductId.value.trim();
  const name = editProductName.value.trim();
  const image = editProductImage.value.trim();
  const price = parseFloat(editProductPrice.value);
  const description = editProductDescription.value.trim();
  const category = editProductCategory.value.trim(); // Get category value

  if (!newId || !name || !image || !description || !category || isNaN(price)) {
    alert("Please fill all fields correctly.");
    return;
  }

  try {
    if (oldId !== newId) {
      // Create new doc, delete old doc
      await setDoc(doc(db, "Products", newId), { name, image, price, description, category });
      await deleteDoc(doc(db, "Products", oldId));
    } else {
      // Just update existing doc
      await setDoc(doc(db, "Products", newId), { name, image, price, description, category });
    }
    alert("Product updated!");
    editProductModal.classList.add("hidden");
  } catch (err) {
    alert("Error updating product: " + err.message);
  }
});
