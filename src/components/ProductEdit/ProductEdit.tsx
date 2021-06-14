import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { IProduct, ICategories, IError } from '../../interfaces/product'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './styles.scss'
import { Button, Col, Container, Form, Row, Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductEdit() {
    const [image, setImage] = useState<File>()
    const [imagesName, setImagesName] = useState<string[]>([])
    const [categories, setCategories] = useState<ICategories[]>([])
    const [product, setProduct] = useState<IProduct>({
        name: '',
        description: '',
        price: 0,
        quantity: 1,
    })
    const [errors, setErrors] = useState<IError>({
        name: true,
        description: true,
        price: true,
    })

    const history = useHistory();

    let location = useLocation()
    let id = new URLSearchParams(location.search).get('id')


    useEffect(() => {
        (async () => {
            let resp = await axios.get(`http://localhost:3001/product/?product=${id}`)
            setProduct({
                ...product,
                name: resp.data.name,
                description: resp.data.description,
                price: resp.data.price,
                quantity: resp.data.quantity,
                categoryId: resp.data.categoryId,
                images: resp.data.Images
            })
            setImagesName([...imagesName, ...resp.data.Images])
            setErrors({
                name: false,
                description: false,
                price: false,
            })
        })()
    }, [])

    useEffect(() => {
        (async () => {
            let resp = await axios.get('http://localhost:3001/categories')
            let categoriesArray: ICategories[] = resp.data.map((category: any) => ({ name: category.name, id: category.categoryId }))
            setCategories([...categories, ...categoriesArray])
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
                categoryId: product.categoryId,
                images: imagesName,
                quantity: product.quantity,

            }
            const response = await axios.post('http://localhost:3001/product', newProduct)
                .catch(() => alert('No se creo el producto'))
            if (response) {
                alert(response.data);
                history.push('/client');
            }
        }
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        setProduct({
            ...product,
            categoryId: (categories.findIndex(category => category.name === event.target.value) + 1)
        })
    }

    function handleDelete(i: number) {
        setImagesName(imagesName.filter(image => (image !== imagesName[i])))
    }

    return (
        <Container>
            <h1 className="mt-4">
                Crear producto
            </h1>
            <Form className='border shadow p-5'>
                <Row>
                    <Col md>
                        <Form.Group controlId="name">
                            <Form.Label>Nombre del producto</Form.Label>
                            <Form.Control className='label-success' type='input' placeholder="Name" name='name' defaultValue={product.name} onBlur={handleChange} />
                            {errors?.name ? <Form.Text className="text-muted">
                                Nombre no puede estar vacio
                            </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} name='description' placeholder="Description" defaultValue={product.description} onBlur={handleChange} />
                            {errors?.description ? <Form.Text className="text-muted">
                                La descripcion no puede estar vacia
                            </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type='input' placeholder="$" name='price' onBlur={handleChange} defaultValue={product.price} />
                            </Col>
                            <Col>
                                <Form.Label>Cantidad</Form.Label>
                                <input defaultValue={product.quantity} name='quantity' onBlur={handleChange} className="form-control" type='number' min="0" max="1000" ></input>
                            </Col>
                        </Row>

                        {errors?.price ? <Form.Text className='text-muted'>
                            Debe indicar un precio
                        </Form.Text> : <Form.Text>&#160;</Form.Text>}

                        <br></br>
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control value={categories[0] ? (categories[categories.findIndex(category => category.id === product.categoryId)].name) : undefined} as="select" onChange={handleCategoryChange}>
                            <option value="" selected disabled hidden>Choose here</option>
                            {categories.map((category, i) => (
                                <option value={categories[i].name}>{category.name}</option>
                            ))}
                        </Form.Control>

                    </Col>
                    <Col md>
                        <div className="custom-file mt-2">
                            <label>Agregar Imagen</label>
                            <input
                                type="file"
                                className="h6 flat w-100"
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
                        {console.log(errors, product)}
                        {(errors?.name === true || errors?.description === true || errors?.price === true || product.categoryId === undefined) ?
                            <Button className="mt-5 w-25" variant="primary" type="submit" disabled>Enviar</Button> :
                            <Button className="mt-5 w-25" variant="primary" type="submit" onClick={handleSubmit}>Enviar</Button>
                        }
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}





export default ProductEdit;