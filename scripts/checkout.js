import { cart, deleteFromCart, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

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


    let HTML = `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
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
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>`;
    cartSummaryHTML += HTML;
  }
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

