import * as IReducer from "../../interfaces/reducer";

export interface CombinedStores {
    cartReducer: StoreType;
    categoriesReducer: StoreType;
    orderReducer: StoreType;
    productsReducer: StoreType;
    sellerReducer: StoreType;
    wishlistReducer: StoreType;
}
// Interface de Store NO CAMBIAR DE LUGAR  filter: IReducer.ICategory
export interface StoreType {
    wishlist: IReducer.IProducts[];
    counter: number;
    productList: IReducer.IProducts[];
    filter: IReducer.ICategory[];
    filterProducts: IReducer.IProducts[];
    products: IReducer.IProductsType;
    acList: IReducer.IAcList;
    productDetails: IReducer.IDetailedProduct;
    userProducts: IReducer.IUserProduct[];
    userOrders: IReducer.IUserOrders[];
    filterOrders: IReducer.IUserOrders[];
    cart: IReducer.IProduct[];
    cartItem: IReducer.IProduct[];
    totalAmount: number;
    sellerProfile: IReducer.ISellerProfile;
    productQuestions: IReducer.IQuestAndId;
    buyNow: boolean;
    actualPage:number
}

//Esta es la estructura del Store. Cambiar aca si le agregan mas cosas (y el state inicial tambien)

export interface IAction {
    type: number;
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
