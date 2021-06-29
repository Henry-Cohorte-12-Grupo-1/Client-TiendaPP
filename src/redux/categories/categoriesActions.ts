import { Dispatch } from "redux";
import axios from "axios";
import { url } from "../../api";
import { IProducts } from "../../interfaces/products";

export const CATEGORIES_ACTIONS = {
    ORDER_BY_CATEGORY: "ORDER_BY_CATEGORY",
    GET_CATEGORIES: "GET_CATEGORIES",
};

export interface BringUserOrders {
    type: string;
    payload: IProducts[];
}

export const getCategories = () => {
    const URL = `${url}/categories`;
    return async function (dispatch: Dispatch) {
        try {
            const productCategory = await axios.get(URL);
            dispatch({
                type: CATEGORIES_ACTIONS.GET_CATEGORIES,
                filter: productCategory.data,
            });
        } catch (error) {
            return console.log("No se encontraron categorias");
        }
    };
};

export const orderByCategories = (payload: string) => {
    return {
        type: CATEGORIES_ACTIONS.ORDER_BY_CATEGORY,
        order: payload,
    };
};
