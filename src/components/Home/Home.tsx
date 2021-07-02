import "./Home.scss";
import ProductsCards from "../ProductsCards/ProductsCards";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import { IProducts } from "../../interfaces/products";
import { CombinedStores } from "../../redux/interfaces/reduxStore";
import { bringProducts } from "../../redux/products/productsActions";
import { bringWishlist } from "../../redux/wishlist/wishlistActions";
import { decreasePage, getCategories, increasePage } from "../../redux/categories/categoriesActions";
import CategorySearch from "./CategorySearch";
import { bringProfilePic } from "../../redux/profile/profilePicActions";


function Home() {
    const product = useSelector<CombinedStores, IProducts[]>(
        (state) => state.productsReducer.filterProducts
    );
    const wishlist = useSelector<CombinedStores, IProducts[]>(
        (state) => state.wishlistReducer.wishlist
    );
    //PAGINADO
    // const [page, setPage] = useState<number>(1)
    const page = useSelector<CombinedStores, number>(
        (state) => state.categoriesReducer.actualPage
    )
    //////////
    const dispatch = useDispatch();
    const token: any = localStorage.token
        ? jwtDecode(localStorage.token)
        : false;
    const userId = token?.id ? token.id : "guest";

    var totalPages = product.length / 8

    useEffect(() => {
        dispatch(bringProducts());
        dispatch(getCategories());
        if (userId !== "guest") {
            dispatch(bringProfilePic(userId))
            dispatch(bringWishlist(userId));
        }
    }, []); //eslint-disable-line

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any) => {
        setIndex(selectedIndex);
    };

    return (
        <div id="home-container">
            {/*CAROUSEL*/}
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                id="ContainerC"
            >
                {/*CAROUSEL ITEM*/}
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        id="cContainer"
                        src="https://ichef.bbci.co.uk/news/976/cpsprodpb/E30B/production/_114032185_onlineshopping.jpg"
                        alt="First slide"
                    />
                    {/*CLAVE PARA EL OVERLAY */}
                    <div className="overlay"> </div>{" "}
                    <Carousel.Caption>
                        <h3>Buy at the best price</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                {/*CAROUSEL ITEM*/}
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        id="cContainer"
                        src="https://www.selleractive.com/hubfs/Ecommerce%20Tools%201.png"
                        alt="Second slide"
                    />

                    {/*CLAVE PARA EL OVERLAY */}
                    <div className="overlay"> </div>

                    <Carousel.Caption>
                        <h3>Sell what you no longer use</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div id='categoriesDD'>
                <CategorySearch></CategorySearch>
            </div>
            <div id="separation">
                <Container
                    id="homeContainer"
                    className="d-flex justify-content-center flex-wrap ml-0 mr-0"
                >
                    {product &&
                        // <div className="row row-cols-1 row-cols-md-2">
                        product
                            .filter((p) => p.quantity > 0)
                            .slice((page - 1) * 8, page * 8)
                            .map((p) => {
                                return (
                                    <ProductsCards
                                        key={p.productId}
                                        name={p.name}
                                        price={p.price}
                                        productId={p.productId}
                                        image=""
                                        images={p.Images ? p.Images : []}
                                        userId={userId}
                                        wished={wishlist.some(
                                            (w) => w.productId === p.productId
                                        )}
                                    />
                                );
                            })}
                </Container>
            </div>
            {/* <div>
                <Pagination direction={'left'} callback={page>1?(()=>setPage(page-1)):null}/>

                <Pagination direction={'right'} callback={page<()=>setPage(page+1)}/>
            </div> */}

            <div className="allmightContainer mb-4">
                <div className="paginationContainer">
                    {page > 1 ? (
                        <button className="paginationPrev prev page-numbers" onClick={() => dispatch(decreasePage(page))}>{'< Prev'}</button>
                    ) : (
                        <button className="disabled paginationPrev">{'< Prev'}</button>
                    )}
                    <button className="paginationPage page-numbers current">{page}</button>
                    {page < totalPages ? (
                        <button className="paginationNext next page-numbers" onClick={() => dispatch(increasePage(page))}>{'Next >'}</button>
                    ) : (
                        <button className='disabled paginationNext' >{'Next >'}</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
