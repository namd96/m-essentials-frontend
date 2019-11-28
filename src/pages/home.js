import React, { useEffect, useContext, useState } from 'react';
import CardBox from '../components/cardbox';
// import SeviceCard from '../components/serviceCard';
import GlobalContext from '../context/globalContext'
import { requests } from '../api/agent';
import Login from '../components/login'
const Home = props => {
    const globalContext = useContext(GlobalContext);
    const [queryTest, setQueryTest] = useState(false);
    let [productsList, setProductsList] = useState(false);
    let [serviceList, setServiceList] = useState(false);
    useEffect(() => {
        callAllData()
    }, [])

    const callAllData = () => {
        requests.call("get","meta-services")
        .then((res)=>{
            console.log(res)
            setServiceList(res.data)
        
        })
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
    return <div style={{paddingBottom : "6%"}}>

        <br />
        <span>Home</span>
        <br />

        {/* globalContext.fetchProducts("test")={globalContext.fetchProducts("test")} */}
        <CardBox productData={productsList} title={"Latest"} productCard={true}/>
        <CardBox serviceData={serviceList} title={"Services offered"}  serviceCard={true} />
    </div>
}

export default Home;