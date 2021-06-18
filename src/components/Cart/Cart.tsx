import { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IProduct } from '../../interfaces/product';
import { url as URL } from '../../api';
import CartCard from '../CartCard/CartCard';
import './style.scss';

//redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../redux/reducers/index';
import { loadCartFromDB } from '../../redux/actions';

interface Props extends RouteComponentProps {
    userId: string;
}

function Cart(props: Props): ReactElement {
    //Constants
    const EMPTY = 0;

    //redux store

    const cart = useSelector<StoreType, IProduct[]>((state) => state.cart);
    const totalAmount = useSelector<StoreType, number>((state) => state.totalAmount);
    const dispatch = useDispatch();

    //const { userId } = props;
    const userId = '6d2ba377-b219-4925-b6df-4cbc8575ce50';

    ///

    const [render, setRender] = useState(false);
    //const [totalAmount, setTotalAmount] = useState(getTotalAmount());

    /////////////////////
    //this loads/refreshes the cart and the total amount to pay
    //
    useEffect(() => {
        (async () => {
            await dispatch(loadCartFromDB(userId));
            await console.log(totalAmount);

            //await setTotalAmount(getTotalAmount());
        })(); //iif sacado de product detail
    }, [render]);

    ///////////////////////////////////////
    //The render/////////////
    ///////////////////////////////////////
    if (cart.length === EMPTY) {
        //cart is empty
        return <h1>You have not added items to your cart yet :(</h1>;
    } else {
        //cart has things
        return (
            <div>
                {cart.map((cartItem: IProduct) => {
                    return (
                        <div key={cartItem.productId}>
                            <CartCard
                                key={cartItem.productId}
                                userId={userId}
                                productData={cartItem}
                                forceRender={setRender}
                                render={render}
                            />
                        </div>
                    );
                })}

                <hr />
                <div>
                    <h3>total is: {totalAmount}</h3>
                </div>
            </div>
        );
    }
}
export default Cart;
