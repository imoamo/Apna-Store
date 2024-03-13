import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ProductContextProvider from './context/ProductContext.jsx'
import FilterContextProvider from './context/FilterContextProvider.jsx'
import CartContextProvider from './context/CartContextProvider.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
        domain='dev-piknzw54h3tbv6z0.us.auth0.com'
        clientId='KEuWN4b0chTyzVfkow1Py77qQ0vBNrur'
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <ProductContextProvider>
            <FilterContextProvider>
                <CartContextProvider>
                    <BrowserRouter>
                    <ChakraProvider>
                        <App />
                    </ChakraProvider>
                    </BrowserRouter>
                </CartContextProvider>
            </FilterContextProvider>
        </ProductContextProvider>
    </Auth0Provider>
);