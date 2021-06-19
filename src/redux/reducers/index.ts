import { ActionTypes } from "../actions/types";
import obj, { category } from "../../interfaces/products";
import detailedProduct from "../../interfaces/detailedProduct";
import IUserProduct from "../../interfaces/userProducts";
import IUserOrders from "../../interfaces/userOrders";

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
  userOrders: IUserOrders[];
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
    pages: "0",
    items: 10,
    pag: 0,
    tag: "name",
    order: "ASC",
  },
  acList: {
    products: [],
    items: 10,
    pag: 0,
    pages: "0",
    tag: "",
    order: "",
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
    price: 0,
    productId: "",
    userId: "",
  },
  userProducts: [],
  userOrders: [],
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
}

// interface IProducts {
//   products: {};
//   items: number;
//   pag: number;
//   order: ["ASC","DESC"];
//   tag: string;
// }

export default function reducer(
  state: StoreType = initialState,
  action: IAction
) {
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
      console.log("products actions ", action.products);
      return {
        ...state,
        products: action.products,
        // items: action.items,
        // pag: action.pag,
        // order: action.order,
        // tag: action.tag,
      };
    case ActionTypes.SEARCH_PRODUCT_AC:
      return {
        ...state,
        acList: action.acList,
      };

    case ActionTypes.ORDER_BY_CATEGORY:
      return {
        ...state,
        filterProducts: state.productList.filter(
          (c) => c.Category?.name === action.order
        ),
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
    case ActionTypes.GET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
      };
    case ActionTypes.FILTERED_ORDERS:
      return {
        ...state,
        userOrders: state.userOrders.filter(o => o.status === action.status), 
      };
    default:
      return state;
  }
}