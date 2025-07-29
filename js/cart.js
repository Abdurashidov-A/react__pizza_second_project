let CART = JSON.parse(localStorage.getItem("PIZZA")) ?? [];

const pattern = (product) =>
  `<div class="order__col">
    <div class="order__box box-order">
      <div class="box-order__type">
        <div class="box-order__image">
          <img src="${product.imageUrl}" alt="" />
        </div>
        <div class="box-order__main">
          <div class="box-order__information">
            <div class="box-order__name">${product.name}</div>
            <div class="box-order__info">Тушеное мясо , моцарелла, колбаски охотничьи , 
            красный лук, маринованные огурчики , пицца соус, соус горчичный,тонкое тесто, 26 см.</div>
          </div>
          <div class="box-order__row">
            <div class="box-order__quantity">
              <div class="box-order__minus">
                <button
                  id="icon-${product.id}"
                  onclick="minusProduct(${product.id})"
                  class="box-order__btn"
                >
                  -
                </button>
              </div>
              <div class="box-order__number">${product.quantity}</div>
              <div class="box-order__plus">
                <button
                  onclick="addProduct(${product.id})"
                  class="box-order__btn"
                >
                  +
                </button>
              </div>
            </div>

            <div class="box-order__price">
              <div class="box-order__money">${product.price}₽</div>
            </div>

            <div class="box-order__delete">
              <button
                onclick="deleteProduct(${product.id})"
                class="box-order__btn"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

// Rendering
function render() {
  const container = document.getElementById("orderCol");
  container.innerHTML = "";

  const orderpage = CART.map(pattern).join(" ");
  container.innerHTML = orderpage;
}
render();

// Deleting by clicking X
function deleteProduct(itemId) {
  CART = filterItem(itemId);
  localStorage.setItem("PIZZA", JSON.stringify(CART));
  render();
  allQuantityIndex();
  allPrice();
}

// DELETE ALL
function deleteAll() {
  const container = document.getElementById("orderCol");
  container.innerHTML = "";
  localStorage.removeItem("PIZZA");

  document.getElementById("totalQuantity").innerHTML = 0;
  document.getElementById("totalPrice").innerHTML = 0;

  window.location.href = "empty.html";
}

// Plus the quantity clicking by +
function addProduct(itemId) {
  const item = findItem(itemId);

  if (item) item.quantity++;

  localStorage.setItem("PIZZA", JSON.stringify(CART));
  render();
  allQuantityIndex();
  allPrice();
}

// Minus the quantity clicking by -
function minusProduct(itemId) {
  const item = findItem(itemId);
  if (item) item.quantity--;

  const number = item.quantity;
  if (number === 0) {
    deleteProduct(itemId);
  }
  localStorage.setItem("PIZZA", JSON.stringify(CART));
  render();

  allQuantityIndex();
  allPrice();
}

// SUM OF QUANTITIES
function allQuantityIndex() {
  const totalQuantity = reduceItem();
  if (totalQuantity) {
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    render();
  } else {
    window.location.href = "empty.html";
  }
}
allQuantityIndex();

// Price sum of all ordered pizzas
function allPrice() {
  const total = reduceMUltiply();
  if (total) {
    document.getElementById("totalPrice").innerHTML = total;
    render();
  }
}
allPrice();

// CART.find((item) => item.id === productId);
// CART.reduce((acc, item) => acc + item.quantity, 0);
// 3. Optimization: allQuantityIndex funksiyani ham indexda ham cartda chaqirish,
//  code kopayishini oldini olish
// 4. page 1 + добавить ni yonidegi sanog'i refresh bo'gandayam turish kerak

// 1. filterlarni ishlatish
// 2. Сортировка по ni ham ishlatish]

function findItem(itemId) {
  return CART.find((item) => item.id === itemId);
}

function reduceItem() {
  return CART.reduce((acc, item) => acc + item.quantity, 0);
}

function reduceMUltiply() {
  return CART.reduce((acc, item) => acc + item.quantity * item.price, 0);
}

function filterItem(itemId) {
  return CART.filter((item) => item.id !== itemId);
}
