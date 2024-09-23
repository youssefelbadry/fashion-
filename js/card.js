let allproducts = document.querySelector(".card-item");
let noproducts = document.querySelector(".noproducts");
let totprice = document.querySelector(".totprice");
let addedItem = localStorage.getItem("ProductsInCart")
  ? JSON.parse(localStorage.getItem("ProductsInCart"))
  : [];

function drawcartproduct() {
  try {
    let cartProducts = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
    if (cartProducts.length === 0) {
      noproducts.style.display = "block";
      totprice.style.display = "none";
    } else {
      noproducts.style.display = "none";
      totprice.style.display = "block";
    }

    let productHtml = cartProducts
      .map((item) => {
        return `
        <div class="card-cont items col-12 mt-5" data-id="${item.id}">
    <img src="${item.Image}" class="card-img-top" alt="..." />
    <div class="card-body desc-card desccard-card">
        <h5 class="item-title">${item.title}</h5>
        <h6 class="item-price">${item.price * item.qtr} EGP</h6>
    </div>
    <div class="quntatityy">
        <i class="fas fa-minus-circle minus" onclick="changequantity(${item.id}, 'decrease')"></i>
        <span class="numberrr">${item.qtr}</span>
        <i class="fas fa-plus-circle plus" onclick="changequantity(${item.id}, 'increase')"></i>
        <i class="fas fa-trash" onClick="removefromcart(${item.id})"></i>
    </div>
</div>

      `;
      })
      .join("");
    allproducts.innerHTML = productHtml;

    // Update total price after drawing products
    updateTotalPrice();
  } catch (error) {
    console.error("Error parsing cart data:", error);
    // Handle error gracefully (e.g., display an error message)
  }
}

drawcartproduct();

function removefromcart(id) {
  let ProductsInCart = localStorage.getItem("ProductsInCart");
  if (ProductsInCart) {
    let items = JSON.parse(ProductsInCart);
    let filterItem = items.filter((item) => item.id !== id);
    localStorage.setItem("ProductsInCart", JSON.stringify(filterItem));
    drawcartproduct();
  }
}

// Event delegation for plus and minus buttons
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("plus")) {
    let cardCont = event.target.closest(".card-cont");
    let id = parseInt(cardCont.getAttribute("data-id"));
    changeQuantity(id, "increase");
  } else if (event.target.classList.contains("minus")) {
    let cardCont = event.target.closest(".card-cont");
    let id = parseInt(cardCont.getAttribute("data-id"));
    changeQuantity(id, "decrease");
  }
});

function changeQuantity(id, action) {
  let cartProducts = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
  let item = cartProducts.find((i) => i.id === id);
  if (item) {
    if (action === "increase") {
      item.qtr += 1;
    } else if (action === "decrease" && item.qtr > 1) {
      item.qtr -= 1;
    }
    localStorage.setItem("ProductsInCart", JSON.stringify(cartProducts));
    drawcartproduct();
  }
}

function updateTotalPrice() {
  let cartProducts = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
  let totalPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * item.qtr,
    0
  );
  document.querySelector(".total").textContent = totalPrice;
}

function updateTotalPrice() {
  let totalprice = addedItem.reduce(
    (acc, item) => acc + item.price * item.qtr,
    0
  );
  totprice.innerHTML = "Total Price : " + totalprice + " EGP";
}

window.changequantity = function (id, action) {
  let item = addedItem.find((i) => i.id === id);
  if (item) {
    if (action === "increase") {
      item.qtr += 1;
    } else if (action === "decrease" && item.qtr > 1) {
      item.qtr -= 1;
    }
    drawcartproduct();
    updateTotalPrice();
    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
  }
};

updateTotalPrice();
