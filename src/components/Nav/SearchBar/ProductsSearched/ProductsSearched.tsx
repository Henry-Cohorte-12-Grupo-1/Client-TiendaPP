import "./ProductsSearched.scss";
import ProductsCards from "../../../ProductsCards/ProductsCards";
import Pagination from "./parts/Pagination/Pagination";
import Order from "./parts/Order";
import { useSelector } from "react-redux";
import {
    CombinedStores,
} from "../../../../redux/interfaces/reduxStore";
import { IProductsType } from "../../../../interfaces/search";
import { Container } from "react-bootstrap";
import SellerSearchBar from '../../../SellerSearchBar/SellerSearchBar';

export default function ProductsSearched() {
    const products = useSelector<CombinedStores, IProductsType>(
        (state) => state.productsReducer.products
    );
    return (
        <div id="home-container">

            <Order />
            <div className="sellerBar mt-5">
                <SellerSearchBar />
            </div>
            <Container
                id="homeContainer"
                className="d-flex justify-content-center flex-wrap ml-0 mr-0 mt-5"
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
            <div className="mt-5">
                <Pagination />
            </div>
        </div>
    );
}
