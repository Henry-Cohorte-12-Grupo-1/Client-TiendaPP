import { Container, Form, Image, Button } from "react-bootstrap";
import './ImgCarousel.scss';

interface ICarouselProps {
    index?: any;
    imagesName?: any;
    setIndex(a: any): any;
    setImage(a: any): any;
    setImagesName(a: any): any;
    variant?: string
}

const ImgCarousel: React.FC<ICarouselProps> = ({
    index,
    imagesName,
    setIndex,
    setImage,
    setImagesName,
}) => {
    const prev = () => {
        if (index === 0) return setIndex(imagesName.length - 1);
        setIndex(index - 1);
    };

    const next = () => {
        if (index === imagesName?.length - 1) return setIndex(0);
        setIndex(index + 1);
    };

    const onClose = (event: any) => {
        // const { name } = event.target;
        console.log(imagesName[index]);
        setImagesName(
            imagesName.filter((image: any) => image !== imagesName[index])
        );
        if (imagesName?.length > 1) setIndex(0);

    };

    const imageChangeHandler = async (event: any) => {
        const { files } = event.target;
        if (files) {
            setImage(files[0]);
        }
    };

    return (
        <Container className="mt-3">
            <Form.Group className="text-center">
                <label className="custom-label image-btn bg-primary p-2 text-light">
                    Upload an image
                    <input
                        className="d-none"
                        type="file"
                        name="input"
                        onChange={imageChangeHandler}
                    />
                </label>
            </Form.Group>

            {imagesName?.length === 0 ? (
                null
            ) : (
                <Container className="carousel-container">
                    <Button
                        className="btn btn-primary btn-close-custom"
                        value={imagesName[index]}
                        onClick={(event) => onClose(event)}
                    >
                        x
                    </Button>
                    <Image
                        className="custom-image"
                        src={`http://res.cloudinary.com/tiendapp/image/upload/w_400,h_300,c_scale/${imagesName[index]}`}
                        // name={imagesName[index]}
                        // alt="Not found"
                        width="500"
                        height="500"
                        fluid
                    />
                </Container>
            )}

            {imagesName?.length === 0 ?
                null
                // <Container>
                //     <Button className="btn btn-primary" disabled>
                //         {"<<"}
                //     </Button>
                //     <Button className="btn btn-primary" disabled>
                //         {">>"}
                //     </Button>
                // </Container>
                : (
                    <Container>
                        <Button className="btn btn-primary w-50 border" onClick={() => prev()}>{"<<"}</Button>
                        <Button className="btn btn-primary w-50 border" onClick={() => next()}>{">>"}</Button>
                    </Container>
                )}
        </Container>
    );
};

export default ImgCarousel;