import React, { useState, useReducer, useContext } from 'react';
import GlobalContext from './globalContext';
import { requests } from '../api/agent'

const GlobalState = props => {

    // let [results, setResults] = useState(false);
    let [productsList, setProductsList] = useState(false);
        async function fetchProducts(query) {
            let result = [];
            await requests.call("get", query ? `products?query=${query}` : "products")
                .then((res) => {
                    console.log("setting the state with", res.data)
                    result = res.data

                })
                .catch(() => {
                    setProductsList(false)

                    console.log("[results]")
                })
            console.log("[results]", result)
            return result

        }


    

    return (
        <GlobalContext.Provider
            value={{
                productsList, setProductsList,
                fetchProducts,


            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;