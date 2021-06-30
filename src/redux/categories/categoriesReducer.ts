import { CATEGORIES_ACTIONS } from "./categoriesActions";
import { StoreType } from "../interfaces/reduxStore";
import { IAction } from "../interfaces/reduxActions";
import { initialState } from "../store/initialState";

export function categoriesReducer(
    state: StoreType = initialState,
    action: IAction
) {
    switch (action.type) {
        case CATEGORIES_ACTIONS.GET_CATEGORIES:
            return {
                ...state,
                filter: action.filter,
            };
        default:
            return state;
    }
}
