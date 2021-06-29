import "./payment.css";
import Stripe from "./Stripe";
import PaymentCard from "./PaymentCard";
import jwtDecode from "jwt-decode";
import { IProduct } from "../../interfaces/product";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { StoreType, CombinedStores } from "../../redux/interfaces/reduxStore";
import { loadCartFromDB } from "../../redux/cart/cartActions";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(
    "pk_test_51J3fLkDvBTztdzmKxUMVrAvCre6oktEig63I4WNKeNyOK1HGftr5RcrcCHvTEHj2CkvMDcmAIZHKNCrSMTpRVSTC00rzOzYUXS"
);

export default function Payment() {
    const isBuyNow = useSelector<CombinedStores, boolean>(
        (state) => state.cartReducer.buyNow
    );

    const token: any = localStorage.token
        ? jwtDecode(localStorage.token)
        : false;
    const userId = token ? token.id : "guest";
    const cart = useSelector<CombinedStores, IProduct[]>(
        (state) => state.cartReducer.cart
    );
    const totalAmount = useSelector<CombinedStores, number>(
        (state) => state.cartReducer.totalAmount
    );
    const dispatch = useDispatch();

    const [render, setRender] = useState(false);

    useEffect(() => {
        if (!isBuyNow) {
            (async () => {
                await dispatch(loadCartFromDB(userId));
            })();
        }
    }, []); //eslint-disable-line

    console.log(cart, "<--- CART");

    return (
        <div className="Payment">
            <div className="m-4 card-body ">
                <h2 className="text-center">Order details</h2>
                {cart.map((cartItem: IProduct) => {
                    return (
                        <div
                            className="bg-light shadow border p-4 m-4"
                            key={cartItem.productId}
                        >
                            <PaymentCard
                                key={cartItem.productId}
                                userId={userId}
                                productData={cartItem}
                                forceRender={setRender}
                                render={render}
                            />
                        </div>
                    );
                })}
                <hr></hr>
                <h1 className="mt-3 d-flex justify-content-end">
                    Total Amount: ${totalAmount}
                </h1>
                <div className="paymentStrype">
                    <Elements stripe={promise}>
                        <Stripe />
                    </Elements>
                </div>
            </div>
        </div>
    );
}
