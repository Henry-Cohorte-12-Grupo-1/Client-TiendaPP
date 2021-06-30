import "./style.scss";
import detailedProduct from "../../interfaces/detailedProduct";
import jwtDecode from "jwt-decode";
import SweetAlertInput from "./sweetAlertInput";
import IQuestAndId from "../../interfaces/questions";
import { useDispatch, useSelector } from "react-redux";
import { StoreType, CombinedStores } from "../../redux/interfaces/reduxStore";
import { ReactElement, useEffect, useState } from "react";

import { loadCartBuyNow, buyNow } from "../../redux/cart/cartActions";

import {
    productInfo,
    productQuestions,
} from "../../redux/products/productsActions";

import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { Button, Carousel, Container } from "react-bootstrap";
import { BsArrowReturnRight } from "react-icons/bs";
import { url } from "../../api";

//icons
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";

//for the add to cart button
import AddButton from "../Cart/CartButtons/AddButton";
import axios from "axios";

//defino el tipado para match.params.id
interface MatchParams {
    id: string;
}
type Props = RouteComponentProps<MatchParams>;

function ProductDetails(props: Props): ReactElement {
    //Constantes
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [hasProfile, setHasProfile] = useState<boolean>(false);
    const id = props.match.params.id;
    //Selectors
    const details = useSelector<CombinedStores, detailedProduct>(
        (state) => state.productsReducer.productDetails
    );
    const questions = useSelector<CombinedStores, IQuestAndId>(
        (state) => state.productsReducer.productQuestions
    );
    //Handlers
    //Funcion que maneja preguntas y respuestas
    async function handleQA(qoA: string, quest: IQuestAndId["id"]) {
        const questId = qoA === "Answer" ? quest : "";
        const routePath = qoA === "Answer" ? "answer" : "new";
        const uId = qoA === "Question" ? userId : undefined;
        const paramId = qoA === "Question" ? id : undefined;
        await SweetAlertInput(
            `Your ${qoA}:`,
            `Send ${qoA}:`,
            `${url}/questions/${routePath}`,
            questId,
            uId,
            paramId
        );
        dispatch(productQuestions(id));
    }

    //GETTING USER ID FROM LOCAL STORAGE
    const token: Storage | false = localStorage.token
        ? jwtDecode(localStorage.token)
        : false;
    const userId: string = token ? token.id : "guest";
    const handleBuyNow = (e: any) => {
        e.preventDefault();
        dispatch(buyNow());
        dispatch(loadCartBuyNow(id));
        history.push("/payment");
    };
    useEffect(() => {
        (async () => {
            dispatch(productInfo(id));
            dispatch(productQuestions(id));
            setLoading(false);
        })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        (async () => {
            console.log(details.User.username);
            if (details.User) {
                try {
                    const profile = await axios.get(
                        `${url}/seller/${details.User.username}`
                    );
                    console.log("aaaaa", profile);
                    if (profile.data.header) {
                        setHasProfile(true);
                    }
                } catch (e) {
                    console.error(e);
                }

                // setLoading(false)
            }
        })();
    }, [details]);

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (!loading && !details.productId) {
        return <h1>Not Found!</h1>;
    }
    return (
        <Container className="mb-5">
            <div>
                <div className="details-card">
                    <Container
                        className="d-flex flex-column flex-md-row"
                        id="productInfoResponsive"
                    >
                        {details.Images.length > 0 ? (
                            <Carousel className="carousel-border">
                                {details.Images.map((img, i) => (
                                    <Carousel.Item key={i}>
                                        <img
                                            key={i}
                                            className="d-block w-100"
                                            src={`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${img.imageId}`}
                                            alt="Slides"
                                        />
                                        <div className="prod-pic-overlay">
                                            {" "}
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        ) : null}
                        <Container className="prod-details">
                            {/*TITLE */}
                            <div className="prod-name">
                                <p
                                    className={
                                        details.name.length > 50
                                            ? "long-name"
                                            : "short-name"
                                    }
                                >
                                    {details.name}
                                </p>
                            </div>

                            {/*PRICE AND SOLD BY */}
                            <div className="prod-price-seller">
                                <div className="price">
                                    <p>$ {details.price}</p>
                                </div>
                                <div className="seller-det">
                                    <p className="sold-by">Sold by: </p>
                                    <p className="username">
                                        <a
                                            href={`/seller/${details?.User.username}`}
                                        >
                                            {details?.User.username}
                                        </a>
                                    </p>
                                    {hasProfile ? (
                                        <Button
                                            href={`/seller/${details?.User.username}`}
                                        >
                                            Seller Profile
                                        </Button>
                                    ) : null}
                                </div>
                            </div>

                            {/*DESCRIPTION */}
                            <p className="prod-text">{details.description}</p>

                            {/*FOOTER */}
                            <div className="prod-foot">
                                {details.quantity > 0 ? (
                                    <div className="prod-buttons">
                                        <Link
                                            className="btn-margin"
                                            to={"/payment"}
                                            onClick={handleBuyNow}
                                        >
                                            <Button
                                                type="button"
                                                className="btn btn-success add-btn"
                                            >
                                                <span className="add-span">
                                                    Buy Now
                                                </span>
                                            </Button>
                                        </Link>
                                        <AddButton
                                            productId={details.productId}
                                            userId={userId}
                                        />
                                    </div>
                                ) : (
                                    <em>Not available right now</em>
                                )}
                            </div>
                        </Container>
                    </Container>
                </div>
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
                                                    <strong className="ml-5">
                                                        {rev.User?.username}
                                                    </strong>
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
                {userId === questions.id ? null : (
                    <div>
                        <Button onClick={() => handleQA("Question", undefined)}>
                            Make a question
                        </Button>
                        <hr></hr>
                    </div>
                )}
                <h3>Last questions</h3>
                <Container className="bg-light p-4">
                    {questions.resp &&
                        questions.resp.map((question, i) => (
                            <div key={i}>
                                <p className="mb-0">{question.question}</p>
                                {question.answer ? (
                                    <p className="ml-3" key={i}>
                                        {}
                                        <BsArrowReturnRight />
                                        &nbsp;{question.answer}
                                    </p>
                                ) : null}
                                <div>
                                    {userId === questions.id &&
                                    !question.answer ? (
                                        <Button
                                            onClick={() => {
                                                handleQA(
                                                    "Answer",
                                                    question.questionId
                                                );
                                            }}
                                        >
                                            Answer
                                        </Button>
                                    ) : null}
                                </div>

                                <hr></hr>
                            </div>
                        ))}
                </Container>
            </div>
        </Container>
    );
}

export default ProductDetails;
