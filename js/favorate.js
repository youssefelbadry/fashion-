// let allproducts = document.querySelector(".card-item");
// let noproducts = document.querySelector(".noproducts");

// function drawcartproduct(all = []) {
//   try {
//     let cartProducts = JSON.parse(localStorage.getItem("favourate")) || [];
//     if (cartProducts.length === 0) {
//       noproducts.style.display = "block";
//     }

//     let productHtml = cartProducts.map((item) => {
//       return `
//         <div class="card-cont items col-12">
//           <img src="${item.Image}" class="card-img-top" alt="..." height="450px" />
//           <div class="card-body desc-card desccard-card">
//             <h5 class="item-title">${item.title}</h5>
//             <h6 id="item-price">${item.price}</h6>
//           </div>

//         </div>
//       `;
//     });
//     allproducts.innerHTML = productHtml.join("");
//   } catch (error) {
//     console.error("Error parsing cart data:", error);
//     // Handle error gracefully (e.g., display an error message)
//   }
// }

// drawcartproduct();


// ***********************************************************************************************


function drawFavoriteProducts() {
  try {
    const favoriteProducts = JSON.parse(localStorage.getItem("favourite")) || [];
    let noproducts = document.querySelector(".noproducts");

    if (favoriteProducts.length === 0) {
      noproducts.style.display = "block";
    } else {
      noproducts.style.display = "none"; // Hide "no products" element
    }

    const productHtml = favoriteProducts.map((item) => {
      return `
      <div class="card-cont items col-12 mt-4">
        <img src="${item.Image}" class="card-img-top" alt="..." height="450px" />
        <div class="card-body desc-card desccard-card">
          <h5 class="item-title">${item.title}</h5>
          <h6 id="item-price">${item.price} EGP</h6>
          <i class="fas fa-trash" onClick = "removefromcart(${item.id})"></i>
        </div>

      </div>
    `
    });

    let allproducts = document.querySelector(".card-item");// Assuming this holds favorites container
    allproducts.innerHTML = productHtml.join("");
  } catch (error) {
    console.error("Error parsing favorite data:", error);
    // Handle error gracefully (e.g., display an error message)
  }
}

drawFavoriteProducts(); // Call the function


function removefromcart(id) {
  let ProductsInCart = localStorage.getItem("favourite");
  if (ProductsInCart) {
    let items = JSON.parse(ProductsInCart);
    let filterItem = items.filter((item) => item.id !== id);
    localStorage.setItem("favourite", JSON.stringify(filterItem));
    drawFavoriteProducts(filterItem);
  }
}

