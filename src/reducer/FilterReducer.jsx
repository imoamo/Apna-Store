
const FilterReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_FILTER_PRODUCTS': {

            let priceArr = action.payload.map((curElem) => curElem.price);
            // console.log(priceArr);
            // let maxPrice = priceArr.reduce((acc, curr) =>
            //     Math.max(acc, curr), 0);
            // console.log(maxPrice);
            let maxPrice = Math.max(...priceArr);

            return {
                ...state,
                filter_Products: [...action.payload],
                all_Products: [...action.payload],
                filters: {
                    ...state.filters,
                    maxPrice: maxPrice,
                    price: maxPrice
                }
            }
        };
        case "SET_GRID_VIEW": {
            return {
                ...state,
                grid_view: true
            }
        };

        case "SET_LIST_VIEW": {
            return {
                ...state,
                grid_view: false
            }
        };

        case "GET_SORT_VALUE": {
            return {
                ...state,
                sorting_value: action.payload,
            }
        };
        case "SORTING_PRODUCTS": {
            let newSortedData;
            const { filter_Products, sorting_value } = state;
            let tempSortedProduct = [...filter_Products];
            // sort code
            const sortingProducts = (a, b) => {
                if (sorting_value === 'lowest') {
                    return a.price - b.price;

                } else if (sorting_value === 'highest') {
                    return b.price - a.price;

                } else if (sorting_value === 'a-z') {
                    return a.name.localeCompare(b.name);

                } else if (sorting_value === 'z-a') {
                    return b.name.localeCompare(a.name);
                }

            };
            newSortedData = tempSortedProduct.sort(sortingProducts);
            return {
                ...state,
                filter_Products: newSortedData
            }
        };

        case "UPDATE_FILTERS_VALUE": {
            const { name, value } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value
                }
            }
        };

        case "FILTER_PRODUCTS": {
            let { all_Products } = state;
            let tempFilterProduct = [...all_Products];
            const { text, category, company, color, price } = state.filters;

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.name.toLowerCase().includes(text);
                });
            }


            if (category !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.category === category;
                });
            }

            if (company !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.company.toLowerCase() === company.toLowerCase();
                });
            }

            if (color !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.colors.includes(color)
                });
            }

            if (price) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.price <= price);
            }

            return {
                ...state,
                filter_Products: tempFilterProduct
            }
        };

        case "CLEAR_FILTERS": {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    category: 'all',
                    company: 'all',
                    color: 'all',
                    maxPrice: state.filters.maxPrice,
                    price: state.filters.maxPrice,
                    minPrice: 12600,
                }
            }
        };

        default: {
            throw new Error('Invalid action type');
        }
    };
}

export default FilterReducer;