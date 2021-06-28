import { ActionTypes } from "./types";
import obj from "../../interfaces/products";
import axios from "axios";
import { Dispatch } from "redux";
import { url } from "../../api";
import { IProduct } from "../../interfaces/product";
import { IQuestAndId, IQuestions } from "../../interfaces/questions";

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
    const productDetails = await axios.get<any>(`${url}/productDetails/${id}`);
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
export const bringWishlist = (userId: string) => {
  return async (dispatch: Dispatch) => {
    const productos = await axios.get<any[]>(`${url}/wishlist/${userId}`);
    dispatch({
      type: ActionTypes.BRING_WISHLIST,
      payload: productos.data.map((p) => p.Product),
    });
  };
};

export const bringSellerProfile = (userName: string) => {
  return async (dispatch: Dispatch) => {
    const sellerProfile = await axios.get<any[]>(`${url}/seller/${userName}`);
    dispatch({
      type: ActionTypes.BRING_SELLER_PROFILE,
      payload: sellerProfile.data,
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
  const URL = `${url}/categories`;
  return async function (dispatch: Dispatch) {
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
  items = 5,
  pag = 0,
  tag = "name",
  order = "ASC"
) => {
  const URL = `${url}/search`;
  const params = {
    name,
    items,
    pag,
    tag,
    order,
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
      };
      dispatch({
        type: ActionTypes.SEARCH_PRODUCT,
        products: productAlgo,
      });
    } catch (error) {
      return console.log("No se pudo realizar la busqueda");
    }
  };
};

export const searchProductAC = (name: string) => {
  const URL = `${url}/search`;
  const params = {
    name,
  };
  return async function (dispatch: Dispatch) {
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

export const setCartItemQuantity = (
  userId: string | undefined,
  quantity: number,
  productId: string | null | undefined
) => {
  //un if para ver si es guest.
  if (userId !== "guest") {
    return async (dispatch: Dispatch) => {
      try {
        await axios.post(`${url}/cart/setCartItemQuantity`, {
          userId,
          quantity,
          productId,
        });
        dispatch({
          type: ActionTypes.SET_CART_ITEM_QUANTITY,
          setQuantity: { quantity, productId },
        });
      } catch (error) {
        return console.log(error);
      }
    };
  } else {
    return {
      type: ActionTypes.SET_CART_ITEM_QUANTITY,
      setQuantity: { quantity, productId },
    };
  }
};

export const loadCartFromDB = (userId: string) => {
  const URL_GET_CART = url + "/cart/getCart";
  let totalAmount = 0;
  let normalizedArray: [] = [];
  return async (dispatch: Dispatch) => {
    await axios
      .post(URL_GET_CART, { userId })
      .then((res) => {
        //meter un map
        normalizedArray = res.data.map((dataObj: any) => {
          const Product = dataObj.Product;
          console.log("imagenes:", Product.Images);
          return {
            name: Product.name,
            description: Product.description,
            price: Product.price,
            images: Product.Images.map((x: any) => x.imageId),
            categoryId: Product.categoryId,
            quantity: dataObj.quantity,
            //category: string,
            //joinedImage: string,
            //initialImages: string,
            productId: Product.productId,
            stock: Product.quantity,
          };
        });
      })
      .then(() => {
        totalAmount = normalizedArray
          .map((x: any) => x.price * x.quantity)
          .reduce((a: any, b: any) => a + b, 0);
        dispatch({
          type: ActionTypes.LOAD_CART,
          payload: normalizedArray,
          totalAmount,
        });
      })

      .catch((e) => {
        console.error(e);
      });
  };
};

export const deleteItemFromCart = (
  userId: string | undefined,
  productId: string | null | undefined
) => {
  if (userId !== "guest") {
    return async (dispatch: Dispatch) => {
      await axios
        .post(url + "/cart/deleteCartItem", { userId, productId })
        .then(() => {
          dispatch({
            type: ActionTypes.DELETE_CART_ITEM,
            itemsData: { userId, productId },
          });
        });
    };
  } else {
    return {
      type: ActionTypes.DELETE_CART_ITEM,
      itemsData: { userId, productId },
    };
  }
};

export const addProductToCart = (userId: string, productId: string) => {
  const URL_ADD_TO_CART = url + "/cart/addCartItem";
  const URL_GET_PRODUCT = url + "/productDetails/";
  let addedCartProduct: IProduct;

  if (userId !== "guest") {
    return async (dispatch: Dispatch) => {
      //adding product to user's cart in DB
      await axios
        .post(URL_ADD_TO_CART, { userId, productId })
        .then((res) => {
          //meter un map
          const newCartProduct = res.data.Product;
          addedCartProduct = {
            name: newCartProduct.name,
            description: newCartProduct.description,
            price: newCartProduct.price,
            images: newCartProduct.Images.map((x: any) => x.imageId),
            categoryId: newCartProduct.categoryId,
            quantity: res.data.quantity,
            //category: string,
            //joinedImage: string,
            //initialImages: string,
            productId: newCartProduct.productId,
            stock: newCartProduct.quantity,
          };
        })
        .then(() => {
          dispatch({
            type: ActionTypes.ADD_PRODUCT_TO_CART,
            addedCartProduct: addedCartProduct,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    };
  } else {
    console.log("ACTION!!");
    return async (dispatch: Dispatch) => {
      //adding product to user's cart in DB
      await axios
        .get(URL_GET_PRODUCT + `${productId}`)
        .then((res) => {
          //meter un map
          console.log(res.data);
          const Product = res.data;
          addedCartProduct = {
            name: Product.name,
            description: Product.description,
            price: Product.price,
            images: Product.Images.map((x: any) => x.imageId),
            categoryId: Product.categoryId,
            quantity: 1,
            //category: string,
            //joinedImage: string,
            //initialImages: string,
            productId: Product.productId,
            stock: Product.quantity,
          };
        })
        .then(() => {
          dispatch({
            type: ActionTypes.ADD_PRODUCT_TO_CART,
            addedCartProduct: addedCartProduct,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    };
  }
};

export const loadGuestCart = (cart: IProduct[]) => {
  const totalAmount = cart
    .map((x) => x.price * x.quantity)
    .reduce((a, b) => a + b, 0);
  return {
    type: ActionTypes.LOAD_GUEST_CART,
    payload: cart,
    totalAmount,
  };
};

export const productQuestions = (id: string) => {
  return async (dispatch: Dispatch) => {
    const productQuestions: any = await axios.post(`${url}/questions`, {
      id: id,
    });
    dispatch({
      type: ActionTypes.PRODUCT_QUESTIONS,
      payload: productQuestions.data,
    });
    console.log("🚀 ~ file: index.ts ~ line 378 ~ return ~ data", productQuestions.data)
  };
};

export const buyNow = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.BUY_NOW,
      payload: null
    });
  };
}

export const loadCartBuyNow = (productId: string) => {
  const URL_GET_PRODUCT = url + "/productDetails/";
  let addedCartProduct: IProduct;
  return async (dispatch: Dispatch) => {
    //adding product to user's cart in DB
    await axios
      .get(URL_GET_PRODUCT + `${productId}`)
      .then((res) => {
        //meter un map
        console.log(res.data);
        const Product = res.data;
        addedCartProduct = {
          name: Product.name,
          description: Product.description,
          price: Product.price,
          images: Product.Images.map((x: any) => x.imageId),
          categoryId: Product.categoryId,
          quantity: 1,
          //category: string,
          //joinedImage: string,
          //initialImages: string,
          productId: Product.productId,
          stock: Product.quantity,
        };
      })
      .then(() => {
        dispatch({
          type: ActionTypes.LOAD_GUEST_CART,
          payload: [addedCartProduct],
          totalAmount: addedCartProduct.price
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
}

