function ProductsCards(props: {name: string; price: number; image: string}){

    return(
        <div>
            <h2>{props.name}</h2>
            <h3>{props.price}</h3>
            <img>{props.image}</img>
        </div>
    )
}

export default ProductsCards