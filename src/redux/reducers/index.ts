import { ActionTypes } from "../actions/types";
import obj, { category } from '../../interfaces/products';
import detailedProduct from '../../interfaces/detailedProduct'


interface propsObj {
    id: number,
    image: string,
    name: string,
    description: string,
    price: number,
}

interface ProductsType {
  products: propsObj[],
  pages: string,
}

//Esta es la estructura del Store. Cambiar aca si le agregan mas cosas (y el state inicial tambien)
export interface StoreType {
    counter: number;
    productList: obj[];
    filter: category[];
    filterProducts: obj[];
    products: ProductsType;
    acList: ProductsType;
    productDetails: detailedProduct
}

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
        description: "",
        name: "",
        price: "",
        productId: "",
        userId: ""
    }
};

interface actionI {
    type: number;
    payload: obj[];
    filter: category[];
    order: string;
    products: {};
    acList: {};
    productDetails: obj;
}

export default function reducer(
    state: StoreType = initialState,
    action: actionI
) {
    switch (action.type) {
        case ActionTypes.ADD_ONE:
            state.counter++;
            return state;
        case ActionTypes.BRING_PRODUCTS:
            return {
                ...state,
                productList: action.payload,
                filterProducts: action.payload
            }

        case ActionTypes.GET_CATEGORIES:
            return {
                ...state,
                filter: action.filter
            }
        case ActionTypes.SEARCH_PRODUCT:
            return {
                ...state,
                products: action.products,
            }
        case ActionTypes.SEARCH_PRODUCT_AC:
            return {
                ...state,
                acList: action.acList,
            }

        case ActionTypes.ORDER_BY_CATEGORY:
            return {
                ...state,
                filterProducts: state.productList.filter(c => c.Category.name === action.order)
            }
        case ActionTypes.GET_DETAILS:
            return {
                ...state,
                productDetails: action.productDetails
            }
        default:
            return state;
    }
}