import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducer/ProductReducer';

export const ProductContext = createContext();

const API = 'https://api.pujakaitem.com/api/products';

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
};

const ProductContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const getProducts = async (url) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const res = await axios.get(url);
            const products = res.data;
            dispatch({ type: 'SET_API_DATA', payload: products });
        } catch (error) {
            dispatch({ type: 'API_ERROR' });
        }
    };

    // my 2nd api call for single product
    const getSingleProduct = async (url) => {
        dispatch({ type: 'SET_SINGLE_LOADING' });
        try {
            const res = await axios.get(url);
            const singleProduct = res.data;
            dispatch({ type: 'SET_SINGLE_PRODUCT', payload: singleProduct });
        } catch (error) {
            dispatch({ type: 'SET_SINGLE_ERROR' });
        }
    };

    useEffect(() => {
        getProducts(API);
    }, [])

    return <ProductContext.Provider value={{...state, getSingleProduct }}>
        {children}
    </ProductContext.Provider>
};

// Custom hook
export const useProductContext = () => {
    return useContext(ProductContext);
};

export default ProductContextProvider;