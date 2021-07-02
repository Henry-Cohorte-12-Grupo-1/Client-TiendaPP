import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import jwtDecode from 'jwt-decode';
import isStrongPassword from 'validator/lib/isStrongPassword'
import { url } from "../../api";
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function Login() {

    interface IPasswords {
        pass?: string,
        rpass?: string
    }

    interface IColors {
        pass?: string,
        rpass?: string
    }

    interface IErrors {
        pass?: boolean,
        rpass?: boolean
    }

    const history = useHistory();

    const [colors, setColors] = useState<IColors>({})
    const [errors, setErrors] = useState<IErrors>()
    const [passwords, setPasswords] = useState<IPasswords>()

    const handleChange = (event: any) => {
        setPasswords({
            ...passwords,
            [event.target.name]: event.target.value
        })


        if (event.target.name === 'pass') {
            setErrors({
                ...errors,
                pass: !isStrongPassword(event.target.value, {
                    returnScore: false,
                    minLength: 8,
                    minLowercase: 0,
                    minUppercase: 0,
                    minNumbers: 0,
                    minSymbols: 0,
                    pointsPerUnique: 1,
                    pointsPerRepeat: 0.5,
                    pointsForContainingLower: 10,
                    pointsForContainingUpper: 10,
                    pointsForContainingNumber: 10,
                    pointsForContainingSymbol: 10
                })
            })
        }

        console.log("Passwords -->", passwords)
    }

    useEffect(() => {

        if (passwords?.pass === passwords?.rpass) {
            setErrors({ ...errors, rpass: false })
        } else {
            setErrors({ ...errors, rpass: true })
        }

    }, [passwords])//eslint-disable-line



    useEffect(() => {
        console.log(colors)
        if (errors?.pass) {
            setColors({
                ...colors,
                pass: 'secondary',
            })
        } else {
            setColors({
                ...colors,
                pass: 'primary',
            })
        }

    }, [errors?.pass]) // eslint-disable-line

    useEffect(() => {
        if (errors?.rpass) {
            setColors({
                ...colors,
                rpass: 'secondary',
            })
        } else {
            setColors({
                ...colors,
                rpass: 'primary',
            })
        }
    }, [errors?.rpass]) // eslint-disable-line


    const handleSubmit = async () => {
        const token: any = localStorage.token ? jwtDecode(localStorage.token) : false;
        const userId: string = token ? token.id : 'guest';
        console.log(userId)
        let resp = await axios.put(`${url}/user/passReset`, { pass: passwords?.pass, userId: userId })
        swal(resp.data)
        console.log(resp)
        if (resp.data === 'succesfully updated') {
            history.push(`/login`);
        }
    }

    return (

        <Container className="p-5" >
            <br></br>
            <h2>Set new password</h2>
            <Form className='bg-light border shadow p-5 rounded'>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control className={`border-${colors.pass} border-2`} type="password" name='pass' onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label >Repeat Password</Form.Label>
                    <Form.Control className={`border-${colors.rpass} border-2`} type="password" name='rpass' onChange={handleChange} />
                </Form.Group>

                {(errors?.pass === true || errors?.rpass === true || errors?.rpass === undefined) ?
                    <Button className="mt-3" variant="info" disabled>Log In</Button> :
                    <Button className="mt-3" variant="primary" onClick={handleSubmit}>Log In</Button>
                }
            </Form>
        </Container>
    )
}

export default Login