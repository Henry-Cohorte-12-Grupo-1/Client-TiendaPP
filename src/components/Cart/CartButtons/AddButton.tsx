import swal from "sweetalert";
import { ReactElement, useEffect } from "react";
import { IProduct } from "../../../interfaces/product";

import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";

import "./CartButtons.scss";

//redux stuff
import { useDispatch, useSelector } from "react-redux";

import { CombinedStores } from "../../../redux/interfaces/reduxStore";
import {
    loadCartFromDB,
    loadGuestCart,
    addProductToCart,
} from "../../../redux/cart/cartActions";
import { useHistory } from "react-router";

interface Props {
    userId: string;
    productId: string;
}

function AddButton(props: Props): ReactElement {
    //props
    const { userId, productId } = props;

    //redux store
    const cart = useSelector<CombinedStores, IProduct[]>(
        (state) => state.cartReducer.cart
    );
    const dispatch = useDispatch();

    //STATES
    let inCart = cart.some((product: IProduct) => {
        return product.productId === productId;
    });
    const history = useHistory();

    //FUNCTIONALITY
    const onClick = () => {
        //dispatch
        (async () => {
            await dispatch(addProductToCart(userId, productId));
            swal("The product was added to your cart").then(() =>
                history.go(0)
            );
        })().then(() => {
            checkInCart();
        });
    };

    const checkInCart = () => {
        inCart = cart.some((product: IProduct) => {
            return product.productId === productId;
        });
    };

    useEffect(() => {
        if (userId !== "guest") {
            (async () => {
                await dispatch(loadCartFromDB(userId));
                checkInCart(); //se fija si está
            })();
        } else {
            const localCart: IProduct[] = JSON.parse(
                localStorage.getItem("cart") || "[]"
            );
            dispatch(loadGuestCart(localCart));
            checkInCart();
        }
    }, []); //eslint-disable-line

    ///////////////////////////////////////
    //The render/////////////
    ///////////////////////////////////////

    //check if productId is in cart

    checkInCart();
    if (inCart) {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-info"
                    onClick={onClick}
                    disabled
                >
                    {"Added to cart!"}
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-success add-btn"
                    onClick={onClick}
                >
                    <IconContext.Provider value={{ size: "2em" }}>
                        <AiIcons.AiOutlineShoppingCart />
                    </IconContext.Provider>
                    <span className="add-span">Add to Cart</span>
                </button>
            </div>
        );
    }
}
export default AddButton;
