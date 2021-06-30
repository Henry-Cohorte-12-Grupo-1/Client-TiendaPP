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
        case CATEGORIES_ACTIONS.INCREASE_PAGE:
            return {
                ...state,
                actualPage: action.payload,
            };
        case CATEGORIES_ACTIONS.DECREASE_PAGE:
            return {
                ...state,
                actualPage: action.payload,
            };
        case CATEGORIES_ACTIONS.RESET_PAGE:
            return {
                ...state,
                actualPage: 1,
            };
        default:
            return state;
    }
}
