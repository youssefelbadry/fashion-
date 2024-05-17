let product = JSON.parse(localStorage.getItem("products"));
let productId = localStorage.getItem("productid");
let detailspro = document.querySelector(".details-pro");

let productsdetails = product.find((item) => item.id == productId);
console.log(productsdetails);
detailspro.innerHTML = `
<img src ="${productsdetails.Image}" alt="" />
<div>
<h2  style="font-size: 40px">${productsdetails.title}</h2>
<span>${productsdetails.price} EGP</span>
<div/>`;
