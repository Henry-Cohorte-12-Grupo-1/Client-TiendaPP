import "./Home.scss";
import ProductsCards from "../ProductsCards/ProductsCards";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import {IProducts} from "../../interfaces/products";
import { StoreType } from "../../redux/reducers/index";
import {
  bringProducts,
  bringWishlist,
  getCategories,
} from "../../redux/actions/index";

function Home() {
  const producto = useSelector<StoreType, IProducts[]>(
    (state) => state.filterProducts
  );
  const wishlist = useSelector<StoreType, IProducts[]>((state) => state.wishlist);
  const dispatch = useDispatch();
  const token: any = localStorage.token ? jwtDecode(localStorage.token) : false;
  const userId = token?.id ? token.id : "guest";

  useEffect(() => {
    dispatch(bringProducts());
    dispatch(getCategories());
    if (userId !== "guest") {
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
      <Carousel activeIndex={index} onSelect={handleSelect} id="ContainerC">
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

      <div id="separation">
        <Container
          id="homeContainer"
          className="d-flex justify-content-center flex-wrap ml-0 mr-0"
        >
          {producto &&
            // <div className="row row-cols-1 row-cols-md-2">
            producto
              .filter((p) => p.quantity > 0)
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
                    wished={wishlist.some((w) => w.productId === p.productId)}
                  />
                );
              })}
        </Container>
      </div>
    </div>
  );
}

export default Home;
