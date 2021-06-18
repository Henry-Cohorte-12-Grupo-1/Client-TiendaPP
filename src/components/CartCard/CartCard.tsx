import { ReactElement, useEffect, useState } from 'react';
import './CartCard.css';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { IProduct } from '../../interfaces/product';
import { url as URL } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItemQuantity, loadCartFromDB } from '../../redux/actions';
import { StoreType } from '../../redux/reducers';

interface Props {
    userId?: string;
    productData: IProduct;
    forceRender: any;
    render: boolean;
}
const userId = '6d2ba377-b219-4925-b6df-4cbc8575ce50';

function CartCard(props: Props): ReactElement {
    //redux store
    const dispatch = useDispatch();
    const cart = useSelector<StoreType, IProduct[]>((state) => state.cart);

    const [quantity, setQuantity] = useState(quantityShower(props.productData.productId));

    function quantityShower(productId: any) {
        for (const each of cart) {
            if (productId == each.productId) {
                return each.quantity;
            }
        }
    }

    const URL_CART_SET_QUANTITY = URL + '/cart/setCartItemQuantity';

    async function getItems() {
        await dispatch(loadCartFromDB(userId));
        setQuantity(quantityShower(props.productData.productId));
    }
    useEffect(() => {
        getItems();
    }, []);

    //SIN EL AWAIT NO RENDERIZA EN ORDEN -
    async function onIncrement() {
        await dispatch(setCartItemQuantity(props.userId, props.productData.quantity + 1, props.productData.productId));
        setQuantity(quantityShower(props.productData.productId));
        props.forceRender(!props.render);
    }

    async function onDecrement() {
        if (props.productData.quantity - 1 > 0) {
            await dispatch(
                setCartItemQuantity(props.userId, props.productData.quantity - 1, props.productData.productId),
            );
            setQuantity(quantityShower(props.productData.productId));
            props.forceRender(!props.render);
        }
    }

    return (
        <div className="card" id="firstDiv">
            <div id="imageSize">
                <img
                    className="card-img-top"
                    src={
                        props.productData.images
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
                <button onClick={onDecrement}> - </button>
                <h6>{quantity}</h6>
                <button onClick={onIncrement}> + </button>
            </div>
        </div>
    );
}

export default CartCard;
