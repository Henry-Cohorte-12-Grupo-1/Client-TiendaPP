import './Products.css';

interface imgs {
    imageId: string
}
function ProductsCards(props: { name: string; price: number; image: string, productId?: string, images?: imgs[] }) {

    return (
        <div className="card" id='firstDiv'>
            <div id='imageSize'>
                <img className="card-img-top" src={props.images && props.images.length ? (`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${props.images[0].imageId}`) : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=6&m=922962354&s=612x612&w=0&h=_KKNzEwxMkutv-DtQ4f54yA5nc39Ojb_KPvoV__aHyU="} alt='not found' id='image' />
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