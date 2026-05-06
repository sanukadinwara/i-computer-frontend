export function getCart(userEmail){
    if (!userEmail) return []; 

    const cartKey = `cart_${userEmail}`;
    const cartString = localStorage.getItem(cartKey)

    if(cartString == null){
        localStorage.setItem(cartKey, "[]")
        return []
    }else{
        return JSON.parse(cartString);
    }
}

export function addToCart(product , qty , userEmail){

    if (!userEmail) return;

    const cart = getCart(userEmail);
    const cartKey = `cart_${userEmail}`;

    const pId = product.productId || product._id;

    const existingProductIndex = cart.findIndex(
        (item) => (item.product.productId || item.product._id) == pId
    );

    if(existingProductIndex == -1){

        if(qty <= 0){
            console.error("Quantity must be greater than 0");
            return;
        }

        cart.push(
            {
                product : {
                    productId : product.productId,
                    name : product.name,
                    brand : product.brand,     
                    model : product.model,
                    labeledPrice : product.labeledPrice,
                    price : product.price,
                    image : product.image,
                    images : [product.image] 
                },
                qty : qty
            }
        )
    }else{

        const newQty = cart[existingProductIndex].qty + qty

        if(newQty <= 0){
            cart.splice(existingProductIndex , 1)
        }else{
            cart[existingProductIndex].qty = newQty
        }
    }

    const cartString = JSON.stringify(cart);
    localStorage.setItem(cartKey, cartString);
}

export function getCartTotal(cart){

    let total = 0

    cart.forEach(
        (cartItem)=>{
            total += cartItem.product.price * cartItem.qty
        }
    )
    return total
}