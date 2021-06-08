import { useState } from 'react'
import IProduct from '../../interfaces/product'

function ProductForm() {
    var [genres, setGenres] = useState([])
    // let [nameInput, setNameInput] = useState<string>('')
    let [product, setProduct] = useState<IProduct>({
        name: '',
        description: '',
        price: 0,
    })

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (event.target) {
            let tName = (event.target as HTMLButtonElement).name
            let tValue = (event.target as HTMLButtonElement).value
            // console.log(tName,tValue)
            setProduct({
                ...product,
                [tName]:tValue
            })
        }
    }

    const imageChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        console.log(event)
    }

    const handleSubmit = () => {
        
    }

    return (
        <div>
            <h1>FORM</h1>
            <form>
                <label>Product Name</label>
                <input name='name' onBlur={handleChange} /><br/>
                <label>Description</label>
                <input name='description' onBlur={handleChange} /><br/>
                <label>Price</label>
                <input name='price' onBlur={handleChange} /><br/>
                <label>Image</label>
                <input type='file' name='image' onChange={imageChangeHandler}/>
                <button onClick={handleSubmit}>Upload</button>
            </form>
            {/* <img src={}></img> */}
        </div>
    )
}


export default ProductForm