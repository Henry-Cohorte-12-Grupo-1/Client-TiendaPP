import { useEffect } from 'react';
import { bringUserProducts } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/reducers/index';
import ProductsCards from '../ProductsCards/ProductsCards';
import IUserProduct from '../../interfaces/userProducts';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import './styles.scss'


function UserProducts() {


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
      <h1>User Does Not Exist</h1>
    )
  }

  console.log(userProducts)
  // var url = '/edit' + userName + "/" + p.productId
  return (
    <div id="user-products-container" >
      <Container >
        <Link to='/user/create'><Button className="m-5 w-10" variant="primary">Create New Product</Button></Link>
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
                  productId={p.productId}
                  editId={'product/edit?id=' + p.productId} />
                //url = { p }
              )
            })}
          </div>
        }
      </Container>
    </div>
  );
};

export default UserProducts;