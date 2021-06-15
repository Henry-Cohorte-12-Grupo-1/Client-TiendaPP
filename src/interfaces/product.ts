export interface IProduct {
    name: string,
    description: string,
    price: number,
    images?: string[]
    categoryId?: number | undefined
    quantity: number,
    category?: string
    joinedImage?: string
    initialImages?: string
    productId?: string | null | undefined
}


export interface ICategories {
    name: string,
    id: number,
}