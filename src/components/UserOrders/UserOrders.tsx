import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../redux/reducers"
import { useEffect, useState } from "react"
import { bringUserOrders } from "../../redux/actions"
import IUserOrders from "../../interfaces/userOrders";
import { Container } from 'react-bootstrap';
import OrderItem from './OrderListItem'

let currentOrders: IUserOrders[] = [];

export default function UserOrders() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userName: string | null = params.get('user');

    const [loading, setLoading] = useState<Boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)


    const dispatch = useDispatch()
    const orders = useSelector<StoreType, IUserOrders[]>((state) => state.userOrders)


    let lastIndex: number = currentPage * 4;
    let firstIndex: number = lastIndex - 4;
    let lastPage: number = Math.ceil(orders.length / 4);

    (!orders.length) ? currentOrders = [] : (currentOrders = [...currentOrders, ...orders.slice(firstIndex, lastIndex)])
    console.log("currentOrders --> ", currentOrders)
    useEffect(() => {
        (async () => {
            dispatch(bringUserOrders(userName));
            setLoading(false)
        })()
    }, [])//eslint-disable-line

    console.log("orders -->", orders)
    const handlePagination = () => {
        setCurrentPage(currentPage + 1)
    }

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (

        <Container className="mt-4 mb-4">
            <div className="d-flex justify-content-center"><p className="h3 pt-2">My Orders</p></div>
            {currentOrders && currentOrders.map(o => {
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
            {currentPage < lastPage ? <div className="d-flex justify-content-center mb-4"> <button className="btn btn-primary" onClick={handlePagination}>View More</button> </div> : null}

        </Container>

    )
}