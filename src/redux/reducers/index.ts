import { ActionTypes } from "../actions/types";
import obj from '../../interfaces/products';

//Esta es la estructura del Store. Cambiar aca si le agregan mas cosas (y el state inicial tambien)
export interface StoreType {
    counter: number;
    productList: obj[]
    products: [];
}

//State iniciales del store
const initialState: StoreType = {
    counter: 0,
    products: [],
    productList: []
};

interface actionI {
    type: number;
    productList: obj[]
    products: [];
}

export default function reducer(
    state: StoreType = initialState,
    action: actionI
) {
    switch (action.type) {
        case ActionTypes.ADD_ONE:
            state.counter++;
            return state;

        case ActionTypes.BRING_PRODUCTS:
            return {
                ...state,  
                productList: action.productList
            }
        default:
            return state;
       case ActionTypes.SEARCH_PRODUCT:
           return {
            ...state,
            products: action.products
           } 
    }
}