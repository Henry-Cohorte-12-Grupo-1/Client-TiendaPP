import ProductsCards from "../ProductsCards/ProductsCards";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IProducts } from "../../interfaces/products";
import { bringWishlist } from "../../redux/wishlist/wishlistActions";
import { StoreType, CombinedStores } from "../../redux/interfaces/reduxStore";

export default function Wishlist() {
    const token: any = localStorage.token
        ? jwtDecode(localStorage.token)
        : false;
    const userId = token ? token.id : "guest";

    const producto = useSelector<CombinedStores, IProducts[]>(
        (state) => state.wishlistReducer.wishlist
    );

    const dispatch = useDispatch();

    //When loading it calls for the user's wishlist
    useEffect(() => {
        if (userId !== "guest") {
            dispatch(bringWishlist(userId));
        }
    }, []); //eslint-disable-line

    return (
        <div id="wishlist-container">
            {/* renderiza cards con los productos que están en la wishlist */}
            <div id="separation">
                <div
                    id="wl"
                    className="d-flex justify-content-center flex-wrap ml-0 mr-0"
                >
                    {producto &&
                        // <div className="row row-cols-1 row-cols-md-2">
                        producto
                            .filter((p) => p.quantity > 0)
                            .map((p) => {
                                return (
                                    <div className="d-flex justify-content-center flex-wrap ml-0 mr-0">
                                        <ProductsCards
                                            key={p.productId}
                                            name={p.name}
                                            price={p.price}
                                            productId={p.productId}
                                            image=""
                                            userId={userId}
                                            wished={producto.some(
                                                (p) => p.productId
                                            )}
                                            images={p.Images ? p.Images : []}
                                        />
                                    </div>
                                );
                            })}
                </div>
            </div>
        </div>
    );
}
