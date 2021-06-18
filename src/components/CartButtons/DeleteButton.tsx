import axios from 'axios';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { url as URL } from '../../api';
import { deleteItemFromCart } from '../../redux/actions/';
interface Props {
    userId: string | undefined;
    productId: string | null | undefined;
    forceRender: any;
    render: boolean;
}

function DeleteButton(props: Props): ReactElement {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteItemFromCart(props.userId, props.productId));
        props.forceRender(!props.render);
    };
    return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteButton;
