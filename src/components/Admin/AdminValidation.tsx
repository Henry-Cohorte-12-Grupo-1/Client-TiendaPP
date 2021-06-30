import { Button, Container, Form } from "react-bootstrap";
import { useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from "axios";
import { url } from "../../api";
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function AdminValidation() {
  const history = useHistory();
  let token: any = jwtDecode(localStorage.token)

  console.log(token)
  interface IDigits {
    num0?: string,
    num1?: string,
    num2?: string,
    num3?: string,
    num4?: string,
    num5?: string,
  }

  const [code, setCode] = useState<IDigits>({
    num0: '',
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
  })

  let inputs = ['', '', '', '', '', '']
  // let prevCode:any = []
  const handleChange = (event: any) => {
    // const index = parseInt(event.target.name)

    // inputs[index] = event.target.value
    // setCode([...code,inputs[index]])
    const { name, value } = event.target;
    console.log(name, value)
    setCode({
      ...code,
      [name]: value
    })
  }

  const handleSumbit = async (event: any) => {

    const joinedCode = parseInt(`${code.num0}${code.num1}${code.num2}${code.num3}${code.num4}${code.num5}`)
    if (joinedCode === token.key) {
      let resp = await axios.get(`${url}/login/adminValidate`, {headers: { Authorization: `Bearer ${token}`}}).catch((err: any) => console.log(err))
      if (resp) {
        if (resp.data.token) {
          console.log(resp.data)
          localStorage.setItem('token', resp.data.token);
          history.push('/home');
        } else swal('invalid token')
      } else swal('network error')
    } else swal('Invalid code number')
  }


  return (
    <div className='mt-5'>
      <Container className=' p-5 mt-25 border shadow w-75 text-center'>
        <h4>Check your mail and enter your code below:</h4>
        <Form.Group className="row d-flex justify-content-center p-5">
          {inputs.map((input, i) => (

            //   <Form.Control name={'num'+i.toString()} key={i} id='formInput' className='m-2 p-1 col-1 text-center'  type="text" maxLength={1} onChange={handleChange}></Form.Control>  
            <Form.Control name={`num${i}`} key={i} id='formInput' className='m-2 p-1 col-1 text-center' type="text" maxLength={1} onChange={handleChange}></Form.Control>

          ))}
        </Form.Group>
        {(code.num0 === '' || code.num1 === '' || code.num2 === '' || code.num3 === '' || code.num4 === '' || code.num5 === '') ?
          <Button onClick={handleSumbit} disabled>Send</Button> :
          <Button onClick={handleSumbit}>Send</Button>
        }
      </Container>
    </div>
  );
}

export default AdminValidation;
