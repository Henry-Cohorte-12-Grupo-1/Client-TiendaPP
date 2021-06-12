import axios from "axios";
import { send } from "process";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Admin() {
    const [category, setCategory] = useState<string>()
    const [categories, setCategories] = useState<string[]>([])
    const [initialCategories, setInitial] = useState<string[]>([])
    const [deleteCategories, setDeleteCategories] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            var resp = await axios.get('http://localhost:3001/categories')
            var categoriesArray: string[] = resp.data.map((category: any) => category.name)
            setCategories(categoriesArray)
            setInitial(categoriesArray)
            console.log(categoriesArray)
        })()
    }, [])

    const handleSubmit = async (event: React.FormEvent<any>) => {
        event.preventDefault()
        let sendCategories:string[] = []
        categories.map(category => initialCategories.includes(category)?null:sendCategories.push(category))
        // console.log(sendCategories.join(' - '))
        // console.log(deleteCategories.join(' - '))

        let newCategories = sendCategories.join(' - ')
        let oldCategories = deleteCategories.join(' - ')

        let sendObject = {
            newCategories:newCategories,
            oldCategories:oldCategories
        }

        console.log(sendObject)

        const response = await axios.put('http://localhost:3001/updateCategories', sendObject)
            .catch(() => alert('No se creo el producto'))
        console.log(response)
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value)
    }

    const addCategory = (event: any) => {
        event.preventDefault()
        if (category && !categories.includes(category)){
            setCategories([...categories, category])
        }
    }

    const handleDelete = (event: any) => {
        setCategories(categories.filter(category => (category !== event.target.value)))
        // console.log(initialCategories)
        if (!deleteCategories.includes(event.target.value) && initialCategories.includes(event.target.value)) {
            setDeleteCategories([...deleteCategories, event.target.value])
        }
    }
    
    return (
        <Container>
            <Form className='bg-warning p-5 rounded'>
                <Form.Label className='text-secondary'>Admin Dashboard</Form.Label>
                <Row>
                    <Col>
                        <br></br>
                        <Form.Label className='text-secondary'>Add Category</Form.Label>
                        <Form.Control type='input' placeholder="New..." name='category' onChange={handleCategoryChange} />
                    </Col>
                    <Col>
                        <Button className="m-5 w-25" variant="secondary" type="submit" onClick={addCategory} >Add</Button>
                    </Col>
                </Row>
                <Form.Label className='text-secondary'>Categories</Form.Label>
                <Form.Control as="select" multiple >
                    {categories.map((category, i) => (
                        <option value={category} onDoubleClick={handleDelete}>{category}</option>
                    ))}
                </Form.Control>
                <Button className="m-5 w-25" variant="secondary" type="submit" onClick={handleSubmit} >Save</Button>
            </Form>
        </Container>
    );
};

export default Admin;