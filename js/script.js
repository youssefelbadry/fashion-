let allproducts = document.querySelector(".product-item");
let productincard = localStorage.getItem("ProductsInCart");
let product = JSON.parse(localStorage.getItem("products"));
let drawItems;
(drawItems = function (products = []) {
  let y = products.map((item) => {
    if (item.id === 1 || item.id === 18 || item.id === 24 || item.id === 29) {
      // console.log(item.id);
      return `
      <div class="card-cont" style="width: 21rem;">
        <video src="${item.video}" height="450px" class="card-img-top" alt="..." muted autoplay loop>
      </div>
    
    `;
    } else {
      return `
      <div class="card-cont" style="width: 18rem; hight:15rem">
        <img src="${item.Image}" class="card-img-top" alt="..." height="450px">
        <div class="card-body desc-card">
          <h5 class="card-title" onClick="save(${item.id})">${item.title}</h5>
          <h6 id="price">${item.price} EGP</h6>
          <div class="space">
          <div>
           <a class="btn dd" id="add-to-card" onClick = "addtocard(${
   item.id
 })">Add To Card</a>
            </div>
           <div>
           <i class="fa fa-heart iii" aria-hidden="true" style="color: ${
             item.liked ? "red" : ""
           }" onClick="addtofav(${item.id})"></i>
           
             </div>
           </div>
        </div>
      </div>
    `;
    }
  });

  allproducts.innerHTML = y.join("");
})(JSON.parse(localStorage.getItem("products")));
// ===================================================================
function save(id) {
  localStorage.setItem("productid", id);
  window.location = "details.html";
}
// ===================================================================
function getunique(arr, filtertype) {
  // [1, 1, 1];
  let unque = arr
    .map((item) => item[filtertype])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);
  return unque;
}

// ==================================================
function getFavoriteItems() {
  try {
    const favItems = localStorage.getItem("favourite")
      ? JSON.parse(localStorage.getItem("favourite"))
      : [];
    return favItems;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return []; // Return empty array if localStorage access fails
  }
}
let favItems = getFavoriteItems(); // Get initial favorite items

function addtofav(id) {
  if (localStorage.getItem("username")) {
    const chosenFav = product.find((item) => item.id === id); // Strict comparison
    chosenFav.liked = true;
    favItems.push(chosenFav); // No spread needed

    // Implement getUnique function to remove duplicates based on "id"
    const uniqueProducts = getunique(favItems, "id");
    localStorage.setItem("favourite", JSON.stringify(uniqueProducts));

    // Consider creating a copy or dedicated array to avoid mutation
    const updatedProducts = product.map((item) => {
      if (item.id === chosenFav.id) {
        return { ...item, liked: true }; // Create a new object with liked property
      }
      return item;
    });

    drawItems(updatedProducts);
    favItems = [...favItems, chosenFav];
    let getnumproo = getunique(addtofav, "id");
    localStorage.setItem("favourite", JSON.stringify(getnumproo));
    chosenFav.liked = true;
    favItems.push(chosenFav);
  } else {
    window.location = "register.html";
  }
}

// ===================================================================
let badge = document.querySelector(".badge");
let total = document.querySelector(".total");
let cardshow = document.querySelector(".show div");
let addedItem = localStorage.getItem("ProductsInCart")
  ? JSON.parse(localStorage.getItem("ProductsInCart"))
  : [];

// Display items from localStorage on page load
if (addedItem.length) {
  addedItem.forEach((item) => {
    cardshow.innerHTML += `
    <div class="show-content">
      <div class="show-box">
        <img src="${item.Image}" alt="" class="cart-img" />
        <div class="show-details">
          <span class="product-name">${item.title}</span>
          <br />
          <span class="price">${item.price * item.qtr} EGP</span>
        </div>
      </div>
      <div class="quntatity">
        <i class="fas fa-minus-circle minus" onclick="changequantity(${item.id}, 'decrease')"></i>
        <span class="number">${item.qtr}</span>
        <i class="fas fa-plus-circle plus" onclick="changequantity(${item.id}, 'increase')"></i>
      </div>
    </div>`;
  });
  badge.innerHTML = addedItem.length;
}

