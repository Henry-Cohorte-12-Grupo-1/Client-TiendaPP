export default interface IUserProduct {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    Category: cat;
    Images: img[]
}

export interface cat {
    name: string;
}

export interface img {
    imageId: string;
}
