import axios from "axios";
import swal from "sweetalert";

async function sweetAlertInput(
    title: string,
    buttonTxt: string,
    path: string,
    questionId?: string,
    userId?: string,
    productId?: string
) {
    console.log("inside sweetAlert");
    const alert = await swal({
        text: title,
        content: {
            element: "input",
        },
        button: {
            text: buttonTxt,
            closeModal: true,
        },
    } as any);

    const request = async (name: any) => {
        /*
        if (!name) {
            console.log("name is:", name);
            throw new Error();
        }
        */
        if (userId) {
            return await axios.post(path, {
                question: name,
                userId: userId,
                productId: productId,
            });
        } else {
            return await axios.post(path, {
                answer: name,
                questionId: questionId,
            });
        }
    };

    if (alert) {
        return await request(alert);
    }
}

export default sweetAlertInput;
