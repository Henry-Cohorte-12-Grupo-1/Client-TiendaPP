import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Stripe from './Stripe';
import './payment.css';
import PaymentCard from './PaymentCard'
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/reducers';
import { IProduct } from '../../interfaces/product';
import { loadCartFromDB } from '../../redux/actions';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(
    'pk_test_51J3fLkDvBTztdzmKxUMVrAvCre6oktEig63I4WNKeNyOK1HGftr5RcrcCHvTEHj2CkvMDcmAIZHKNCrSMTpRVSTC00rzOzYUXS',
);



export default function Payment() {

    const token: any = localStorage.token ? jwtDecode(localStorage.token) : false;
    const userId = token ? token.id : 'guest';
    const cart = useSelector<StoreType, IProduct[]>((state) => state.cart);
    const totalAmount = useSelector<StoreType, number>((state) => state.totalAmount);
    const dispatch = useDispatch()

    const [render, setRender] = useState(false);



    useEffect(() => {
        (async () => { await dispatch(loadCartFromDB(userId)) })();
    }, []);//eslint-disable-line

    console.log(cart, "<--- CART")

    return (
        <div className="Payment">
            <div className="m-4 card-body ">

                <h2 className="text-center">Order details</h2>
                {cart.map((cartItem: IProduct) => {
                    return (
                        <div className="bg-light shadow border p-4 m-4" key={cartItem.productId}>
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
                <h1 className="d-flex justify-content-end">Total Amount: ${totalAmount}</h1>
            </div>
            <div>
                <Elements stripe={promise}>
                    <Stripe />
                </Elements>
            </div>
        </div>
    );
}
