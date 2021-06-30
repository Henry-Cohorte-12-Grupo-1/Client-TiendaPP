import * as IReducer from "../../interfaces/reducer";

export interface IAction {
    type: string;
    payload: IReducer.IProducts[];
    cartItem: IReducer.IProducts[];
    filter: IReducer.ICategory[];
    order: string;
    products: {};
    acList: {};
    productDetails: IReducer.IProducts;
    status: string;
    setQuantity: { quantity: number; productId: string };
    totalAmount: number;
    itemsData: { userId: string; productId: string };
    addedCartProduct: IReducer.IProduct;
    wishlist: IReducer.IProducts[];
    productQuestions: IReducer.IQuestAndId[];
}
