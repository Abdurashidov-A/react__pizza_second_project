const products = [
  {
    id: 1,
    name: "Чизбургер-пицца",
    imageUrl: "/img/1.png",
    price: 395,
  },
  {
    id: 2,
    name: "Гриль",
    imageUrl: "/img/2.png",
    price: 450,
  },
  {
    id: 3,
    name: "Мясная",
    imageUrl: "/img/1.png",
    price: 460,
  },
  {
    id: 4,
    name: "Сырный овощной",
    imageUrl: "/img/4.png",
    price: 385,
  },
  {
    id: 5,
    name: "Острый",
    imageUrl: "/img/1.png",
    price: 395,
  },
  {
    id: 6,
    name: "Помидорный",
    imageUrl: "/img/2.png",
    price: 450,
  },
  {
    id: 7,
    name: "С баклажаном",
    imageUrl: "/img/1.png",
    price: 460,
  },
  {
    id: 8,
    name: "С грибом",
    imageUrl: "/img/4.png",
    price: 385,
  },
];

const template = (product) => `
        <div class="products__col">
  <div class="products__box box-products">
    <div class="box-products__img">
      <img src="${product.imageUrl}" alt="" />
    </div>
    <div class="box-products__content">
      <div class="box-products__header">${product.name}</div>
      <div class="box-products__main">
        <div class="box-products__thickness">
          <label class="thickness-option thickness-option--thin">
            <input
              class="thickness-input choose"
              type="radio"
              name="thickness-${product.id}"
            />
            <span class="thickness-checkmark checkmark">тонкое</span>
          </label>
          <label class="thickness-option thickness-option--tradition">
            <input
              class="thickness-input choose"
              type="radio"
              name="thickness-${product.id}"
            />
            <span class="thickness-checkmark checkmark">традиционное</span>
          </label>
        </div>
        <div class="box-products__diameter">
          <label class="diameter-option">
            <input
              class="diameter-input pick"
              type="radio"
              name="diameter-${product.id}"
            />
            <span class="diameter-checkmark checkmark">26 см.</span>
          </label>
          <label class="diameter-option">
            <input
              class="diameter-input pick"
              type="radio"
              name="diameter-${product.id}"
            />
            <span class="diameter-checkmark checkmark">30 см.</span>
          </label>
          <label class="diameter-option">
            <input
              class="diameter-input pick"
              type="radio"
              name="diameter-${product.id}"
            />
            <span class="diameter-checkmark checkmark">40 см.</span>
          </label>
        </div>
      </div>
      <div class="box-products__footer">
        <div class="box-products__prices">
          <div>от</div>
          <div class="box-products__price">${product.price}</div>
          <div>₽</div>
        </div>

        <button
          class="box-products__add"
          onclick="addToCart(${product.id}); 
        allPriceIndex(); 
        allQuantityIndex();
        displayBlock(${product.id});
          singleQuantityIndex(${product.id})"
        >
          <div class="box-products__span">
            <span class="box-products__plus">+</span>
            <span class="box-products__text">Добавить</span>
            <span
              id="pizzaCount-${product.id}"
              class="box-products__quantity"
            ></span>
          </div>
        </button>
      </div>
    </div>
  </div>
</div>

                `;

// SHOWING ALL PRODUCTS
function showAll() {
  const html = products.map(template).join(" ");
  console.log(html);

  document.getElementById("productRow").insertAdjacentHTML("afterbegin", html);

  document.getElementById("btn-all").classList.add("active");
  removeClass();
}
showAll();

// CART IMPLEMENT

const CART = JSON.parse(localStorage.getItem("PIZZA")) ?? [];

function addToCart(itemId) {
  const product = products.find((item) => item.id === itemId);
  const item = findItem(itemId);

  if (item) {
    item.quantity++;
  } else {
    const newItem = {
      ...product,
      id: itemId,
      quantity: 1,
    };
    CART.push(newItem);
  }
  localStorage.setItem("PIZZA", JSON.stringify(CART));
  console.log("CART", CART);
}

