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
        .then(async name => {
            if (!name) throw null;
            console.log(name)
            if (userId) {
                return await axios.post(path, { question: name, userId: userId, productId: productId })
            } else {
                return await axios.post(path, { answer: name, questionId: questionId })
            }
        })
        //   .then(results => {
        //     return results.json();
        //   })
        .then(json => {
            swal(json.data).then(() => /* window.location.reload() */console.log("holi"))
        })
}

export default sweetAlertInput