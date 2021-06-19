import { ActionTypes } from "./types";
import obj from "../../interfaces/products";
import axios from "axios";
import { Dispatch } from "redux";
import { url } from "../../api";

export const masUno = () => {
  return {
    type: ActionTypes.ADD_ONE,
    payload: null,
  };
};

export interface AxiosProducts {
  type: ActionTypes.BRING_PRODUCTS;
  payload: obj[];
}

export interface BringUserProducts {
  type: ActionTypes.GET_USER_PRODUCTS;
  payload: obj[];
}
export interface BringUserOrders {
  type: ActionTypes.GET_USER_ORDERS;
  payload: obj[];
}


export interface ProductInfo {
  type: ActionTypes.GET_DETAILS;
  payload: obj;
}

//Busca los detalles de un producto, por ahora hardcodeado del back
export const productInfo = (id: string) => {
  return async (dispatch: Dispatch) => {
    const productDetails = await axios.get<object>(
      `${url}/productDetails/${id}`
    );
    dispatch({
      type: ActionTypes.GET_DETAILS,
      productDetails: productDetails.data,
    });
  };
};

export const bringProducts = () => {
  return async (dispatch: Dispatch) => {
    const productos = await axios.get<obj[]>(`${url}/product/getallproducts`);
    dispatch<AxiosProducts>({
      type: ActionTypes.BRING_PRODUCTS,
      payload: productos.data,
    });
  };
};

export const bringUserProducts = (userName: string | null) => {
  return async (dispatch: Dispatch) => {
    const userProducts = await axios.get(`${url}/username/${userName}`);
    dispatch<BringUserProducts>({
      type: ActionTypes.GET_USER_PRODUCTS,
      payload: userProducts.data,
    });
  };
};
export const bringUserOrders = (userName: string | null) => {
  return async (dispatch: Dispatch) => {
    const userProducts = await axios.get(`${url}/orders/${userName}`);
    dispatch<BringUserOrders>({
      type: ActionTypes.GET_USER_ORDERS,
      payload: userProducts.data,
    });
  };
};

export const bringUserSales = (userName: string | null) => {
  return async (dispatch: Dispatch) => {
    const userProducts = await axios.get(`${url}/orders/sales/${userName}`);
    dispatch<BringUserOrders>({
      type: ActionTypes.GET_USER_ORDERS,
      payload: userProducts.data,
    });
  };
};

export const getCategories = () => {
  const URL: string = `${url}/categories`;
  return async function (dispatch: any) {
    try {
      const productCategory = await axios.get(URL);
      dispatch({
        type: ActionTypes.GET_CATEGORIES,
        filter: productCategory.data,
      });
    } catch (error) {
      return console.log("No se encontraron categorias");
    }
  };
};

export const orderByCategories = (payload: string) => {
  return {
    type: ActionTypes.ORDER_BY_CATEGORY,
    order: payload,
  };
};

export const filteredOrders = (status: string) => {
  return {
    type: ActionTypes.FILTERED_ORDERS,
    status,
  };
};

export const searchProduct = (
  name: string,
  items: number = 3,
  pag: number = 0,
  tag: string = "name",
  order: string = "ASC"
) => {
  const URL: string = `${url}/search`;
  const params = {
    name,
    items,
    pag,
    tag,
    order,
  };

  return async function (dispatch: any) {
    console.log("🚀 ~ file: index.ts ~ line 110 ~ params", params)
    try {
      const productData = await axios.get(URL, { params });
      const productAlgo = {
        products: productData.data.products,
        pages: productData.data.pages,
        items: items,
        pag: pag,
        tag: tag,
        order: order,
      }
      dispatch({
        type: ActionTypes.SEARCH_PRODUCT,
        products: productAlgo,
      });
      console.log("🚀 ~ file: index.ts ~ line 130 ~ productData.data", productAlgo)
    } catch (error) {
      return console.log("No se pudo realizar la busqueda");
    }
  };
};

export const searchProductAC = (name: string) => {
  const URL: string = `${url}/search`;
  const params = {
    name,
  };
  return async function (dispatch: any) {
    try {
      const productData = await axios.get(URL, { params });
      dispatch({
        type: ActionTypes.SEARCH_PRODUCT_AC,
        acList: productData.data,
      });
    } catch (error) {
      return console.log("No se pudo realizar la busqueda");
    }
  };
};
