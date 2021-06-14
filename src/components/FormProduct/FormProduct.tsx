// import { Container, Form, Row, Col } from "react-bootstrap"

function FormProduct (){
    return 
    // (
    //     <Container>
    //     <h1 className='text-secondary'>
    //         Crear producto
    //     </h1>

    //     <Form className='bg-warning p-5 rounded'>
    //         <Row>
    //             <Col md>
    //                 <Form.Group controlId="name">
    //                     <Form.Label className='text-secondary'>Nombre del producto</Form.Label>
    //                     <Form.Control className='label-success' type='input' placeholder="Name" name='name' onBlur={handleChange} />
    //                     {errors?.name ? <Form.Text className="text-muted">
    //                         Nombre no puede estar vacio
    //                     </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
    //                 </Form.Group>

    //                 <Form.Group controlId="description">
    //                     <Form.Label className='text-secondary'>Descripción</Form.Label>
    //                     <Form.Control as="textarea" rows={3} name='description' placeholder="Description" onBlur={handleChange} />
    //                     {errors?.description ? <Form.Text className="text-muted">
    //                         La descripcion no puede estar vacia
    //                     </Form.Text> : <Form.Text className="text-muted">&#160;</Form.Text>}
    //                 </Form.Group>



    //                 <Row>
    //                     <Col>
    //                     <Form.Label className='text-secondary'>Precio</Form.Label>
    //                         <Form.Control type='input' placeholder="$" name='price' onBlur={handleChange} />
    //                     </Col>
    //                     <Col>
    //                     <Form.Label className='text-secondary'>Cantidad</Form.Label>
    //                     <input name='quantity' onBlur={handleChange} className="form-control" type='number' min="1" max="1000" defaultValue='1'></input>
    //                     </Col>
    //                 </Row>

    //                 {errors?.price ? <Form.Text className='text-muted'>
    //                     Debe indicar un precio
    //                 </Form.Text> : <Form.Text className='text-secondary'>&#160;</Form.Text>}



    //                 <br></br>
    //                 <Form.Control as="select" onChange={handleCategoryChange}>
    //                     <option value="" selected disabled hidden>Choose here</option>
    //                     {categories.map((category, i) => (
    //                         <option value={categories[i]}>{category}</option>
    //                     ))}
    //                 </Form.Control>

    //             </Col>
    //             <Col md>
    //                 <div className="custom-file mt-3">
    //                     <input
    //                         type="file"
    //                         className="h6 bg-secondary flat w-100"
    //                         id="inputGroupFile01"
    //                         aria-describedby="inputGroupFileAddon01"
    //                         onChange={imageChangeHandler} />
    //                     {/* <label className="custom-file-label" htmlFor="inputGroupFile01">Selecciona una imagen</label> */}
    //                 </div>
    //                <Container>
    //                {imagesName.length > 0 ?
    //                     <Carousel>
    //                         {imagesName.map((name, i) => (
    //                             <Carousel.Item key={i}>
    //                                 <Button className="carrousel-btn btn-secondary" onClick={() => handleDelete(i)}>X</Button>
    //                                 <img
    //                                     key={i}
    //                                     className="carrousel-img"
    //                                     src={`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${name}`}
    //                                     alt="First slide"
    //                                 />
    //                             </Carousel.Item>
    //                         )
    //                         )}
    //                     </Carousel> :
    //                     null}
    //                 </Container>    
    //             </Col>
    //         </Row>
    //         <Row>
    //             <Col className="text-center" md>
    //                 {(errors?.name === true || errors?.description === true || errors?.price === true || product.category === undefined) ?
    //                     <Button className="m-5 w-25" variant="secondary" type="submit" disabled>Enviar</Button> :
    //                     <Button className="m-5 w-25" variant="secondary" type="submit" onClick={handleSubmit}>Enviar</Button>
    //                 }
    //             </Col>
    //         </Row>
    //     </Form>
    // </Container>
    // )
}


export default FormProduct