import { Dispatch } from "redux";
import axios from "axios";
import { url } from "../../api";
import { IProducts } from "../../interfaces/products";

export const WISHLIST_ACTIONS = {
    BRING_WISHLIST: "BRING_WISHLIST",
};


export const bringWishlist = (userId: string) => {
    return async (dispatch: Dispatch) => {
        const productos = await axios.get<any[]>(`${url}/wishlist/${userId}`, {headers: { Authorization: `Bearer ${localStorage.token}`}});
        dispatch({
            type: WISHLIST_ACTIONS.BRING_WISHLIST,
            payload: productos.data.map((p) => p.Product),
        });
    };
};
