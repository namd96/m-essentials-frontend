import React, { useEffect, useContext, useState } from 'react';
import ProductCard from '../components/productCard';
import GlobalContext from '../context/globalContext'
import { requests } from '../api/agent';
import Login from '../components/login'
const Home = props => {
    const globalContext = useContext(GlobalContext);
    const [queryTest, setQueryTest] = useState(false);
    let [productsList, setProductsList] = useState(false);
    useEffect(() => {
        callAllData()
    }, [])

    const callAllData = () => {

        globalContext.fetchProducts()
            .then((res) => {
                console.log("[working]", res);
                setProductsList(res)
            })
        globalContext.fetchProducts("test")
            .then((res) => {
                console.log("[working]", res);
                setQueryTest(res)
            })
    }
  const  loginCalled =() =>{
      console.log("callig data again")
        callAllData()
    }

    if (!localStorage.hasOwnProperty("userData")) {
        return (
            <Login loginCalled = {loginCalled.bind(this)} />
        )
    }
    return <div>

        <br />
        <span>Home</span>
        <br />

        {/* globalContext.fetchProducts("test")={globalContext.fetchProducts("test")} */}
        <ProductCard productData={productsList} title={"Latest"} />
        <ProductCard productData={queryTest} title={"Around you test"} />
    </div>
}

export default Home;