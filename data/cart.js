export let cart =JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }];
}


export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(product,quantity) {
    let matchItem;
    for (let i = 0; i < cart.length; i++) {
        if (product == cart[i].productId) {
            matchItem = cart[i];
        }
    }

    if (matchItem) {
        matchItem.quantity += quantity;
    } else {
        cart.push({
            productId: product,
            quantity: quantity
        });
    }
    saveToStorage();
}

export function deleteFromCart(productId){
    for (let i = 0; i < cart.length; i++) {
        if(cart[i].productId == productId){
            if(cart[i].quantity>1){
                cart[i].quantity--;
                return true
            }else{
                cart.splice(i,1);
                return false;
            }
        }
    }
    saveToStorage();
}



