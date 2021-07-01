import axios from "axios";
import { useState } from "react";
import { url } from "../../api";
import jwtDecode from "jwt-decode";
import swal from 'sweetalert'
import { useDispatch } from "react-redux";
import { bringProfilePic } from "../../redux/profile/profilePicActions";
import Loading from "../Loading/Loading";

export default function UpdatePhoto() {


    const token: any = localStorage ? jwtDecode(localStorage.token) : false;
    const userId = token ? token.id : null;

    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [image, setImage] = useState<File>()
    //const [imageUrl, setImageUrl] = useState<string>("")
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
            setLoading(true)
            const resp = await axios.post('https://api.cloudinary.com/v1_1/tiendapp/image/upload', formData)
            await axios.post(`${url}/user/updatePic`, { userId: userId, profilePic: resp.data.public_id })
                .then(res => swal(res.data)).then(() => setLoading(false))
            dispatch(bringProfilePic(userId))
        }
    }

    if (loading) {
        return <Loading />
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