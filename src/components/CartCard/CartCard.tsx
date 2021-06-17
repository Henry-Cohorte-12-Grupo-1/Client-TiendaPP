import { ReactElement } from 'react';
import './CartCard.css';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { IProduct } from '../../interfaces/product';

interface Props extends RouteComponentProps {
    userId?: string;
    productData: IProduct;
}

function CartCard(props: Props): ReactElement {
    function onChangeIncrement() {
        axios.post('http://localhost:3001/api/cart/setCartItemQuantity', {
            userId: props.userId,
            quantity: props.productData.quantity,
            productId: props.productData.productId,
        });
    }

    function onChangeDecrement() {
        axios.post('http://localhost:3001/api/cart/setCartItemQuantity', {
            userId: props.userId,
            quantity: props.productData.quantity,
            productId: props.productData.productId,
        });
    }
    return (
        <div className="card" id="firstDiv">
            <div id="imageSize">
                <img
                    className="card-img-top"
                    src={
                        props.productData.images && props.productData.images.length
                            ? `http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${props.productData.images[0]}`
                            : 'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=6&m=922962354&s=612x612&w=0&h=_KKNzEwxMkutv-DtQ4f54yA5nc39Ojb_KPvoV__aHyU='
                    }
                    alt="not found"
                    id="image"
                />
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.productData.name}</h5>
                <p className="card-text">${`${props.productData.price}`}</p>
                <a href={`/product/${props?.productData.productId}`} className="btn btn-primary" id="colorB">
                    Details
                </a>
            </div>
            <div>
                <button onClick={onChangeDecrement}> - </button>
                <h6>{props.productData.quantity}</h6>
                <button onClick={onChangeIncrement}> + </button>
            </div>
        </div>
    );
}

export default CartCard;
