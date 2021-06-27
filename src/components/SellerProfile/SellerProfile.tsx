import { ReactElement, useEffect, useState } from 'react';
import './style.scss'
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../redux/reducers/index';
import { bringSellerProfile, bringUserProducts, bringWishlist } from '../../redux/actions';
import SellerProfile from '../../interfaces/sellerProfile';
import { Carousel } from 'react-bootstrap';
import IUserProduct from '../../interfaces/userProducts';
import ProductsCards from '../ProductsCards/ProductsCards';
import jwtDecode from 'jwt-decode';
import obj from '../../interfaces/products';

function SellerProfileForm(props: any): ReactElement {

    const userName = props.match.params.userName
    const token: any = localStorage.token ? jwtDecode(localStorage.token) : false;
    const userId = token?.id ? token.id : 'guest';

    const dispatch = useDispatch()



    const seller = useSelector<StoreType, SellerProfile>(
        (state) => state.sellerProfile
    );


    const userProducts = useSelector<StoreType, IUserProduct[]>((state) => state.userProducts)
    const wishlist = useSelector<StoreType, obj[]>(
        (state) => state.wishlist
    );
    const [index, setIndex] = useState(0);

    useEffect(() => {
        dispatch(bringSellerProfile(userName));
        dispatch(bringUserProducts(userName));
        if (userId !== "guest") {
            dispatch(bringWishlist(userId));
        }
    }, [])//eslint-disable-line

    if (seller.error) {
        return (
            <h2>AAAAAAAAA</h2>
        )
    }

    let header = seller.header
    let description = seller.description


    const handleSelect = (selectedIndex: any) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="sellerCont">
            {seller.images?.length ? (
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    id="ContainerD"
                >
                    {/*CAROUSEL ITEM*/}
                    {seller.images.map((i: string) => {
                        return (
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    id="cContainer"
                                    src={`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${i}`}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        )
                    }
                    )
                    }
                </Carousel>
            )
                : null}
            <div>
                <h2>{header}</h2>
            </div>

            <div>
                <h5>{description}</h5>
            </div>
            <div className="d-flex justify-content-center flex-wrap ml-0 mr-0'">
                {userProducts?.length ? userProducts.map(p => {
                    return (
                        <ProductsCards
                            name={p.name}
                            price={p.price}
                            images={p.Images}
                            image=""
                            productId={p.productId}
                            userId={userId}
                            wished={wishlist.some(w => w.productId === p.productId)}
                        />
                        //url = { p }
                    )
                }) : null}
            </div>

        </div>
    )
}


export default SellerProfileForm;

