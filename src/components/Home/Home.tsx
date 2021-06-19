import { StoreType } from '../../redux/reducers/index';
import { bringProducts, getCategories } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import obj from '../../interfaces/products';
import ProductsCards from '../ProductsCards/ProductsCards';
import './Home.scss'
import { Container, Carousel } from 'react-bootstrap';

function Home() {
    const producto = useSelector<StoreType, obj[]>((state) => state.filterProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(bringProducts())
        dispatch(getCategories())
    }, []) //eslint-disable-line

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    }

    return (
        <div id='home-container'>
            <Carousel activeIndex={index} onSelect={handleSelect} id="ContainerC">
                <Carousel.Item>
                    <img
                    className="d-block w-100" id="cContainer"
                    src="https://ichef.bbci.co.uk/news/976/cpsprodpb/E30B/production/_114032185_onlineshopping.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Buy at the best price</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100" id="cContainer"
                    src="https://www.selleractive.com/hubfs/Ecommerce%20Tools%201.png"
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Sell what you no longer use</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
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