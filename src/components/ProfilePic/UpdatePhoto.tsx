import axios from "axios";
import { useState } from "react";

export default function UpdatePhoto() {

    const [image, setImage] = useState<File>()
    const [imageUrl, setImageUrl] = useState<string>("")
    const [previewSource, setPreviewSource] = useState<any>("")

    const handleImageState = (e: any) => {
        e.preventDefault();
        setImage(e.target.files[0])
        previewFile(e.target.files[0])
    }

    const previewFile = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    const handleImageSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append('file', image)
            formData.append('upload_preset', 'tiendapp')
            await axios.post('https://api.cloudinary.com/v1_1/tiendapp/image/upload', formData)
                .then(resp => setImageUrl(`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${resp.data.public_id}`))



        }
    }

    return (
        <div className="d-flex col mb-3 align-items-center justify-content-center">

            <form className="text-center" onSubmit={handleImageSubmit}>
                <label className="custom-label image-btn bg-primary p-2 text-light">
                    Select image
                    <input
                        className="d-none"
                        type="file"
                        name="input"
                        onChange={handleImageState}
                    />
                </label>
                {previewSource &&
                    <div>
                        <div className="circle">
                            <img src={previewSource} className="pfp" alt="profile"></img>
                        </div>
                        <button className="btn btn-primary" type="submit">Upload</button>
                    </div>
                }
            </form>
        </div>
    )
}