
import { Product } from './database.js';
import { products as originalProducts } from './database.js';


const productsContainer = document.querySelector('.js-products-container');
const listCard = document.querySelector('.listCard');
const total = document.querySelector('.total');
const cardquantity = document.querySelector('.cardquantity');

let dinner = [6,10,12,13,14,16,15,12,22];
let beds = [1,2,3,9,11,26,27];
let tables = [5,12,13,15]

let categoryName = localStorage.getItem('categoryValue');
let catselector = document.querySelector('.js-category-container-selector');

catselector.value = categoryName;
catselector.addEventListener('change', ()=>{
      let selectVal = catselector.value;
      console.log(selectVal);
      categoryFilter(selectVal);
})


categoryFilter(categoryName);
console.log(categoryName);

function categoryFilter(categoryName){
        if (categoryName === 'bedroom'){
          let productsFilterd = [];
          let value = categoryName;
          for(let i = 0; i < beds.length; i++){
            productsFilterd.push(originalProducts[beds[i]-1]);
          }
          console.log(productsFilterd);
          let productsHtml = generateProductHTML(productsFilterd);
          console.log(productsHtml);
          
          productsContainer.innerHTML = '';
          productsContainer.innerHTML = productsHtml;
          attachEventListeners();
      }
      else if (categoryName === 'dinner'){
      let productsFilterd = [];
      let value = categoryName;
      for(let i = 0; i < dinner.length; i++){
      productsFilterd.push(originalProducts[dinner[i]-1]);
      }
      let productsHtml = generateProductHTML(productsFilterd);
      productsContainer.innerHTML = '';
      productsContainer.innerHTML = productsHtml;
      attachEventListeners();
      }
      else if (categoryName === 'table'){
      let productsFilterd = [];
      let value = categoryName;
      for(let i = 0; i < tables.length; i++){
      productsFilterd.push(originalProducts[tables[i]-1]);
      }
      console.log(productsFilterd);
      let productsHtml = generateProductHTML(productsFilterd);
      console.log(productsHtml);

      productsContainer.innerHTML = '';
      productsContainer.innerHTML = productsHtml;
      attachEventListeners();
      }
}


// });
//mmmm
let cart = {};
try {
  const cartString = localStorage.getItem('cart');

  if (cartString !== null && cartString !== undefined) {
    cart = JSON.parse(cartString);
  }
} catch (error) {
  console.error("can't get 'cart' from localStorage:", error);
}

function getProductsLocalStorage() {
  let products = [];

  // Parse the products from local storage
  let localStorageProducts = JSON.parse(localStorage.getItem('products'));

  if (!localStorageProducts || localStorageProducts.length === 0) {
    for (let i = 0; i < originalProducts.length; i++) {
      products.push(originalProducts[i].getProduct());
    }
    localStorageProducts = products;
    localStorage.setItem("products", JSON.stringify(products));
  }

  return localStorageProducts;
}


//my script for generating products html
function generateProductHTML(productsData = getProductsLocalStorage()){
  
  let productsHtml = '';
  productsData.forEach((item)=>{
          productsHtml += `
   <div class="col-sm-6 col-lg-4 product-item my-3" data-product-id="${item.id}">
          <div class="card p-2 product-card  border-0" style="width: 100%;">
            <img src="../${item.image}" class="card-img-top productImage" data-image-id="${item.id}" title="${item.name} $${item.price}">
            <div class="card-body text-center">
              <h5 class="card-title product-title" data-image-id="${item.id}" title="${item.name} $${item.price}">${item.name}</h5>
              <p class="fw-bold product-price">$${item.price}</p>
              <button type="button" class="btn my-3 me-2 add-cart-btn js-add-to-cart" data-product-id="${item.id}">
              <i class="bi bi-bag"></i>
              Add to Cart</button><br> 
              <span class="addedflag js-added-${item.id}">Added<span>
            </div>
          </div>
        </div>
  `;
  })
  return productsHtml;
}

