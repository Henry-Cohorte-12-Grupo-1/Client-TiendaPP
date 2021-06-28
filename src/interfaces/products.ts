export interface IProducts {
    productId: string;
    name: string;
    image?: string;
    description: string;
    price: number;
    Category: ICategory;
    Images: IImgs[];
    quantity: number
}

interface IImgs {
    imageId: string
}
export interface ICategory {
    name: string
}
