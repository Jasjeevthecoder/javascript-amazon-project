import { cart, deleteFromCart, saveToStorage,updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { deliveryOptions } from "../../data/deliveryOptions.js";

hello();
const today =dayjs();
const deliveryDate = today.add(7,'days');
deliveryDate.format('dddd, MMMM D');



export function renderOrderSummary(){

  let cartSummaryHTML = '';
  addHTML();
  function addHTML() {
    for (let i = 0; i < cart.length; i++) {
  
      const productId = cart[i].productId;
      let matchingProduct;
  
      for (let j = 0; j < products.length; j++) {
        if (products[j].id == productId) {
          matchingProduct = products[j];
        }
      }
  
      let deliveryoptionids = cart[i].deliveryOptionId;
      console.log(deliveryoptionids);
      let deliveryOption;
  
      for (let i = 0; i < deliveryOptions.length; i++) {
        const option = deliveryOptions[i];
        if(option.id== deliveryoptionids){
          deliveryOption = option;
        }
      }
  
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');
  
      let HTML = `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">
            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cart[i].quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}>
                Delete
              </span>
            </div>
          </div>
    
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
              ${deliveryOptionsHTML(matchingProduct,cart[i].deliveryOptionId)}
          </div>
          </div>
        </div>`;
      cartSummaryHTML += HTML;
    }
  }
  
  function deliveryOptionsHTML(matchingProduct,cartItem){
    let htmls = '';
    for (let i = 0; i < deliveryOptions.length; i++) {
  
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOptions[i].deliveryDays,'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');
  
      const priceString = deliveryOptions[i].priceCents 
      === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOptions[i].priceCents)} -`
      
      const isChecked = deliveryOptions[i].id === cartItem;
  
  
      htmls += `<div class="delivery-option js-delivery-option"
      data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOptions[i].id}">
        <input type="radio" ${isChecked ? 'checked': ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`  
    }
    return htmls;
  }
  
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  
  let deleteButt = document.querySelectorAll('.js-delete-link');
  for (let i = 0; i < deleteButt.length; i++) {
    deleteButt[i].addEventListener('click', () => {
      let productId = deleteButt[i].dataset.productId;
      if (!deleteFromCart(productId)) {
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
      }
      saveToStorage();
  
    })
    
  }
  let options = document.querySelectorAll('.js-delivery-option');
  
  for (let i = 0; i < options.length; i++) {
    let element = options[i];
    element.addEventListener('click',()=>{
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
    })
  }
}


