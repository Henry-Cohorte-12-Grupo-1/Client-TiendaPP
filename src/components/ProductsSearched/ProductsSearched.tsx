import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { searchProduct } from "../../redux/actions";
import { StoreType, IProductsType } from '../../redux/reducers/index'
import { Container } from 'react-bootstrap'
import ProductsCards from '../ProductsCards/ProductsCards';
import Pagination from "../Pagination/Pagination";


export default function ProductsSearched() {
  //Store
  const dispatch = useDispatch()
  const products = useSelector<StoreType, IProductsType>((state) => state.products);
  const nameState = useSelector((store: RootStateOrAny) => store.products.name);
  const itemsState = useSelector((store: RootStateOrAny) => store.products.items);
  const pagState = useSelector((store: RootStateOrAny) => store.products.pag);
  const tagState = useSelector((store: RootStateOrAny) => store.products.tag);
  const orderState = useSelector((store: RootStateOrAny) => store.products.order);



  return (
    <div id='home-container'>
      {/* Cantidad de items */}
      <div>
        <span>
          <select onChange={
            (e) => {
              if (e.target.value === '5') {
                dispatch(
                  searchProduct(nameState, 5, 0, tagState, orderState)
                )
              } else if (e.target.value === '10') {
                dispatch(
                  searchProduct(nameState, 10, 0, tagState, orderState)
                )
              } else {
                dispatch(
                  searchProduct(nameState, 20, 0, tagState, orderState)
                )
              }
            }
          }>
            <option
              value='5'>5</option>
            <option
              value='10'>10</option>
            <option
              value='20'>20</option>
          </select>
        </span>
      </div>
      {/* Price or Name */}
      <div>
        <span>
          <select onChange={
            (e) => {
              if (e.target.value === 'name') {
                dispatch(
                  searchProduct(nameState, itemsState, 0, "name", orderState)
                )
              } else {
                dispatch(
                  searchProduct(nameState, itemsState, 0, "price", orderState)
                )
              }
            }
          }>
            <option
              value='name'>Name</option>
            <option
              value='price'>Price</option>
          </select>
        </span>
      </div>

      {/* Orden */}
      <div>
        <span>
          <select onChange={
            (e) => {
              if (e.target.value === 'lower-higher') {
                dispatch(
                  searchProduct(nameState, itemsState, 0, tagState, "ASC")
                )
              } else {
                dispatch(
                  searchProduct(nameState, itemsState, 0, tagState, "DESC")
                )
              }
            }
          }>
            <option onClick={() => {
              dispatch(
                searchProduct(nameState, itemsState, pagState, tagState, "ASC")
              )
            }
            }
              value='lower-higher'>Lower to Higher</option>
            <option
              value='higher-lower'>Higher to Lower</option>
          </select>
        </span>
      </div>

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
