import React, { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducer/CartReducer';
export const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem('myStore');
    const parsedData = JSON.parse(localCartData);
    if (!Array.isArray(parsedData)) return [];
    return parsedData;
};

const initialState = {
    // cart: [],
    cart: getLocalCartData(),
    total_item: '',
    total_price: '',
    shipping_fee: 50000,
};

const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // add to cart
    const addToCart = (id, color, amount, product) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id,
                color,
                amount,
                product
            }
        });
    };

    //  Increament and Decreamnet the product;
    const setDecrease = (id) => {
        dispatch({ type: 'SET_DECREMENT', payload: id })
    };

    const setIncrease = (id) => {
        dispatch({ type: 'SET_INCREMENT', payload: id })
    };

    // remove from cart
    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id })
    };

    // to clear local storage
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    };

    // to add lcale storage
    useEffect(() => {
        // dispatch({ type: "CART_TOTAL_ITEM" });
        // dispatch({ type: "CART_TOTAL_PRICE" });
        dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
        localStorage.setItem('myStore', JSON.stringify(state.cart))
    }, [state.cart]);

    return <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setDecrease, setIncrease }}>
        {children}
    </CartContext.Provider>
};

// use cart context (custom hook);
export const useCartContext = () => {
    return useContext(CartContext);
};
export default CartContextProvider;