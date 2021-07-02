import { Dispatch } from "redux";
import axios from "axios";
import { url } from "../../api";
import { IProducts } from "../../interfaces/products";

export const PRODUCTS_ACTIONS = {
  BRING_PRODUCTS: "BRING_PRODUCTS",
  SEARCH_PRODUCT: "SEARCH_PRODUCT",
  GET_DETAILS: "GET_DETAILS",
  GET_USER_PRODUCTS: "GET_USER_PRODUCTS",
  SEARCH_PRODUCT_AC: "SEARCH_PRODUCT_AC",
  PRODUCT_QUESTIONS: "PRODUCT_QUESTIONS",
  ORDER_BY_CATEGORY: "ORDER_BY_CATEGORY",
  RESET_CATEGORIES_FILTER: "RESET_CATEGORIES_FILTER",
};

export interface AxiosProducts {
  type: string;
  payload: IProducts[];
}

export interface BringUserProducts {
  type: string;
  payload: IProducts[];
}

export const productInfo = (id: string) => {
  return async (dispatch: Dispatch) => {
    const productDetails = await axios.get<any>(`${url}/productDetails/${id}`);
    dispatch({
      type: PRODUCTS_ACTIONS.GET_DETAILS,
      productDetails: productDetails.data,
    });
  };
};

export const bringProducts = () => {
  return async (dispatch: Dispatch) => {
    const productos = await axios.get<IProducts[]>(
      `${url}/product/getallproducts`
    );
    dispatch<AxiosProducts>({
      type: PRODUCTS_ACTIONS.BRING_PRODUCTS,
      payload: productos.data,
    });
  };
};

export const bringUserProducts = (userName: string | null) => {
    return async (dispatch: Dispatch) => {
        const userProducts = await axios.get(`${url}/username/${userName}`, { headers: { Authorization: `Bearer ${localStorage.token}` } });
        dispatch<BringUserProducts>({
            type: PRODUCTS_ACTIONS.GET_USER_PRODUCTS,
            payload: userProducts.data,
        });
    };
};

export const searchProduct = (
  name: string,
  items = 5,
  pag = 0,
  tag = "name",
  order = "ASC",
  username = ""
) => {
  const URL = `${url}/search`;
  const params = {
    name,
    items,
    pag,
    tag,
    order,
    username,
  };

  return async function (dispatch: Dispatch) {
    try {
      const productData = await axios.get(URL, { params });
      const productAlgo = {
        products: productData.data.products,
        pages: productData.data.pages,
        items: items,
        pag: pag,
        tag: tag,
        order: order,
        seller: username,
      };
      dispatch({
        type: PRODUCTS_ACTIONS.SEARCH_PRODUCT,
        products: productAlgo,
      });
    } catch (error) {
      return console.log("No se pudo realizar la búsqueda");
    }
  };
};

export const searchProductAC = (name: string, username = "") => {
  const URL = `${url}/search`;
  const params = {
    name,
    username,
  };
  return async function (dispatch: Dispatch) {
    try {
      const productData = await axios.get(URL, { params });
      console.log("productdata", productData.data);
      dispatch({
        type: PRODUCTS_ACTIONS.SEARCH_PRODUCT_AC,
        acList: productData.data,
      });
        console.log("🚀 ~ file: productsActions.ts ~ line 116 ~ productData.data", productData.data)
    } catch (error) {
      return console.log("No se pudo realizar la busqueda");
    }
  };
};

export const productQuestions = (id: string) => {
  return async (dispatch: Dispatch) => {
    const productQuestions: any = await axios.post(`${url}/questions`, {
      id: id,
    });
    dispatch({
      type: PRODUCTS_ACTIONS.PRODUCT_QUESTIONS,
      payload: productQuestions.data,
    });
    console.log(
      "🚀 ~ file: index.ts ~ line 378 ~ return ~ data",
      productQuestions.data
    );
  };
};
