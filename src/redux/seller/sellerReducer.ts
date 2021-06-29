import { SELLER_ACTIONS } from "./sellerActions";
import { StoreType } from "../interfaces/reduxStore";
import { IAction } from "../interfaces/reduxActions";
import { initialState } from "../store/initialState";

export function sellerReducer(
    state: StoreType = initialState,
    action: IAction
) {
    switch (action.type) {
        case SELLER_ACTIONS.BRING_SELLER_PROFILE:
            return {
                ...state,
                sellerProfile: action.payload,
            };
        default:
            return state;
    }
}
