import { Dispatch } from "redux";
import axios from "axios";
import { url } from "../../api";
import { IProducts } from "../../interfaces/products";

export const ORDER_ACTIONS = {
    GET_USER_ORDERS: "GET_USER_ORDERS",
    FILTERED_ORDERS: "FILTERED_ORDERS",
};

export interface BringUserOrders {
    type: string;
    payload: IProducts[];
}

export const bringUserOrders = (userName: string | null) => {
    return async (dispatch: Dispatch) => {
        const userProducts = await axios.get(`${url}/orders/${userName}`);
        dispatch<BringUserOrders>({
            type: ORDER_ACTIONS.GET_USER_ORDERS,
            payload: userProducts.data,
        });
    };
};

export const bringUserSales = (userName: string | null) => {
    return async (dispatch: Dispatch) => {
        const userProducts = await axios.get(`${url}/orders/sales/${userName}`);
        dispatch<BringUserOrders>({
            type: ORDER_ACTIONS.GET_USER_ORDERS,
            payload: userProducts.data,
        });
    };
};

export const filteredOrders = (status: string) => {
    return {
        type: ORDER_ACTIONS.FILTERED_ORDERS,
        status,
    };
};
