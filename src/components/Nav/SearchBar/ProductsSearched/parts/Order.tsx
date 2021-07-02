import "../ProductsSearched";
import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../../../../redux/products/productsActions";
import { Form } from "react-bootstrap";

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
  const sellerState = useSelector(
    (store: RootStateOrAny) => store.productsReducer.products.seller
  );
  return (
    // <div className="d-flex justify-content-center mt-3 mb-5">
    <div className="pagesContainer">
      <div className="pagesS pageSize mr-3">
        {/* Cantidad de items */}
        <label className="optionLabels text-light">Items: </label>

        <Form.Control
          as="select"
          id="selectS"
          size="sm"
          className="form-select form-select-lg w-50 py-1 mt-0"
          aria-label="Default select example"
          onChange={(e) => {
            if (e.target.value === "4") {
              dispatch(searchProduct(nameState, 4, 0, tagState, orderState, sellerState));
            } else if (e.target.value === "8") {
              dispatch(searchProduct(nameState, 8, 0, tagState, orderState, sellerState));
            } else {
              dispatch(searchProduct(nameState, 16, 0, tagState, orderState, sellerState));
            }
          }}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </Form.Control>
      </div>

      <div className="pagesS orderSize mr-3">
        {/* Price or Name */}
        <label className="optionLabels text-light">Order by:</label>
        <Form.Control
          as="select"
          id="selectS"
          size="sm"
          className="form-select w-50 py-1 mt-0"
          aria-label="Default select example"
          onChange={(e) => {
            if (e.target.value === "name") {
              setOption("name");
              dispatch(
                searchProduct(nameState, itemsState, 0, "name", orderState, sellerState)
              );
            } else {
              setOption("price");
              dispatch(
                searchProduct(nameState, itemsState, 0, "price", orderState, sellerState)
              );
            }
          }}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </Form.Control>
      </div>

      <div className="pagesS typeSize">
        {/* Orden */}
        <label className="optionLabels text-light">Type:</label>
        <Form.Control
          as="select"
          id="selectS"
          size="sm"
          className="form-select w-50 py-1 mt-0"
          aria-label="Default select example"
          onChange={(e) => {
            if (e.target.value === "lower-higher") {
              dispatch(
                searchProduct(nameState, itemsState, 0, tagState, "ASC", sellerState)
              );
            } else {
              dispatch(
                searchProduct(nameState, itemsState, 0, tagState, "DESC", sellerState)
              );
            }
          }}
        >
          <option
            onClick={() => {
              dispatch(
                searchProduct(nameState, itemsState, pagState, tagState, "ASC", sellerState)
              );
            }}
            value="lower-higher"
          >
            {option && option === "name" ? "A - Z" : "Lower to Higher"}
          </option>
          <option value="higher-lower">
            {option && option === "name" ? "Z - A" : "Higher to Lower"}
          </option>
        </Form.Control>
      </div>
    </div>
  );
}
