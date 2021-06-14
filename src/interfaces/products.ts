export default interface obj {
    productId: string;
    name: string;
    image?: string;
    description: string;
    price: number;
    Category: category;
    Images: imgs[]
}

export interface imgs {
    imageId: string
}
export interface category {
    name: string
}
