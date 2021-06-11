import { useSelector } from "react-redux";
import { StoreType } from '../../redux/reducers/index'
import ProductsCards from '../ProductsCards/ProductsCards';


export default function ProductsSearched() {

    interface propsObj {
        image: string,
        name: string,
        description: string,
        price: number,
    }

    interface ProductsType {
      products: propsObj[],
      pages: string,
   }

  const products = useSelector<StoreType, ProductsType>((state) => state.products);
  
    
  return (
    <div>
        { products.products && products.products.length === 0 ? (
            <h1>No Products to show</h1>
                  ) : (
            <div>
              {products.products.map( (el): any => <ProductsCards
                image={el.image}
                name={el.name}
                price={el.price}
              />)}
            </div>
         )}
    </div>
  );
}
