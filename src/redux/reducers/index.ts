import { ActionTypes } from "../actions/types";
import obj from '../../interfaces/products';


interface propsObj {
    id: number,
    image: string,
    name: string,
    description: string,
    price: number,
}

//Esta es la estructura del Store. Cambiar aca si le agregan mas cosas (y el state inicial tambien)
export interface StoreType {
    counter: number;
    productList: obj[]
    products: propsObj[];
    productDetails: obj
}

//State iniciales del store
const initialState: StoreType = {
    counter: 0,
    products: [],
    productList: [],
    productDetails: {
        id: 0,
        name: "",
        image: "",
        description: "",
        price: 0
    }
};

interface actionI {
    type: number;
    payload: obj[]
    products: [];
    productDetails: obj;
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
        case ActionTypes.SEARCH_PRODUCT:
            return {
                ...state,
                products: action.products
            }
        case ActionTypes.GET_DETAILS:
            return {
                ...state,
                productDetails: action.productDetails
            }
        default:
            return state;
    }
}