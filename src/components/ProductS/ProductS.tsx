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
              <img src={props.image ? props.image : "https://media.istockphoto.com/photos/gun-picture-id534156339?k=6&m=534156339&s=612x612&w=0&h=W897KCMseZvYskj_0ekRvx93Gx5RLtgfiysaahw5YcI="} alt="Not available" width="300" height="210"/>
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


