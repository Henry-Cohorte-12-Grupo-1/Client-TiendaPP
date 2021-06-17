import { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IProduct } from '../../interfaces/product';
import axios, { AxiosResponse } from 'axios';
import { url as URL } from '../../api';
import CartCard from '../CartCard/CartCard';
import './style.scss';

//redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../redux/reducers/index';

interface Props extends RouteComponentProps {
    userId: string;
}

function Cart(props: Props): ReactElement {
    //Constants
    const EMPTY = 0;
    const URL_GET_CART = URL + '/cart/getCart';

    //const { userId } = props;
    const userId = '6d2ba377-b219-4925-b6df-4cbc8575ce50';
    const totalAmount = 9291;

    const [cart, setCart] = useState([]);

    const getFullCart = async () => {
        await axios
            .post(URL_GET_CART, { userId })
            .then((res) => {
                //meter un map
                const normalizedArray = res.data.map((dataObj: any) => {
                    const Product = dataObj.Product;
                    return {
                        name: Product.name,
                        description: Product.description,
                        price: Product.price,
                        //images: Product.images,
                        categoryId: Product.categoryId,
                        quantity: Product.quantity,
                        //category: string,
                        //joinedImage: string,
                        //initialImages: string,
                        productId: Product.productId,
                    };
                });
                setCart((cart) => (cart = normalizedArray));
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        getFullCart();
        console.log('CART IS: ', cart);
    }, []);

    if (cart.length === EMPTY) {
        //cart is empty
        return <h1>You have not added items to your cart yet :(</h1>;
    } else {
        //cart has things
        return (
            <div>
                {cart.map((cartProduct: IProduct) => {
                    return (
                        <div key={cartProduct.productId}>
                            Im a card.
                            <CartCard key={cartProduct.productId} userId={userId} productData={cartProduct} />
                        </div>
                    );
                })}

                <hr />
                <div>
                    <h3>total is: {totalAmount}</h3>
                </div>
            </div>
        );
    }
}
export default Cart;
