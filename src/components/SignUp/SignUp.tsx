import { useState } from "react"
import { Alert, Button, Col, Container, Form } from "react-bootstrap"
import { IColors, IErrorUser, IUser, IValidationError } from "../../interfaces/forms"
import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'
import isAlpha from 'validator/lib/isAlpha'
import ReCAPTCHA from 'react-google-recaptcha'
import { useEffect } from "react"
import axios from "axios"
import { url } from "../../api";
import { useHistory } from 'react-router-dom'


function Signup() {
    const history = useHistory();

    const [user, setUser] = useState<IUser>()
    const [errors, setErrors] = useState<IErrorUser>({ captcha: true })
    const [colors, setColors] = useState<IColors>({})
    const [validationError, setValidationError] = useState<IValidationError>()

    useEffect(() => {

        setColors({
            firstName: (errors.firstName ? 'secondary' : user?.firstName ? 'primary' : ''),
            lastName: (errors.lastName ? 'secondary' : user?.lastName ? 'primary' : ''),
            email: (errors.email ? 'secondary' : user?.email ? 'primary' : ''),
            pass: (errors.pass ? 'secondary' : user?.pass ? 'primary' : ''),
            username: (errors.username ? 'secondary' : user?.username ? 'primary' : ''),
        })
    }, [errors]) // eslint-disable-line

    useEffect(() => {
        if (user?.repeatPass) {
            if (user?.repeatPass === user?.pass) {
                setColors({
                    ...colors,
                    repeatPass: 'primary',
                })
            } else {
                setColors({
                    ...colors,
                    repeatPass: 'secondary',
                })
            }
        }

    }, [user?.repeatPass]) // eslint-disable-line

    function onCaptchaChange(value: any) {
        setErrors({ ...errors, captcha: false })
    }

    const handleChange = (event: React.FormEvent<any>) => {
        const { name, value } = event.target as HTMLButtonElement

        setUser({
            ...user,
            [name]: value
        })

        if (name === 'firstName' || name === 'lastName') {
            console.log(isAlpha(value))
            setErrors(
                {
                    ...errors,
                    [name]: !isAlpha(value)
                })
        }

        if (name === 'email') {
            setErrors(
                {
                    ...errors,
                    [name]: !isEmail(value)
                })
            setValidationError({ ...validationError, email: undefined })
        }

        if (name === 'username') {
            console.log(value)
            setErrors(
                {
                    ...errors,
                    [name]: (value.length < 4 ? true : false)
                })
            setValidationError({ ...validationError, userName: undefined })
        }


        if (name === 'pass') {
            setErrors(
                {
                    ...errors,
                    [name]: !isStrongPassword(value, {
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
    }


    const handleSubmit = async () => {
        console.log(user)
        let resp = await axios.post(`${url}/usercreate`, user)
        console.log(resp.data)
        if (resp.data === 'successfully created') {
            history.push(`/login`);
        }
        if (resp.data === 'username must be unique') {
            setErrors({ ...errors, username: true })
            setValidationError({ ...validationError, userName: 'Username already in use' })
        }
        if (resp.data === 'email must be unique') {
            setErrors({ ...errors, email: true })
            setValidationError({ ...validationError, email: 'Email already in use' })
        }
    }

    return (
        <Container className="p-5" >
            <br></br>
            <h2>Sign Up</h2>
            <Form className='bg-light border shadow p-5 rounded'>

                <Form.Group className="row" controlId="formBasicEmail">
                    <Col>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className={`border-${colors.firstName} border-2`} type="email" placeholder="Enter First Name" name='firstName' onChange={handleChange} />
                    </Col>

                    <Col>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className={`border-${colors.lastName} border-2`} type="email" placeholder="Enter Last Name" name='lastName' onChange={handleChange} />
                    </Col>
                </Form.Group>


                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className={`border-${colors.username} border-2`} type="email" placeholder="Enter email" name='username' onChange={handleChange} />
                </Form.Group>


                <Form.Group className="row" controlId="formBasicPassword">
                    <Col>
                        <Form.Label >Password</Form.Label>
                        <Form.Control className={`border-${colors.pass} border-2`} type="password" placeholder="Enter Password" name='pass' onChange={handleChange} />
                    </Col>
                    <Col>
                        <Form.Label >Repeat Password</Form.Label>
                        <Form.Control className={`border-${colors.repeatPass} border-2`} type="password"  name='repeatPass' onChange={handleChange} />
                    </Col>

                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className={`border-${colors.email} border-2`} type="email" placeholder="Enter email" name='email' onChange={handleChange} />
                </Form.Group>



                <div className="d-flex justify-content-center">
                    <ReCAPTCHA 
                        sitekey='6LfoLjYbAAAAACmIqXq5XgsgJMLxiwGMcw1OMhMk'
                        onChange={onCaptchaChange}
                    />
                </div>

        <div className="d-flex justify-content-center">
                {(errors?.firstName === true ||
                    errors?.lastName === true ||
                    errors?.repeatPass === true ||
                    errors?.email === true ||
                    errors?.pass === true ||
                    errors?.captcha === true ||
                    errors?.username === true ||
                    !user?.firstName ||
                    !user?.lastName ||
                    !user?.email ||
                    !user?.pass ||
                    !user?.repeatPass ||
                    user?.pass !== user?.repeatPass
                ) ?
                    <div className="text-center">

                            <Button className="mt-3 column" variant="info" disabled>Sign Up</Button>

                            {validationError?.email ? <Alert variant="warning" className="p-2 m-3">{validationError.email}</Alert> : null}
                            {validationError?.userName ? <Alert variant="warning" className="p-2 m-3">{validationError.userName}</Alert> : null}
                    </div> :
                    <Button className="mt-3" variant="primary" onClick={handleSubmit}>Sign Up</Button>
                }
                </div>

            </Form>

        </Container>
    )
}

export default Signup