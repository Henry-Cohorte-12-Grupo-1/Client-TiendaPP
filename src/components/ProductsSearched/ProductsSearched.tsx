import { useState } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { searchProduct } from "../../redux/products/productsActions";
import { StoreType, CombinedStores } from '../../redux/interfaces/reduxStore'
import { Container } from 'react-bootstrap'
import ProductsCards from '../ProductsCards/ProductsCards';
import Pagination from "../Nav/SearchBar/ProductsSearched/parts/Pagination/Pagination";
import './ProductsSearched.css'
import Order from "../Nav/SearchBar/ProductsSearched/parts/Order"
import { IProductsType } from '../../interfaces/search';


export default function ProductsSearched() {
  //Store
  const [option, setOption] = useState<string>('name');
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
      <div className="d-flex justify-content-center mt-3 mb-5">
        <div className="pagesS mr-3">
        <label className="text-light ml-2 mr-2">Pages: </label>
          <select id="selectS" className="form-select form-select-lg py-1 mr-2" aria-label="Default select example" onChange={
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
        </div>
     
      {/* Price or Name */}
      <div className="pagesS mr-3">
          <label className="text-light ml-2 mr-2">Order by:</label>
          <select id="selectS" className="form-select py-1" aria-label="Default select example"  onChange={
            (e) => {
              if (e.target.value === 'name') {
                setOption('name')
                dispatch(
                  searchProduct(nameState, itemsState, 0, "name", orderState)
                )
              } else {
                setOption('price')
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
       
      </div>

      {/* Orden */}
      <div className="pagesS">     
          <label className="text-light ml-2 mr-2">Type:</label>
          <select id="selectS" className="form-select py-1" aria-label="Default select example"  onChange={
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
              value='lower-higher'>{option && option === 'name' ? 'A - Z' : 'Lower to Higher'}</option>
            <option
              value='higher-lower'>{option && option === 'name' ? 'Z - A' : 'Higher to Lower'}</option>
          </select>     
      </div>
      </div>

      <Container id="homeContainer" className='d-flex justify-content-center flex-wrap ml-0 mr-0'>
        {products.products && products.products.length === 0 ? (
          <h1>No Products to show</h1>
        ) : (
          <div id="container" className='d-flex justify-content-center flex-wrap ml-0 mr-0'>
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
