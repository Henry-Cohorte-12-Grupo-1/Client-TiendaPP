import { StoreType } from "../interfaces/reduxStore";

//State iniciales del store
export const initialState: StoreType = {
    counter: 0,
    products: {
        products: [],
        pages: "0",
        items: 10,
        pag: 0,
        tag: "name",
        order: "ASC",
        seller: "",
    },
    acList: {
        products: [],
        pages: "0",
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
        User: {username: ""}
    },
    userProducts: [],
    userOrders: [],
    filterOrders: [],
    cart: [],
    cartItem: [],
    totalAmount: 0,
    wishlist: [],
    sellerProfile: {
        userId: "",
        header: "",
        description: "",
        images: [],
    },
    productQuestions: {
        resp: [],
        id: "",
    },
    buyNow: false,
};
