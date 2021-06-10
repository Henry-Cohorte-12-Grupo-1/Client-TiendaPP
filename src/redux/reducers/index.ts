import { ActionTypes } from "../actions/types";
import obj, { category } from '../../interfaces/products';

//Esta es la estructura del Store. Cambiar aca si le agregan mas cosas (y el state inicial tambien)
export interface StoreType {
    counter: number;
    productList: obj[];
    filter: category[];
    products: [];
}

//State iniciales del store
const initialState: StoreType = {
    counter: 0,
    products: [],
    filter: [],
    productList: []
};

interface actionI {
    type: number;
    payload: obj[];
    filter: category[];
    order: string;
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
                productList: action.payload
            }

        case ActionTypes.GET_CATEGORIES:
            return {
                ...state,
                filter: action.filter
            }
       case ActionTypes.SEARCH_PRODUCT:
           return {
            ...state,
            products: action.products
           } 

        case ActionTypes.ORDER_BY_CATEGORY:
            return {
                ...state,
                productList: state.productList.filter(c => c.category === action.order)
            }
        default:
            return state;
    }
}