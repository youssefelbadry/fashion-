function drawFavoriteProducts() {
  try {
    const favoriteProducts =
      JSON.parse(localStorage.getItem("favourite")) || [];
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
          <i class="fas fa-trash favi" onClick = "removefromcart(${item.id})"></i>
        </div>

      </div>
    `;
    });

    let allproducts = document.querySelector(".card-item"); // Assuming this holds favorites container
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
