import axios from 'axios'
import { useState } from 'react'
import { url } from '../../api'
import { Review } from '../../interfaces/reviews'
import './OrderListItem.css'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import jwtDecode from "jwt-decode"


interface imgs {
    imageId: string
}


export function OrderListItem(props: {
    name: string;
    status: string;
    price: number;
    productId?: string,
    images: imgs[],
    quantity: number;
    seller?: string | undefined;
    reviews: Review[];
    user: string | null;
    role: string;
    id?: number
}) {

    const token: any = localStorage ? jwtDecode(localStorage.token) : false;
    const userId = token.id;

    const history = useHistory()
    const [review, setReview] = useState<any>({
        username: props.user,
        review: "",
        score: 3,
        productId: props.productId
    })

    const [form, setForm] = useState<boolean>(false)
    const [selectStatus, setSelectStatus] = useState<boolean>(false)
    const [orderStatus, setOrderStatus] = useState<string>("")
    const [errors, setErrors] = useState<any>({
        review: true,
        score: true
    })

    const handleClick = () => {
        setForm(true)
    }

    const handleStatusClick = () => {
        setSelectStatus(true)
    }

    const handleInputChange = (e: any) => {
        e.preventDefault();
        if (e.target.name === "review") {
            if (e.target.value.length > 15) {
                setErrors({
                    ...errors,
                    review: false
                });
                setReview({
                    ...review,
                    review: e.target.value
                })
            }
        }
        if (e.target.name === "score") setReview({
            ...review,
            score: e.target.value
        })
    }

    const handleClickButton = () => {
        setForm(false)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (errors.review) {
            return swal("Review must have at least 15 characters")
        }
        await axios.post(`${url}/reviews`, review)
        swal("Review created")
        history.go(0)
    }

    let hasReview: boolean = false
    hasReview = (props.reviews?.some(r => r.userId === userId))

    console.log("USER ID ----->>>>>", token)

    // if (props.reviews?.some(r => r.userId === userId)) {
    //     hasReview = true
    // } else {
    //     hasReview = false
    // }

    const handleStatus = (e: any) => {
        e.preventDefault();
        setOrderStatus(e.target.value)
    }

    const handleStatusSubmit = async () => {
        setSelectStatus(false)
        await axios.post(`${url}/orders/update`, { id: props.id, status: orderStatus })
        swal("Status changed succesfully").then(() => history.go(0))


    }



    return (

        <div className="row">
            <div className="col">
                <div>
                    <div className="card-body p-5 m-4 border shadow">
                        <div className="media">
                            <div className="sq align-self-center "> <img className="img-fluid my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0" src={`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${props.images[0].imageId}`} width="135" height="135" alt="product" /> </div>
                            <div className="media-body my-auto text-right">
                                <div className="row my-auto flex-column flex-md-row align-items-baseline">
                                    <div className="col my-auto">
                                        <h5 className="mb-0">{props.name}</h5>
                                    </div>
                                    <div className="col my-auto"> <p className="h6">Sold {props.role}: {props.seller} </p></div>
                                    <div className="col my-auto"> <p className="h6">Qty : {props.quantity}</p></div>
                                    <div className="col my-auto">
                                        <h4 className="mb-0">$ {props.price} </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-3 " />
                        <div className="row justify-content-between">
                            <div className="col-md-3 mb-3"> <p className="h6"> Status: {props.status}</p> </div>
                            <div className="justify-content-between col-auto flex-col">
                                {props.status === "completed" && !hasReview && props.role === "by" ? <button type="button" onClick={handleClick} className="btn mr-2 btn-primary" id='colorC'>My Review</button> : null}
                                <a href={`/product/${props?.productId}`} className="btn btn-primary" id='colorB'>{props.role === "to" ? "Product Details" : "Buy Again"}</a>
                            </div>
                        </div>
                        <div className="col mt-auto">
                            <div className="justify-content-between ">
                                <div className="col-auto text-right"><small className="text-right mr-sm-2"></small></div>
                                <div className="flex-col justify-content-end">
                                    {form ? (
                                        <form onSubmit={e => handleSubmit(e)} className="card-body p-5 m-4 border shadow" id='fReview'>
                                            <div id='bClose' onClick={handleClickButton}>
                                                <button id='bStyleReview'>x</button>
                                            </div>
                                            <div>
                                                <h5>Review</h5>
                                            </div>
                                            <div>
                                                <textarea id='wReview' name="review" minLength={15} onChange={e => handleInputChange(e)} />
                                                <div className="rating">
                                                    <input onChange={e => handleInputChange(e)} type="radio" value="5" name="score" id="star1" /><label htmlFor="star1"></label>
                                                    <input onChange={e => handleInputChange(e)} type="radio" value="4" name="score" id="star2" /><label htmlFor="star2"></label>
                                                    <input onChange={e => handleInputChange(e)} type="radio" value="3" name="score" id="star3" /><label htmlFor="star3"></label>
                                                    <input onChange={e => handleInputChange(e)} type="radio" value="2" name="score" id="star4" /><label htmlFor="star4"></label>
                                                    <input onChange={e => handleInputChange(e)} type="radio" value="1" name="score" id="star5" /><label htmlFor="star5"></label>
                                                </div>
                                            </div>
                                            <div id='bReview'>
                                                <button type="submit" className="btn btn-primary" id='colorB'>Submit</button>
                                            </div>
                                        </form>
                                    ) : null}
                                    {(props.role === "to" && !selectStatus) ? (
                                        <button type="button" onClick={handleStatusClick} className="btn btn-primary" id='colorC'>Change Status</button>
                                    ) : null}
                                    {selectStatus ? (
                                        <div>
                                            <Form.Label>Status</Form.Label>
                                            <form onSubmit={handleStatusSubmit}>
                                                <Form.Control as="select" onChange={handleStatus} >
                                                    <option value="" selected disabled hidden>Choose here</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                    <option value="processing">Processing</option>
                                                </Form.Control>
                                                <button type="submit" className="btn btn-primary" id='colorB'>Change</button>
                                            </form>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
