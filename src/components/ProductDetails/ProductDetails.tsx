import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../../redux/reducers"
import { useEffect } from "react"
import { productInfo } from "../../redux/actions"
import { RouteComponentProps } from "react-router-dom"
import obj from '../../interfaces/products'

//defino el tipado para match.params.id
interface MatchParams {
    id: string;
}
interface Props extends RouteComponentProps<MatchParams> {
}

function ProductDetails(props: Props) {

    const id = props.match.params.id
    const details = useSelector<StoreType, obj>((state) => state.productDetails)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(productInfo(id));
        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h4>
                {details.name}
            </h4>
            <img src={details.image} alt="" />
            <h4>${details.price}</h4>
            <p>{details.description}</p>
        </div>
    )
}
export default ProductDetails