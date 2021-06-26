import { ActionTypes } from '../actions/types';
import obj, { category } from '../../interfaces/products';
import detailedProduct from '../../interfaces/detailedProduct';
import IUserProduct from '../../interfaces/userProducts';
import IUserOrders from '../../interfaces/userOrders';
import { IProduct } from '../../interfaces/product';
import { IQuestAndId } from '../../interfaces/questions';

// Interface de Store NO CAMBIAR DE LUGAR
export interface StoreType {
    wishlist: obj[];
    counter: number;
    productList: obj[];
    filter: category[];
    filterProducts: obj[];
    products: IProductsType;
    acList: IProductsType;
    productDetails: detailedProduct;
    userProducts: IUserProduct[];
    userOrders: IUserOrders[];
    filterOrders: IUserOrders[];
    cart: IProduct[];
    totalAmount: number;
    productQuestions: IQuestAndId;
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
    items: number;
    pag: number;
    tag: string;
    order: string;
}

//Esta es la estructura del Store. Cambiar aca si le agregan mas cosas (y el state inicial tambien)

//State iniciales del store
const initialState: StoreType = {
    counter: 0,
    products: {
        products: [],
        pages: '0',
        items: 10,
        pag: 0,
        tag: 'name',
        order: 'ASC',
    },
    acList: {
        products: [],
        items: 10,
        pag: 0,
        pages: '0',
        tag: '',
        order: '',
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
    userOrders: [],
    filterOrders: [],
    cart: [],
    totalAmount: 0,
    wishlist: [],
    productQuestions: {
        resp:[],
        id:''
    }
};

interface IAction {
    type: number;
    payload: obj[];
    filter: category[];
    order: string;
    products: {};
    acList: {};
    productDetails: obj;
    status: string;
    setQuantity: { quantity: number; productId: string };
    totalAmount: number;
    itemsData: { userId: string; productId: string };
    addedCartProduct: IProduct;
    wishlist: obj[];
    productQuestions: IQuestAndId[];
}

// interface IProducts {
//   products: {};
//   items: number;
//   pag: number;
//   order: ["ASC","DESC"];
//   tag: string;
// }

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
            console.log('products actions ', action.products);
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
                userProducts: action.payload
            };
        case ActionTypes.GET_USER_ORDERS:
            return {
                ...state,
                userOrders: action.payload,
                filterOrders: action.payload
            };
        case ActionTypes.FILTERED_ORDERS:
            return {
                ...state,
                filterOrders: (state.userOrders.length > 0 && typeof state.userOrders === "object") ? state.userOrders.filter((o) => o.status === action.status) : [],
            };
        case ActionTypes.BRING_WISHLIST:
            return {
                ...state,
                wishlist: action.payload
            }

        case ActionTypes.LOAD_CART:
            return {
                ...state,
                cart: action.payload,
                totalAmount: action.totalAmount,
            };
        case ActionTypes.SET_CART_ITEM_QUANTITY:
            const newCart = state.cart.map(function (cartItem) {
                if (cartItem.productId === action.setQuantity.productId) {
                    cartItem.quantity = action.setQuantity.quantity;
                }
                return cartItem;
            });
            localStorage.setItem('cart', JSON.stringify(newCart));
            return {
                ...state,
                cart: newCart,
            };

        case ActionTypes.DELETE_CART_ITEM:
            const filteredCart = state.cart.filter((product) => product.productId !== action.itemsData.productId);
            //REMOVE THE PRODUCT FROM THE LOCAL STORAGE
            if (action.itemsData.userId) {
                const filteredCart_json = JSON.stringify(filteredCart);
                localStorage.setItem('cart', filteredCart_json);
            }
            return {
                ...state,
                cart: filteredCart,
            };
        case ActionTypes.ADD_PRODUCT_TO_CART:
            //LOAD AL LOCAL STORAGE
            const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
            console.log('entered reducer');
            if (!localCart.some((cartItem: IProduct) => cartItem.productId === action.addedCartProduct.productId)) {
                console.log('new item');
                const localCart_json = JSON.stringify([...localCart, action.addedCartProduct]);
                localStorage.setItem('cart', localCart_json);
                return {
                    ...state,
                    cart: [...state.cart, action.addedCartProduct],
                };
            } else {
                return {
                    ...state,
                };
            }
        case ActionTypes.LOAD_GUEST_CART:
            return {
                ...state,
                cart: action.payload,
                totalAmount: action.totalAmount,
            };
        case ActionTypes.PRODUCT_QUESTIONS:
            return {
                ...state,
                productQuestions: action.payload,
            };
        default:
            return state;
    }
}
