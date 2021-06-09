import React, { useState, SyntheticEvent, useEffect } from 'react'
import IProduct from '../../interfaces/product'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary, CloudinaryImage } from '@cloudinary/base'
// import { fill } from '@cloudinary/base/actions/resize'
import Axios from 'axios'


function ProductForm() {
    const [image, setImage] = useState<File>()
    const [imageName, setImageName] = useState('')
    const [images, setImages] = useState<CloudinaryImage[]>([])
    const [product, setProduct] = useState<IProduct>({
        name: '',
        description: '',
        price: 0,
    })

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
                <button type='submit'>Send</button>
            </form>
            {images.map((im, i) => (
                <AdvancedImage key={i} cldImg={im} />
            )
            )}
        </div>
    )
}

export default ProductForm