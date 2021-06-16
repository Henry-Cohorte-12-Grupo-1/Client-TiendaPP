import { StoreType } from '../../redux/reducers/index';
import { bringProducts, getCategories, orderByCategories } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import obj, { category } from '../../interfaces/products';
import ProductsCards from '../ProductsCards/ProductsCards';
import './Home.scss'
import { Container } from 'react-bootstrap';

function Home() {
    const producto = useSelector<StoreType, obj[]>((state) => state.filterProducts)
    const categorias = useSelector<StoreType, category[]>((s) => s.filter)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(bringProducts())
        dispatch(getCategories())
    }, []) //eslint-disable-line

    const handleClick = (category: string) => {
        dispatch(orderByCategories(category))
    }
    console.log(producto, "producto")
    return (
        <div id='home-container'>
            <ul>
                <li className='recomendados'>Categories</li>
                <ul className='bStyle'>
                    {categorias &&
                        <div className='button'>
                            {categorias.map(c => {
                                return (
                                    <li className="btn" onClick={() => handleClick(c.name)}>{c.name}</li>
                                )
                            })}
                            <li className="btn" onClick={() => dispatch(bringProducts())}>Go back</li>
                        </div>}
                </ul>
            </ul>
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