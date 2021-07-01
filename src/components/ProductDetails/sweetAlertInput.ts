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
    if (!name) throw new Error();
    console.log(name);
    if (userId) {
      return await axios.post(path, {
        question: name,
        userId: userId,
        productId: productId,
      });
    } else {
      return await axios.post(path, { answer: name, questionId: questionId });
    }
  };
  return await request(alert);
}

export default sweetAlertInput;