if (localStorage.getItem("username")) {
  let allqt = addedItem; // Initialize allqt with items from localStorage

  function addtocard(id) {
    let choosenItem = product.find((item) => item.id === id);
    let itemnum = allqt.find((i) => i.id === choosenItem.id);

    if (itemnum) {
      itemnum.qtr += 1; // Increase quantity if item already in cart
    } else {
      choosenItem.qtr = 1; // Initialize quantity if adding for the first time
      allqt.push(choosenItem);
    }

    updateCartDisplay();
    updateTotalPrice();

    localStorage.setItem("ProductsInCart", JSON.stringify(allqt));
    badge.style.display = "block";
    badge.innerHTML = allqt.length;
  }

  function updateCartDisplay() {
    cardshow.innerHTML = "";
    allqt.forEach((item) => {
      cardshow.innerHTML += ` 
       <div class="show-content">
        <div class="show-box">
          <img src="${item.Image}" alt="" class="cart-img" />
          <div class="show-details">
            <span class="product-name">${item.title}</span>
            <br />
            <span class="price">${item.price * item.qtr} EGP</span>
          </div>
        </div>
        <div class="quntatity">
          <i class="fas fa-minus-circle minus" onclick="changequantity(${item.id}, 'decrease')"></i>
          
          <span class="number">${item.qtr} </span>
          <i class="fas fa-plus-circle plus" onclick="changequantity(${item.id}, 'increase')"></i>
        </div>
      </div>`;
    });
  }

  function updateTotalPrice() {
    let totalprice = allqt.reduce((acc, item) => acc + item.price * item.qtr, 0);
    total.innerHTML = totalprice + " EGP";
  }

  window.changequantity = function (id, action) {
    let item = allqt.find((i) => i.id === id);
    if (item) {
      if (action === 'increase') {
        item.qtr += 1;
      } else if (action === 'decrease' && item.qtr > 1) {
        item.qtr -= 1;
      }
      updateCartDisplay();
      updateTotalPrice();
      localStorage.setItem("ProductsInCart", JSON.stringify(allqt));
    }
  };

  updateTotalPrice(); // Initial total price update on page load

} else {
  window.location = "register.html";
}

// ===================================================================
// check

let iconcard = document.querySelector(".icon-card");
let show = document.querySelector(".show");
let home = document.querySelector(".home");
let closee = document.querySelector(".closs");

iconcard.addEventListener("click", opretor);

function opretor() {
  if (cardshow.innerHTML != "") {
    if (show.style.display == "block") {
      show.style.display = "none";
    } else {
      style.display = "block";
    }
  }
}

iconcard.addEventListener("click", () => {
  if (show.style.right == "-100%") {
    show.style.right = "0";
    home.style.transform = "translateX(-365px)";
  } else {
    show.style.right = "-100%";
    home.style.transform = "translateX(0)";
    home.style.transition = "0.5s";
  }
});
closee.addEventListener("click", () => {
  show.style.right = "-100%";
  home.style.transform = "translateX(0)";
});

// ===================================================================

let input = document.querySelector(".inputs #search");
input.addEventListener("keyup", world);

function world(e) {
  search(e.target.value, JSON.parse(localStorage.getItem("products")));
  console.log("eeeeeeeeeeeeeeeeeeeeeeee");
  if (e.target.value.trim() === "") {
    drawItems;
    // You're not doing anything meaningful here, so I removed this line
  }
}

function search(title, myArray) {
  if (!myArray || !Array.isArray(myArray)) {
    console.error("myArray is not defined or is not an array.");
    return;
  }
  let arr = myArray.filter(
    (item) => item.title && item.title.indexOf(title) !== -1
  );
  drawItems(arr);
}

