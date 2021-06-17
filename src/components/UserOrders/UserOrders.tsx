import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../redux/reducers"
import { useEffect, useState } from "react"
import { bringUserOrders } from "../../redux/actions"
import IUserOrders from "../../interfaces/userOrders";
import ProductsCards from '../ProductsCards/ProductsCards'
import { Container } from 'react-bootstrap';
import OrderItem from './OrderListItem'


export default function UserOrders() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userName: string | null = params.get('user');

    const [loading, setLoading] = useState<Boolean>(true)

    console.log(userName)
    const dispatch = useDispatch()
    const orders = useSelector<StoreType, IUserOrders[]>((state) => state.userOrders)
    //const completed = orders.length && orders.map(order => (order.status === "completed") ? order.Product : null)
    //const inProcess = orders.length && orders.map(order => (order.status === "processing") ? order.Product : null)
    //const shipping = orders.length && orders.map(order => (order.status === "dispatched") ? order.Product : null)

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

        <Container>
            {orders && orders.map(o => {
                return (
                    <OrderItem
                        name={o.Product.name}
                        price={o.Product.price}
                        images={o.Product.Images}
                        productId={o.Product.productId}
                        seller={o.Product.User?.username}
                        quantity={o.quantity}
                        status={o.status}
                    />)
            })
            }

        </Container>

    )
}