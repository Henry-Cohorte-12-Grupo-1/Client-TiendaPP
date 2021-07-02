import { Button } from "react-bootstrap";

function NotFound() {
    return (
        <div className="container ml-auto mr-auto mt-4 bg-light border shadow p-5 rounded-lg m-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold"> Page Not Found :(</h1>
                <p className="col-md-8 fs-4"></p>
                <Button href={`/home`}>Go Home</Button>
            </div>
        </div>
    );
}

export default NotFound;
