import ProductsCards from "../ProductsCards/ProductsCards";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IProducts } from "../../interfaces/products";
import { bringWishlist } from "../../redux/wishlist/wishlistActions";
import { CombinedStores } from "../../redux/interfaces/reduxStore";
import { Button } from "react-bootstrap";

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

    if (!producto.length) {
        return (

            <div className="container ml-auto mr-auto mt-4 bg-light border shadow p-5 rounded-lg m-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Your wishlist is empty :(</h1>
                    <p className="col-md-8 fs-4">
                        It seems like you haven't added items to your wishlist. What are you waiting for? keep track of your favorite items by hitting that lovely heart!
                    </p>
                    <Button href="/Home" >Go to Home</Button>
                </div>
            </div>
        );
    }

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
