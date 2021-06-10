import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../redux/reducers"
import { useEffect } from "react"
import { productInfo } from "../../redux/actions"
import { RouteComponentProps } from "react-router-dom"
import obj from '../../interfaces/products'

//defino el tipado para match.params.id
interface MatchParams {
    id: string;
}
interface Props extends RouteComponentProps<MatchParams> {
}

function ProductDetails(props: Props) {

    const id = props.match.params.id
    const details = useSelector<StoreType, obj>((state) => state.productDetails)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(productInfo(id));
        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    console.log(details)
    return (
        <div className="container">
            <div>
                <h2 className="text-center">
                    {details.name}
                </h2>
                <img src={details.image} alt="" />
                <h4>${details.price}</h4>
                <p>{details.description}</p>
                <h2 className="text-center">Reviews</h2>

                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">
                                <div className="d-none d-lg-block">
                                    <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                                    <p className="text-secondary text-center">15 Minutes Ago</p>
                                </div>
                                <p>
                                    <a className="float-left" href="#"><strong>Superpedro92</strong></a>
                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                </p>
                            </div>
                            <div className="col-md-10">
                                <div className="clearfix"></div>
                                <p>Muy buena la tele se ve todo re HD. Tuve que desenchufarla porque me abstraía del mundo externo. Recomiendo instalarla en un lugar que disponga de sillón o algo para sentarse, porque me gasté toda la guita en la tele y no me quedó ni para un puff. Vi Interestellar parado y me quedaron las piernas hipertrofiadas. Volvería a comprarla.</p>
                                <p>
                                    <a className="float-right btn btn-outline-primary ml-2"> <i className="fa fa-reply"></i> Reply</a>
                                    <a className="float-right btn text-white btn-danger"> <i className="fa fa-heart"></i> Like</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails