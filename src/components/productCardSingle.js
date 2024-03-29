import React , {useState} from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import '../styles/productCard.css';
import '../styles/productdetails.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Redirect } from 'react-router-dom';

const ProductCardSingle = props =>{

    const [productData, setProductData] = useState(false);
    const [redirection, setRedirection] = useState(false)

    const handleViewDetailsClick = id => {
        console.log("setting to", id)
        setRedirection(id)
    }
    
    if (redirection) {
        console.log("redirecting to", redirection)
        return (
            <Redirect push to={`/product/${redirection}`} />

        )
    }
    return(
        <Card className="mycard" onClick={handleViewDetailsClick.bind(this, props.product.product_id)}>
        <CardHeader
            // avatar={
            //   <Avatar aria-label="recipe" className="mycard-avatar">
            //       R
            //   </Avatar>
            // }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={<p className="clamp-1">{props.product.product_name}</p>}
            subheader={<div style={{ display: "flex", justifyContent: "center", marginLeft: "-9px" }}><icon class="material-icons-outlined black" >room</icon>      <span className="clamp-1">{props.product.product_location}</span></div>}

        />
        <CardMedia
            className="mycard-media"
            style={{ height: 0, paddingTop: '56.25%' }}
            image={props.product.product_img}
            title={props.product.product_name}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                <div className="product-card-list-text">
                    {props.product.product_description}
                </div>
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>

        </CardActions>

    </Card>
    )
}

export default ProductCardSingle;