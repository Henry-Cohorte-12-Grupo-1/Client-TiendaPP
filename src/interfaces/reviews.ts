export interface Review {
    id: number,
    productId: string,
    review: string,
    score: number,
    userId: string
    User?: { username: string }
}