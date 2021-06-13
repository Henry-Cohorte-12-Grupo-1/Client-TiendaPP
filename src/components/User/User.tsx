import { useEffect } from 'react';
import {bringUserProducts} from '../../redux/actions/index';
import obj from '../../interfaces/products';
import { useDispatch, useSelector } from 'react-redux';
import {StoreType} from '../../redux/reducers/index';
import ProductsCards from '../ProductsCards/ProductsCards';


function User() {


  const userProducts = useSelector<StoreType, obj[]>((state) => state.userProducts)

  const dispatch = useDispatch()

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let userName: string | null = params.get('username');
  

  console.log('superpedro92', userProducts)

  


  useEffect(() => {
    
    dispatch(bringUserProducts(userName))
    
    
  }, [])

  
  return (
    <div>
         {userProducts &&
            <div className="row row-cols-1 row-cols-md-2">
            {userProducts.map( p => {
                return (
                    <ProductsCards
                    name = {p.name}
                    price = {p.price}
                    image = {p.category.name}
                    id = {p.id} />
                )
            })}
            </div>
        } 
        
        </div>
  );
};

export default User;