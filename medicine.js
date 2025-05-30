const medicines = [
  { name: "Paracetamol", price: 50, image: "images/paracetamol.png" },
  { name: "Atorvastatin", price: 90, image: "images/atorvastatin.png" },
  { name: "Lisinopril", price: 80, image: "images/lisinopril.png" },
  { name: "Albuterol", price: 120, image: "images/albuterol.png" },
];

const supplies = [
  { name: "Complan (NutriGro)", price: 250, image: "images/complan.png" },
  { name: "Horlicks (Taller & Stronger)", price: 230, image: "images/horlicks.png" },
  { name: "Bournvita (Li'l Champs)", price: 200, image: "images/blil.png" },
  { name: "Bournvita", price: 190, image: "images/bournvita.png" },
  { name: "Boost", price: 180, image: "images/boost.png" },
];

let cart = [];

function showMedicines() {
  displayProducts(medicines);
}

function showSupplies() {
  displayProducts(supplies);
}

function displayProducts(list) {
    const div = document.getElementById("productList");
    div.innerHTML = "";
    list.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="image-placeholder">
                <img src="${product.image}" alt="${product.name}" class="product-image" />
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">Price: ₹${product.price}</div>
            <label for="qty-${product.name}">Quantity:</label>
            <input type="number" id="qty-${product.name}" value="1" min="1" class="quantity-input" />
            <button class="add-to-cart-btn" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        div.appendChild(card);
    });
}

function addToCart(name, price) {
  const qty = parseInt(document.getElementById(`qty-${name}`).value);
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({ name, price, quantity: qty });
  }

  showToast(`${name} added to cart!`);
  updateCart();

  const cartSection = document.getElementById("cartSection");
  cartSection.style.display = "block";

  const cartBadge = document.getElementById("cartBadge");
  if (cartBadge) {
    cartBadge.classList.add("bounce");
    setTimeout(() => {
      cartBadge.classList.remove("bounce");
    }, 600);
  }
}

function updateCart() {
  const itemsDiv = document.getElementById("cartItems");
  const totalAmount = document.getElementById("totalAmount");
  const cartBadge = document.getElementById("cartBadge");

  itemsDiv.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    itemCount += item.quantity;
    itemsDiv.innerHTML += `<p>${item.name} x ${item.quantity} = ₹${item.price * item.quantity}</p>`;
  });

  totalAmount.innerText = `Total Amount: ₹${total}`;

  if (cartBadge) {
    cartBadge.innerText = itemCount;
    cartBadge.style.display = itemCount === 0 ? "none" : "inline-block";
  }
}

function confirmOrder() {
  if (cart.length === 0) {
    showToast("Cart is empty! Please add items.");
    return;
  }
  const paymentMode = document.getElementById("paymentMode").value;
  showToast(`Order confirmed! Payment by ${paymentMode}.`);

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 2500);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
