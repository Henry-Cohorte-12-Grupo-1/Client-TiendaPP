import jwtDecode from "jwt-decode"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import obj from "../../interfaces/products";
import { bringWishlist } from "../../redux/actions";
import { StoreType } from "../../redux/reducers";
import ProductsCards from "../ProductsCards/ProductsCards";

export default function Wishlist() {

    const token: any = localStorage ? jwtDecode(localStorage.token) : false;
    let userId: string = token.id;

    const producto = useSelector<StoreType, obj[]>(
        (state) => state.wishlist
    );

    const dispatch = useDispatch()

    //When loading it calls for the user's wishlist
    useEffect(() => {
        dispatch(bringWishlist(userId));
    }, []); //eslint-disable-line


    return (
        <div>
            {/* renderiza cards con los productos que están en la wishlist */}
            {producto &&
                // <div className="row row-cols-1 row-cols-md-2">
                producto.filter(p => p.quantity > 0).map((p) => {
                    return (
                        <ProductsCards
                            key={p.productId}
                            name={p.name}
                            price={p.price}
                            productId={p.productId}
                            image=""
                            userId={userId}
                            wished={producto.some(p => p.productId)}
                            images={p.Images ? p.Images : []}
                        />
                    );
                })}
            <h1>WISHLIST RATATATATA</h1>
        </div>
    )
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
