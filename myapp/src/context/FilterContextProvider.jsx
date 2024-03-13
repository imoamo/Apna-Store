import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useProductContext } from './ProductContext';
import reducer from '../reducer/FilterReducer';

export const FilterContext = createContext();

const initialState = {
    filter_Products: [],
    all_Products: [],
    grid_view: true,
    sorting_value: 'lowest',
    filters: {
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        maxPrice: 0,
        price: 0,
        minPrice: 12600,
    },
};

const FilterContextProvider = ({ children }) => {
    const { products } = useProductContext();
    const [state, dispatch] = useReducer(reducer, initialState);
    // to set the grid view

    const setGridView = () => {
        return dispatch({
            type: "SET_GRID_VIEW"
        });
    };

    const setListView = () => {
        return dispatch({
            type: "SET_LIST_VIEW"
        });
    };

    // sort function
    const sorting = (event) => {
        let userValue = event.target.value;
        dispatch({
            type: 'GET_SORT_VALUE',
            payload: userValue,
        })
    };

    // update the filter values
    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        return dispatch({
            type: "UPDATE_FILTERS_VALUE",
            payload: { name, value }
        });
    };

    //to Clear the filters
    
    const clearFilters = () => {
     dispatch({type:"CLEAR_FILTERS"})
    };

    // to sort the product
    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" })
        dispatch({ type: "SORTING_PRODUCTS" })
    }, [products, state.sorting_value, state.filters]);

    useEffect(() => {
        dispatch({
            type: "LOAD_FILTER_PRODUCTS",
            payload: products
        })
    }, [products]);

    return <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFilterValue,clearFilters }}>
        {children}
    </FilterContext.Provider>
};


export const useFilterContext = () => {
    return useContext(FilterContext);
};


export default FilterContextProvider;