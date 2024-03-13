
const CartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { id, color, amount, product } = action.payload;
        // let's tackle existing product
        let existingProduct = state.cart.find((curElem) => {
            return curElem.id === id + color;
        });

        if (existingProduct) {
            let updatedProduct = state.cart.map((curElem) => {
                if (curElem.id === id + color) {
                    let newAmount = curElem.amount + amount;
                    if (newAmount >= curElem.max) {
                        newAmount = curElem.max
                    }
                    return {
                        ...curElem,
                        amount: newAmount
                    };
                } else {
                    return curElem;
                }
            });
            return {
                ...state,
                cart: updatedProduct,
            }
        } else {

            let cartProduct;
            cartProduct = {
                id: id + color,
                name: product.name,
                color: color,
                amount: amount,
                image: product.image[0].url,
                price: product.price,
                max: product.stock,
            };

            return {
                ...state,
                cart: [...state.cart, cartProduct]
            }
        };
    }
    // To Set The Increment

    if (action.type === 'SET_DECREMENT') {
        let updatedProduct = state.cart.map((curElem) => {
            if (curElem.id === action.payload) {
                let decAmount = curElem.amount - 1;
                if (decAmount <= 1) {
                    decAmount = 1;
                }
                return {
                    ...curElem,
                    amount: decAmount,
                };
            } else {
                return curElem;
            }
        });

        return {
            ...state,
            cart: updatedProduct,
        }

    };

    // To Set The Increment
    if (action.type === 'SET_INCREMENT') {
        let updatedProduct = state.cart.map((curElem) => {
            if (curElem.id === action.payload) {
                let IncAmount = curElem.amount + 1;
                if (IncAmount >= curElem.max) {
                    IncAmount = curElem.max;
                }
                return {
                    ...curElem,
                    amount: IncAmount,
                };
            } else {
                return curElem;
            }
        });

        return {
            ...state,
            cart: updatedProduct,
        }
    };

    if (action.type === "REMOVE_ITEM") {
        let updatedCart = state.cart.filter((curElem) => curElem.id !== action.payload);
        return {
            ...state,
            cart: updatedCart
        }
    };

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            cart: []
        }
    };

    
    if (action.type === 'CART_ITEM_PRICE_TOTAL') {
        let { total_item, total_price } = state.cart.reduce(
            (acc, curr) => {
                let { price, amount } = curr;

                acc.total_item = acc.total_item + amount;
                acc.total_price = acc.total_price + (price * amount);

                return acc;

            },
            {
                total_item: 0,
                total_price: 0
            }

        );

        return {
            ...state,
            total_item: total_item,
            total_price: total_price,
        };

    };

    return state;

};


export default CartReducer;