//myscript for search and filter
function search(value){
  let searchbox = document.querySelector('.search-box');
  let products = getProductsLocalStorage();
  searchbox.addEventListener('input', ()=>{
        let productsFilterd;
        let value = searchbox.value;
        value = value.toLowerCase();
        console.log(value);
        console.log(products);
        
              productsFilterd = products.filter(function(e){
                    const pname = e.name.toLowerCase();
                    const pdesc = e.description.toLowerCase();
                     if (pname.includes(value)) return e;
                     else if(pdesc.includes(value)) return e;
             });

          console.log(productsFilterd);
          
   let productsHtml = generateProductHTML(productsFilterd);
   productsContainer.innerHTML = '';
  productsContainer.innerHTML = productsHtml;
  attachEventListeners();
});
}


//my script for attaching event listener
function attachEventListeners(){
  document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
          button.addEventListener('click', function(){
                  let productId = button.dataset.productId;
                  showAddedMessage(productId);
                  addToCart(productId);
          });
  });

  document.querySelectorAll('.product-item').forEach((product)=>{
          product.addEventListener('click', function(event){
                const productItemClass = event.target.closest('.product-item');
                if (productItemClass) {
                  console.log(productItemClass.dataset.productId);
                  const _id = productItemClass.dataset.productId;
                  localStorage.setItem('selectedProductId', _id);
                  if(event.target.tagName == 'H5' || event.target.tagName == 'IMG'){
                    window.location.href = 'productdetail.html';

                  }
               
                } else {
                  console.log('No product-item found!');
                }
               
          });
});

}

//my script for showing added message
function showAddedMessage(productId){
  document.querySelector(`.js-added-${productId}`).classList.add('addedmessage-visible');
  setTimeout(() => {
     document.querySelector(`.js-added-${productId}`).classList.remove('addedmessage-visible');
  }, 2000);
}
function displayProducts() {
  const products = getProductsLocalStorage();
  let productsHtml = generateProductHTML();
  if(productsContainer){
    productsContainer.innerHTML = productsHtml;
  }
  attachEventListeners();
  search();

}
function addToCart(productId) {
  const productDetails = getProductsLocalStorage().find(product => product.id == productId);

  if (!productDetails) {
    console.error("Product details not found for productId:", productId);
    return;
  }

  let stockElement = document.createElement('p');

  if (!cart[productId]) {
    cart[productId] = {
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      image: productDetails.image,
      cardquantity: 1,
      quantity: productDetails.quantity
    };
  } else if (cart[productId].cardquantity >= productDetails.quantity) {
    console.log("Can't add more.");
    stockElement.textContent = 'Out of Stock';
    stockElement.style.marginTop = "-350px"
    stockElement.style.marginLeft = "10px";
    stockElement.style.border = "1px solid black";
    stockElement.style.borderRadius = "10px";
    stockElement.style.color = "yellow";
    stockElement.style.width = "100px";
    stockElement.style.textAlign = "center";
    stockElement.style.padding = "5px";
    stockElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";

    // Append the stockElement to the product details container
    const productDiv = document.getElementById(productId);
    productDiv.appendChild(stockElement);

   

  } else {
    cart[productId].cardquantity++;

   
    
  }

  saveCartToLocalStorage();
  reloadCard();
}



