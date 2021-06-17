import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../redux/reducers"
import { useEffect, useState } from "react"
import { bringUserOrders } from "../../redux/actions"
import IUserOrders from "../../interfaces/userOrders";
import ProductsCards from '../ProductsCards/ProductsCards'


export default function UserOrders() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let userName: string | null = params.get('user');

    console.log(userName)
    const dispatch = useDispatch()
    const orders = useSelector<StoreType, IUserOrders[]>((state) => state.userOrders)
    const productsBougth = orders.map(order => order.Product)

    useEffect(() => {
        (async () => {
            await dispatch(bringUserOrders(userName));
        })()
    }, [])//eslint-disable-line
    console.log("orders -->", orders)
    return (<>
        <h1>COMPONENTE USER ORDERS</h1>
        {productsBougth &&
            // <div className="row row-cols-1 row-cols-md-2">
            <div className='d-flex justify-content-center flex-wrap ml-0 mr-0'>

                {productsBougth.map(p => {
                    return (
                        <ProductsCards
                            name={p.name}
                            price={p.price}
                            images={p.Images}
                            image=""
                            productId={p.productId}
                            editId={'product/edit?id=' + p.productId} />
                        //url = { p }
                    )
                })}
            </div>
        }

    </>)
}