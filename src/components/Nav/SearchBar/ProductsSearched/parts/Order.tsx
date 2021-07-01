import "../ProductsSearched";
import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../../../../redux/products/productsActions";
import {Form} from 'react-bootstrap'

export default function Order() {
    //Store
    const [option, setOption] = useState<string>("name");
    const dispatch = useDispatch();

    const nameState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.products.name
    );
    const itemsState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.products.items
    );
    const pagState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.products.pag
    );
    const tagState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.products.tag
    );
    const orderState = useSelector(
        (store: RootStateOrAny) => store.productsReducer.products.order
    );
    return (
        <div className="d-flex justify-content-center mt-3 mb-5">

            <div className="pagesS mr-3">
                {/* Cantidad de items */}
                <label className="text-light ml-2 mr-2">Pages: </label>

                <Form.Control as="select"
                    id="selectS"
                    className="form-select form-select-lg py-1 mr-2"
                    aria-label="Default select example"
                    onChange={(e) => {
                        if (e.target.value === "4") {
                            dispatch(
                                searchProduct(
                                    nameState,
                                    4,
                                    0,
                                    tagState,
                                    orderState
                                )
                            );
                        } else if (e.target.value === "8") {
                            dispatch(
                                searchProduct(
                                    nameState,
                                    8,
                                    0,
                                    tagState,
                                    orderState
                                )
                            );
                        } else {
                            dispatch(
                                searchProduct(
                                    nameState,
                                    16,
                                    0,
                                    tagState,
                                    orderState
                                )
                            );
                        }
                    }}
                >
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                </Form.Control>
            </div>

            <div className="pagesS mr-3">
                {/* Price or Name */}
                <label className="text-light ml-2 mr-2">Order by:</label>
                <Form.Control as="select"
                    id="selectS"
                    className="form-select py-1"
                    aria-label="Default select example"
                    onChange={(e) => {
                        if (e.target.value === "name") {
                            setOption("name");
                            dispatch(
                                searchProduct(
                                    nameState,
                                    itemsState,
                                    0,
                                    "name",
                                    orderState
                                )
                            );
                        } else {
                            setOption("price");
                            dispatch(
                                searchProduct(
                                    nameState,
                                    itemsState,
                                    0,
                                    "price",
                                    orderState
                                )
                            );
                        }
                    }}
                >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </Form.Control>
            </div>

            <div className="pagesS">
                {/* Orden */}
                <label className="text-light ml-2 mr-2">Type:</label>
                <Form.Control as="select"
                    id="selectS"
                    className="form-select py-1"
                    aria-label="Default select example"
                    onChange={(e) => {
                        if (e.target.value === "lower-higher") {
                            dispatch(
                                searchProduct(
                                    nameState,
                                    itemsState,
                                    0,
                                    tagState,
                                    "ASC"
                                )
                            );
                        } else {
                            dispatch(
                                searchProduct(
                                    nameState,
                                    itemsState,
                                    0,
                                    tagState,
                                    "DESC"
                                )
                            );
                        }
                    }}
                >
                    <option
                        onClick={() => {
                            dispatch(
                                searchProduct(
                                    nameState,
                                    itemsState,
                                    pagState,
                                    tagState,
                                    "ASC"
                                )
                            );
                        }}
                        value="lower-higher"
                    >
                        {option && option === "name"
                            ? "A - Z"
                            : "Lower to Higher"}
                    </option>
                    <option value="higher-lower">
                        {option && option === "name"
                            ? "Z - A"
                            : "Higher to Lower"}
                    </option>
                </Form.Control>
            </div>
        </div>
    );
}
