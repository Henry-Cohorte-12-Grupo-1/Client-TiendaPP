import { ActionTypes } from "./types";
import obj from '../../interfaces/products';
import axios from 'axios';
import { Dispatch } from 'redux';

export const masUno = () => {
    return {
        type: ActionTypes.ADD_ONE,
        payload: null,
    };
};

export interface AxiosProducts {
    type: ActionTypes.BRING_PRODUCTS;
    payload: obj[];
}

export const bringProducts = () => {
    return async (dispatch: Dispatch) => {
        const productos = await axios.get<obj[]>('http://localhost:3001/products')                                                 
            dispatch<AxiosProducts>({
                type: ActionTypes.BRING_PRODUCTS,
                payload: productos.data
            })
    } 
}