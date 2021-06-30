import { PRODUCTS_ACTIONS } from "./productsActions";
import { StoreType } from "../interfaces/reduxStore";
import { IAction } from "../interfaces/reduxActions";
import { initialState } from "../store/initialState";

export function productsReducer(
    state: StoreType = initialState,
    action: IAction
) {
    switch (action.type) {
        case PRODUCTS_ACTIONS.BRING_PRODUCTS:
            return {
                ...state,
                productList: action.payload,
                filterProducts: action.payload,
            };

        case PRODUCTS_ACTIONS.SEARCH_PRODUCT:
            console.log("products actions ", action.products);
            return {
                ...state,
                products: action.products,
            };

        case PRODUCTS_ACTIONS.SEARCH_PRODUCT_AC:
            return {
                ...state,
                acList: action.acList,
            };
        case PRODUCTS_ACTIONS.GET_USER_PRODUCTS:
            return {
                ...state,
                userProducts: action.payload,
            };
        case PRODUCTS_ACTIONS.GET_DETAILS:
            return {
                ...state,
                productDetails: action.productDetails,
            };
        case PRODUCTS_ACTIONS.PRODUCT_QUESTIONS:
            return {
                ...state,
                productQuestions: action.payload,
            };
        case PRODUCTS_ACTIONS.ORDER_BY_CATEGORY:
            return {
                ...state,
                filterProducts: state.productList.filter(
                    (c) => c.Category?.name === action.order
                ),
            };
        case PRODUCTS_ACTIONS.RESET_CATEGORIES_FILTER:
            return {
                ...state,
                filterProducts: state.productList,
            };
        default:
            return state;
    }
}
