import "./style.scss";
import IUserProduct from "../../interfaces/userProducts";
import ProductsCards from "../ProductsCards/ProductsCards";
import jwtDecode from "jwt-decode";
import { ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Carousel } from "react-bootstrap";
import { CombinedStores } from "../../redux/interfaces/reduxStore";
import { IProducts } from "../../interfaces/products";
import { bringUserProducts } from "../../redux/products/productsActions";
import { bringWishlist } from "../../redux/wishlist/wishlistActions";
import axios from "axios";
import { url } from "../../api";

function SellerProfileForm(props: any): ReactElement {
    const userName = props.match.params.userName;
    const token: any = localStorage.token
        ? jwtDecode(localStorage.token)
        : false;
    const userId = token?.id ? token.id : "guest";

    const dispatch = useDispatch();

    // const seller = useSelector<CombinedStores, SellerProfile>(
    //     (state) => state.sellerReducer.sellerProfile
    // );

    const userProducts = useSelector<CombinedStores, IUserProduct[]>(
        (state) => state.productsReducer.userProducts
    );
    const wishlist = useSelector<CombinedStores, IProducts[]>(
        (state) => state.wishlistReducer.wishlist
    );
    const [index, setIndex] = useState(0);
    const [seller, setSeller] = useState<any>({})

    //let seller: any;
    //async (() => {
    //    seller = await axios.get<any>(`${url}/seller/${userName}`)
    // })();

    useEffect(() => {
        (async () => {
            let resp = await axios.get<any>(`${url}/seller/${userName}`);
            setSeller(resp.data)
        })()
        //dispatch(bringSellerProfile(userName));
        dispatch(bringUserProducts(userName));
        if (userId !== "guest") {
            dispatch(bringWishlist(userId));
        }
    }, []); //eslint-disable-line
    console.log("seller --->", seller)
    if (seller.error) {
        return (
            <div className="container ml-auto mr-auto mt-4 bg-light border shadow p-5 rounded-lg m-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">This seller hasn't made a page yet:(</h1>
                    <p className="col-md-8 fs-4">
                        This seller has not yet made his own page. In the meantime, we suggest you keep looking for products you might like on the main page
                    </p>
                    <Button href="/Home" >Go to Home</Button>
                </div>
            </div>
        );
    }

    let header = seller.header;
    let description = seller.description;

    const handleSelect = (selectedIndex: any) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="sellerCont">
            {seller.images?.length ? (
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    id="ContainerD"
                >
                    {/*CAROUSEL ITEM*/}
                    {seller.images.map((i: string) => {
                        return (
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    id="cContainer"
                                    src={`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${i}`}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            ) : null}
            <div>
                <h2>{header}</h2>
            </div>

            <div>
                <h5>{description}</h5>
            </div>
            <div className="d-flex justify-content-center flex-wrap ml-0 mr-0'">
                {typeof userProducts !== "string" && userProducts?.length
                    ? userProducts.map((p) => {
                        return (
                            <ProductsCards
                                name={p.name}
                                price={p.price}
                                images={p.Images}
                                image=""
                                productId={p.productId}
                                userId={userId}
                                wished={wishlist.some(
                                    (w) => w.productId === p.productId
                                )}
                            />
                            //url = { p }
                        );
                    })
                    : null}
            </div>
        </div>
    );
}

export default SellerProfileForm;
