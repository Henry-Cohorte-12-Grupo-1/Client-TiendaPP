import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { url } from '../../api';
import { IUsers } from '../../interfaces/users';
import { DialogAlert } from '../Dialog/DialogAlert';
import { Role } from '../../interfaces/role';
import swal from 'sweetalert'
import { useHistory } from 'react-router';

function Admin() {

    let history = useHistory()

    const [actualCategory, setActualCategory] = useState<string>('')
    const [category, setCategory] = useState<string>()
    const [categories, setCategories] = useState<string[]>([])
    const [initialCategories, setInitial] = useState<string[]>([])
    const [deleteCategories, setDeleteCategories] = useState<string[]>([])
    const [users, setUsers] = useState<IUsers[]>()
    const [selectedUser, setSelectedUser] = useState<IUsers>({})
    const [open, setOpen] = useState<boolean>(false)
    const [userSubmit, setUserSumbit] = useState<IUsers>({ passReset: false })



    useEffect(() => {
        (async () => {
            const resp = await axios.get(`${url}/categories`);
            const categoriesArray: string[] = resp.data.map((category: any) => category.name);
            setCategories(categoriesArray);
            setInitial(categoriesArray);
            console.log(categoriesArray);

            const rusers = await axios.get(`${url}/user/getallusers`);
            const users = rusers.data.map((user: any) => ({
                username: user.username,
                userId: user.userId,
                role: user.role,
            }));
            console.log('rusers', rusers)
            // let usersName = (rusers.data.map((user: any) => user.username))
            // setUsers({
            //     ...users,
            //     userId: usersId
            // })
            setUsers(users);
        })();
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const addCategory = (event: any) => {
        event.preventDefault();
        if (category && !categories.includes(category)) {
            setCategories([...categories, category]);
        }
    };

    const handleDelete = (event: any) => {
        setOpen(true);
        setActualCategory(event.target.value);
    };

    const handleClose = (actualCategory: string, CloseEvent: string) => {
        setOpen(false);

        if (CloseEvent === 'agree') {
            console.log('entro');
            setCategories(categories.filter((category) => category !== actualCategory));
            // console.log(initialCategories)
            if (!deleteCategories.includes(actualCategory) && initialCategories.includes(actualCategory)) {
                setDeleteCategories([...deleteCategories, actualCategory]);
            }
        }
    };

    const handleUserChange = (event: any) => {
        if (users) {

            setSelectedUser(users[event.target.value])
            var usernameprop = users[event.target.value].username
        }
        setUserSumbit({
            ...userSubmit,
            username: usernameprop
        })
    }


    useEffect(() => {
        setUserSumbit({
            ...userSubmit,
            passReset: false,
            role: selectedUser.role,
        })
        // console.log(userSubmit)
    }, [selectedUser])

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUserSumbit({
            ...userSubmit,
            userId: selectedUser.userId,
            role: parseInt(event.target.value),
        })
    }

    const handleCheckBox = (event: any) => {
        if (userSubmit.passReset) {
            setUserSumbit({
                ...userSubmit,
                passReset: false
            })
        } else {
            setUserSumbit({
                ...userSubmit,
                passReset: true
            })
        }
    }


    const handleSubmit = async (event: React.FormEvent<any>) => {
        event.preventDefault();
        const sendCategories: string[] = [];
        categories.map((category) => (initialCategories.includes(category) ? null : sendCategories.push(category)));
        // console.log(sendCategories.join(' - '))
        // console.log(deleteCategories.join(' - '))

        const newCategories = sendCategories.join(' - ');
        const oldCategories = deleteCategories.join(' - ');

        const sendObject = {
            newCategories: newCategories,
            oldCategories: oldCategories
        }

        await axios.put(`${url}/updateCategories`, sendObject)
            .catch(() => swal('request failed'))
        console.log("userSubmit",userSubmit)
        if (userSubmit.passReset) {
            if (userSubmit.role === 2) {
                console.log(userSubmit)
                const resp = await axios.put(`${url}/user/userUpdate`, userSubmit)
                    .catch(() => swal('request failed'))
                if (resp?.data === 'succesfully updated') {
                    console.log('entro')
                    swal('succesfully updated')
                } else swal('error')
            } else swal('force password is not available for Admins or Disabled accounts')
        } else {
            console.log(userSubmit)
            let response = await axios.put(`${url}/user/userUpdate`, userSubmit)
                .catch(() => swal('request failed'))
            swal(response.data)
            .then(()=> history.go(0))
        }


        console.log(userSubmit);
        const resp = await axios.put(`${url}/user/userUpdate`, userSubmit).catch(() => swal('request failed'));
        console.log(resp);
    };

    return (
        <>
            <Container className="border shadow mt-4">
                <h1 className="mt-4">Admin Dashboard</h1>
                <Form className="p-5 mb-4">
                    <Form.Label>Add Category</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="input"
                                placeholder="New..."
                                name="category"
                                onChange={handleCategoryChange}
                            />
                        </Col>
                        <Col>
                            <Button className=" w-25" variant="primary" type="submit" onClick={addCategory}>
                                Add
                            </Button>
                        </Col>
                    </Row>
                    <Form.Label className="mt-3">Categories (double click to delete)</Form.Label>
                    <Form.Control as="select" multiple>
                        {categories.map((category) => (
                            <option value={category} onDoubleClick={handleDelete}>
                                {category}
                            </option>
                        ))}
                    </Form.Control>

                    <Form.Label className="mt-3">Users</Form.Label>
                    <Form.Control as="select" multiple>
                        {users?.map((user, i) => (
                            <option value={i} onClick={handleUserChange}>
                                {user.username}
                            </option>
                        ))}
                    </Form.Control>

                    <Row className="mt-3">
                        <Col>
                            <h5>Username:</h5>
                            {selectedUser.username ? <p>{selectedUser.username}</p> : <p>Select user to edit</p>}

                            {/* {console.log(selectedUser.role)}
                            <p>{Role.find(role => role[1] === selectedUser.role)?.slice(0, -1)}</p> */}
                        </Col>
                        <Col>
                            <h5>Change Role:</h5>
                            <Form.Control as="select" onChange={handleRoleChange}>
                                <option value="" selected disabled hidden>
                                    Choose here
                                </option>
                                {Role.map((role) => (
                                    <option value={role[1]} selected={role[1] === selectedUser.role ? true : undefined}>
                                        {role.slice(0, -1)}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Row>

                    <Form.Group controlId="formBasicCheckbox">
                        {userSubmit.passReset ?
                            <Form.Check type="checkbox" label="Force password change for this user" checked onClick={handleCheckBox} /> :
                            <Form.Check type="checkbox" label="Force password change for this user" onClick={handleCheckBox} />
                        }
                    </Form.Group>
                    <Button className="m-5 w-25" variant="primary" type="submit" onClick={handleSubmit} >Save</Button>

                </Form>
            </Container>

            {DialogAlert(open, handleClose, actualCategory)}
        </>
    );
}

export default Admin;
