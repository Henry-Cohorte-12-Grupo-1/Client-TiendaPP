import { ORDER_ACTIONS } from "./orderActions";
import { StoreType } from "../interfaces/reduxStore";
import { IAction } from "../interfaces/reduxActions";
import { initialState } from "../store/initialState";

export function orderReducer(state: StoreType = initialState, action: IAction) {
    switch (action.type) {
        case ORDER_ACTIONS.GET_USER_ORDERS:
            return {
                ...state,
                userOrders: action.payload,
                filterOrders: action.payload,
            };
        case ORDER_ACTIONS.FILTERED_ORDERS:
            return {
                ...state,
                filterOrders:
                    state.userOrders.length > 0 &&
                    typeof state.userOrders === "object"
                        ? state.userOrders.filter(
                              (o) => o.status === action.status
                          )
                        : [],
            };
        default:
            return state;
    }
}
