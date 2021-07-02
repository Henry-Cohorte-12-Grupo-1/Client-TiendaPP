import "../ProductsSearched";
import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../../../../redux/products/productsActions";

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
    <div className="d-flex justify-content-center mt-3 mb-5">
      <div className="pagesS mr-3">
        {/* Cantidad de items */}
        <label className="text-light ml-2 mr-2">Pages: </label>
        <select
          id="selectS"
          className="form-select form-select-lg py-1 mr-2"
          aria-label="Default select example"
          onChange={(e) => {
            if (e.target.value === "5") {
              dispatch(searchProduct(nameState, 5, 0, tagState, orderState, sellerState));
            } else if (e.target.value === "10") {
              dispatch(searchProduct(nameState, 10, 0, tagState, orderState, sellerState));
            } else {
              dispatch(searchProduct(nameState, 20, 0, tagState, orderState, sellerState));
            }
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <div className="pagesS mr-3">
        {/* Price or Name */}
        <label className="text-light ml-2 mr-2">Order by:</label>
        <select
          id="selectS"
          className="form-select py-1"
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
        </select>
      </div>

      <div className="pagesS">
        {/* Orden */}
        <label className="text-light ml-2 mr-2">Type:</label>
        <select
          id="selectS"
          className="form-select py-1"
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
        </select>
      </div>
    </div>
  );
}
