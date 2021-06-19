import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../redux/reducers"
import { useEffect, useState } from "react"
import { bringUserOrders, filteredOrders } from "../../redux/actions"
import IUserOrders from "../../interfaces/userOrders";
import { Container } from 'react-bootstrap';
import OrderItem from './OrderListItem'

let currentOrders: IUserOrders[] = [];
// let filteredOrders: IUserOrders[] = []


export default function UserOrders() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userName: string | null = params.get('user');

    const [loading, setLoading] = useState<Boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const dispatch = useDispatch()
    const orders = useSelector<StoreType, IUserOrders[]>((state) => state.userOrders)


    useEffect(() => {
        (() => {
            dispatch(bringUserOrders(userName));
            setLoading(false)
        })()
    }, [])//eslint-disable-line
    let lastIndex: number = currentPage * 4;
    let firstIndex: number = lastIndex - 4;
    let lastPage: number = Math.ceil(orders.length / 4);

    (!orders.length || typeof orders === "string") ? currentOrders = [] : (currentOrders = [...currentOrders, ...orders.slice(firstIndex, lastIndex)])
    console.log("currentOrders --> ", currentOrders)
    console.log("reduxOrders -->", orders)



    const handlePagination = () => {
        setCurrentPage(currentPage + 1)
    }

    const handleClick = (e: any) => {
        e.preventDefault()
        dispatch(filteredOrders(e.target.name))
        console.log('FILTERED', filteredOrders(e.target.name))
    }

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    if (orders.length < 1) {
        return (
            <h1>Nothing found</h1>
        )
    }
    return (

        <Container className="mt-4 mb-4">
            <div className="d-flex justify-content-center"><p className="h3 pt-2">My Orders</p></div>
            <div className="d-flex justify-content-center">

                <input type="radio" onClick={(e) => handleClick(e)} className="btn-check d-none" name="completed" id="completed" />
                <label className="btn btn-primary m-2" htmlFor="completed">Fulfilled</label>

                <input type="radio" onClick={(e) => handleClick(e)} className="btn-check d-none" name="dispatched" id="dispatched" />
                <label className="btn btn-primary m-2" htmlFor="dispatched">On their way</label>

                <input type="radio" onClick={(e) => handleClick(e)} className="btn-check d-none" name="processing" id="processing" />
                <label className="btn btn-primary m-2" htmlFor="processing">Processing Payement</label>

            </div>
            {console.log(currentOrders)}
            {orders.length && orders.map(o => {
                return (
                    <OrderItem
                        name={o.Product.name}
                        price={o.Product.price}
                        images={o.Product.Images}
                        productId={o.Product.productId}
                        seller={o.Product.User?.username}
                        quantity={o.quantity}
                        status={o.status}
                        reviews={o.Product.Reviews}
                        user={userName}
                        role="by"
                    />)
            })
            }
            {currentPage < lastPage ? <div className="d-flex justify-content-center mb-4"> <button className="btn btn-primary" onClick={handlePagination}>View More</button> </div> : null}

        </Container>

    )
}