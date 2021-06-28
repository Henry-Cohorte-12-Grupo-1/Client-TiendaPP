import { ReactElement, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../interfaces/product";
import { StoreType } from "../../redux/reducers";
import DeleteButton from "../CartButtons/DeleteButton";
import './PaymentCard.scss';

interface Props {
  userId?: string;
  productData: IProduct;
  forceRender: any;
  render: boolean;
}

export default function PaymentCard(props: Props): ReactElement {
    //CONSTANTS
    const URL_CART_SET_QUANTITY = URL + "/cart/setCartItemQuantity";

    //PROPS
    //const userId = '6d2ba377-b219-4925-b6df-4cbc8575ce50';
    const { userId, productData, forceRender, render } = props;

    //redux store
    const dispatch = useDispatch();
    const cart = useSelector<StoreType, IProduct[]>((state) => state.cart);

    //STATES
    const [quantity, setQuantity] = useState(
        quantityShower(productData.productId)
    );

    function quantityShower(productId: any) {
        for (const each of cart) {
            if (productId === each.productId) {
                return each.quantity;
            }
        }
    }
  }

  //SIN EL AWAIT NO RENDERIZA EN ORDEN -

  return (
    <Container className=" paymentCardContainer ">
        {/* imagen */}
        <div className="paymentCardImage">
            <img
                // className="img-fluid my-auto align-self-center"
                src={
                    productData.images
                        ? `http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${productData.images[0]}`
                        : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=6&m=922962354&s=612x612&w=0&h=_KKNzEwxMkutv-DtQ4f54yA5nc39Ojb_KPvoV__aHyU="
                }
                width="135"
                height="135"
                alt="product"
            />

            {/* nombre y cantidad */}
        </div>
        {/* <div className="media-body my-auto text-right"> */}
            <div className="paymentCardInfo">
                    <h5 className="">{productData.name}</h5>
                    <h5 className="">Qty: {productData.quantity}</h5>
            </div>
    //SIN EL AWAIT NO RENDERIZA EN ORDEN -

    return (
        <Container className=" paymentCardContainer ">
            {/* imagen */}
            <div className="paymentCardImage">
                <img
                    // className="img-fluid my-auto align-self-center"
                    src={
                        productData.images
                            ? `http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${productData.images[0]}`
                            : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=6&m=922962354&s=612x612&w=0&h=_KKNzEwxMkutv-DtQ4f54yA5nc39Ojb_KPvoV__aHyU="
                    }
                    width="135"
                    height="135"
                    alt="product"
                />

                {/* nombre y cantidad */}
            </div>
            {/* <div className="media-body my-auto text-right"> */}
                <div className="paymentCardInfo">
                        <h5 className="">{productData.name}</h5>
                        <h5 className="">Qty: {productData.quantity}</h5>
                </div>

                    {/*QUANTITY INPUT*/}

                    {/* Precio */}
                    {/* <div className="col my-auto"> */}
                    <div className="paymentCardPrice"> 
                        <h4 className="">
                            $ {(productData.price * (quantity || 1)).toFixed(2)}{" "}
                        </h4>
                    </div>
       
        </Container>
    );
}
