import axios from 'axios';
import swal from 'sweetalert'

function sweetAlertInput(title: string, buttonTxt: string, path: string, questionId?: string, userId?: string, productId?: string) {
    swal({
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
        //   .then(results => {
        //     return results.json();
        //   })
        .then(json => {
            swal(json.data).then(() => window.location.reload())
        })
}

export default sweetAlertInput