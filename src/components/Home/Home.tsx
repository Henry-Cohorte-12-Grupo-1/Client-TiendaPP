import {StoreType} from '../../redux/reducers/index';
import {bringProducts, getCategories, orderByCategories} from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import obj, { category } from '../../interfaces/products';
import ProductsCards from '../ProductsCards/ProductsCards'

function Home (){ 
    const producto = useSelector<StoreType, obj[]>((state) => state.productList)
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
                <h3>Categorias</h3>
                <div>
                    {categorias && 
                    <div>
                    {categorias.map(c => {
                        return(
                            <button type="button" className="btn btn-outline-secondary" onClick={() => handleClick(c.name)}>{c.name}</button>
                        )
                    })}
                    </div>}
                    {console.log('CATEGORIAS',categorias)}
                </div>
            </div>
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