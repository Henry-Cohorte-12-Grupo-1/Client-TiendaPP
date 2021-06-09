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

    return (
        <div>
            <h2>Recomendados</h2>
        </div>
    )
}


export default Home