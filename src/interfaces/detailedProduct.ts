interface SqlImg {
    url: string;
    imageId: string;
}

interface ReviewObj {
    score: number;
    review: string;
    User?: { username: string }
}

export default interface IDetailedProduct {
    Images: SqlImg[];
    Reviews: ReviewObj[];
    categoryId: number;
    description: string;
    name: string;
    price: number;
    productId: string;
    userId: string;
    quantity: number;
    User:{username:string};
}