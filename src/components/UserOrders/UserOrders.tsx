import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../redux/reducers"
import { useEffect, useState } from "react"
import { bringUserOrders } from "../../redux/actions"


export default function UserOrders() {

    const dispatch = useDispatch()
    let userName = ""
    useEffect(() => {
        (async () => {
            await dispatch(bringUserOrders(userName));
        })()
    }, [])//eslint-disable-line
    return (<>
    </>)
}