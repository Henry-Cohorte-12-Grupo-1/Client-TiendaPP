import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/reducers';
import { ReactElement, useEffect, useState } from 'react';
import { productInfo } from '../../redux/actions';
import { RouteComponentProps } from 'react-router-dom';
import detailedProduct from '../../interfaces/detailedProduct';
import { Carousel, Container } from 'react-bootstrap';
import './style.scss';

//for the add to cart button
import AddButton from '../CartButtons/AddButton';
import jwtDecode from 'jwt-decode';

//defino el tipado para match.params.id
interface MatchParams {
    id: string;
}
type Props = RouteComponentProps<MatchParams>;
function ProductDetails(props: Props): ReactElement {
    const id = props.match.params.id;
    const details = useSelector<StoreType, detailedProduct>((state) => state.productDetails);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    //GETTING USER ID FROM LOCAL STORAGE
    const token: any = localStorage.token ? jwtDecode(localStorage.token) : false;
    const userId: string = token ? token.id : 'guest';

    useEffect(() => {
        (async () => {
            await dispatch(productInfo(id));
            setLoading(false);
        })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    console.log(details, 'Componente ProductDetails');

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (!loading && !details.productId) {
        return <h1>Not Found!</h1>;
    }
    return (
        <Container className="mb-5">
            <div>
                <h2 className="text-center mt-5 mb-5">{details.name}</h2>
                <Container className="d-flex flex-column flex-md-row" id="productInfoResponsive">
                    {details.Images.length > 0 ? (
                        <Carousel>
                            {details.Images.map((img, i) => (
                                <Carousel.Item key={i}>
                                    <img
                                        key={i}
                                        className="d-block w-100"
                                        src={`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${img.imageId}`}
                                        alt="Slides"
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : null}
                    <Container className="d-flex flex-column">
                        <h4>${details.price}</h4>
                        <p>{details.description}</p>
                        <AddButton productId={details.productId} userId={userId} />
                    </Container>
                </Container>
                <hr></hr>
                <h2 className="text-center mt-4">Reviews</h2>
                {details.Reviews.length ? (
                    details.Reviews.map((rev) => {
                        console.log("Reviews --->", rev)
                        return (
                            <div className="card center" id="spacingReview" key={rev.review}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="d-none d-md-block">
                                                <img
                                                    src="https://image.ibb.co/jw55Ex/def_face.jpg"
                                                    className="img img-rounded img-fluid"
                                                    alt="person portrait"
                                                />

                                            </div>
                                            <div className="row">
                                                <p>
                                                    <a className="ml-2" href="/">
                                                        <strong>{rev.User?.username}</strong>
                                                    </a>
                                                </p>
                                            </div>
                                            <div className="mr-5 d-flex no-wrap">
                                                {Array(rev.score).fill(
                                                    <span>
                                                        <i className="text-warning fa fa-star"></i>
                                                    </span>,
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-10">
                                            <div className="clearfix"></div>
                                            <p className="p-5">{rev.review}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <label>No reviews yet :'( </label>
                )}
            </div>
        </Container>
    );
}
export default ProductDetails;
