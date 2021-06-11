import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

function Login() {
    const history = useHistory();

    let [user,setUser] = useState<string>()
    const [errors, setErrors] = useState<IError>({
        user: true,
        pass: true
    })

    interface IError {
        user?: boolean,
        pass?: boolean
    }

    const users = [{
        user: 'admin',
        pass: 'admin'
    }, {
        user: 'user',
        pass: 'user'
    }]

    const handleChange = (event: React.FormEvent<any>) => {
        if (event.target) {
            let tName = (event.target as HTMLButtonElement).name
            let tValue = (event.target as HTMLButtonElement).value
            if (tValue) {
                setErrors({
                    ...errors,
                    [tName]: false,
                })
                setUser(tValue)
            } else {
                setErrors({
                    ...errors,
                    [tName]: true
                })
            }

        }
    }

    const handleSubmit = () => {
    
        if(user==='admin'){
            history.push('/admin');
        }
        if(user==='admin'){
            history.push('/user');
        }
    }

    return (
        <Container style={{ width: '50%' }}>
            <br></br>
            <h2>Sign in</h2>
            <Form className='bg-warning p-5 rounded'>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className='text-secondary'>User</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" name='user' onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className='text-secondary'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='pass' onChange={handleChange}/>
                </Form.Group>
                {(errors?.user === true || errors?.pass === true ) ?
                    <input className="m-5 w-25"  disabled/> :
                    <input className="m-5 w-25" type="button"   onClick={handleSubmit}/>
                }
            </Form>
        </Container>
    )
}


export default Login