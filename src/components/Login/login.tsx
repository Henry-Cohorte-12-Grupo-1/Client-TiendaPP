import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { IErrorUser } from '../../interfaces/forms'

function Login() {

    let [user, setUser] = useState<string>()
    let [redirect, setRedirect] = useState<string>()
    const [errors, setErrors] = useState<IErrorUser>({
        email: true,
        pass: true
    })

    const handleChange = (event: React.FormEvent<any>) => {
        if (event.target) {
            let tName = (event.target as HTMLButtonElement).name
            let tValue = (event.target as HTMLButtonElement).value
            if (tValue) {
                setErrors({
                    ...errors,
                    [tName]: false,
                })
                if (tName === 'email') {
                    setUser(tValue)
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
                  {(errors?.email === true || errors?.pass === true) ?
                      <Button className="mt-5" variant="info" disabled>Log In</Button>:
                      <Button className="mt-5" variant="primary" onClick={handleSubmit}>Log In</Button>
                  }
              </Form>
          </Container>
      )
  }

export default Login