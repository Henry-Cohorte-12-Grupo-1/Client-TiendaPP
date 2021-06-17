import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../redux/reducers"
import { useEffect, useState } from "react"
import { bringUserOrders } from "../../redux/actions"
import IUserOrders from "../../interfaces/userOrders";
import ProductsCards from '../ProductsCards/ProductsCards'
import { Container } from 'react-bootstrap';


export default function UserOrders() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userName: string | null = params.get('user');

    const [loading, setLoading] = useState<Boolean>(true)

    console.log(userName)
    const dispatch = useDispatch()
    const orders = useSelector<StoreType, IUserOrders[]>((state) => state.userOrders)
    const completed = orders.map(order => (order.status === "completed") ? order.Product : null)
    const inProcess = orders.map(order => (order.status === "processing") ? order.Product : null)
    const shipping = orders.map(order => (order.status === "dispatched") ? order.Product : null)

    useEffect(() => {
        (async () => {
            await dispatch(bringUserOrders(userName));
            setLoading(false)
        })()
    }, [])//eslint-disable-line
    console.log("orders -->", orders)
    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div id='home-container'>
            <div id='separation'>
                <Container>
                    {completed &&
                        // <div className="row row-cols-1 row-cols-md-2">
                        <div className='p-5 m-4 border shadow d-flex flex-wrap justify-content-center'>
                            <h3>Fulfilled Orders</h3>
                            <div className='d-flex flex-wrap justify-content-center'>
                                {completed.map(p => {
                                    if (p !== null)
                                        return (
                                            <ProductsCards
                                                name={p.name}
                                                price={p.price}
                                                images={p.Images}
                                                image=""
                                                productId={p.productId}
                                            />); else return null
                                })}
                            </div>
                        </div>
                    }
                    {shipping &&
                        // <div className="row row-cols-1 row-cols-md-2">
                        <div className='p-5 m-4 border shadow d-flex flex-wrap justify-content-center'>
                            <h3>On their way</h3>
                            <div className='d-flex flex-wrap justify-content-center'>
                                {shipping.map(p => {
                                    if (p !== null)
                                        return (
                                            <ProductsCards
                                                name={p.name}
                                                price={p.price}
                                                images={p.Images}
                                                image=""
                                                productId={p.productId}
                                            />); else return null
                                })}
                            </div>
                        </div>
                    }

                    {inProcess &&
                        // <div className="row row-cols-1 row-cols-md-2">
                        <div className='p-5 m-4 border shadow d-flex flex-wrap justify-content-center'>
                            <h3>Processing Payement:</h3>
                            <div className='d-flex flex-wrap justify-content-center'>

                                {inProcess.map(p => {
                                    if (p !== null)
                                        return (
                                            <ProductsCards
                                                name={p.name}
                                                price={p.price}
                                                images={p.Images}
                                                image=""
                                                productId={p.productId}
                                            />); else return null
                                })}
                            </div>
                        </div>
                    }

                </Container>
            </div>
        </div>
    )
}