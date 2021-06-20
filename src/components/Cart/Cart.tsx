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
        return (
            <div className="bg-light p-5 rounded-lg m-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Your cart is empty :(</h1>
                    <p className="col-md-8 fs-4">
                        It seems that your cart is totally empty. You can fix this by visiting our huge catalog,
                        clicking on a product you love and adding a product by pressing the "Add to cart" button in the
                        description!
                    </p>
                </div>
            </div>
        );
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

                <div className="d-flex p-2 bd-highlight">
                    <div className="d-flex flex-row justify-content-evenly align-items-center">
                        <div>
                            <h3>Total Amount of the cart is: </h3>
                        </div>
                        <div className="p-2 bd-highlight">
                            <h2>${totalAmount}</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Cart;
