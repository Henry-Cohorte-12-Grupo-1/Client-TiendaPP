
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../../redux/cart/cartActions";
interface Props {
    userId: string | undefined;
    productId: string | null | undefined;
    forceRender: any;
    render: boolean;
}

function DeleteButton(props: Props): ReactElement {
    const dispatch = useDispatch();

    //PROPS
    const { userId, productId, forceRender, render } = props;

    const handleDelete = async () => {
        await dispatch(deleteItemFromCart(userId, productId));
        forceRender(!render);
    };
    return (
        <button onClick={handleDelete} className="btn btn-outline-secondary">
            Delete
        </button>
    );
}

export default DeleteButton;
