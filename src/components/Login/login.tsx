import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import {IErrorUser} from '../../interfaces/forms'
import { url } from "../../api";
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Login() {

    const history = useHistory();

    let [email, setEmail] = useState<string>()
    let [password, setPassword] = useState<string>()
    let [invalid, setInvalid] = useState<boolean>()
    const [errors, setErrors] = useState<IErrorUser>({
        email: true,
        pass: true
    })

    const handleChange = (event: React.FormEvent<any>) => {
        setInvalid(false)
        if (event.target) {
            let tName = (event.target as HTMLButtonElement).name
            let tValue = (event.target as HTMLButtonElement).value
            if (tValue) {
                setErrors({
                    ...errors,
                    [tName]: false,
                })
                if (tName === 'email') {
                    setEmail(tValue)
                }
                if (tName === 'pass') {
                    setPassword(tValue)
                }
            } else {
                setErrors({
                    ...errors,
                    [tName]: true
                })
            }
        }
    }


    const handleSubmit = async() => {
        console.log({email:email,pass:password})
        const resp = await axios.post(`${url}/login`,{email:email,pass:password}).catch(err=>console.log(err))

        if(resp){
            console.log(resp.data.message)
        if(resp.data.message==='User'){
                alert('Welcome')
                history.push('/home');
 
        } 
        if(resp.data.message==='Admin'){
            console.log('entro admin')
            history.push('/adminValidation');
        }
        if(resp.data.message==='Disabled'){
            alert('Account Disabled, please contact support')
        }
        if(resp.data.message==='User or password are incorrect'){
            setInvalid(true)
        }
        } else alert('network error')
    }

    return (

          <Container className="p-5" >
              <br></br>
              <h2>Sign In</h2>
              <Form className='bg-light border shadow p-5 rounded'>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="text" placeholder="Enter email" name='email'  onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label >Password</Form.Label>
                      <Form.Control type="password" placeholder="Enter Password" name='pass' onChange={handleChange} />
                  </Form.Group>

                  {(errors?.email === true || errors?.pass === true || invalid===true) ?
                      <Button className="mt-3" variant="info" disabled>Log In</Button>:
                      <Button className="mt-3" variant="primary" onClick={handleSubmit}>Log In</Button>
                    }
                    <br></br>
                    {invalid?<label className='mt-3'>Invalid email or password </label>:null}


              </Form>
          </Container>
      )
  }

export default Login