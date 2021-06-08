import { ActionTypes } from "../actions/types";

//Esta es la estructura del Store. Cambiar aca si le agregan mas cosas (y el state inicial tambien)
export interface StoreType {
    counter: number;
}

//State iniciales del store
const initialState: StoreType = {
    counter: 0,
};

interface actionI {
    type: number;
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
    }
}