/******************************************************* *********************************/
 // Retrieve the select element
 let categorySelect = document.getElementById("categorySelect");
      
 categorySelect.addEventListener("change", function() {
  
   if (categorySelect.value === "Jeans") {
    
     let jeansProductsHTML = product
       .filter(item => [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(item.id))
       .map(item => `
       <div class="card-cont" style="width: 18rem; hight:15rem">
       <img src="${item.Image}" class="card-img-top" alt="..." height="450px">
       <div class="card-body desc-card">
         <h5 class="card-title" onClick="save(${item.id})">${item.title}</h5>
         <h6 id="price">${item.price}</h6>
         <div class="space">
         <div>
          <a class="btn dd" id="add-to-card" onClick = "addtocard(${
  item.id
})">Add To Card</a>
           </div>
          <div>
          <i class="fa fa-heart" aria-hidden="true" style="color: ${
            item.liked ? "red" : ""
          }" onClick="addtofav(${item.id})"></i>

            </div>
          </div>
       </div>
     </div>`
       )
       .join("");

     allproducts.innerHTML = jeansProductsHTML;
   }else if (categorySelect.value === "Shoes") {
    let ShoesProductsHTML = product
    .filter(item => [19, 20, 21, 22, 23].includes(item.id))
    .map(item => `
    <div class="card-cont" style="width: 18rem; hight:15rem">
    <img src="${item.Image}" class="card-img-top" alt="..." height="450px">
    <div class="card-body desc-card">
      <h5 class="card-title" onClick="save(${item.id})">${item.title}</h5>
      <h6 id="price">${item.price}</h6>
      <div class="space">
      <div>
          <a class="btn dd" id="add-to-card" onClick = "addtocard(${
item.id
})">Add To Card</a>
        </div>
       <div>
       <i class="fa fa-heart" aria-hidden="true" style="color: ${
         item.liked ? "red" : ""
       }" onClick="addtofav(${item.id})"></i>

         </div>
       </div>
    </div>
  </div>`
    )
    .join(""); 
  
  allproducts.innerHTML = ShoesProductsHTML;
   }else if (categorySelect.value === "T-shirt"){
    let TshirtProductsHTML = product
    .filter(item => [30, 31, 32, 33 , 34].includes(item.id))
    .map(item => `
    <div class="card-cont" style="width: 18rem; hight:15rem">
    <img src="${item.Image}" class="card-img-top" alt="..." height="450px">
    <div class="card-body desc-card">
      <h5 class="card-title" onClick="save(${item.id})">${item.title}</h5>
      <h6 id="price">${item.price}</h6>
      <div class="space">
      <div>
          <a class="btn dd" id="add-to-card" onClick = "addtocard(${
item.id
})">Add To Card</a>
        </div>
       <div>
       <i class="fa fa-heart" aria-hidden="true" style="color: ${
         item.liked ? "red" : ""
       }" onClick="addtofav(${item.id})"></i>

         </div>
       </div>
    </div>
  </div>`
    )
    .join(""); 
 
  allproducts.innerHTML = TshirtProductsHTML;
   }else if (categorySelect.value === "Shorts"){
    let ShortsProductsHTML = product
    .filter(item => [25, 26, 27, 28].includes(item.id))
    .map(item => `
    <div class="card-cont" style="width: 18rem; hight:15rem">
    <img src="${item.Image}" class="card-img-top" alt="..." height="450px">
    <div class="card-body desc-card">
      <h5 class="card-title" onClick="save(${item.id})">${item.title}</h5>
      <h6 id="price">${item.price}</h6>
      <div class="space">
      <div>
          <a class="btn dd" id="add-to-card" onClick = "addtocard(${
item.id
})">Add To Card</a>
        </div>
       <div>
       <i class="fa fa-heart" aria-hidden="true" style="color: ${
         item.liked ? "red" : ""
       }" onClick="addtofav(${item.id})"></i>

         </div>
       </div>
    </div>
  </div>`
    )
    .join("");

  allproducts.innerHTML = ShortsProductsHTML;
} else if (categorySelect.value === "ALL") {

let numbers = [];
for (let i = 1; i <= 34; i++) {
  numbers.push(i);
}

console.log(numbers);
let allProductsHTML = product
  .filter(item => numbers.includes(item.id))
  .map(item => {
    if (item.id === 1 || item.id === 18 || item.id === 24 || item.id === 29) {
      return `
      <div class="card-cont" style="width: 21rem;">
        <video src="${item.video}" height="450px" class="card-img-top" alt="..." muted autoplay loop>
      </div>
      `;
    } else {
      return `
      <div class="card-cont" style="width: 18rem; hight:15rem">
      <img src="${item.Image}" class="card-img-top" alt="..." height="450px">
      <div class="card-body desc-card">
        <h5 class="card-title" onClick="save(${item.id})">${item.title}</h5>
        <h6 id="price">${item.price}</h6>
        <div class="space">
        <div>
          <a class="btn dd" id="add-to-card" onClick = "addtocard(${
 item.id
})">Add To Card</a>
          </div>
         <div>
         <i class="fa fa-heart" aria-hidden="true" style="color: ${
           item.liked ? "red" : ""
         }" onClick="addtofav(${item.id})"></i>

           </div>
         </div>
      </div>
    </div>
      `;
    }
  })
  .join("");
allproducts.innerHTML = allProductsHTML;
}
 });


