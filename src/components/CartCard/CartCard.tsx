import { ReactElement, useState } from "react";
import { IProduct } from "../../interfaces/product";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemQuantity } from "../../redux/cart/cartActions";
import { StoreType } from "../../redux/interfaces/reduxStore";
import DeleteButton from "../Cart/CartButtons/DeleteButton";
import './CartCard.scss'
import { Container } from "react-bootstrap";
interface Props {
    userId?: string;
    productData: IProduct;
    forceRender: any;
    render: boolean;
}

function CartCard(props: Props): ReactElement {
    //CONSTANTS
    //const URL_CART_SET_QUANTITY = URL + "/cart/setCartItemQuantity";

    //PROPS
    //const userId = '6d2ba377-b219-4925-b6df-4cbc8575ce50';
    const { userId, productData, forceRender, render } = props;

    //redux store
    const dispatch = useDispatch();
    const cart = useSelector<StoreType, IProduct[]>((state) => state.cart);

    //STATES
    const [quantity, setQuantity] = useState(
        quantityShower(productData.productId)
    );

    function quantityShower(productId: any) {
        for (const each of cart) {
            if (productId === each.productId) {
                return each.quantity;
            }
        }
    }

    //SIN EL AWAIT NO RENDERIZA EN ORDEN -
    // async function onIncrement() {
    //     if (productData.quantity + 1 <= productData.stock) {
    //         await dispatch(
    //             setCartItemQuantity(
    //                 userId,
    //                 productData.quantity + 1,
    //                 productData.productId
    //             )
    //         );
    //         setQuantity(quantityShower(productData.productId));
    //         forceRender(!render);
    //     }
    // }

    // async function onDecrement() {
    //     if (productData.quantity - 1 > 0) {
    //         await dispatch(
    //             setCartItemQuantity(
    //                 userId,
    //                 productData.quantity - 1,
    //                 productData.productId
    //             )
    //         );
    //         setQuantity(quantityShower(productData.productId));
    //         forceRender(!render);
    //     }
    // }


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue <= productData.stock) {
            const setQuantityDB = async (qty: number) => {
                await dispatch(
                    setCartItemQuantity(userId, qty, productData.productId)
                );
                setQuantity(quantityShower(productData.productId));
                forceRender(!render);
            };

            if (parseInt(newValue) > 0) {
                setQuantityDB(parseInt(newValue));
            }
        }
    };

    return (
        <Container className="cartCardContainer">
            {/* Foto */}
            <div className="cartCardImage">
                <a
                    href={`/product/${productData.productId}`}
                    className="btn btn-danger"
                    id="colorB"
                >
                    <img
                        className="img-fluid my-auto align-self-center"
                        src={
                            productData.images
                                ? `http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${productData.images[0]}`
                                : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=6&m=922962354&s=612x612&w=0&h=_KKNzEwxMkutv-DtQ4f54yA5nc39Ojb_KPvoV__aHyU="
                        }
                        width="135"
                        height="135"
                        alt="product"
                    />
                </a>
            </div>
            {/* Name */}
            <div className="cartCardName">
                <h5 className="mb-0">{productData.name}</h5>
            </div>

            {/*QUANTITY INPUT*/}
            <div className="cartCardQuantity">
                <div className="cartAddMore">
                    {/* <button
                        className="btn btn-secondary btn-numberbtn btn-default btn-number"
                        data-dir="dwn"
                        onClick={onDecrement}
                    >
                        -
                    </button> */}
                    <input
                        type="number"
                        className="form-control inpurt-number input-sm text-center"
                        value={quantity}
                        onChange={onChange}
                    ></input>
                    {/* <button
                        className="btn btn-primary btn-number"
                        data-dir="up"
                        onClick={onIncrement}
                    >
                        +
                    </button> */}
                </div>
            </div>

            <div className="cartCardStock">in Stock: {productData.stock}</div>
            {/* Precio */}
            <div className="cartCardPrice">
                <h4 className="mb-0">
                    $ {(productData.price * (quantity || 1)).toFixed(2)}{" "}
                </h4>
            </div>

            {/*DELETE BUTTON*/}
            <div className="cartCardDeleteBtn">
                <DeleteButton
                    userId={userId}
                    productId={productData.productId}
                    forceRender={forceRender}
                    render={render}
                />
            </div>
        </Container>
    );
}

export default CartCard;
