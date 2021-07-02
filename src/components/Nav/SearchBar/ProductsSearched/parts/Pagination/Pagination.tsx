import "./Pagination.css";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { searchProduct } from "../../../../../../redux/products/productsActions";

function Pagination() {
    var page = 1
    var totalPages = 2

    const dispatch = useDispatch();
    const nameState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.name
    );
    const pagState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.products.pag
    );
    const tagState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.products.tag
    );
    const orderState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.products.order
    );
    const pagesState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.products.pages
    );
    const itemsState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.products.items
    );
    const hasPreviousPage = pagState > 0;
    const hasNextPage = pagState < pagesState - 1;
    return (
        <div>
            <div className="allmightContainer mb-4">
                <div className="paginationContainer">
                    {hasPreviousPage ? (
                        <button className="paginationPrev prev page-numbers" onClick={() => {
                            dispatch(
                                searchProduct(
                                    nameState,
                                    itemsState,
                                    pagState - 1,
                                    tagState,
                                    orderState
                                )
                            );
                        }}>{'< Prev'}</button>
                    ) : (
                        <button className="disabled paginationPrev">{'< Prev'}</button>
                    )}
                    <button className="paginationPage page-numbers current">{pagState+1}</button>
                    {hasNextPage ? (
                        <button className="paginationNext next page-numbers"                 
                            onClick={() => {
                            dispatch(
                                searchProduct(
                                    nameState,
                                    itemsState,
                                    pagState + 1,
                                    tagState,
                                    orderState
                                )
                            );
                        }}>{'Next >'}</button>
                    ) : (
                        <button className='disabled paginationNext' >{'Next >'}</button>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Pagination;
