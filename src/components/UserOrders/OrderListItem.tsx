
interface imgs {
    imageId: string
}
export default function OrderListItem(props: { name: string; status: string; price: number; productId?: string, images: imgs[], quantity: number; seller?: string | undefined }) {
    //console.log("image ID: ", props.images)
    // 
    return (

        <div className="row">
            <div className="col">
                <div>
                    <div className="card-body p-5 m-4 border shadow">
                        <div className="media">
                            <div className="sq align-self-center "> <img className="img-fluid my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0" src={`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${props.images[0].imageId}`} width="135" height="135" alt="product" /> </div>
                            <div className="media-body my-auto text-right">
                                <div className="row my-auto flex-column flex-md-row align-items-baseline">
                                    <div className="col my-auto">
                                        <h5 className="mb-0">{props.name}</h5>
                                    </div>
                                    <div className="col my-auto"> <p className="h6">Sold by: {props.seller} </p></div>
                                    <div className="col my-auto"> <p className="h6">Qty : {props.quantity}</p></div>
                                    <div className="col my-auto">
                                        <h4 className="mb-0">$ {props.price} </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-3 " />
                        <div className="row">
                            <div className="col-md-3 mb-3"> <p className="h6"> Status: {props.status}</p> </div>
                            <div className="col mt-auto">
                                <div className="media row justify-content-between ">
                                    <div className="col-auto text-right"><small className="text-right mr-sm-2"></small></div>
                                    <div className="flex-col">
                                        <a href={`/product/${props?.productId}`} className="btn btn-primary" id='colorB'>My Review</a>
                                    </div>
                                    <div className="col-auto flex-col-auto">
                                        <a href={`/product/${props?.productId}`} className="btn btn-primary" id='colorB'>Buy Again</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
