import { useSelector, RootStateOrAny, useDispatch } from "react-redux"
import { searchProduct } from "../../redux/actions";
import './Pagination.css'

function Pagination(){
    const dispatch = useDispatch()
    const nameState = useSelector((store: RootStateOrAny) => store.name);
    const pagState = useSelector((store: RootStateOrAny) => store.products.pag);
    const tagState = useSelector((store: RootStateOrAny) => store.products.tag);
    const orderState = useSelector((store: RootStateOrAny) => store.products.order);
    const pagesState = useSelector((store: RootStateOrAny) => store.products.pages);
    const itemsState = useSelector((store: RootStateOrAny) => store.products.items);
    const hasPreviousPage = pagState > 0;
    const hasNextPage = pagState < pagesState - 1
    return(
        <div>
            <button className="btn btn-primary py-2 px-5 mr-3" id='bPagination'
            disabled={!hasPreviousPage}
            onClick={() => {
                dispatch(
                    searchProduct(nameState, itemsState, pagState - 1, tagState, orderState)
                )
            }}>
                {'Prev'}
            </button>
            <button className="btn btn-primary py-2 px-5 ml-3" id='bPagination'
            disabled={!hasNextPage}
            onClick={() => {
                dispatch(
                    searchProduct(nameState, itemsState, pagState + 1, tagState, orderState)
                )
            }}>
                {'Next'}
            </button>
        </div>
    )
}

export default Pagination