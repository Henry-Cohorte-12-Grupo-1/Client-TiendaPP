import { useSelector, RootStateOrAny } from "react-redux";
import { StoreType, IProductsType } from '../../redux/reducers/index'
import ProductsCards from '../ProductsCards/ProductsCards';
import { Container } from 'react-bootstrap'
import Pagination from "../Pagination/Pagination";


export default function ProductsSearched() {
  const products = useSelector<StoreType, IProductsType>((state) => state.products);
  const orderState = useSelector((store: RootStateOrAny) => store.order);
  console.log("productssss: ", products.products[0])

  // const selectedPrice = (e) => {
  //   if(e.target.value === 'lower-higher'){
  //   }else if (e.target.value === 'higher-lower'){
  //   }
  // }

  return (
    <div id='home-container'> 
    <span>
        <select>
          <option value={''}>Order by price</option>
          <option value='lower-higher'>Lower to Higher</option>
          <option value='higher-lower'>Higher to Lower</option>
        </select>
       
    </span>
    <Container id="homeContainer" className='d-flex justify-content-center flex-wrap ml-0 mr-0'>
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
    <Pagination />
    </div>
  );
}
