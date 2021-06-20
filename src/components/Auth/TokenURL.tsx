import { Redirect } from "react-router";

function TokenURL (props: any ) {

   let url = props.location.search.slice(7);
   localStorage.setItem('token',url);


    return (
        <Redirect to='/user'/>
    )

}

export default TokenURL;