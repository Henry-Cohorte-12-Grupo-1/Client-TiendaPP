import { ActionTypes } from '../actions/types';
import obj, { category } from '../../interfaces/products';
import detailedProduct from '../../interfaces/detailedProduct';
import IUserProduct from '../../interfaces/userProducts';
import { IProduct } from '../../interfaces/product';
import { setCartItemQuantity } from '../actions';

// Interface de Store NO CAMBIAR DE LUGAR
export interface StoreType {
    counter: number;
    productList: obj[];
    filter: category[];
    filterProducts: obj[];
    products: IProductsType;
    acList: IProductsType;
    productDetails: detailedProduct;
    userProducts: IUserProduct[];
    cart: IProduct[];
    totalAmount: number;
}

export interface IPropsObj {
    id: number;
    Images: [];
    name: string;
    description: string;
    price: number;
    productId: string;
}

export interface IProductsType {
    products: IPropsObj[];
    pages: string;
}

//Esta es la estructura del Store. Cambiar aca si le agregan mas cosas (y el state inicial tambien)

//State iniciales del store
const initialState: StoreType = {
    counter: 0,
    products: {
        products: [],
        pages: '0',
    },
    acList: {
        products: [],
        pages: '0',
    },
    filter: [],
    filterProducts: [],
    productList: [],
    productDetails: {
        Images: [],
        Reviews: [],
        quantity: 0,
        categoryId: 0,
        description: '',
        name: '',
        price: 0,
        productId: '',
        userId: '',
    },
    userProducts: [],
    cart: [],
    totalAmount: 0,
};

interface IAction {
    type: number;
    payload: obj[];
    filter: category[];
    order: string;
    products: {};
    acList: {};
    productDetails: obj;
    setQuantity: { quantity: number; productId: string };
    totalAmount: number;

    itemsData: { userId: string; productId: string };

    addedCartProduct: IProduct;

}

export default function reducer(state: StoreType = initialState, action: IAction) {
    switch (action.type) {
        case ActionTypes.ADD_ONE:
            state.counter++;
            return state;
        case ActionTypes.BRING_PRODUCTS:
            return {
                ...state,
                productList: action.payload,
                filterProducts: action.payload,
            };

        case ActionTypes.GET_CATEGORIES:
            return {
                ...state,
                filter: action.filter,
            };
        case ActionTypes.SEARCH_PRODUCT:
            return {
                ...state,
                products: action.products,
            };
        case ActionTypes.SEARCH_PRODUCT_AC:
            return {
                ...state,
                acList: action.acList,
            };

        case ActionTypes.ORDER_BY_CATEGORY:
            return {
                ...state,
                filterProducts: state.productList.filter((c) => c.Category?.name === action.order),
            };
        case ActionTypes.GET_DETAILS:
            return {
                ...state,
                productDetails: action.productDetails,
            };
        case ActionTypes.GET_USER_PRODUCTS:
            return {
                ...state,
                userProducts: action.payload,
            };
        case ActionTypes.LOAD_CART:
            return {
                ...state,
                cart: action.payload,
                totalAmount: action.totalAmount,
            };
        case ActionTypes.SET_CART_ITEM_QUANTITY:
            for (const each of state.cart) {
                if (each.productId == action.setQuantity.productId) {
                    each.quantity = action.setQuantity.quantity;
                    console.log(each.quantity);
                }
            }
            return {
                ...state,
            };

        case ActionTypes.DELETE_CART_ITEMS:
            //state.cart = state.cart.filter((product) => product.productId != action.itemsData.productId);
            return {
                ...state,
            }
        case ActionTypes.ADD_PRODUCT_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.addedCartProduct],

            };
        default:
            return state;
    }
}
