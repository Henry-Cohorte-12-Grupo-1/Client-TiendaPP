import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'


function Login() {

    let [user, setUser] = useState<string>()
    let [redirect, setRedirect] = useState<string>()
    const [errors, setErrors] = useState<IError>({
        user: true,
        pass: true
    })

    interface IError {
        user?: boolean,
        pass?: boolean
    }


    const handleChange = (event: React.FormEvent<any>) => {
        if (event.target) {
            let tName = (event.target as HTMLButtonElement).name
            let tValue = (event.target as HTMLButtonElement).value
            if (tValue) {
                setErrors({
                    ...errors,
                    [tName]: false,
                })
                if (tName === 'user') {
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

    console.log(user)


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

    console.log(redirect)

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
              <h2>Ingresar</h2>
              <Form className='bg-light border shadow p-5 rounded'>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Usuario</Form.Label>
                      <Form.Control type="text" placeholder="Enter email" name='user' onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label >Contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Password" name='pass' onChange={handleChange} />
                  </Form.Group>
                  {(errors?.user === true || errors?.pass === true) ?
                      <Button className="mt-5" variant="primary" disabled>Ingresar</Button>:
                      <Button className="mt-5" variant="primary" onClick={handleSubmit}>Ingresar</Button>
                  }
              </Form>
          </Container>
      )
  }
export default Login