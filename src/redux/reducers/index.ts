import { ActionTypes } from "../actions/types";

interface propsObj {
    image: string,
    name: string,
    description: string,
    price: string,
}

//Esta es la estructura del Store. Cambiar aca si le agregan mas cosas (y el state inicial tambien)
export interface StoreType {
    counter: number;
    products: propsObj[];
}

//State iniciales del store
const initialState: StoreType = {
    counter: 0,
    products: []
};

interface actionI {
    type: number;
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
        default:
            return state;
       case ActionTypes.SEARCH_PRODUCT:
           return {
            ...state,
            products: action.products
           } 
    }
}
