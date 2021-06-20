import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../redux/reducers"
import { useEffect, useState } from "react"
import IUserOrders from "../../interfaces/userOrders";
import { Container } from 'react-bootstrap';
import OrderItem from './OrderListItem'
<<<<<<< HEAD
import { bringUserSales, filteredOrders } from "../../redux/actions";
=======
import { bringUserSales } from "../../redux/actions";
import jwtDecode from "jwt-decode"
>>>>>>> 092f371ba017789435e29919e966b40668ecbb70

let currentOrders: IUserOrders[] = [];
// let filteredOrders: IUserOrders[] = []


export default function UserSales() {


    const token: any = localStorage ? jwtDecode(localStorage.token) : false;
    let userName = token.username;

    const [loading, setLoading] = useState<Boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [filter, setFilter] = useState<Boolean>(true)



    const dispatch = useDispatch()
    const orders = useSelector<StoreType, IUserOrders[]>((state) => state.userOrders)


    useEffect(() => {
        (() => {
            dispatch(bringUserSales(userName));
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
        setFilter(false)
        console.log('FILTERED', filteredOrders(e.target.name))
    }

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    if (currentOrders.length < 1) {
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
                <label className="btn btn-primary m-2" htmlFor="dispatched">Cancelled</label>

                <input type="radio" onClick={(e) => handleClick(e)} className="btn-check d-none" name="processing" id="processing" />
                <label className="btn btn-primary m-2" htmlFor="processing">Processing</label>

            </div>
            {console.log(currentOrders)}
<<<<<<< HEAD
            {!filter ? orders.map(o => {
=======
            {currentOrders.length && currentOrders.map(o => {
                console.log(o.id)
>>>>>>> 092f371ba017789435e29919e966b40668ecbb70
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
<<<<<<< HEAD
                        role="by"
=======
                        role="to"
                        id={o.id}
>>>>>>> 092f371ba017789435e29919e966b40668ecbb70
                    />)
            })
            :
            currentOrders.length && currentOrders.map(o => {
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
            })}
            {currentPage < lastPage ? <div className="d-flex justify-content-center mb-4"> <button className="btn btn-primary" onClick={handlePagination}>View More</button> </div> : null}

        </Container>

    )
}