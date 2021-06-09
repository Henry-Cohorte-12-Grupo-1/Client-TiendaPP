import React, { useState, SyntheticEvent, useEffect } from 'react'
import IProduct from '../../interfaces/product'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary, CloudinaryImage } from '@cloudinary/base'
import { useHistory } from 'react-router-dom'
// import { fill } from '@cloudinary/base/actions/resize'
import Axios from 'axios'
import axios from 'axios'

//AGREGAR USUARIO/ TIENE QUE ESTAR EN LA STORE DE REDUX

function ProductForm() {
    const [image, setImage] = useState<File>()
    const [imageName, setImageName] = useState<string>('')
    const [images, setImages] = useState<CloudinaryImage[]>([])
    const [imagesUrl, setImagesUrl] = useState<string[]>([])
    const [product, setProduct] = useState<IProduct>({
        name: '',
        description: '',
        price: 0,
    })

    const history = useHistory();

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'tiendapp'
        }
    });
    // https://cloudinary.com/documentation/react2_quick_start#landingpage
    // myImage.resize(fill().width(250).height(250));

    useEffect(() => {
        setImages([
            ...images,
            cld.image(imageName)
        ])
    }, [imageName])


    useEffect(() => {
        (async () => {
            const formData = new FormData()
            if (image) {
                formData.append('file', image)
                formData.append('upload_preset', 'tiendapp')
                let resp = await Axios.post('https://api.cloudinary.com/v1_1/tiendapp/image/upload', formData)
                console.log(resp.data.url)
                setImageName(resp.data.public_id)
                setImagesUrl(imagesUrl => [...imagesUrl, resp.data.url])
                console.log(imagesUrl);
            }
        })()
    }, [image])


    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.target) {
            let tName = (event.target as HTMLButtonElement).name
            let tValue = (event.target as HTMLButtonElement).value
            setProduct({
                ...product,
                [tName]: tValue
            })
        }
    }

    const imageChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const newProduct: IProduct = {
            name: product.name,
            description: product.description,
            price: product.price,
            imagesUrl: imagesUrl
        }
        const response = await axios.post('http://localhost:3001/user', newProduct)
        .catch(() => alert('No se creo el producto'))   
        console.log(response)
        if(response){
            alert('Producto Creado');
            history.push('/client');
        }
        
    }

    return (
        <div>
            <h1>FORM</h1>
            <form>
                <label>Product Name</label>
                <input name='name' onBlur={handleChange} /><br />
                <label>Description</label>
                <input name='description' onBlur={handleChange} /><br />
                <label>Price</label>
                <input name='price' onBlur={handleChange} /><br />
                <label>Image</label>
                <input type='file' accept="image/png, image/jpeg" name='image' onChange={imageChangeHandler} />
                <input type="submit" onClick={handleSubmit}/>
            </form>
            {images.map((im, i) => (
                <AdvancedImage key={i} cldImg={im} />
            )
            )}
        </div>
    )
}

export default ProductForm