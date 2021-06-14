import { useSelector } from "react-redux";
import { StoreType, IProductsType } from '../../redux/reducers/index'
import ProductsCards from '../ProductsCards/ProductsCards';
import { Container } from 'react-bootstrap'


export default function ProductsSearched() {


  const products = useSelector<StoreType, IProductsType>((state) => state.products);
  console.log("productssss: ", products.products[0])


  return (
    <Container>
      {products.products && products.products.length === 0 ? (
        <h1>No Products to show</h1>
      ) : (
        <div id="homeContainer" className='d-flex justify-content-center flex-wrap ml-0 mr-0'>
          {products.products.map((el): any => <ProductsCards
            image=""
            images={el.Images}
            name={el.name}
            price={el.price}
            productId={el.productId}
          />)}
        </div>
      )}
    </Container>
  );
}
