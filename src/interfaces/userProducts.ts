import { Review } from "./reviews";

export default interface IUserProduct {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    Category: cat;
    Images: img[]
    User?: { username: string }
    Reviews: Review[]
}

export interface cat {
    name: string;
}

export interface img {
    imageId: string;
}
