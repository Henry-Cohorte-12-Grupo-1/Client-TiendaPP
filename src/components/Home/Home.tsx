import { StoreType } from '../../redux/reducers/index';
import { bringProducts, getCategories } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import obj from '../../interfaces/products';
import ProductsCards from '../ProductsCards/ProductsCards';
import './Home.scss'
import { Container } from 'react-bootstrap';

function Home() {
    const producto = useSelector<StoreType, obj[]>((state) => state.filterProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(bringProducts())
        dispatch(getCategories())
    }, []) //eslint-disable-line

    console.log(producto, "producto")
    return (
        <div id='home-container'>
            <div id='separation'>
                <Container id="homeContainer" className='d-flex justify-content-center flex-wrap ml-0 mr-0'>
                    {producto &&
                        // <div className="row row-cols-1 row-cols-md-2">
                        producto.map(p => {
                            return (
                                <ProductsCards
                                    name={p.name}
                                    price={p.price}
                                    productId={p.productId}
                                    image=""
                                    images={p.Images ? p.Images : []}
                                />
                            )
                        })
                    }
                </Container>
            </div>
        </div>
    )
}


export default Home