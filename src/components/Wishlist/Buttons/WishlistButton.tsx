import { ReactElement } from "react";
import swal from 'sweetalert'
import axios from "axios";
import { url } from "../../../api";
import { useHistory } from "react-router";
import heart from '../../../assets/heart1.svg'
import heartUnfilled from '../../../assets/heart2.svg'

interface Props {
    userId?: string;
    productId: string;
    isWished?: boolean
}

function WishlistButton(props: Props): ReactElement {

    const history = useHistory()
    const { userId, productId } = props;
    const wishItem = {
        userId,
        productId
    }

    const handleAdd = async (e: any) => {
        e.preventDefault();
        const resp = await axios.post(`${url}/wishlist/add`, wishItem);
        swal(resp.data).then(() => history.go(0))
    }
    const handleRemove = async (e: any) => {
        e.preventDefault();
        const resp = await axios.post(`${url}/wishlist/delete`, wishItem);
        swal(resp.data).then(() => history.go(0))

    }
    if (!userId) {
        return (
            <div></div>
        )
    }
    if (props.isWished) {
        return (
            <button type="button" className="btn" onClick={handleRemove} >
                <img src={heart} width="30" height="30" alt="remove heart" />
            </button>
        )
    } else {
        return (
            <button type="button" className="btn" onClick={handleAdd}>
                <img src={heartUnfilled} width="30" height="30" alt="add heart" />
            </button>
        )
    }
}
export default WishlistButton;
