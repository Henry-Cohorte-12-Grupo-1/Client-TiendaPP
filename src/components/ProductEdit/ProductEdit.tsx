import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { IProduct, ICategories } from '../../interfaces/product'
import {IErrorProduct}  from '../../interfaces/forms'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './styles.scss'
import { Button, Col, Container, Form, Row, Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { url } from "../../api";
import ImgCarousel from '../ImgCarousel/ImgCarousel'

interface ICarouselProps {
    index?: any,
    imagesName?: any,
    setIndex(a: any): any,
    setImage(a: any): any,
    setImagesName(a: any): any
}

const ProductEdit: React.FC<ICarouselProps> = () => {
    const [index, setIndex] = useState<number>(0)
    const [initialImages, setInitialImages] = useState<string>("")
    const [image, setImage] = useState<File>()
    const [imagesName, setImagesName] = useState<string[]>([])
    const [categories, setCategories] = useState<ICategories[]>([])
    const [obj, setObj] = useState<any>()
    const [product, setProduct] = useState<IProduct>({
        name: '',
        description: '',
        price: 0,
        quantity: 1,
    })
    const [errors, setErrors] = useState<IErrorProduct>({
        name: true,
        description: true,
        price: true,
    })

    const history = useHistory();

    const carouselProps = {index, imagesName, setIndex, setImage, setImagesName}

    let location = useLocation()

    let id = new URLSearchParams(location.search).get('id')


    useEffect(() => {
        (async () => {
            let resp = await axios.get(`${url}/product/?product=${id}`)
            console.log(resp)
            setProduct({
                ...product,
                name: resp.data.name,
                description: resp.data.description,
                price: resp.data.price,
                quantity: resp.data.quantity,
                categoryId: resp.data.categoryId,
                images: resp.data.Images,
                productId: id
            })
            let imgArr: string[] = []
            resp.data.Images?.forEach((i: any) => {
                imgArr.push(i.imageId)
            })

            setInitialImages(imgArr.join(' - '))

            setErrors({
                name: false,
                description: false,
                price: false,
            })
        })()
    }, [])//eslint-disable-line


    useEffect(() => {
        console.log('Product images', product.images)
        console.log('Images name', imagesName)
        let imgArr: string[] = []
        product.images?.forEach((i: any) => {
            imgArr.push(i.imageId)
        })
        setImagesName(imgArr)

    }, [product.images])//eslint-disable-line


    useEffect(() => {
        (async () => {
            let resp = await axios.get(`${url}/categories`)
            let categoriesArray: ICategories[] = resp.data.map((category: any) => ({ name: category.name, id: category.categoryId }))
            setCategories([...categories, ...categoriesArray])


        })()
    }, [])//eslint-disable-line


    useEffect(() => {
        // console.log(categories.find(category => category.id === product.categoryId).name)
        setObj(categories.find(category => category.id === product.categoryId)?.name)
    }, [categories])

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

    const handleSubmit = async (event: React.FormEvent<any>) => {
        event.preventDefault();
        if (errors?.name === true || errors?.description === true || errors?.price === true) {
            alert('error')
        } else {

            const newProduct: IProduct = {
                name: product.name,
                description: product.description,
                price: product.price,
                categoryId: product.categoryId,
                joinedImage: imagesName.join(' - '),
                quantity: product.quantity,
                initialImages: initialImages,
                productId: product.productId
            }
            console.log(newProduct)
            const response = await axios.put(`${url}/product`, newProduct)
                .catch(() => alert('error'))
            if (response) {
                alert('Updated Product');
                history.push(`/product/${response.data}`);
            }
        }
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        setProduct({
            ...product,
            categoryId: (categories.find(category => category.name === event.target.value)?.id)
        })
    }

    if (!product.name) {
        return (
            <div></div>
        )
    } else
        return (
            <Container>
                <h1 className="mt-4">
                    Edit Product
                </h1>
                <Form className='border shadow p-5'>
                    <Row>
                        <Col md>
                            <Form.Group controlId="name">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control className='label-success' type='input' placeholder="Name" name='name' defaultValue={product.name} onBlur={handleChange} />
                                {errors?.name ? <Form.Text className="text-muted">
                                    Name can not be empty
                                </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name='description' placeholder="Description" defaultValue={product.description} onBlur={handleChange} />
                                {errors?.description ? <Form.Text className="text-muted">
                                    Description can not be empty
                                </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control value={product.price} name='price' onChange={handleChange} />
                                </Col>
                                <Col>
                                    <Form.Label>Quantity</Form.Label>
                                    <input value={product.quantity} name='quantity' onChange={handleChange} className="form-control" type='number' min="0" max="1000" ></input>
                                </Col>
                            </Row>

                            {errors?.price ? <Form.Text className='text-muted'>
                                Price can not be empty
                            </Form.Text> : <Form.Text>&#160;</Form.Text>}

                            <br></br>
                            <Form.Label>Category</Form.Label>

                            <Form.Control as="select" onChange={handleCategoryChange}>
                                <option value="" selected disabled hidden>Choose here</option>
                                {categories.map((category, i) => (
                                    <option value={categories[i].name}>{category.name}</option>
                                ))}
                            </Form.Control>

                        </Col>
                        <Col md>
                            <ImgCarousel {...carouselProps}/>
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

export default ProductEdit;