function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalprice = 0;

  // Retrieve cart data from local storage on reload
  if (localStorage.getItem('cart') !== null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  const allProducts = getProductsLocalStorage();

  for (const productId in cart) {
    const productDetails = allProducts.find(product => product.id == productId);

    if (!productDetails) {
      console.error("Product details not found for productId:", productId);
      continue;
    }

    totalprice += productDetails.price * cart[productId].cardquantity;
    count += cart[productId].cardquantity;



    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
      <div>
        <img src="${productDetails.image || 'path/to/default/image.jpg'}" alt="Product Image" />
      </div>
      <h2>${productDetails.name}</h2>
      <div class="plusevent">
        <span class="minus">-</span>
        <span class="num">${cart[productId].cardquantity}</span>
        <span class="plus">+</span>
      </div>
      <p>$${(productDetails.price * cart[productId].cardquantity).toFixed(2)}</p>
      <button class="remove-button" data-product-id="${productId}">
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
    `;
    const minus = newDiv.querySelector('.minus');
    const plus = newDiv.querySelector('.plus');


    minus.addEventListener('click', () => changequantity(productId, -1));
    plus.addEventListener('click', () => changequantity(productId, 1));

    if (count === 0) {
 
      products.forEach(product => product.quantity = 0);
      localStorage.setItem('products', JSON.stringify(products));
    }
    

    listCard.appendChild(newDiv);
  }

  total.innerText = "$" + totalprice.toLocaleString();
  cardquantity.innerText = count;

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      removeProductFromCart(productId);
    });
  });
}

//////////////change quantity of product ///////////
function changequantity(productId, quantityChange) {
  const productDetails = cart[productId];

  if (productDetails) {
    if (quantityChange > 0 && productDetails.cardquantity >= productDetails.quantity) {
      console.log("Cannot add more.");
    } else {
      productDetails.cardquantity += quantityChange;

      if (productDetails.cardquantity <= 0) {
        delete cart[productId];
      }

      saveCartToLocalStorage();
      reloadCard();
    }
  }
}
////////remove productfromcart ////////
function removeProductFromCart(productId) {
  if (cart[productId]) {
    delete cart[productId];
    saveCartToLocalStorage();
    reloadCard();
  }
}
//////////save cart to locatstorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Display products when the page and card loads
// displayProducts();
reloadCard();


// ------------------checkout -----------
const checkoutButton = document.querySelector('.checkbtn');
checkoutButton.addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    console.log("cart is empty");
    return;
  }

  saveCartToLocalStorage();
  window.location.href = 'checkout.html';
});

/////////////// function for search ////////////
window.addEventListener('input', function () {
  var searchtext = document.getElementsByTagName('input')[0].value.toLowerCase();
  var productDivs = document.querySelectorAll('.product-details');
  var found = false;

  productDivs.forEach(productDiv => {
    var categoryName = productDiv.querySelector('h2').innerText.toLowerCase();
    if (categoryName.includes(searchtext)) {
      productDiv.style.display = "block";
      found = true;
    } else {
      productDiv.style.display = "none";
  
    }
  });

  if (!found) {
    productDivs.forEach(productDiv => {
      productDiv.style.display = "block";
    });
  }
});

//////////// function for filter catogary ///////////////////////////
window.display = function (e) {
  var target = e.target;
  if (target.tagName === 'P' && target.classList.contains('option')) {
    var categoryName = target.innerText.toLowerCase();
    updateDisplayCount(categoryName);
  }
};

function updateDisplayCount(clickedCategory) {
  var productDivs = document.querySelectorAll('.product-details');
  var categories = document.querySelectorAll('.category-container');

  categories.forEach(categoryContainer => {
    var category = categoryContainer.querySelector('.option');
    var countElement = categoryContainer.querySelector('.count');
    var count = 0;

    productDivs.forEach(productDiv => {
      var productCategory = productDiv.querySelector('p').innerText.toLowerCase();

      if (clickedCategory === 'all products' || productCategory.includes(clickedCategory)) {
        productDiv.style.display = "block"; 
        count++;
      } else {
        productDiv.style.display = "none"; 
      }
    });

    if (category.innerText.toLowerCase() === clickedCategory) {
      countElement.innerText = `(${count})`;
      // console.log(count);
    } else {
      countElement.innerText = ``;
    }
  });
}






window.addEventListener("load", function () {
  let productsDIV = document.getElementsByClassName("product-details");
  for (let i = 0; i < productsDIV.length; i++) {
    productsDIV[i].addEventListener("click", function (e) {
      if (this.nodeName != "I") {
        localStorage.setItem("selectedProductId", this.id);
        let productsArr = getProductsLocalStorage();
        for (let i = 0; i < productsArr.length; i++) {
          if (productsArr[i]["id"] == this.id) {
            localStorage.setItem(this.id, JSON.stringify(productsArr[i]));
            // alert("Hello");
            break;
          }
        }
      }
    });
  }
});




