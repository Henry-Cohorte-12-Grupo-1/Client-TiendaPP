export interface IProduct {
    name: string,
    description: string,
    price: number,
    images?: Array<string>
    categoryId?: number | undefined
    quantity: number,
    category?: string
}


export interface IError {
    name?: boolean,
    description?: boolean,
    price?: boolean,
}

export interface ICategories {
    name: string,
    id: number,
}