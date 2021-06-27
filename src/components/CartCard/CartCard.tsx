import { ReactElement, useEffect, useState } from "react";
import "./CartCard.css";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import { IProduct } from "../../interfaces/product";
import { url as URL } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setCartItemQuantity, loadCartFromDB } from "../../redux/actions";
import { StoreType } from "../../redux/reducers";
import DeleteButton from "../CartButtons/DeleteButton";
import './CartCard.css'
interface Props {
    userId?: string;
    productData: IProduct;
    forceRender: any;
    render: boolean;
}

function CartCard(props: Props): ReactElement {
    //CONSTANTS
    const URL_CART_SET_QUANTITY = URL + "/cart/setCartItemQuantity";

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
            if (productId == each.productId) {
                return each.quantity;
            }
        }
    }

    //SIN EL AWAIT NO RENDERIZA EN ORDEN -
    async function onIncrement() {
        if (productData.quantity + 1 <= productData.stock) {
            await dispatch(
                setCartItemQuantity(
                    userId,
                    productData.quantity + 1,
                    productData.productId
                )
            );
            setQuantity(quantityShower(productData.productId));
            forceRender(!render);
        }
    }

    async function onDecrement() {
        if (productData.quantity - 1 > 0) {
            await dispatch(
                setCartItemQuantity(
                    userId,
                    productData.quantity - 1,
                    productData.productId
                )
            );
            setQuantity(quantityShower(productData.productId));
            forceRender(!render);
        }
    }

    // async function onChange(event: Event): Promise<void> {
    //     event.preventDefault();
    //     const element = event.currentTarget as unknown as HTMLInputElement;
    //     if (productData.quantity - 1 > 0) {
    //         await dispatch(setCartItemQuantity(userId, parseInt(element.value), productData.productId));
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
        // <div className="card" id="firstDiv">
        //     <div id="imageSize">
        //         <img
        //             className="card-img-top"
        //             src={
        //                 productData.images
        //                     ? `http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${productData.images[0]}`
        //                     : 'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=6&m=922962354&s=612x612&w=0&h=_KKNzEwxMkutv-DtQ4f54yA5nc39Ojb_KPvoV__aHyU='
        //             }
        //             alt="not found"
        //             id="image"
        //         />
        //     </div>
        //     <div className="card-body">
        //         <h5 className="card-title">{productData.name}</h5>
        //         <p className="card-text">${`${productData.price}`}</p>
        //         <a href={`/product/${props?.productData.productId}`} className="btn btn-primary" id="colorB">
        //             Details
        //         </a>
        //     </div>
        //     <div>
        //         <button onClick={onDecrement}> - </button>
        //         <h6>{quantity}</h6>
        //         <button onClick={onIncrement}> + </button>
        //         <DeleteButton
        //             userId={userId}
        //             productId={productData.productId}
        //             forceRender={forceRender}
        //             render={render}
        //         />
        //     </div>
        // </div>

        <div className="row">
            <div className="col d-flex justify-content-evenly">
                <div className="card-body p-5 m-4 border">
                    <div className="media">
                        <div className="sq align-self-center ">
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
                        <div className="media-body my-auto text-right">
                            <div className="row my-auto flex-column flex-md-row align-items-baseline">
                                <div className="col my-auto">
                                    <h5 className="mb-0">{productData.name}</h5>
                                </div>

                                {/*QUANTITY INPUT*/}
                                <div className="col my-auto">
                                    <div className="row justify-content-md-center" id="cantidadR">
                                        <div className="col-xs-3 col-xs-offset-3">
                                            <div className="input-group number-spinner">
                                                <span className="input-group-btn">
                                                    <button
                                                        className="btn btn-primary"
                                                        data-dir="dwn"
                                                        onClick={onDecrement}
                                                    >
                                                        <span className="glyphicon glyphicon-minus">
                                                            -
                                                        </span>
                                                    </button>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control text-center"
                                                    value={quantity}
                                                    onChange={onChange}
                                                ></input>
                                                <span className="input-group-btn">
                                                    <button
                                                        className="btn btn-primary"
                                                        data-dir="up"
                                                        onClick={onIncrement}
                                                    >
                                                        <span className="glyphicon glyphicon-plus">
                                                            +
                                                        </span>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="stockR">in Stock: {productData.stock}</div>
                                {/*QUANTITY*/}
                                <div className="col my-auto">
                                    <h4 className="mb-0">
                                        ${" "}
                                        {(
                                            productData.price * (quantity || 1)
                                        ).toFixed(2)}{" "}
                                    </h4>
                                </div>
                                {/*DELETE BUTTON*/}
                                <div className="col my-auto">
                                    <DeleteButton
                                        userId={userId}
                                        productId={productData.productId}
                                        forceRender={forceRender}
                                        render={render}
                                    />
                                </div>
                                {/* <div className="col my-auto">
                                        <button onClick={onIncrement}> + </button>
                                        <p className="h6">Qty : {quantity}</p>
                                        <button onClick={onDecrement}> - </button>
                                    </div> */}
                                {/*PRICE*/}
                            </div>
                        </div>
                    </div>
                    {/* <div className="row justify-content-between">
                            <div className="justify-content-between col-auto flex-col">
                                <a href={`/product/${productData.productId}`} className="btn btn-primary" id="colorB">
                                    Details
                                </a>
                            </div>
                        </div> */}
                </div>
            </div>
        </div>
    );
}

export default CartCard;
