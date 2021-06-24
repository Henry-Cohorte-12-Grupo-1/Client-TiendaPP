import { Link } from 'react-router-dom';
import WishlistButton from '../Wishlist/Buttons/WishlistButton';
import './Products.css';

interface imgs {
    imageId: string;
}
function ProductsCards(props: {
    userId?: string;
    name: string;
    price: number;
    image: string;
    productId: string;
    images?: imgs[];
    editId?: string;
    wished?: boolean;
}) {
    console.log('image ID: ', props.images);

    return (
        <div className="card" id="firstDiv">
            <div id="imageSize">
                <Link to={`/product/${props?.productId}`}>

                    <img

                        className="card-img-top"
                        src={
                            props.images && props.images.length
                                ? `http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${props.images[0].imageId}`
                                : 'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=6&m=922962354&s=612x612&w=0&h=_KKNzEwxMkutv-DtQ4f54yA5nc39Ojb_KPvoV__aHyU='
                        }
                        alt="not found"
                        id="image"
                    />
                </Link>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">${props.price}</p>
                {props.editId && (
                    <div>
                        <a href={props.editId} className="btn btn-primary" id="colorB">
                            Edit
                        </a>
                    </div>
                )}
                <a href={`/product/${props?.productId}`} className="btn btn-primary" id="colorB">
                    Details
                </a>
                {props.userId !== "guest" ?
                    <WishlistButton
                        userId={props.userId}
                        productId={props.productId}
                        isWished={props.wished} /> : null
                }
            </div>
        </div>
    );
}

export default ProductsCards;
