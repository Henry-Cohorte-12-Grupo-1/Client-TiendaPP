import { CART_ACTIONS } from "./cartActions";
import { StoreType } from "../interfaces/reduxStore";
import { IAction } from "../interfaces/reduxActions";
import * as IReducer from "../../interfaces/reducer";
import { initialState } from "../store/initialState";

/*
    SET_CART_ITEM_QUANTITY,
    LOAD_CART,
    DELETE_CART_ITEM,
    ADD_PRODUCT_TO_CART,
    LOAD_GUEST_CART,
    BUY_NOW,
    LOAD_CART_BUY_NOW,
    CART_ITEMS
*/

export function cartReducer(state: StoreType = initialState, action: IAction) {
    switch (action.type) {
        case CART_ACTIONS.LOAD_CART:
            return {
                ...state,
                cart: action.payload,
                cartItem: action.payload,
                totalAmount: action.totalAmount,
            };
        case CART_ACTIONS.SET_CART_ITEM_QUANTITY:
            const newCart = state.cart.map(function (cartItem) {
                if (cartItem.productId === action.setQuantity.productId) {
                    cartItem.quantity = action.setQuantity.quantity;
                }
                return cartItem;
            });
            localStorage.setItem("cart", JSON.stringify(newCart));
            return {
                ...state,
                cart: newCart,
            };

        case CART_ACTIONS.DELETE_CART_ITEM:
            const filteredCart = state.cart.filter(
                (product) => product.productId !== action.itemsData.productId
            );
            //REMOVE THE PRODUCT FROM THE LOCAL STORAGE
            if (action.itemsData.userId) {
                const filteredCart_json = JSON.stringify(filteredCart);
                localStorage.setItem("cart", filteredCart_json);
            }
            return {
                ...state,
                cart: filteredCart,
            };
        case CART_ACTIONS.ADD_PRODUCT_TO_CART:
            //LOAD AL LOCAL STORAGE
            const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
            console.log("entered reducer");
            if (
                !localCart.some(
                    (cartItem: IReducer.IProduct) =>
                        cartItem.productId === action.addedCartProduct.productId
                )
            ) {
                console.log("new item");
                const localCart_json = JSON.stringify([
                    ...localCart,
                    action.addedCartProduct,
                ]);
                localStorage.setItem("cart", localCart_json);
                return {
                    ...state,
                    cart: [...state.cart, action.addedCartProduct],
                };
            } else {
                return {
                    ...state,
                };
            }
        case CART_ACTIONS.LOAD_GUEST_CART:
            return {
                ...state,
                cart: action.payload,
                totalAmount: action.totalAmount,
            };
        case CART_ACTIONS.BUY_NOW:
            return {
                ...state,
                buyNow: !state.buyNow,
            };

        default:
            return state;
    }
}