import { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IProduct } from '../../interfaces/product';
//import './style.scss';

//redux stuff
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/actions';

interface Props {
    userId: string;
    productId: string;
}

function AddButton(props: Props): ReactElement {
    //redux store
    const dispatch = useDispatch();

    const { userId, productId } = props;

    //FUNCTIONALITY
    const onClick = () => {
        //dispatch
        (async () => {
            await dispatch(addProductToCart(userId, productId));
        })(); //iif sacado de product detail
    };

    ///////////////////////////////////////
    //The render/////////////
    ///////////////////////////////////////
    return (
        <div>
            <button type="button" className="btn btn-success" onClick={onClick}>
                Add to Cart
            </button>
        </div>
    );
}
export default AddButton;