// Finding the quantity of each pizza near the +Добавить
function singleQuantityIndex(itemId) {
  const item = findItem(itemId);

  if (item) {
    document.getElementById(`pizzaCount-${itemId}`).innerHTML = item.quantity;
  }
  console.log("item", item);
}
removeClass();

// Showing the quantity of each pizza near the +Добавить
function displayBlock(productId) {
  const element = document.getElementById(`pizzaCount-${productId}`);
  if (element) {
    element.style.display = "flex";
  }
}

// Showing the все,мясные.. by clicking burger button
function burgerClick() {
  const burger = document.getElementById("burger");
  const lists = document.getElementById("lists");

  if (burger && lists) {
    burger.addEventListener("click", () => {
      lists.classList.toggle("show");
    });
  }
}
burgerClick();

function findItem(itemId) {
  return CART.find((item) => item.id === itemId);
}

// Showing the quantity of each pizza when the screen is refreshed
function cartCounter() {
  CART.forEach((item) => {
    singleQuantityIndex(item.id);
    displayBlock(item.id);
  });
}

setTimeout(cartCounter, 100);

// DELETE AND ADD CLASS
function addClass() {
  const all = document.getElementById("1");
  all.classList.add("active");
}

// WORKING WITH FILTER

function removeClass() {
  document.getElementById("btn-all").classList.remove("active");
  document.getElementById("btn-meat").classList.remove("active");
  document.getElementById("btn-vege").classList.remove("active");
  document.getElementById("btn-grill").classList.remove("active");
  document.getElementById("btn-spicy").classList.remove("active");
  document.getElementById("btn-closed").classList.remove("active");
}

function showMeat() {
  document.getElementById("productRow").innerHTML = "";
  removeClass();
  document.getElementById("btn-meat").classList.add("active");

  const meatProducts = products.filter((p) => p.id === 1 || p.id === 3);
  const html = meatProducts.map(template).join("");
  document.getElementById("productRow").innerHTML = html;
}

function showVegeterian() {
  document.getElementById("productRow").innerHTML = "";
  removeClass();
  document.getElementById("btn-vege").classList.add("active");

  const meatProducts = products.filter(
    (p) => p.id === 4 || p.id === 6 || p.id === 7 || p.id === 8
  );
  const html = meatProducts.map(template).join("");
  document.getElementById("productRow").innerHTML = html;
}

function showGrill() {
  document.getElementById("productRow").innerHTML = "";
  removeClass();
  document.getElementById("btn-grill").classList.add("active");

  const meatProducts = products.filter((p) => p.id === 2);
  const html = meatProducts.map(template).join("");
  document.getElementById("productRow").innerHTML = html;
}

function showSpicy() {
  document.getElementById("productRow").innerHTML = "";
  removeClass();
  document.getElementById("btn-spicy").classList.add("active");

  const meatProducts = products.filter((p) => p.id === 5);
  const html = meatProducts.map(template).join("");
  document.getElementById("productRow").innerHTML = html;
}

function showClosed() {
  document.getElementById("productRow").innerHTML = "";
  removeClass();
  document.getElementById("btn-closed").classList.add("active");

  const meatProducts = products.filter((p) => p.id === 8);
  const html = meatProducts.map(template).join("");
  document.getElementById("productRow").innerHTML = html;
}

const filter = document.getElementById("filter");

filter.addEventListener("change", function () {
  const value = filter.value;

  if (value === "famous") {
    const famouses = products.filter(
      (p) => p.id === 1 || p.id === 2 || p.id === 3 || p.id === 4
    );
    const html = famouses.map(template).join("");
    document.getElementById("productRow").innerHTML = "";

    document.getElementById("productRow").innerHTML = html;
  } else if (value === "price") {
    const Prices = [...products].sort((a, b) => a.price - b.price);
    const html = Prices.map(template).join("");

    document.getElementById("productRow").innerHTML = html;
  } else if (value === "alphabet") {
    const Alphabets = products.sort((a, b) => a.name.localeCompare(b.name));
    const html = Alphabets.map(template).join("");

    document.getElementById("productRow").innerHTML = html;
  }
});
