import CSS from 'csstype'; 
import './Products.css';

function ProductsCards(props: {name: string; price: number; image: string}){

    return(
        <div className="card" id='firstDiv'>
            <img className="card-img-top" src={props.image} alt="Image not found" />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">${props.price}</p>
                <a href="#" className="btn btn-primary">Buy</a>
            </div>
        </div>
    )
}

export default ProductsCards