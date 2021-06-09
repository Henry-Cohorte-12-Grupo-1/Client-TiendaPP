import { ActionTypes } from "./types";
import axios from 'axios';

export const masUno = () => {
    return {
        type: ActionTypes.ADD_ONE,
        payload: null,
    };
};

export const searchProduct = (product: string) => {
    const URL: string = 'http://localhost:3001/search';
    const params = {
        product
    }
      try {
            return async function (dispatch: any) {                       
              const productData = await axios.get(URL, { params });
              dispatch({
                type: ActionTypes.SEARCH_PRODUCT,
                products: productData,
                })
            } 
    }
     catch (error) {
            return console.log("No se pudo realizar la busqueda");
    }
}


