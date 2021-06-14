import React, { useState, useEffect } from 'react'
import { IProduct, IError } from '../../interfaces/product'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './styles.scss'
import { Button, Col, Container, Form, Row, Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { url } from "../../api";
//AGREGAR USUARIO/ TIENE QUE ESTAR EN LA STORE DE REDUX

function ProductForm() {

    const [image, setImage] = useState<File>()
    const [imagesName, setImagesName] = useState<string[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [product, setProduct] = useState<IProduct>({
        name: '',
        description: '',
        price: 0,
        quantity: 1
    })
    const [errors, setErrors] = useState<IError>({
        name: true,
        description: true,
        price: true,
    })

    const history = useHistory();

    // useEffect(() => {
    //     (async () => {
    //         let resp = await axios.get(`${url}/categories`)
    //         let categoriesArray: string[] = resp.data.map((category: any) => category.name)
    //         setCategories(categoriesArray)
    //     })()
    // }, [])
    useEffect(() => {
        (async () => {
            let resp = await axios.get(`${url}/categories`)
            let categoriesArray: any[] = resp.data.map((category: any) => ({ name: category.name, categoryId: category.categoryId }))
            setCategories(categoriesArray)
            console.log(categoriesArray)
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
                joinedImage: imagesName.join(' - '),
                quantity: product.quantity,

            }
            console.log(newProduct)
            const response = await axios.post(`${url}/product`, newProduct)
                .catch(() => alert('No se creo el producto'))
            if (response) {
                alert('Producto creado');
                history.push(`/product/${response.data}`);
            }
        }
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        setProduct({
            ...product,
            //categoryId: (categories.findIndex(category => category === event.target.value) + 1),
            categoryId: parseInt(event.target.value)
        })
    }

    function handleDelete(i: number) {
        setImagesName(imagesName.filter(image => (image !== imagesName[i])))
    }

    return (
        <Container>
            <h1 className="mt-4">
                Create Product
            </h1>
            <Form className='p-5 border shadow'>
                <Row>
                    <Col md>
                        <Form.Group controlId="name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control className='label-success' type='input' placeholder="Name" name='name' onBlur={handleChange} />
                            {errors?.name ? <Form.Text className="text-muted">
                                Name can not be empty
                            </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name='description' placeholder="Description" onBlur={handleChange} />
                            {errors?.description ? <Form.Text className="text-muted">
                                Description can not be empty
                            </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='input' placeholder="$" name='price' onBlur={handleChange} />
                            </Col>
                            <Col>
                                <Form.Label>Quantity</Form.Label>
                                <input name='quantity' onBlur={handleChange} className="form-control" type='number' min="1" max="1000" defaultValue='1'></input>
                            </Col>
                        </Row>

                        {errors?.price ? <Form.Text className='text-muted'>
                            Price can not be empty
                        </Form.Text> : <Form.Text className='text-secondary'>&#160;</Form.Text>}



                        <br></br>
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" onChange={handleCategoryChange}>
                            <option value="" selected disabled hidden>Choose here</option>
                            {categories.map((category, i) => (
                                <option value={category.categoryId}>{category.name}</option>
                            ))}
                        </Form.Control>


                    </Col>
                    <Col md>
                        <div className="custom-file mt-2">
                            <label>Add image</label>
                            <input
                                type="file"
                                className="h6 flat w-100"
                                id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01"
                                onChange={imageChangeHandler} />
                        </div>
                        <Container>
                            {imagesName.length > 0 ?
                                <Carousel>
                                    {imagesName.map((name, i) => (
                                        <Carousel.Item key={i}>
                                            <Button className="carrousel-btn btn-primary" onClick={() => handleDelete(i)}>X</Button>
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
                        {(errors?.name === true || errors?.description === true || errors?.price === true || product.categoryId === undefined) ?
                            <Button className="mt-5 w-25" variant="primary" type="submit" disabled>Send</Button> :
                            <Button className="mt-5 w-25" variant="primary" type="submit" onClick={handleSubmit}>Send</Button>
                        }
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default ProductForm