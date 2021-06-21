import { ReactElement, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IProduct } from "../../interfaces/product";
//import './style.scss';

//redux stuff
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/actions";
import { StoreType } from "../../redux/reducers";
import { loadCartFromDB, loadGuestCart } from "../../redux/actions";
import swal from "sweetalert";

interface Props {
    userId: string;
    productId: string;
}

function AddButton(props: Props): ReactElement {
    //props
    const { userId, productId } = props;

    //redux store
    const cart = useSelector<StoreType, IProduct[]>((state) => state.cart);
    const dispatch = useDispatch();


    //STATES
    let inCart = cart.some((product: IProduct) => {
        return product.productId === productId;
    });

    //FUNCTIONALITY
    const onClick = () => {
        //dispatch
        (async () => {
            await dispatch(addProductToCart(userId, productId));
            swal("The product was added to your cart");
            console.log("CARTSS BEFORE CHECKING: ", cart);
        })().then(() => {
            checkInCart();
            console.log("CARTS AFTER CHECKING: ", cart);
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
            })()
        } else {
            const localCart: IProduct[] = JSON.parse(
                localStorage.getItem("cart") || "[]"
            );
            dispatch(loadGuestCart(localCart));
            checkInCart();
        }
    }, []);

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
                    className="btn btn-success"
                    onClick={onClick}
                >
                    {"Add to cart!"}
                </button>
            </div>
        );
    }
}
export default AddButton;
