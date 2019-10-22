import React,{useState} from 'react'
import { Button } from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
const ProductDetails = props => {
    const [redirection, setRedirection] = useState(false);
  const  handleChatClick = id =>{
        setRedirection(id)
    }

    if(redirection){
        return(
            <Redirect push to ={"/chat/"+redirection}/>
        )
    }
    return <div>

        <Button onClick={handleChatClick.bind(this,props.match.params.id)}>Chat with the vendor</Button>

    </div>
}

export default ProductDetails