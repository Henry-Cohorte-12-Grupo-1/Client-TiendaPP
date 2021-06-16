import IUserProduct from '../interfaces/userProducts'

export interface IUserOrders {
    id: number,
    quantity: number,
    productId: IUserProduct,
}