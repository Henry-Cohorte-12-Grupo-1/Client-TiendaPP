import { WISHLIST_ACTIONS } from "./wishlistActions";
import { StoreType } from "../interfaces/reduxStore";
import { IAction } from "../interfaces/reduxActions";
import { initialState } from "../store/initialState";

export function wishlistReducer(
    state: StoreType = initialState,
    action: IAction
) {
    switch (action.type) {
        case WISHLIST_ACTIONS.BRING_WISHLIST:
            return {
                ...state,
                wishlist: action.payload,
            };
        default:
            return state;
    }
}
