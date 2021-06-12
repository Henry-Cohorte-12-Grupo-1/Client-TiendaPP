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

export interface ProductInfo {
    type: ActionTypes.GET_DETAILS;
    payload: obj
}

//Busca los detalles de un producto, por ahora hardcodeado del back
export const productInfo = (id: string) => {
    return async (dispatch: Dispatch) => {
        const productDetails = await axios.get<object>('http://localhost:3001/productDetails/' + id)
        dispatch(
            {
                type: ActionTypes.GET_DETAILS,
                productDetails: productDetails.data
            }
        )
    }
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

export const getCategories = () => {
   const URL: string = 'http://localhost:3001/categories';
   try{
       return async function (dispatch:any) {
           const productCategory = await axios.get(URL);
           dispatch({
               type:ActionTypes.GET_CATEGORIES,
               filter: productCategory.data
           })
       }
   }
   catch (error) {
       return console.log('No se encontraron categorias')
   }
}

export const orderByCategories = (payload: string) => {
   return {
       type: ActionTypes.ORDER_BY_CATEGORY,
       order: payload
   }
}


export const searchProduct = (name: string) => {
    const URL: string = 'http://localhost:3001/search';
    const params = {
        name
    }
    try {
        return async function (dispatch: any) {
            const productData = await axios.get(URL, { params });
            dispatch({
                type: ActionTypes.SEARCH_PRODUCT,
                products: productData.data,
            })
        }
    }
    catch (error) {
        return console.log("No se pudo realizar la busqueda");
    }
}
