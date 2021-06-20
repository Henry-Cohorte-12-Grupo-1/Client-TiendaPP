import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router"
import { url } from "../../api";
import swal from 'sweetalert'

function Validate() {
    let [resp, setResp] = useState<string>()

    let location = useLocation()
    let id = new URLSearchParams(location.search).get('id')
    const history = useHistory();

    useEffect(() => {
        (async () => {

            let response = await axios.post(`${url}/validate?id=${id}`)
            setResp(response.data)
            console.log(response.data)
            if (response.data === 'verificado') {
                swal('Verified Account');
                history.push(`/login/`);
            }
        })()
    }, [])


    if (resp === 'verificado') {
        return (
            <div>OK</div>
        )
    } else {
        return (
            <div>
                <h3>Link expired</h3>
            </div>
        )
    }
}

export default Validate