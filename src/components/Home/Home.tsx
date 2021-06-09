import {StoreType} from '../../redux/reducers/index';
import {bringProducts} from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import obj from '../../interfaces/products';
import ProductsCards from '../ProductsCards/ProductsCards'

function Home (){ 
    const producto = useSelector<StoreType, obj[]>((state) => state.productList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(bringProducts())
    }, [])

    console.log('PRODUCTO!',producto)

    return (
        <div>
            <div>
            <h2>Recomendados</h2>
            <div>
            {producto &&
                <div className="row row-cols-1 row-cols-md-2">
                {producto.map( p => {
                    return (
                        <ProductsCards
                        name = {p.name}
                        price = {p.price}
                        image = {p.image} />
                    )
                })}
                </div>
            }
            </div>
        </div>
            </div>
    )
}


export default Home