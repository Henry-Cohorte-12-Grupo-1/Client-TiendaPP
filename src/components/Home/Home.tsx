import {StoreType} from '../../redux/reducers/index';
import {bringProducts, getCategories, orderByCategories} from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import obj, { category } from '../../interfaces/products';
import ProductsCards from '../ProductsCards/ProductsCards';
import Footer from '../Footer/Footer' 
import './Home.css'

function Home (){ 
    const producto = useSelector<StoreType, obj[]>((state) => state.filterProducts)
    const categorias = useSelector<StoreType, category[]>((s) => s.filter)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(bringProducts())
        dispatch(getCategories())
    }, [])

    const handleClick = (category: string) => {
        dispatch(orderByCategories(category))
    }

    return (
        <div>
            <div>
                <h3 className='recomendados'>Categorias</h3>
                <div className='bStyle'>
                    {categorias && 
                    <div className='button'>
                    {categorias.map(c => {
                        return(
                            <button type="button" className="btn btn-outline-primary btn-space" onClick={() => handleClick(c.name)}>{c.name}</button>
                        )
                    })}
                    <button className="btn btn-outline-primary btn-space" onClick={() => dispatch(bringProducts())}>Go back</button>
                    </div>}
                </div>
            </div>
            <div>
            <h2 className='recomendados'>Recomendados</h2>
            <div>
            {producto &&
                <div className="row row-cols-1 row-cols-md-2">
                {producto.map( p => {
                    return (
                        <ProductsCards
                        name = {p.name}
                        price = {p.price}
                        image = {p.image}
                        id = {p.id} />
                    )
                })}
                </div>
            }
            </div>
        </div>
        <div>
            <Footer />
        </div>
            </div>
    )
}


export default Home