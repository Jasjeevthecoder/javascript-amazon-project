/*
const products = [{
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: {
        stars: 4.5,
        count: 87
    },
    priceCents: 1090
}, {
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
        stars: 4,
        count: 127
    },
    priceCents: 2095
}, {
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: {
        stars: 4.5,
        count: 56
    },
    priceCents: 799
},{
    image: 'images/products/black-2-slot-toaster.jpg',
    name: 'Black 2 Slot Toaster',
    rating: {
        stars: 5,
        count: 2197
    },
    priceCents: 1899
}];
*/

import {cart,addToCart,saveToStorage} from "../data/cart.js";
import {products} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


addProducts();
function addProducts() {
    let productsHTML = '';

    for (let i = 0; i < products.length; i++) {

        const html = `<div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
        src="${products[i].image}">
        </div>
    
        <div class="product-name limit-text-to-2-lines">
        ${products[i].name}
        </div>
    
        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${products[i].rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
          ${products[i].rating.count}
          </div>
        </div>
    
        <div class="product-price">
        $${formatCurrency(products[i].priceCents)}
        </div>
    
        <div class="product-quantity-container">
          <select class ="js-quantity">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div class="product-spacer"></div>

        <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${products[i].id}">
        Add to Cart
        </button>
        </div>`;
        productsHTML += html;
    }
    document.querySelector('.js-products-grid').innerHTML = productsHTML;
}
CartAddition();
function CartAddition(){
    let butt = document.querySelectorAll('.js-add-to-cart');
    let select = document.querySelectorAll('.js-quantity')
    for (let i = 0; i < butt.length; i++) {
        butt[i].addEventListener('click',()=>{
            const product = butt[i].dataset.productId;
            let quantity = parseInt(select[i].value);
            addToCart(product,quantity);
            let cartQuantity=0;
            for (let i = 0; i < cart.length; i++) {
                cartQuantity += cart[i].quantity;
            }
            document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
            
        })
        saveToStorage();
        
    }
}