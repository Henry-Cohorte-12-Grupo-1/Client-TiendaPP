import { ReactElement, useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/product';
import CartCard from '../CartCard/CartCard';
import './style.scss';

//redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../redux/reducers/index';
import { loadCartFromDB, loadGuestCart } from '../../redux/actions';
import jwtDecode from 'jwt-decode';

function Cart(): ReactElement {
    //Constants
    const EMPTY = 0;

    //redux store
    const cart = useSelector<StoreType, IProduct[]>((state) => state.cart);
    const totalAmount = useSelector<StoreType, number>((state) => state.totalAmount);
    const dispatch = useDispatch();

    //GETTING USER ID FROM LOCAL STORAGE
    const token: any = localStorage.token ? jwtDecode(localStorage.token) : false;
    const userId = token ? token.id : 'guest';

    //////
    //ESTO PARA FORZAR EL RENDER DESDE LOS CHILDREN
    const [render, setRender] = useState(false);

    /////////////////////
    //this loads/refreshes the cart and the total amount to pay
    //
    useEffect(() => {
        if (userId !== 'guest') {
            (async () => {
                await dispatch(loadCartFromDB(userId));
                await console.log(totalAmount);
            })(); //iif sacado de product detail
        } else {
            const localCart: IProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
            dispatch(loadGuestCart(localCart));
        }
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
