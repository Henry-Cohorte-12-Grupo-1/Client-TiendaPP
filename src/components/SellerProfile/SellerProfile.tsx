import { ReactElement, useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/product';
import CartCard from '../CartCard/CartCard';


//redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../redux/reducers/index';
import { bringSellerProfile, loadCartFromDB, loadGuestCart } from '../../redux/actions';
import jwtDecode from 'jwt-decode';
import SellerProfile from '../../interfaces/sellerProfile';

function SellerProfileForm(props: any): ReactElement {

    const userName = props.match.params.userName
    console.log(userName)

    const dispatch = useDispatch()
    const seller = useSelector<StoreType, SellerProfile>(
        (state) => state.sellerProfile
    );

    useEffect(() => {
        dispatch(bringSellerProfile(userName))
    }, [])//eslint-disable-line
    let header = seller.header
    let description = seller.description

    return (
        <div>
            <div>
                <h2>{header}</h2>
            </div>

            <div>
                <h5>{description}</h5>
            </div>
        </div>
    )
}


export default SellerProfileForm;

