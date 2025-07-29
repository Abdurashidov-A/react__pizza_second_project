// Price sum of all ordered pizzas

function allPriceIndex() {
  const total = reduceMUltiply();
  document.getElementById("totalPriceindex").innerHTML = total;
  localStorage.setItem("PIZZA", JSON.stringify(CART));
}
allPriceIndex();

// Quantity sum of all ordered pizzas
function allQuantityIndex() {
  const totalQuantity = reduceItem();
  document.getElementById("totalQuantityIndex").innerHTML = totalQuantity;
  localStorage.setItem("PIZZA", JSON.stringify(CART));
}
allQuantityIndex();

function reduceItem() {
  return CART.reduce((acc, item) => acc + item.quantity, 0);
}

function reduceMUltiply() {
  return CART.reduce((acc, item) => acc + item.quantity * item.price, 0);
}
