import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { IProduct, ICategories } from '../../interfaces/product'
import { IErrorProduct } from '../../interfaces/forms'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import { StoreType } from '../../redux/reducers/index';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { url } from "../../api";
import ImgCarousel from '../ImgCarousel/ImgCarousel'
import swal from 'sweetalert'
import { useDispatch, useSelector } from "react-redux";
import { bringSellerProfile } from '../../redux/actions';
import SellerProfile from "../../interfaces/sellerProfile";
import jwtDecode from "jwt-decode";


interface ICarouselProps {
    index?: any,
    imagesName?: any,
    setIndex(a: any): any,
    setImage(a: any): any,
    setImagesName(a: any): any
}

const SellerProfileForm: React.FC<ICarouselProps> = (props: any) => {

    const token: any = localStorage ? jwtDecode(localStorage.token) : false;
    const userId = token.id
    const dispatch = useDispatch()

    const [sellerProfile, setSellerProfile] = useState<SellerProfile>({ userId: userId, header: "", description: "", images: [] })
    //const [sellerProfile, setSellerProfile] = useState<SellerProfile>({ userId: userId, header: "", description: "", images: [] })


    const userName = props.match.params.userName





    useEffect(() => {
        dispatch(bringSellerProfile(userName))
    }, [])//eslint-disable-line


    const seller = useSelector<StoreType, SellerProfile>(
        (state) => state.sellerProfile
    );
    console.log("SELLER --->", seller)



    const handleChange = (event: any) => {
        if (event.target) {
            setSellerProfile({
                ...sellerProfile,
                [event.target.name]: event.target.value
            })
        }
    }

    const handleSubmit = async (event: React.FormEvent<any>) => {
        event.preventDefault();
        await axios.post(`${url}/seller`, sellerProfile);
        swal("COSO UPDATED")
    }



    return (
        <Container>
            <h1 className="mt-4">
                Edit or Create Seller Profile
            </h1>
            <Form className='border shadow p-5' onSubmit={handleSubmit}>
                <Row>
                    <Col md>
                        <Form.Group controlId="name">
                            <Form.Label>Header</Form.Label>
                            <Form.Control className='label-success' type='input' placeholder="Header" name='header' defaultValue={seller.header} onBlur={handleChange} />
                            {/* {errors?.name ? <Form.Text className="text-muted">
                                    Header can not be empty
                                </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>} */}
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name='description' placeholder="Description" defaultValue={seller.description} onBlur={handleChange} />
                            {/* {errors?.description ? <Form.Text className="text-muted">
                                    Description can not be empty
                                </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>} */}
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit">Create</Button>

            </Form>
        </Container>
    )
}

export default SellerProfileForm;