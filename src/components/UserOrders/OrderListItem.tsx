import axios from 'axios'
import { useState } from 'react'
import { url } from '../../api'
import { Review } from '../../interfaces/reviews'
import './OrderListItem.css'
interface imgs {
    imageId: string
}


export default function OrderListItem(props: {
    name: string;
    status: string;
    price: number;
    productId?: string,
    images: imgs[],
    quantity: number;
    seller?: string | undefined;
    reviews: Review[];
    user: string | null;
    role: string,
}) {

    const [review, setReview] = useState<any>({
        username: props.user,
        review: "",
        score: -1,
        productId: props.productId
    })

    const [form, setForm] = useState<boolean>(false)
    const [selectStatus, setSelectStatus] = useState<boolean>(false)
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
                })
            }
        }
        if (e.target.name === "score") {
            if (e.target.value > 0 || e.target.value < 6) {
                setErrors({
                    ...errors,
                    score: false
                })
            }
        }
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
    }

    const handleClickButton = () => {
        setForm(false)
    }

    console.log(review)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (errors.review) {
            return alert("Review must have at least 15 characters")
        }
        if (errors.score) {
            return alert("Score must be between 1 and 5")
        }
        const resp = await axios.post(`${url}/reviews`, review)
        alert(resp)
    }

    let hasReview: boolean = false
    if (props.reviews[0]) {
        hasReview = true
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
                                <a href={`/product/${props?.productId}`} className="btn btn-primary" id='colorB'>Buy Again</a>
                                {!hasReview ? <button type="button" onClick={handleClick} className="btn btn-primary" id='colorC'>My Review</button> : null}
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
                                                <input id='iReview' onChange={e => handleInputChange(e)} name="score" type="number" min="1" max="5" />
                                            </div>
                                            <div id='bReview'>
                                                <button type="submit" className="btn btn-primary" id='colorB'>Submit</button>
                                            </div>
                                        </form>
                                    ) : null}
                                    {(props.role === "to") ? (
                                        <button type="button" onClick={handleStatusClick} className="btn btn-primary" id='colorC'>Change Status</button>
                                    ) : null}
                                    {selectStatus ? (
                                        <form>

                                        </form>
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
