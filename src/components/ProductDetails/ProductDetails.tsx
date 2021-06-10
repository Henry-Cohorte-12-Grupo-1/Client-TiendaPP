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
        <div>
            <h4>
                {details.name}
            </h4>
            <img src={details.image} alt="" />
            <h4>${details.price}</h4>
            <p>{details.description}</p>
            <div className="container">
                <h2 className="text-center">Bootstrap 4 User Rating Form / Comment Form</h2>

                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">
                                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                                <p className="text-secondary text-center">15 Minutes Ago</p>
                            </div>
                            <div className="col-md-10">
                                <p>
                                    <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Maniruzzaman Akash</strong></a>
                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>

                                </p>
                                <div className="clearfix"></div>
                                <p>Lorem Ipsum is simply dummy text of the pr make  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                <p>
                                    <a className="float-right btn btn-outline-primary ml-2"> <i className="fa fa-reply"></i> Reply</a>
                                    <a className="float-right btn text-white btn-danger"> <i className="fa fa-heart"></i> Like</a>
                                </p>
                            </div>
                        </div>
                        <div className="card card-inner">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2">
                                        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                                        <p className="text-secondary text-center">15 Minutes Ago</p>
                                    </div>
                                    <div className="col-md-10">
                                        <p><a href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Maniruzzaman Akash</strong></a></p>
                                        <p>Lorem Ipsum is simply dummy text of the pr make  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                        <p>
                                            <a className="float-right btn btn-outline-primary ml-2">  <i className="fa fa-reply"></i> Reply</a>
                                            <a className="float-right btn text-white btn-danger"> <i className="fa fa-heart"></i> Like</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails