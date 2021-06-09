import React, { useState, SyntheticEvent, useEffect } from 'react'
import IProduct from '../../interfaces/product'
import { Cloudinary, CloudinaryImage } from '@cloudinary/base'
import { useHistory } from 'react-router-dom'
// import { fill } from '@cloudinary/base/actions/resize'
import axios from 'axios'
import './styles.css'
import { Button, Col, Container, Form, Jumbotron, Row, Image, Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

//AGREGAR USUARIO/ TIENE QUE ESTAR EN LA STORE DE REDUX

function ProductForm() {

    const [image, setImage] = useState<File>()
    // const [imageName, setImageName] = useState<string>('')
    const [imagesName, setImagesName] = useState<string[]>([])
    // const [images, setImages] = useState<CloudinaryImage[]>([])
    const [imagesUrl, setImagesUrl] = useState<string[]>([])
    const [product, setProduct] = useState<IProduct>({
        name: '',
        description: '',
        price: 0,
    })
    const [errors, setErrors] = useState<IError>({
        name:true,
        description:true,
        price:true,
    })

    interface IError {
        name?: boolean,
        description?: boolean,
        price?: boolean,
    }

    const history = useHistory();

    // const cld = new Cloudinary({
    //     cloud: {
    //         cloudName: 'tiendapp'
    //     }
    // });
    // https://cloudinary.com/documentation/react2_quick_start#landingpage
    // myImage.resize(fill().width(250).height(250));


    useEffect(() => {
        (async () => {
            const formData = new FormData()
            if (image) {
                formData.append('file', image)
                formData.append('upload_preset', 'tiendapp')
                let resp = await axios.post('https://api.cloudinary.com/v1_1/tiendapp/image/upload', formData)
                setImagesName(imagesName => [...imagesName, resp.data.public_id])
                setImagesUrl(imagesUrl => [...imagesUrl, resp.data.url])
            }
        })()
    }, [image])


    const handleChange = (event: React.FormEvent<any>) => {
        if (event.target) {
            let tName = (event.target as HTMLButtonElement).name
            let tValue = (event.target as HTMLButtonElement).value
            console.log(tValue)
            setProduct({
                ...product,
                [tName]: tValue
            })
            if (tValue) {
                setErrors({
                    ...errors,
                    [tName]: false,
                })
            } else {
                setErrors({
                    ...errors,
                    [tName]: true
                })
                console.log(errors)
            }
        }
    }

    const imageChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmit = async (event: React.FormEvent<any>) => {
        event.preventDefault();
        console.log(errors)
            if (errors?.name === true || errors?.description === true || errors?.price === true) {
                alert('No se creo el producto')
            } else {

                const newProduct: IProduct = {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    images: imagesName
                }
                const response = await axios.post('http://localhost:3001/user', newProduct)
                    .catch(() => alert('No se creo el producto'))
                console.log(response)
                if (response) {
                    alert(response.data);
                    history.push('/client');
                }
            }
    }

    return (
        <Jumbotron style={{ width: '50%', margin: '75px auto' }}>
            <h1>Crear Producto</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nombre del producto</Form.Label>
                    <Form.Control type='input' placeholder="Name" name='name' onBlur={handleChange} />
                    {errors?.name ? <Form.Text className="text-muted">
                        Nombre no puede estar vacio
                    </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3} name='description' placeholder="Description" onBlur={handleChange} />
                    {errors?.description ? <Form.Text className="text-muted">
                        La descripcion no puede estar vacia
                    </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type='input' placeholder="$" name='price' onBlur={handleChange} />
                    {errors?.price ? <Form.Text className="text-muted">
                        Debe indicar un precio
                    </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                </Form.Group>


                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Enviar
                </Button>
            </Form>

            <div className="mb-3">
                <Form.File id="formcheck-api-regular">
                    {/* <Form.File.Label>Regular file input</Form.File.Label> */}
                    <Form.File.Input accept="image/png, image/jpeg" name='image' onChange={imageChangeHandler} />
                </Form.File>
            </div>

            <Carousel>
                {imagesName.map((name, i) => (
                    <Carousel.Item>
                        <img
                            key={i}
                            className="d-block w-100"
                            src={`http://res.cloudinary.com/tiendapp/image/upload/w_300,h_200,c_scale/${name}`}
                            alt="First slide"
                        />
                    </Carousel.Item>
                )
                )}
            </Carousel>
        </Jumbotron>
    )
}

export default ProductForm











    // useEffect(() => {
    //     setImages([
    //         ...images,
    //         cld.image(imageName)
    //     ])
    // }, [imageName])

