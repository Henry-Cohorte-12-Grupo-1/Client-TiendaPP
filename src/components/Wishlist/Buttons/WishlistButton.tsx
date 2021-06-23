import { ReactElement } from "react";
import swal from 'sweetalert'
import axios from "axios";
import { url } from "../../../api";
import { useHistory } from "react-router";

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
            <button className="btn btn-primary" onClick={handleRemove} >Remove</button>
        )
    } else {
        return (
            <button className="btn btn-primary" onClick={handleAdd}>Add</button>
        )
    }
}
export default WishlistButton;
