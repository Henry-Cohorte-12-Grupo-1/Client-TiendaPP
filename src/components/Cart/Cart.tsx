import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/reducers';
import { useEffect, useState } from 'react';
import { productInfo } from '../../redux/actions';
import { RouteComponentProps } from 'react-router-dom';
import detailedProduct from '../../interfaces/detailedProduct';
import './style.scss';
import React from 'react';

//defino el tipado para match.params.id
interface MatchParams {
    id: string;
}
interface Props extends RouteComponentProps<MatchParams> {
    userId: string;
}
function Cart(props: Props) {
    const id = props.match.params.id;
    const details = useSelector<StoreType, detailedProduct>((state) => state.productDetails);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await dispatch(productInfo(id));
            setLoading(false);
        })();
    }, []);

    return <h1>CartComponent</h1>;
}
export default Cart;
