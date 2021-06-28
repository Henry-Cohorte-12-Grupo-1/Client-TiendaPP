import "./ProductsSearched";
import { useSelector } from "react-redux";
import { StoreType, IProductsType } from "../../../../redux/reducers/index";
import { Container } from "react-bootstrap";
import ProductsCards from "../../../ProductsCards/ProductsCards";
import Pagination from "../../../Pagination/Pagination";
import Order from "./parts/Order";

export default function ProductsSearched() {
  const products = useSelector<StoreType, IProductsType>(
    (state) => state.products
  );
  return (
    <div id="home-container">
      <Order />

      <Container
        id="homeContainer"
        className="d-flex justify-content-center flex-wrap ml-0 mr-0"
      >
        {products.products && products.products.length === 0 ? (
          <h1>No Products to show</h1>
        ) : (
          <div
            id="container"
            className="d-flex justify-content-center flex-wrap ml-0 mr-0"
          >
            {products.products.map((el): any => (
              <ProductsCards
                image=""
                images={el.Images}
                name={el.name}
                price={el.price}
                productId={el.productId}
              />
            ))}
          </div>
        )}
      </Container>
      <Pagination />
    </div>
  );
}
