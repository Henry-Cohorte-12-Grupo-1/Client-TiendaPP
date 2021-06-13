import { useEffect } from 'react';
import { bringUserProducts } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/reducers/index';
import ProductsCards from '../ProductsCards/ProductsCards';
import IUserProduct from '../../interfaces/userProducts';
import { Container } from 'react-bootstrap';
import './styles.scss'


function User() {


  const userProducts = useSelector<StoreType, IUserProduct[]>((state) => state.userProducts)

  const dispatch = useDispatch()

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let userName: string | null = params.get('username');


  console.log('superpedro92', userProducts)




  useEffect(() => {
    dispatch(bringUserProducts(userName))
  }, [])// eslint-disable-line 

  if (typeof userProducts === 'string') {
    return (
      <h1>NOTHING HERE</h1>
    )
  }

  console.log(userProducts)

  return (
    <div id="user-products-container" >
      <Container >
        {userProducts &&
          // <div className="row row-cols-1 row-cols-md-2">
          <div className='d-flex justify-content-center flex-wrap ml-0 mr-0'>

            {userProducts.map(p => {
              return (
                <ProductsCards
                  name={p.name}
                  price={p.price}
                  images={p.Images}
                  image=""
                />
              )
            })}
          </div>
        }
      </Container>
    </div>
  );
};

export default User;