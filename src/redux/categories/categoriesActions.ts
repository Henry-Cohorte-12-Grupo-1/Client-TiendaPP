import { Dispatch } from "redux";
import axios from "axios";
import { url } from "../../api";
import { IProducts } from "../../interfaces/products";
import { PRODUCTS_ACTIONS } from "../products/productsActions";

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

// ATENCION: estas actions son del reducer de products, no del de categories
export const orderByCategories = (payload: string) => {
    console.log('entro a la action')
    return {
        type: PRODUCTS_ACTIONS.ORDER_BY_CATEGORY,
        order: payload,
    };
};
export const resetCategoriesFilter = () => {
    console.log('entro a la action')
    return {
        type: PRODUCTS_ACTIONS.RESET_CATEGORIES_FILTER,
    };
};

