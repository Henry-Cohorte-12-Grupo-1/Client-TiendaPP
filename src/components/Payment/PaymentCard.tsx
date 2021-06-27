import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../interfaces/product";
import { StoreType } from "../../redux/reducers";
//import { setCartItemQuantity } from "../../redux/actions";
//import DeleteButton from "../CartButtons/DeleteButton";

interface Props {
  userId?: string;
  productData: IProduct;
  forceRender: any;
  render: boolean;
}

export default function PaymentCard(props: Props): ReactElement {
  //CONSTANTS
  //const URL_CART_SET_QUANTITY = URL + "/cart/setCartItemQuantity";

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

  //SIN EL AWAIT NO RENDERIZA EN ORDEN -

  return (
    <div className="row">
      <div className="col d-flex justify-content-evenly">
        <div className="card-body p-5 m-4 border">
          <div className="media">
            <div className="sq align-self-center ">
              <img
                className="img-fluid my-auto align-self-center"
                src={
                  productData.images
                    ? `http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${productData.images[0]}`
                    : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=6&m=922962354&s=612x612&w=0&h=_KKNzEwxMkutv-DtQ4f54yA5nc39Ojb_KPvoV__aHyU="
                }
                width="135"
                height="135"
                alt="product"
              />
            </div>
            <div className="media-body my-auto text-right">
              <div className="row my-auto flex-column flex-md-row align-items-baseline">
                <div className="col my-auto">
                  <h5 className="mb-0">{productData.name}</h5>
                  <h5 className="mb-0">Qty: {productData.quantity}</h5>
                </div>

                {/*QUANTITY INPUT*/}

                {/*QUANTITY*/}
                <div className="col my-auto">
                  <h4 className="mb-0">
                    $ {(productData.price * (quantity || 1)).toFixed(2)}{" "}
                  </h4>
                </div>

                {/*DELETE BUTTON*/}

                {/* <div className="col my-auto">
                                <button onClick={onIncrement}> + </button>
                                <p className="h6">Qty : {quantity}</p>
                                <button onClick={onDecrement}> - </button>
                            </div> */}
                {/*PRICE*/}
              </div>
            </div>
          </div>
          {/* <div className="row justify-content-between">
                    <div className="justify-content-between col-auto flex-col">
                        <a href={`/product/${productData.productId}`} className="btn btn-primary" id="colorB">
                            Details
                        </a>
                    </div>
                </div> */}
        </div>
      </div>
    </div>
  );
}
