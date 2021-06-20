import { ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IProduct } from '../../interfaces/product';
import { useSelector } from 'react-redux';
//import './style.scss';

//redux stuff
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/actions';
import { StoreType } from '../../redux/reducers';
import swal from 'sweetalert';

interface Props {
    userId: string;
    productId: string;
}

function AddButton(props: Props): ReactElement {
    //props
    const { userId, productId } = props;

    //redux store
    const dispatch = useDispatch();

    //FUNCTIONALITY
    const onClick = () => {
        //dispatch
        (async () => {
            await dispatch(addProductToCart(userId, productId));
            swal('The product was added to your cart')
        })(); //iif sacado de product detail
    };

    ///////////////////////////////////////
    //The render/////////////
    ///////////////////////////////////////
    return (
        <div>
            <button type="button" className="btn btn-success" onClick={onClick}>
                {'Add to cart!'}
            </button>
        </div>
    );
}
export default AddButton;
