import { Dispatch } from "redux";
import axios from "axios";
import { url } from "../../api";
import { IProduct } from "../../interfaces/product";

export const CART_ACTIONS = {
    SET_CART_ITEM_QUANTITY: "SET_CART_ITEM_QUANTITY",
    LOAD_CART: "LOAD_CART",
    DELETE_CART_ITEM: "DELETE_CART_ITEM",
    ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
    LOAD_GUEST_CART: "LOAD_GUEST_CART",
    BUY_NOW: "BUY_NOW",
    LOAD_CART_BUY_NOW: "LOAD_CART_BUY_NOW",
    CART_ITEMS: "CART_ITEMS"
};

/*


*/
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
                    type: CART_ACTIONS.SET_CART_ITEM_QUANTITY,
                    setQuantity: { quantity, productId },
                });
            } catch (error) {
                return console.log(error);
            }
        };
    } else {
        return {
            type: CART_ACTIONS.SET_CART_ITEM_QUANTITY,
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
                    type: CART_ACTIONS.LOAD_CART,
                    payload: normalizedArray,
                    totalAmount,
                });
            })

            .catch((e) => {
                console.error(e);
            });
    };
};

export const cartItems = () => {
    const URL_GET_CART = url + "/cart/getCart";
    return async function (dispatch: Dispatch) {
        try {
            const cartNumberItems = await axios.get(URL_GET_CART);
            dispatch({
                type: CART_ACTIONS.CART_ITEMS,
                cartItem: cartNumberItems.data, 
            });
        } catch (error) {
            return console.log("No se encontraron productos");
        }
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
                        type: CART_ACTIONS.DELETE_CART_ITEM,
                        itemsData: { userId, productId },
                    });
                });
        };
    } else {
        return {
            type: CART_ACTIONS.DELETE_CART_ITEM,
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
                        images: newCartProduct.Images.map(
                            (x: any) => x.imageId
                        ),
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
                        type: CART_ACTIONS.ADD_PRODUCT_TO_CART,
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
                        type: CART_ACTIONS.ADD_PRODUCT_TO_CART,
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
        type: CART_ACTIONS.LOAD_GUEST_CART,
        payload: cart,
        totalAmount,
    };
};

export const buyNow = () => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: CART_ACTIONS.BUY_NOW,
            payload: null,
        });
    };
};

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
                    type: CART_ACTIONS.LOAD_GUEST_CART,
                    payload: [addedCartProduct],
                    totalAmount: addedCartProduct.price,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };
};
