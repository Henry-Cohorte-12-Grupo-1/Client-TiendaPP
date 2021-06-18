import { ActionTypes } from './types';
import obj from '../../interfaces/products';
import axios from 'axios';
import { Dispatch } from 'redux';
import { url } from '../../api';

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

export interface ProductInfo {
    type: ActionTypes.GET_DETAILS;
    payload: obj;
}

//Busca los detalles de un producto, por ahora hardcodeado del back
export const productInfo = (id: string) => {
    return async (dispatch: Dispatch) => {
        const productDetails = await axios.get<object>(`${url}/productDetails/${id}`);
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

export const getCategories = () => {
    const URL = `${url}/categories`;
    return async function (dispatch: any) {
        try {
            const productCategory = await axios.get(URL);
            dispatch({
                type: ActionTypes.GET_CATEGORIES,
                filter: productCategory.data,
            });
        } catch (error) {
            return console.log('No se encontraron categorias');
        }
    };
};

export const orderByCategories = (payload: string) => {
    return {
        type: ActionTypes.ORDER_BY_CATEGORY,
        order: payload,
    };
};

export const searchProduct = (name: string) => {
    const URL = `${url}/search`;
    const params = {
        name,
    };
    return async function (dispatch: any) {
        try {
            const productData = await axios.get(URL, { params });
            dispatch({
                type: ActionTypes.SEARCH_PRODUCT,
                products: productData.data,
            });
        } catch (error) {
            return console.log('No se pudo realizar la busqueda');
        }
    };
};

export const searchProductAC = (name: string) => {
    const URL = `${url}/search`;
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
            return console.log('No se pudo realizar la busqueda');
        }
    };
};

export const setCartItemQuantity = (
    userId: string | undefined,
    quantity: number,
    productId: string | null | undefined,
) => {
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
};

export const loadCartFromDB = (userId: string) => {
    const URL_GET_CART = url + '/cart/getCart';
    let totalAmount = 0;
    let normalizedArray: any = [];
    return async (dispatch: Dispatch) => {
        await axios
            .post(URL_GET_CART, { userId })
            .then((res) => {
                //meter un map
                normalizedArray = res.data.map((dataObj: any) => {
                    const Product = dataObj.Product;
                    console.log('imagenes:', Product.Images);
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
                    };
                });
            })
            .then(() => {
                (totalAmount = normalizedArray
                    .map((x: any) => x.price * x.quantity)
                    .reduce((a: any, b: any) => a + b, 0)),
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

export const deleteItemFromCart = (userId: string | undefined, productId: string | null | undefined) => {
    return async (dispatch: Dispatch) => {
        await axios.post(url + '/cart/deleteCartItem', { userId, productId }).then(() => {
            dispatch({
                type: ActionTypes.DELETE_CART_ITEMS,
                itemsData: { userId, productId },
            });
        });
    };
};
