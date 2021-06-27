import axios from 'axios';
import swal from 'sweetalert'

async function sweetAlertInput(title: string, buttonTxt: string, path: string, questionId?: string, userId?: string, productId?: string) {
    await swal({
        text: title,
        content: {
            element: "input"
        },
        button: {
            text: buttonTxt,
            closeModal: false,
        },
    } as any)
        .then(name => {
            if (!name) throw null;
            console.log(name)
            if (userId) {
                return axios.post(path, { question: name, userId: userId, productId: productId })
            } else {
                return axios.post(path, { answer: name, questionId: questionId })
            }
        })
        .then(json => {
            swal(json.data).then(() => console.log("holi"))
        })
}

export default sweetAlertInput