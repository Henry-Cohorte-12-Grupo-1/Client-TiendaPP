import { useSelector } from "react-redux";
import { StoreType } from '../../redux/reducers/index'
import ProductS from '../ProductS/ProductS';


export function ProductsSearched() {

    interface propsObj {
        image: string,
        name: string,
        description: string,
        price: string,
    }

  const products = useSelector<StoreType, propsObj[]>((state) => state.products);
    
  return (
    <div>
        {products.length === 0 ? (
            <h1>No Products to show</h1>
                  ) : (
            <div>
              {products.map( (el): any => <ProductS
                image={el.image}
                name={el.name}
                description={el.description}
                price={el.price}
              />)}
            </div>
         )}
    </div>
  );
}
