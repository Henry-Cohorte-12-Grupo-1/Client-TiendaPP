import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { url } from "../../api";
import { IUsers } from '../../interfaces/users'
import { DialogAlert } from '../Dialog/DialogAlert'
import { Role } from '../../interfaces/role'

function Admin() {
    const [actualCategory, setActualCategory] = useState<string>('')
    const [category, setCategory] = useState<string>()
    const [categories, setCategories] = useState<string[]>([])
    const [initialCategories, setInitial] = useState<string[]>([])
    const [deleteCategories, setDeleteCategories] = useState<string[]>([])
    const [users, setUsers] = useState<IUsers[]>()
    const [selectedUser, setSelectedUser] = useState<IUsers>({})
    const [open, setOpen] = useState<boolean>(false)
    const [userSubmit, setUserSumbit] = useState<IUsers>()

    useEffect(() => {
        (async () => {
            var resp = await axios.get(`${url}/categories`)
            var categoriesArray: string[] = resp.data.map((category: any) => category.name)
            setCategories(categoriesArray)
            setInitial(categoriesArray)
            console.log(categoriesArray)

            var rusers = await axios.get(`${url}/user/getallusers`)
            let users = (rusers.data.map((user: any) => ({ username: user.username, userId: user.userId, role: user.roleId })))
            // let usersName = (rusers.data.map((user: any) => user.username))
            // setUsers({
            //     ...users,
            //     userId: usersId
            // })
            setUsers(users)
        })()
    }, [])



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


    const handleClose = (actualCategory: string, CloseEvent: string) => {
        setOpen(false);

        if (CloseEvent === 'agree') {
            console.log('entro')
            setCategories(categories.filter(category => (category !== actualCategory)))
            // console.log(initialCategories)
            if (!deleteCategories.includes(actualCategory) && initialCategories.includes(actualCategory)) {
                setDeleteCategories([...deleteCategories, actualCategory])
            }
        }
    };

    const handleUserChange = (event: any) => {
        if (users) {
            setSelectedUser(users[event.target.value])
        }
    }

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUserSumbit({
            userId: selectedUser.userId,
            username: selectedUser.username,
            role: parseInt(event.target.value)
        })
    }


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

        const response = await axios.put(`${url}/updateCategories`, sendObject)
            .catch(() => alert('request failed'))
        console.log(response)

        console.log(userSubmit)
        const resp = await axios.put(`${url}/user/userUpdate`, userSubmit)
            .catch(() => alert('request failed'))
        console.log(resp)

    }

    return (
        <>
            <Container className="border shadow mt-4">
                <h1 className="mt-4">Admin Dashboard</h1>
                <Form className="p-5 mb-4">
                    <Form.Label >Add Category</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control type='input' placeholder="New..." name='category' onChange={handleCategoryChange} />
                        </Col>
                        <Col>
                            <Button className=" w-25" variant="primary" type="submit" onClick={addCategory} >Add</Button>
                        </Col>
                    </Row>
                    <Form.Label className='mt-3'>Categories (double click to delete)</Form.Label>
                    <Form.Control as="select" multiple >
                        {categories.map((category) => (
                            <option value={category} onDoubleClick={handleDelete}>{category}</option>
                        ))}
                    </Form.Control>

                    <Form.Label className='mt-3'>Users</Form.Label>
                    <Form.Control as="select" multiple >
                        {users?.map((user, i) => (
                            <option value={i} onClick={handleUserChange}>{user.username}</option>
                        ))}
                    </Form.Control>

                    <Row className='mt-3'>
                        <Col>
                            <h5>Username:</h5>
                            {selectedUser.username ? <p>{selectedUser.username}</p> : <p>Select user to edit</p>}

                            {/* {console.log(selectedUser.role)}
                            <p>{Role.find(role => role[1] === selectedUser.role)?.slice(0, -1)}</p> */}
                        </Col>
                        <Col>
                            <h5>Change Role:</h5>
                            <Form.Control as="select" onChange={handleRoleChange}>
                                <option value="" selected disabled hidden>Choose here</option>
                                {Role.map((role) => (
                                    <option value={role[1]} selected={role[1] === selectedUser.role ? true : undefined}>{role.slice(0, -1)}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Row>
                    <Button className="m-5 w-25" variant="primary" type="submit" onClick={handleSubmit} >Save</Button>
                </Form>
            </Container>

            {DialogAlert(open, handleClose, actualCategory)}
        </>
    );
};

export default Admin;