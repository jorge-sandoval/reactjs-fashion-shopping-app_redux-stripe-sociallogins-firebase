export const addItemToCart = (cartItems, cartItemToAdd) => {
    const itemFound = cartItems.find( item => {
        return item.id === cartItemToAdd.id;
    });

    if(itemFound){
        return cartItems.map( item => {
            return item.id === cartItemToAdd.id ? {...item, quantity: item.quantity + 1 } : item
        });
    }
    else {
        return [ ...cartItems, {...cartItemToAdd, quantity:1} ]
    }
}


export const removetemFromCart = (cartItems, cartItemToRemove) => {
    const itemFound = cartItems.find( item => {
        return item.id === cartItemToRemove.id;
    });

    if(itemFound){
        if(itemFound.quantity > 1) {
            return cartItems.map( item => {
                return item.id === cartItemToRemove.id ? {...item, quantity: item.quantity - 1 } : item
            });
        }
        else {
            return [ ...cartItems.filter( item => item.id !== cartItemToRemove.id ) ]
        }
    }
    else {
        return cartItems;
    }
}