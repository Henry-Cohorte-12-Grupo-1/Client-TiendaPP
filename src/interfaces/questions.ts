export interface IQuestions {
    user?:string,
    question?:string,
    answer?:string,
    productId?:string,
    questionId?:string
}


export interface IQuestAndId {
    resp?: IQuestions[],
    id?: string
}