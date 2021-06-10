import CSS from 'csstype'; 
import './Products.css';

function ProductsCards(props: {name: string; price: number; image: string, id?:number}){

    return(
        <div className="card" id='firstDiv'>
            <div id='imageSize'>
            <img className="card-img-top" src={props.image} alt='image not found' id='image' />
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">${props.price}</p>
                <a href={`/product/${props?.id}`} className="btn btn-primary" id='colorB'>See details</a>
            </div>
        </div>
    )
}

export default ProductsCards