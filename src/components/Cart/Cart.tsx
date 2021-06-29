import "./style.scss";
import CartCard from "./CartCard/CartCard";
import { ReactElement, useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product";

//redux stuff
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { StoreType, CombinedStores } from "../../redux/interfaces/reduxStore";
import { loadCartFromDB, loadGuestCart } from "../../redux/cart/cartActions";

function Cart(): ReactElement {
    //Constants
    const EMPTY = 0;

    //redux store
    const cart = useSelector<CombinedStores, IProduct[]>(
        (state) => state.cartReducer.cart
    );
    const totalAmount = useSelector<CombinedStores, number>(
        (state) => state.cartReducer.totalAmount
    );
    const dispatch = useDispatch();

    //GETTING USER ID FROM LOCAL STORAGE
    const token: any = localStorage.token
        ? jwtDecode(localStorage.token)
        : false;
    const userId = token ? token.id : "guest";

    //////
    //ESTO PARA FORZAR EL RENDER DESDE LOS CHILDREN
    const [render, setRender] = useState(false);

    /////////////////////
    //this loads/refreshes the cart and the total amount to pay
    //
    useEffect(() => {
        if (userId !== "guest") {
            (async () => {
                dispatch(loadCartFromDB(userId));
                console.log(totalAmount);
            })(); //iif sacado de product detail
        } else {
            const localCart: IProduct[] = JSON.parse(
                localStorage.getItem("cart") || "[]"
            );
            dispatch(loadGuestCart(localCart));
        }
    }, [render]);

    ///////////////////////////////////////
    //The render/////////////
    ///////////////////////////////////////
    if (cart.length === EMPTY) {
        //cart is empty
        return (
            <div className="container ml-auto mr-auto mt-4 bg-light border shadow p-5 rounded-lg m-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Your cart is empty :(</h1>
                    <p className="col-md-8 fs-4">
                        It seems that your cart is totally empty. You can fix
                        this by visiting our huge catalog, clicking on a product
                        you love and adding a product by pressing the "Add to
                        cart" button in the description!
                    </p>
                </div>
            </div>
        );
    } else {
        //cart has things
        return (
            <div className="m-4 p-4">
                <h2 className="text-center">Shop Cart</h2>
                {cart.map((cartItem: IProduct) => {
                    return (
                        <div
                            className="border shadow bg-light p-4 m-4"
                            key={cartItem.productId}
                        >
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

                <div className="cartContainer p-2">
                    <h2 className="cartText">Total Amount of the cart is: </h2>
                    <div className="cartTotalAmount p-2 bd-highlight">
                        <h2>${totalAmount}</h2>
                    </div>
                    <div className="cartGoToPaymentBtn">
                        {userId === "guest" ? (
                            <a className="btn btn-primary m-2" href="../login">
                                Go to Payement
                            </a>
                        ) : (
                            <a
                                className="btn btn-primary m-2"
                                href="../payment"
                            >
                                Go to Payement
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default Cart;
