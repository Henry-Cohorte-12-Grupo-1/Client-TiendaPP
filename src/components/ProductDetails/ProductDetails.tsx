import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../redux/reducers";
import { ReactElement, useEffect, useState } from "react";
import { productInfo, productQuestions } from "../../redux/actions";
import { RouteComponentProps } from "react-router-dom";
import detailedProduct from "../../interfaces/detailedProduct";
import { Button, Carousel, Container, Form } from "react-bootstrap";
import "./style.scss";
//for the add to cart button
import AddButton from "../CartButtons/AddButton";
import jwtDecode from "jwt-decode";
import { IQuestions } from "../../interfaces/questions";
import { BsArrowReturnRight } from 'react-icons/bs'

//defino el tipado para match.params.id
interface MatchParams {
    id: string;
}
type Props = RouteComponentProps<MatchParams>;


function ProductDetails(props: Props): ReactElement {
    const [question, setQuestion] = useState<string>()

    const id = props.match.params.id;

    const details = useSelector<StoreType, detailedProduct>(
        (state) => state.productDetails
    );
    const questions = useSelector<StoreType, IQuestions[]>(
        (state) => state.productQuestions
    );
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    //GETTING USER ID FROM LOCAL STORAGE
    const token: any = localStorage.token
        ? jwtDecode(localStorage.token)
        : false;
    const userId: string = token ? token.id : "guest";



    useEffect(() => {
        (async () => {
            await dispatch(productInfo(id));
            await dispatch(productQuestions(id))
            setLoading(false);
        })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    
    const handleChange = (event: React.FormEvent<any>) =>{
        let ques:string = (event.target as HTMLButtonElement).value
        setQuestion(ques)
    }

    const handleSubmit = () =>{
        console.log(question)
    }

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
                <Container
                    className="d-flex flex-column flex-md-row"
                    id="productInfoResponsive"
                >
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
                                    <div className="prod-pic-overlay"> </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : null}
                    <Container className="d-flex flex-column">
                        <h4>${details.price}</h4>
                        <p>{details.description}</p>
                        {details.quantity > 0 ? (
                            <AddButton
                                productId={details.productId}
                                userId={userId}
                            />
                        ) : (
                            <em>Not available right now</em>
                        )}
                    </Container>
                </Container>
                <hr></hr>
                <h2 className="text-center mt-4">Reviews</h2>
                {details.Reviews.length ? (
                    details.Reviews.map((rev) => {
                        return (
                            <div
                                className="card center"
                                id="spacingReview"
                                key={rev.review}
                            >
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
                                                    <a
                                                        className="ml-5"
                                                        href="/"
                                                    >
                                                        <strong>
                                                            {rev.User?.username}
                                                        </strong>
                                                    </a>
                                                </p>
                                            </div>
                                            <div className="mr-5 ml-4 d-flex no-wrap">
                                                {Array(rev.score).fill(
                                                    <span>
                                                        <i className="text-warning fa fa-star"></i>
                                                    </span>
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
                <hr></hr>
                <h2 className="text-center mt-4">Questions and answers</h2>
                <h3>Make a question</h3>
                <Form.Group className="row d-flex align-center justify-content-center" controlId="exampleForm.ControlTextarea1">

                    {/* <Col> */}
                        <Form.Control className="w-50 ml-3 mb-3" id='questionTextarea' as="textarea" onChange={handleChange}/>
                    {/* </Col> */}

                    {/* <Col> */}
                        <Button className="col-5 ml-5" id='questionButton' onClick={handleSubmit}>Ask</Button>
                    {/* </Col> */}
                </Form.Group>
                <hr></hr>
                <h3>Last questions</h3>
                <Container className='bg-light p-4'>
                    {questions && questions.map((question, id) => (
                        <div>
                            <p className="mb-0" key={id}>{question.question}</p>
                            {question.question ? (
                                <p className="ml-3" key={id}>{ }<BsArrowReturnRight />&nbsp;{question.answer}</p>
                            ) : null}
                            <hr></hr>
                        </div>
                    )
                    )}
                </Container>

            </div>
        </Container>
    );
}

export default ProductDetails;
