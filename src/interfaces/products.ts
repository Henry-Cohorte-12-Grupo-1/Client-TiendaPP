export default interface obj {
    productId: string;
    name: string;
    image?: string;
    description: string;
    price: number;
    Category: category;
    Images: imgs[];
    quantity: number
}

export interface imgs {
    imageId: string
}
export interface category {
    name: string
}
