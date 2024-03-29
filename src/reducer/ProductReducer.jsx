
const ProductReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING': {
            return {
                ...state,
                isLoading: true,
            }
        };
        case 'SET_SINGLE_LOADING': {
            return {
                ...state,
                isSingleLoading: true,
            }
        };
        case 'SET_SINGLE_PRODUCT': {
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload
            }
        };
        case 'API_ERROR': {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        };
        case 'SET_SINGLE_ERROR': {
            return {
                ...state,
                isSingleLoading: false,
                isError: true,
            }
        };
        case 'SET_API_DATA':
            const featureData = action.payload.filter((currElem) => currElem.featured === true);
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                featureProducts: featureData,
            };

        default: {
            throw new Error('invalid action type');
        }
    }
}

export default ProductReducer;