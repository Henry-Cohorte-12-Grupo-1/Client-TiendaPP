export interface SqlImg {
    url: string;
    imageId: string;
}

export interface ReviewObj {
    score: number;
    review: string;
}

export default interface detailedProduct {
    Images: SqlImg[];
    Reviews: ReviewObj[];
    categoryId: number;
    description: string;
    name: string;
    price: string;
    productId: string;
    userId: string;
    quantity: number

}