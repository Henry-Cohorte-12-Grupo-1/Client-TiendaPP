import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../redux/reducers"
import { useEffect, useState } from "react"
import { productInfo } from "../../redux/actions"
import { RouteComponentProps } from "react-router-dom"
import detailedProduct from "../../interfaces/detailedProduct"
import { Carousel } from 'react-bootstrap'

//defino el tipado para match.params.id
interface MatchParams {
    id: string;
}
interface Props extends RouteComponentProps<MatchParams> {
}

function ProductDetails(props: Props) {

    const id = props.match.params.id
    const details = useSelector<StoreType, detailedProduct>((state) => state.productDetails)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await dispatch(productInfo(id));
            setLoading(false)
        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    console.log(details, "Componente ProductDetails")

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    if (!loading && !details.productId) {

        return (
            <h1>Not Found!</h1>
        )
    }
    return (
        <div className="container">
            <div>
                <h2 className="text-center">
                    {details.name}
                </h2>
                {details.Images.length > 0 ?
                    <Carousel>
                        {details.Images.map((img, i) => (
                            <Carousel.Item key={i}>
                                <img
                                    key={i}
                                    className="carrousel-img"
                                    src={`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${img.imageId}`}
                                    alt="Slides"
                                />
                            </Carousel.Item>
                        )
                        )}
                    </Carousel> :
                    null}
                <h4>${details.price}</h4>
                <p>{details.description}</p>
                <h2 className="text-center">Reviews</h2>
                {details.Reviews.length && details.Reviews
                    .map(rev => {
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="d-none d-md-block">
                                                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" alt="person portrait" />
                                                <p className="text-secondary text-center">15 Minutes Ago</p>
                                            </div>
                                            <p>
                                                <a className="float-left" href="/"><strong>Superpedro92</strong></a>

                                                {Array(rev.score).fill(<span className="float-right"><i className="text-warning fa fa-star"></i></span>)}

                                            </p>
                                        </div>
                                        <div className="col-md-10">
                                            <div className="clearfix"></div>
                                            <p>{rev.review}</p>
                                            <p>
                                                <a className="float-right btn btn-outline-primary ml-2" href="/"> <i className="fa fa-reply"></i> Reply</a>
                                                <a className="float-right btn text-white btn-danger" href="/"> <i className="fa fa-heart"></i> Like</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
export default ProductDetails