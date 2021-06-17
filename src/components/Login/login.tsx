import axios from 'axios'
import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import {IErrorUser} from '../../interfaces/forms'

function Login() {

    let [user, setUser] = useState<string>()
    let [pass, setPass] = useState<string>()
    let [redirect, setRedirect] = useState<string>()
    const [errors, setErrors] = useState<IErrorUser>({
        email: true,
        pass: true
    })

    const handleChange = (event: React.FormEvent<any>) => {
        if (event.target) {
            let tName = (event.target as HTMLButtonElement).name
            let tValue = (event.target as HTMLButtonElement).value

            console.log(tName, tValue);
            if (tValue) {
                setErrors({
                    ...errors,
                    [tName]: false,
                })
                if (tName === 'email') {
                    setUser(tValue)
                } else if (tName === 'pass'){
                    setPass(tValue)
                }
            } else {
                setErrors({
                    ...errors,
                    [tName]: true
                })
            }

        }
    }


    const handleSubmit = () => {
        console.log(user)
        if (user === 'admin') {
            setRedirect('/admin')
            console.log(redirect)
        }
        if (user) {
            setRedirect(`/user?username=${user}`)
            console.log('entró')
        }
    }

    if (redirect) {
        if (user === 'admin') {
            return <Redirect to="/admin" />
        }
        if (user) {
            return <Redirect to={redirect} />
        }
    }

    const handleSubmitTest = async () => {
        console.log(user, pass);
        const returnToken = await axios.post('http://localhost:3001/api/passportRegister/login', {
            email: user,
            password: pass,
        })
        console.log(returnToken.data)
        localStorage.setItem('token', returnToken.data.accessToken);
    }
  
    return (
          <Container className="p-5" >
              <br></br>
              <h2>Sign In</h2>
              <Form className='bg-light border shadow p-5 rounded'>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Emaik</Form.Label>
                      <Form.Control type="text" placeholder="Enter email" name='email'  onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label >Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" name='pass' onChange={handleChange} />
                  </Form.Group>
                  {(errors?.email === true || errors?.pass === true) ?
                      <Button className="mt-5" variant="primary" disabled>Log In</Button>:
                      <Button className="mt-5" variant="primary" onClick={handleSubmitTest}>Log In</Button>
                  }
              </Form>
          </Container>
      )
  }
export default Login