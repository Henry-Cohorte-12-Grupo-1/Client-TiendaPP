import { ActionTypes } from "../actions/types";
import obj from '../../interfaces/products';

//Esta es la estructura del Store. Cambiar aca si le agregan mas cosas (y el state inicial tambien)
export interface StoreType {
    counter: number;
    products: obj[]
}

//State iniciales del store
const initialState: StoreType = {
    counter: 0,
    products: []
};

interface actionI {
    type: number;
    payload: obj[]
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
            // state.products
            return {
                ...state,  
                products: [...state.products]
            }
        default:
            return state;
    }
}