import './Products.css';
import { Container, Carousel } from 'react-bootstrap'

interface imgs {
    imageId: string
}
function ProductsCards(props: { name: string; price: number; image: string, productId?: string, images?: imgs[] }) {

    return (
        <div className="card" id='firstDiv'>
            <div id='imageSize'>
                <img className="card-img-top" src={props.images && props.images.length ? (`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${props.images[0].imageId}`) : ""} alt='not found' id='image' />
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">${props.price}</p>
                <a href={`/product/${props?.productId}`} className="btn btn-primary" id='colorB'>Details</a>
            </div>
        </div>
    )
}

export default ProductsCards