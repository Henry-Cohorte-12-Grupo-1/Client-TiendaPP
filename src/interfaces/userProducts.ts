export default interface IProduct {
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
    categoryId: string;
}

export interface img {
    imageId: string;
    productId: string
}

/*


categoryId: 3
createdAt: "2021-06-13T01:10:01.916Z"
description: "Haircutting kit"
name: "Conair Custom Cut 18pc Home Haircutting Kit"
price: "44"
productId: "3d56de88-5f25-433f-9c3c-1dfa30cce15a"
quantity: 0
updatedAt: "2021-06-13T01:10:01.916Z"
userId: "9de81b64-1c4a-49d7-b9c5-7554d1d35df2"


*/