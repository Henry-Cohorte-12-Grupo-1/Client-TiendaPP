import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router"
import { url } from "../../api";

function Validate() {
    let [resp, setResp] = useState<string>()

    let location = useLocation()
    let id = new URLSearchParams(location.search).get('id')


    useEffect(() => {
        (async () => {

            let response = await axios.post(`${url}/validate?id=${id}`)
            setResp(response.data.r)
            console.log(resp)
        })()
    }, [])


    if (resp) {
        return (
            <div>OK</div>
        )
    } else {
        return (
            <div>Loading</div>
        )
    }
}

export default Validate