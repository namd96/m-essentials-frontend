import React, { useEffect, useState } from 'react';
import { requests } from '../api/agent'
import productCardSingle from '../components/productCardSingle'
import ProductCardSingle from '../components/productCardSingle';
const SearchPage = props => {
    const [products, setProducts] = useState(false)
    useEffect(() => {
        console.log(props.match.params.query);
        requests.call('get', `products?query=${props.match.params.query}`)
            .then((res) => {
                console.log(res)
                setProducts(res.data)
            })
    }, [props.match.params.query])
    return (<div >
        {
            products && products.map((product) => {
                return <ProductCardSingle product={product}/>
                
            })
        }
        {
            !products && <div style={{color : "black"}}>oops! no results</div>
        }
    </div>
    )


}

export default SearchPage;