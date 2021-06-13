import React, { useState, SyntheticEvent, useEffect } from 'react'
import {IProduct} from '../../interfaces/product'
// import { Cloudinary, CloudinaryImage } from '@cloudinary/base'
import { useHistory } from 'react-router-dom'
// import { fill } from '@cloudinary/base/actions/resize'
import axios from 'axios'
import './styles.scss'
import { Button, Col, Container, Form, Jumbotron, Row, Image, Carousel, Alert, Badge } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

//AGREGAR USUARIO/ TIENE QUE ESTAR EN LA STORE DE REDUX


function ProductForm() {

    const [image, setImage] = useState<File>()
    const [imagesName, setImagesName] = useState<string[]>([])
    const [imagesUrl, setImagesUrl] = useState<string[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [carousel, setCarousel] = useState<boolean>(true)
    const [product, setProduct] = useState<IProduct>({
        name: '',
        description: '',
        price: 0,
        quantity:1
    })
    const [errors, setErrors] = useState<IError>({
        name: true,
        description: true,
        price: true,
    })

    interface IError {
        name?: boolean,
        description?: boolean,
        price?: boolean,
    }

    const history = useHistory();


    useEffect(() => {
        (async () => {
            let resp = await axios.get('http://localhost:3001/categories')
            let categoriesArray: string[] = resp.data.map((category: any) => category.name)
            setCategories(categoriesArray)
        })()
    }, [])

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
        if (errors?.name === true || errors?.description === true || errors?.price === true) {
            alert('No se creo el producto')
        } else {

            const newProduct: IProduct = {
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                images: imagesName,
                quantity:product.quantity,

            }
            console.log(newProduct)
            const response = await axios.post('http://localhost:3001/product', newProduct)
                .catch(() => alert('No se creo el producto'))
            console.log(response)
            if (response) {
                alert(response.data);
                history.push('/client');
            }
        }
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        setProduct({
            ...product,
            categoryId: (categories.findIndex(category => category === event.target.value)+1)
        })
    }

    function handleDelete(i: number) {
        setImagesName(imagesName.filter(image => (image !== imagesName[i])))
        // setCarousel(false)
        // setCarousel(true)
    }

    return (
        <Container>
            <h1 className='text-secondary'>
                Crear producto
            </h1>

            <Form className='bg-warning p-5 rounded'>
                <Row>
                    <Col md>
                        <Form.Group controlId="name">
                            <Form.Label className='text-secondary'>Nombre del producto</Form.Label>
                            <Form.Control className='label-success' type='input' placeholder="Name" name='name' onBlur={handleChange} />
                            {errors?.name ? <Form.Text className="text-muted">
                                Nombre no puede estar vacio
                            </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label className='text-secondary'>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} name='description' placeholder="Description" onBlur={handleChange} />
                            {errors?.description ? <Form.Text className="text-muted">
                                La descripcion no puede estar vacia
                            </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                        </Form.Group>



                        <Row>
                            <Col>
                            <Form.Label className='text-secondary'>Precio</Form.Label>
                                <Form.Control type='input' placeholder="$" name='price' onBlur={handleChange} />
                            </Col>
                            <Col>
                            <Form.Label className='text-secondary'>Cantidad</Form.Label>
                            <input name='quantity' onBlur={handleChange} className="form-control" type='number' min="1" max="1000" defaultValue='1'></input>
                            </Col>
                        </Row>

                        {errors?.price ? <Form.Text className='text-muted'>
                            Debe indicar un precio
                        </Form.Text> : <Form.Text className='text-secondary'>&#160;</Form.Text>}



                        <br></br>
                        <Form.Control as="select" onChange={handleCategoryChange}>
                            <option value="" selected disabled hidden>Choose here</option>
                            {categories.map((category, i) => (
                                <option value={categories[i]}>{category}</option>
                            ))}
                        </Form.Control>

                    </Col>
                    <Col md>
                        <div className="custom-file mt-3">
                            <input
                                type="file"
                                className="h6 bg-secondary flat w-100"
                                id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01"
                                onChange={imageChangeHandler} />
                            {/* <label className="custom-file-label" htmlFor="inputGroupFile01">Selecciona una imagen</label> */}
                        </div>
                       <Container>
                       {imagesName.length > 0 ?
                            <Carousel>
                                {imagesName.map((name, i) => (
                                    <Carousel.Item key={i}>
                                        <Button className="carrousel-btn btn-secondary" onClick={() => handleDelete(i)}>X</Button>
                                        <img
                                            key={i}
                                            className="carrousel-img"
                                            src={`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${name}`}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                )
                                )}
                            </Carousel> :
                            null}
                        </Container>    
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center" md>
                        {(errors?.name === true || errors?.description === true || errors?.price === true || product.category === undefined) ?
                            <Button className="m-5 w-25" variant="secondary" type="submit" disabled>Enviar</Button> :
                            <Button className="m-5 w-25" variant="secondary" type="submit" onClick={handleSubmit}>Enviar</Button>
                        }
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default ProductForm