import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { url } from "../../api";
import { IUsers } from '../../interfaces/users'
import {DialogAlert} from '../Dialog/DialogAlert'

function Admin() {
    const [actualCategory, setActualCategory] = useState<string>('')
    const [category, setCategory] = useState<string>()
    const [categories, setCategories] = useState<string[]>([])
    const [initialCategories, setInitial] = useState<string[]>([])
    const [deleteCategories, setDeleteCategories] = useState<string[]>([])
    const [users, setUsers] = useState<IUsers[]>()

    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            var resp = await axios.get(`${url}/categories`)
            var categoriesArray: string[] = resp.data.map((category: any) => category.name)
            setCategories(categoriesArray)
            setInitial(categoriesArray)
            console.log(categoriesArray)

            var rusers = await axios.get(`${url}/user/getallusers`)
            console.log(rusers)
            let users = (rusers.data.map((user: any) => ({ username: user.username, userId: user.userId, role: user.roleId })))
            // let usersName = (rusers.data.map((user: any) => user.username))
            // setUsers({
            //     ...users,
            //     userId: usersId
            // })
            setUsers(users)

            console.log(users)
        })()
    }, [])

    const handleSubmit = async (event: React.FormEvent<any>) => {
        event.preventDefault()
        let sendCategories: string[] = []
        categories.map(category => initialCategories.includes(category) ? null : sendCategories.push(category))
        // console.log(sendCategories.join(' - '))
        // console.log(deleteCategories.join(' - '))

        let newCategories = sendCategories.join(' - ')
        let oldCategories = deleteCategories.join(' - ')

        let sendObject = {
            newCategories: newCategories,
            oldCategories: oldCategories
        }

        console.log(sendObject)

        const response = await axios.put(`${url}/updateCategories`, sendObject)
            .catch(() => alert('No se creo el producto'))
        console.log(response)
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value)
    }

    const addCategory = (event: any) => {
        event.preventDefault()
        if (category && !categories.includes(category)) {
            setCategories([...categories, category])
        }
    }

    const handleDelete = (event: any) => {
        setOpen(true)
        setActualCategory(event.target.value)

    }


    const handleClose = (actualCategory:string,CloseEvent:string) => {
        setOpen(false);

        if(CloseEvent === 'agree'){
            console.log('entro')
            setCategories(categories.filter(category => (category !== actualCategory)))
            // console.log(initialCategories)
            if (!deleteCategories.includes(actualCategory) && initialCategories.includes(actualCategory)) {
                setDeleteCategories([...deleteCategories, actualCategory])
            }
        }
      };
    

    return (
        <>
            <Container className="border shadow mt-4">
                <h1 className="mt-4">Admin Dashboard</h1>
                <Form className="p-5 mb-4">
                    <Row>
                        <Col>
                            <br></br>
                            <Form.Label >Add Category</Form.Label>
                            <Form.Control type='input' placeholder="New..." name='category' onChange={handleCategoryChange} />
                        </Col>
                        <Col>
                            <Button className="m-5 w-25" variant="primary" type="submit" onClick={addCategory} >Add</Button>
                        </Col>
                    </Row>
                    <Form.Label>Categories (double click to delete)</Form.Label>
                    <Form.Control as="select" multiple >
                        {categories.map((category) => (
                            <option value={category} onDoubleClick={handleDelete}>{category}</option>
                        ))}
                    </Form.Control>

                    <Form.Label className='mt-3'>Users</Form.Label>
                    <Form.Control as="select" multiple >
                        {users?.map((user) => (
                            <option value={user.username} onDoubleClick={handleDelete}>{user.username}</option>
                        ))}
                    </Form.Control>

                    <Button className="m-5 w-25" variant="primary" type="submit" onClick={handleSubmit} >Save</Button>
                </Form>
            </Container>

            {DialogAlert(open,handleClose,actualCategory)}

        </>
    );
};

export default Admin;