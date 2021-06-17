import IUserProduct from '../interfaces/userProducts'

export default interface IUserOrders {
    id: number,
    quantity: number,
    Product: IUserProduct
}