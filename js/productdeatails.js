import { Product } from './database.js';
import { products } from './database.js';

const total = document.querySelector('.total');
const cardquantity = document.querySelector('.cardquantity');
const addtocart = document.getElementById('addToCartButton');
const checkoutButton = document.querySelector('.checkbtn');
let listCard;

document.addEventListener('DOMContentLoaded', () => {
    function updateProductDetailPage(productDetails) {
        document.getElementById('product-category').innerText = `${productDetails.categoryPath}`;
        document.getElementById('product-name').innerText = productDetails.name;
        document.getElementById('product-price').innerText = `Price: $${productDetails.price}`;
        document.getElementById('product-description').innerText = ` ${productDetails.description}`;
        document.getElementById('product-image').src = productDetails.image; 
    }
    

    let productDetails;
    let cart = {};

    try {
        const cartString = localStorage.getItem('cart');

        if (cartString) {
            cart = JSON.parse(cartString);
        }
    } catch (error) {
        console.error("Can't get cart from localStorage:", error);
    }


    // let productId = getProductIdFromLocalStorage();
    // if (productId) {
    //     productDetails = getProductDetails(productId);
    //     if (productDetails) {
    //         updateProductDetailPage(productDetails);
    //     } else {
    //         alert('Product not found');
    //     }
    // } else {
    //     alert('Product ID not provided');
    // }

   let productId = getProductIdFromLocalStorage();
    if (productId) {
        productDetails = getProductDetails(productId);
       updateProductDetailPage(productDetails);
    
        
    }

    const pluspro = document.querySelector(".plus");
    const minuspro = document.querySelector(".minus");
    const numbe = document.querySelector(".num");

    let number = 1;
/////plus quantity//////////////
    pluspro.addEventListener("click", () => {
        if (productDetails && number < productDetails.quantity) {
            number++;
            numbe.innerText = number;
            changequantity(productId, number);
        } else {
            console.log("Cannot add more, reached the maximum quantity");
        }
        reloadCard();
    });
///////////////////minus quantity
    minuspro.addEventListener("click", () => {
        if (number === 1) {
            console.log("Can't decrease below 1");
        } else {
            number--;
            numbe.innerText = number;
            changequantity(productId, -1);
        }
        reloadCard();
    });

    listCard = document.querySelector('.ulCard');
    addtocart.addEventListener('click', function () {
        const productId = productDetails.id;
        if (!cart[productId]) {
            cart[productId] = {
                id: productDetails.id,
                name: productDetails.name,
                price: productDetails.price,
                image: productDetails.image,
                cardquantity: number
            };
        } else if (cart[productId].cardquantity >= productDetails.quantity) {
            console.log("Can't add more.");
        } else {
            cart[productId].cardquantity += number;
        }
        number = 1;
        saveCartToLocalStorage();
        reloadCard();
    });

    reloadCard();
    function changequantity(productId, quantityChange) {
        const product = cart[productId];
        if (product) {
            if (quantityChange > 0 && product.cardquantity >= productDetails.quantity) {
                console.log("Cannot add more.");
            } else {
                product.cardquantity += quantityChange;
                if (product.cardquantity <= 0) {
                    delete cart[productId];
                }
                saveCartToLocalStorage();
                reloadCard();
            }
        }
    }
    function reloadCard() {
        let count = 0;
        let totalprice = 0;

        const listCard = document.querySelector('.listCard');
        listCard.innerHTML = '';

        for (const productId in cart) {
            const productDetails = cart[productId];
            totalprice += productDetails.price * productDetails.cardquantity;
            count += productDetails.cardquantity;

            const newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div>
                    <img src="${productDetails.image}" />
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

            const minus = newDiv.querySelector('.minus');
            const plus = newDiv.querySelector('.plus');
            minus.addEventListener('click', function () {
                changequantity(productId, -1);
            });

            plus.addEventListener('click', function () {
                changequantity(productId, 1);
            });



            listCard.appendChild(newDiv);
        }

        total.innerText = totalprice.toLocaleString();
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

    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function getProductIdFromLocalStorage() {
        return localStorage.getItem('selectedProductId');
    }

    function getProductDetails(productId) {
        const productJSON = JSON.parse(localStorage.getItem(productId));
        return productJSON ? (productJSON) : null;
    }

    function getProductDetails(productId){
        const products = JSON.parse(localStorage.getItem('products'))
        
        const product = products.find(product => product.id === Number(productId));
        return product;
          
    }

    checkoutButton.addEventListener('click', function () {
        if (Object.keys(cart).length === 0) {
            console.log("cart is empty");
            return;
        }

        saveCartToLocalStorage();
        window.location.href = 'checkout.html';
    });
});
