import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bringWishlist } from "../../../redux/wishlist/wishlistActions";
import { url } from "../../../api";

import axios from "axios";
import heart from "../../../assets/heart1.svg";
import heartUnfilled from "../../../assets/heart2.svg";

interface Props {
    userId?: any; //arreglar
    productId: string;
    isWished?: boolean;
}

function WishlistButton(props: Props): ReactElement {
    const dispatch = useDispatch();

    const { userId, productId } = props;
    const wishItem = {
        userId,
        productId,
    };

    const handleWish = async (wishValue: boolean) => {
        let wishParam = wishValue ? "add" : "delete"; //wishParam deberia ser una tupla.
        await axios.post(`${url}/wishlist/${wishParam}`, wishItem);
        dispatch(bringWishlist(userId));
    };

    if (!userId) {
        return <div></div>;
    }
    if (props.isWished) {
        return (
            <button
                type="button"
                className="btn"
                onClick={() => handleWish(false)}
            >
                <img src={heart} width="30" height="30" alt="remove heart" />
            </button>
        );
    } else {
        return (
            <button
                type="button"
                className="btn"
                onClick={() => handleWish(true)}
            >
                <img
                    src={heartUnfilled}
                    width="30"
                    height="30"
                    alt="add heart"
                />
            </button>
        );
    }
}
export default WishlistButton;
