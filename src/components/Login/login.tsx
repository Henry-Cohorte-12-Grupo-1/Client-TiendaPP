
import { url as URL } from '../../api';
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { IErrorUser } from '../../interfaces/forms'

import { url } from "../../api";
import { useHistory } from "react-router-dom";
import { IProduct } from "../../interfaces/product";
import swal from 'sweetalert'

import glogo from '../../assets/glogo.png';
import githubImage from '../../assets/githubImage.png';
import styles from './login.module.css';
import isStrongPassword from 'validator/lib/isStrongPassword'
import isEmail from 'validator/lib/isEmail'
import { color } from '@cloudinary/base/qualifiers/background'

function Login() {


    interface IColors {
        email?: string,
        pass?: string
    }

    const history = useHistory();

    let [email, setEmail] = useState<string>();
    let [password, setPassword] = useState<string>();
    let [invalid, setInvalid] = useState<boolean>();

    const [errors, setErrors] = useState<IErrorUser>({
        email: true,
        pass: true,
    });

    const [colors, setColors] = useState<IColors>({})

    const handleChange = (event: React.FormEvent<any>) => {
        setInvalid(false);
        if (event.target) {
            let tName = (event.target as HTMLButtonElement).name;
            let tValue = (event.target as HTMLButtonElement).value;
            // console.log(tName,tValue)
            if (tName === 'pass') {
                setPassword(tValue)
                setErrors({
                    ...errors,
                    pass: !isStrongPassword(tValue, {
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

            if (tName === 'email') {
                setEmail(tValue)
                setErrors({
                    ...errors,
                    email: !isEmail(tValue)
                })
            }
        }
    };


    useEffect(() => {
        console.log('aca', email, password)
        if (email) {

            if (errors?.email === true) {
                console.log('entro', colors)
                setColors({
                    ...colors,
                    email: 'secondary',
                })
            }
            else {
                setColors({
                    ...colors,
                    email: 'primary',
                })
            }
        }


    }, [email])

    useEffect(() => {
        if (password) {

            if (errors?.pass === true) {
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
        }
    }, [password])

    /*
    const handleSubmitTest = async () => {
        const returnToken = await axios.post('http://localhost:3001/api/passportRegister/login', {
            email: user,
            password: pass,
        })
        localStorage.setItem('token', returnToken.data.accessToken);
    
        const payloadToken : any = localStorage.token ? jwtDecode(localStorage.token) : false;
    
        if (payloadToken.admin){
            setRedirect('/admin')
        } else {
            setRedirect(`/user?username=${payloadToken.username}`)
        }
        
    }
    
    if (redirect) {
        if (localStorage.token) {
            return <Redirect to={redirect} />
    */

    const handleSubmit = async () => {
        console.log({ email: email, pass: password });

        let localCart: string = localStorage.getItem("cart") || "[]";

        const resp = await axios
            .post(`${url}/login`, {
                email: email,
                pass: password,
                cart: JSON.parse(localCart),
            })
            .catch((err) => console.log(err));

        console.log(resp)

        if (resp) {
            console.log(resp.data.reset)
            if (resp.data.reset === true) {
                localStorage.setItem("token", resp.data.token);
                swal('You need to reset your password').then(() => history.push('/login/passReset'))
            } else {

                localStorage.setItem("token", resp.data.token);
                if (resp.data.message === "User") {
                    swal("Welcome");
                    history.push("/home");
                }
                if (resp.data.message === "Admin") {
                    console.log("entro admin");
                    history.push("/adminValidation");
                }
                if (resp.data.message === "Disabled") {
                    swal("Your Account has not been validated yet, please check your mail");
                }
                if (resp.data.message === "User or password are incorrect") {
                    swal("User or password are incorrect");
                    localStorage.removeItem("token");
                }
            }
        } else swal("network error");
    };

    const googleLogin = () => {
        window.open(`${URL}/auth/google`, "_self")
    }

    const githubLogin = () => {
        window.open(`${URL}/auth/google`, "_self");
    }


    return (
        <Container className="p-4">
            <h2 className="text-center">Login</h2>
            <Form className="bg-light border shadow p-5 mb-4 rounded">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className={`border-${colors.email} border-2`}
                        type="text"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleChange}
                    />
                    {errors?.email ?
                        <Form.Label className='mt-1'>Email is invalid</Form.Label>
                        : null}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className={`border-${colors.pass} border-2`}
                        type="password"
                        placeholder="Enter Password"
                        name="pass"
                        onChange={handleChange}
                    />
                    {errors?.pass ?
                        <Form.Label className='mt-1'>Password is too short (Make sure it's at least 8 characters)</Form.Label>
                        : null}
                </Form.Group>


                {errors?.email === true ||
                    errors?.pass === true ||
                    invalid === true ? (
                    <Button className="mt-3" variant="info" disabled>
                        Log In
                    </Button>
                ) : (
                    <Button
                        className="mt-3"
                        variant="primary"
                        onClick={handleSubmit}
                    >
                        Log In
                    </Button>
                )}
                <br></br>
                {invalid ? (
                    <label className="mt-3">Invalid email or password </label>
                ) : null}
                <div className={styles.loginForm} id="containerGoogle">
                    <h5> Or Login With Google </h5>
                    <div className={styles.googleContainer} onClick={googleLogin}>
                        <img src={glogo} alt="Google Icon" />
                        <p>Login With Google</p>
                    </div>
                    <h5> Or GitHub </h5>
                    <div className={`${styles.googleContainer} ${styles.githubContainer}`} onClick={githubLogin}>
                        <img src={githubImage} alt="Github Icon" />
                        <p>Login With Github</p>
                    </div>
                </div>

            </Form>
        </Container>
    );
}

export default Login;

