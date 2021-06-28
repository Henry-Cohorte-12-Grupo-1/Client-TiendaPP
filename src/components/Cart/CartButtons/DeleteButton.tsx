import axios from 'axios';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { url as URL } from '../../../api';
import { deleteItemFromCart } from '../../../redux/actions';
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
