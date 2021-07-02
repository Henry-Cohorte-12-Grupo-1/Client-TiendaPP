import { combineReducers } from "redux";

////////////////////////////////////
//EL NUEVO ORDEN MUNDIAL DEL REDUX
//LAS COSAS NUEVAS BRODER!!

import { cartReducer } from "./cart/cartReducer";
import { categoriesReducer } from "./categories/categoriesReducer";
import { orderReducer } from "./order/orderReducer";
import { productsReducer } from "./products/productsReducer";
import { sellerReducer } from "./seller/sellerReducer";
import { wishlistReducer } from "./wishlist/wishlistReducer";
import { profilePicReducer } from "./profile/profilePicReducer"

const rootReducer = combineReducers({
    cartReducer,
    categoriesReducer,
    orderReducer,
    productsReducer,
    sellerReducer,
    wishlistReducer,
    profilePicReducer
});

///////////////////////////////////////
//////////////////////////////////////

export default rootReducer;
