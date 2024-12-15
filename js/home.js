import { products } from "./data.js";
import { orders } from "./data.js";

// load products Arr
let productsArr = [];

if (localStorage.getItem("products") == null) {
    for (let i = 0; i < products.length; i++) {
        productsArr.push(products[i].getProduct());
    }
    localStorage.setItem("products", JSON.stringify(productsArr))
}
productsArr = JSON.parse(localStorage.getItem("products"));


// load Orders Arr
let orderArr = [];
if (localStorage.getItem("Orders") == null) {
    localStorage.setItem("Orders", JSON.stringify(orders));
}
orderArr = JSON.parse(localStorage.getItem("Orders"));


// add to cart functions 
const listCard = document.querySelector('.listCard');
const total = document.querySelector('.total');
const cardquantity = document.querySelector('.cardquantity');

let cart = {};
if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function changequantity(productId, quantityChange) {
    const product = cart[productId];

    if (product) {
        if (quantityChange > 0 && product.cardquantity >= product.quantity) {
            console.log("Cannot add more.");
        } else {
            product.cardquantity += quantityChange;

            if (product.cardquantity <= 0) {
                delete cart[productId];
                listCard.innerHTML = " ";
            }

            saveCartToLocalStorage();
            reloadCard();
        }
    }
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalprice = 0;

    for (const productId in cart) {
        const productDetails = cart[productId];

        totalprice += productDetails.price * productDetails.cardquantity;
        count += productDetails.cardquantity;

        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div>
          <img src="${productDetails.image.slice(3)}" />    <!--  images/bathroom-wooden-table.png-->
        </div>
        <h2>${productDetails.name}</h2>
        <div class="plusevent">
          <span class="minus">-</span>
          <span class="num">${productDetails.cardquantity}</span>
          <span class="plus">+</span>
        </div>
        <p>$${productDetails.price * productDetails.cardquantity}</p>
        <button class="remove-button" data-product-id="${productId}">
          <i class="fa-regular fa-circle-xmark"></i>
        </button>
      `;
        const minuss = newDiv.querySelector('.minus');
        const pluss = newDiv.querySelector('.plus');

        minuss.addEventListener('click', function () {
            changequantity(productId, -1);
        });

        pluss.addEventListener('click', function () {
            changequantity(productId, 1);
        });

        listCard.appendChild(newDiv);
    }

    total.innerText = `$${totalprice.toLocaleString()}`;
    cardquantity.innerText = count;
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            removeProductFromCart(productId);
        });
    });
}
function removeProductFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
        saveCartToLocalStorage();
        reloadCard();
    }
}

reloadCard();

// Function to create a product card
function createProductCard(product) {
    // Create card
    const card = document.createElement("div");
    card.classList.add("card", "col-8", "my-3", "mx-3", "mx-lg-3", "col-md-3")

    // Create img to hold product image
    const cardImg = document.createElement("img");
    cardImg.src = product.image;
    cardImg.alt = product.name;
    cardImg.classList.add("card-img-top", "d-block", "w-100");
    cardImg.style.height = "300px";

    // Create card body with product name
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center", "text-black");
    cardBody.innerHTML = `<p>${product.category}</p>` + `<h5 style="color:#c29012;">${product.name}</h5>` + `<p class="text-dark">Price:$${product.price}</p>`;
    cardBody.style.fontSize = "14px";

    // create anchor to go to the product detail page
    const anchor = document.createElement("a");
    anchor.classList.add("card-link")
    anchor.setAttribute("href", "productdetail.html");

    anchor.addEventListener('click', function () {
        localStorage.setItem('selectedProductId', product.id);
        localStorage.setItem(product.id, JSON.stringify(product));
    });// end of anchor click

    anchor.appendChild(cardImg);
    anchor.appendChild(cardBody);
    // anchor.appendChild(cardFooter);
    anchor.style.textDecoration = "none";
    // create add to cart icon
    const icon = document.createElement("a");
    icon.classList.add("cardicon", "mt-4", "fs-5", "fa-solid", "fa-basket-shopping");

    // anchor.setAttribute("href", "productdetail.html")

    icon.setAttribute("data-bs-toggle", "tooltip")
    icon.setAttribute("data-bs-placement", "right")
    icon.setAttribute("data-bs-title", "Add to Cart")

    icon.addEventListener("click", function (e) {
        const productId = product.id;

        if (!cart[productId]) {
            cart[productId] = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                cardquantity: 1,
                quantity: product.quantity
            }
        }
        else if (cart[productId].cardquantity >= product.quantity) {
            alert("Can't add more.");
        } else {
            cart[productId].cardquantity++;
        }
        saveCartToLocalStorage();
        reloadCard();
    });

    card.appendChild(icon)
    card.appendChild(anchor);
    return card;
}


// ============== Get the Best Seller Products and print them ==============
let BestSellerProducts = {};
let BestSellerArr = [];
let mostSellerProducts = [];
// getting all products in orders and their quantity 
for (let i = 0; i < orderArr.length; i++) {
    let productsInOrder = orderArr[i]['_products_'];
    for (let j = 0; j < productsInOrder.length; j++) {
        let key = productsInOrder[j]['id'];
        let quantity = Number(productsInOrder[j]['quantity']);
        if (BestSellerProducts[key]) {
            BestSellerProducts[key] += quantity;
        } else {
            BestSellerProducts[key] = quantity;
        }
    }
}
// mapping them into an array
for (const key in BestSellerProducts) {
    BestSellerArr.push({
        id: key,
        quantity: BestSellerProducts[key]
    })
}
// Sorting th eproducts desc according to the quantity selled
BestSellerArr.sort(
    (a, b) => {
        let x = a['quantity'];
        let y = b['quantity'];
        return y - x;
    });

for (let i = 0; i < BestSellerArr.length; i++) {
    let x = (productsArr.find((product) => {
        return product["id"] == Number(BestSellerArr[i]["id"]);
    })
    )
    if (x != undefined) {
        mostSellerProducts.push(x);
    }
}
// ============================== initiate carousel function

// Function to initialize the new Collection Carousel with product cards
function initCarousel(targetdiv, type, start, end, step) {
    if (start < 0) {
        start = 0
    }
    if (type == "sell" && end >= mostSellerProducts.length  ) { end = mostSellerProducts.length; }
    else if (type != "sell" && end >= productsArr.length)
        end = productsArr.length;
    // if the step is larger than the products to show then set it to that number
    if ((end - start) / step == 0) {
        step = end - start;
    }
    for (let i = start; i < end; i += step) {
        let productSlice = [];
        // Adjust the step to avoid repeating the products or going outside the bouandries

        // if Most Seller collection then use most seller Array
        if (type == "sell") {
            if (i + step > end)
                productSlice = mostSellerProducts.slice(i, end);
            else
                productSlice = mostSellerProducts.slice(i, i + step);
        }
        else {
            // if new collection then use products Array
            if (i + step > end)
                productSlice = productsArr.slice(i, end);
            else
                productSlice = productsArr.slice(i, i + step);
        }

        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        const row = document.createElement("div");// row to hold the three cards
        row.classList.add("row");
        // left of cards empty div just to center the products in the middle
        const leftDiv = document.createElement("div");
        leftDiv.classList.add("col-2", "col-md-1");
        row.appendChild(leftDiv);

        productSlice.forEach(product => {
            const productCard = createProductCard(product);
            row.appendChild(productCard);
        });
        // right of cards empty div just to center the products in the middle
        const rightDiv = document.createElement("div");
        rightDiv.classList.add("col-2", "col-md-1");
        row.appendChild(rightDiv);

        carouselItem.appendChild(row);
        targetdiv.appendChild(carouselItem);
    }

    // Set the first item as active
    targetdiv.children[0].classList.add("active");
}



//subscription

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    this.innerHTML = `<p style="color: white !important; font-size: 1.8rem;" class="fw-bold">Thanks for contacting us! We will be in touch with you shortly.</p>`;
});

