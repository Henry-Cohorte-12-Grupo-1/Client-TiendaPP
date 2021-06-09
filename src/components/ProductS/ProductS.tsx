import { Link } from 'react-router-dom';

interface propsObj {
    image: string,
    name: string,
    description: string,
    price: string,
}

export default function ProductS (props: propsObj) {

  return (
        <div>
            <div>
              <img src={props.image ? props.image : "https://images-na.ssl-images-amazon.com/images/I/81vZaXuCQ-L._SL1500_.jpg"} alt="Not available" width="300" height="210"/>
            </div> 
            <div>
              <h3>Name: {props.name}</h3>
              <p>Description: {props.description && props.description}</p>
              <p>Price: {props.price}</p>
              <Link to={`/Home`}> <button > Back to Home </button></Link>
            </div>
        </div>
  )
};


