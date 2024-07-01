import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import emptyCart from "../Asset/images/empty-cart.webp";
import { Link } from "react-router-dom";
import { TextContext } from "../App";

const ProductBag = () => {
  const { handelOrderHistry } = useContext(TextContext);
  const { bagProducts } = useContext(TextContext);
  const { setFixedAddress } = useContext(TextContext);
  const { fixedAddress } = useContext(TextContext);
  const { setBagProducts } = useContext(TextContext);
  // const {updateOrderedProduct} = useContext(TextContext)
  const { bagLength } = useContext(TextContext);
  const { setisOrderSuccessBtnClicked } = useContext(TextContext);
  const { isOrderSuccessBtnClicked } = useContext(TextContext);
  // const { setUserAddress } = useContext(TextContext)
  const { userAddress } = useContext(TextContext);
  const { addressCreate } = useContext(TextContext);
  const { handelChange } = useContext(TextContext);
  const { exceptThisSymbols } = useContext(TextContext);
  const { isSubmit } = useContext(TextContext);
  const { setIsSubmit } = useContext(TextContext);
  const { isChecked } = useContext(TextContext);
  const { setIsChecked } = useContext(TextContext);

  const [deleteIndex, setDeleteIndex] = useState("");
  const [modal, setModal] = useState(false);
  const [isSizeModelOpen, setIsSizeModelOpen] = useState(false);
  const [isQtyModelOpen, setIsQtyModelOpen] = useState(false);
  const [selectedBagProductIndex, setSelectedBagProductIndex] = useState("");
  const [updateSizeIndex, setUpdateSizeIndex] = useState("");
  const [updateSize, setUpdateSize] = useState("");
  const [updateQtyIndex, setUpdateQtyIndex] = useState("");
  const [updateQty, setUpdateQty] = useState("");
  const [bagTotal, setBagTotal] = useState("");
  const [offTotal, setOffTotal] = useState("");
  const [isCheckOutClicked, setIsCheckOutClicked] = useState(false);
  const [isPlaceOrderClicked, setIsPlaceOrderClicked] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  useEffect(() => {
    setFixedAddress(JSON.parse(localStorage.getItem("address")));
  }, [isCheckOutClicked]);

  useEffect(() => {
    cartProductPriceCalculation();
  }, [bagProducts]);

  // useEffect(()=> {
  //     if (bagLength === 0) {
  //         localStorage.clear()
  //     }
  // }, [bagLength])

  function toggle() {
    setModal(!modal);
  }

  let qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function cartProductDelete(delIndex) {
    let filterDetail = bagProducts.filter((val, index) => index !== delIndex);
    localStorage.setItem("bagProduct", JSON.stringify(filterDetail));
    setBagProducts(JSON.parse(localStorage.getItem("bagProduct")));
    bagProducts[delIndex].qty = 1;
    setDeleteIndex("");
  }

  function handelSizeModelOpen() {
    setIsSizeModelOpen(!isSizeModelOpen);
  }

  function handelQtyModelOpen() {
    setIsQtyModelOpen(!isQtyModelOpen);
  }

  function handelProductSizeUpdate() {
    if (updateSizeIndex !== "") {
      let selectProduct = JSON.parse(localStorage.getItem("bagProduct"));
      selectProduct[selectedBagProductIndex].currentsize = updateSize;
      localStorage.setItem("bagProduct", JSON.stringify(selectProduct));
      setBagProducts(JSON.parse(localStorage.getItem("bagProduct")));
    }

    setSelectedBagProductIndex("");
    setUpdateSizeIndex("");
    setUpdateSize("");
  }

  function handelProductQtyUpdate() {
    if (updateQtyIndex !== "") {
      let selectProduct = JSON.parse(localStorage.getItem("bagProduct"));
      selectProduct[selectedBagProductIndex].qty = updateQty;
      localStorage.setItem("bagProduct", JSON.stringify(selectProduct));
      setBagProducts(JSON.parse(localStorage.getItem("bagProduct")));
    }

    setSelectedBagProductIndex("");
    setUpdateQtyIndex("");
    setUpdateQty("");
  }

  function cartProductPriceCalculation() {
    let totalPrice = 0;
    let offPrice = 0;
    bagProducts &&
      bagProducts.map((val, index) => {
        totalPrice += val.mrp * val.qty;
        offPrice += (val.mrp - val.currentPrice) * val.qty;
      });
    setBagTotal(totalPrice);
    setOffTotal(offPrice);
  }

  function checkOutModelOpen() {
    setIsCheckOutClicked(!isCheckOutClicked);
  }

  function placeOrderModelOpen() {
    setIsPlaceOrderClicked(!isPlaceOrderClicked);
  }

  function orderSuccesModelOpen() {
    setIsOrderSuccess(!isOrderSuccess);
  }

  //   function cartClear() {
  //     let temp = JSON.parse(localStorage.getItem('bagProducts'))
  //     localStorage.removeItem(temp);
  //   }

  return (
    <div>
      {bagLength === 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <div style={{ width: "700px" }}>
            <div
              className="mb-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={emptyCart}
                alt="empty-cart"
                style={{ width: "250px" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <h5 className="mb-4"> Your Cart is Empty Now! </h5>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Link className="continue-shop" to={"/"} replace={true}>
                    {" "}
                    Continue Shopping{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row m-5">
          <div
            className="col-8"
            style={{ fontFamily: "Sofia Sans Semi Condensed, sans-serif" }}
          >
            {bagProducts.map((val, index) => (
              <div key={index} className="card mt-3 p-3">
                <div className="row g-0">
                  <div className="col-md-2">
                    <img
                      src={val.image}
                      className="img-fluid rounded"
                      alt="..."
                      style={{ height: "150px" }}
                    />
                  </div>
                  <div className="col-md-10">
                    <div className="card-body py-0">
                      <p className="card-text row">
                        <span className="col-7" style={{ fontSize: "14px" }}>
                          {" "}
                          {val.productDescription}{" "}
                        </span>
                        <span className="col-5 d-flex justify-content-end">
                          <span className="delivery-date">
                            <span
                              className="delivery-icon"
                              style={{ fontSize: "20px" }}
                            >
                              {" "}
                              <i className="bi bi-truck"></i>{" "}
                            </span>
                            <span
                              className="delivery-text"
                              style={{ fontSize: "13px" }}
                            >
                              {" "}
                              Deliveryed WithIn <b> 7 Days </b>{" "}
                            </span>
                          </span>
                        </span>
                        <span className="card-text m-0 mt-1">
                          {" "}
                          <span
                            style={{ fontSize: "17px", fontWeight: "bold" }}
                          >
                            {" "}
                            ₹{val.currentPrice * val.qty}.00{" "}
                          </span>{" "}
                          <small className="text-muted ms-2">
                            {" "}
                            <s> ₹{val.mrp * val.qty}.00 </s>{" "}
                          </small>{" "}
                          <span className="ms-2" style={{ color: "#338715" }}>
                            {" "}
                            {(val.mrp - val.currentPrice) * val.qty}.00 off{" "}
                          </span>
                        </span>
                        <span className="card-text"> Color : {val.color} </span>
                      </p>
                      <div className="d-flex" style={{ gap: "1rem" }}>
                        <div
                          className="px-2 rounded-3"
                          style={{
                            width: "200px",
                            border: "1px solid #d5d5d5",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handelSizeModelOpen();
                            setSelectedBagProductIndex(index);
                          }}
                        >
                          <small style={{ fontSize: "10px" }}>
                            Size
                            <span
                              className="m-0 d-flex justify-content-between"
                              style={{ fontSize: "18px" }}
                            >
                              {" "}
                              <span> {val.currentsize} </span>{" "}
                              <span>
                                {" "}
                                <i className="bi bi-chevron-down"></i>{" "}
                              </span>{" "}
                            </span>
                          </small>
                        </div>

                        <div
                          className="px-2 rounded-3"
                          style={{
                            width: "200px",
                            border: "1px solid #d5d5d5",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handelQtyModelOpen();
                            setSelectedBagProductIndex(index);
                          }}
                        >
                          <small style={{ fontSize: "10px" }}>
                            Qty
                            <span
                              className="m-0 d-flex justify-content-between"
                              style={{ fontSize: "18px" }}
                            >
                              {" "}
                              <span> {val.qty} </span>{" "}
                              <span>
                                {" "}
                                <i className="bi bi-chevron-down"></i>{" "}
                              </span>{" "}
                            </span>
                          </small>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-end">
                        <button
                          className="remove-btn"
                          onClick={() => {
                            setDeleteIndex(index);
                            toggle();
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {isSizeModelOpen && (
                  <div>
                    <Modal
                      isOpen={isSizeModelOpen}
                      toggle={handelSizeModelOpen}
                      style={{ marginTop: "200px" }}
                    >
                      <ModalHeader toggle={handelSizeModelOpen}>
                        {" "}
                        Select Size{" "}
                      </ModalHeader>
                      <ModalBody>
                        <div>
                          {bagProducts[selectedBagProductIndex].productsize.map(
                            (val, sizeIndex) => (
                              <button
                                key={sizeIndex}
                                className="m-2"
                                style={{
                                  border:
                                    updateSizeIndex === sizeIndex
                                      ? "2px solid white"
                                      : "2px solid black",
                                  color:
                                    updateSizeIndex === sizeIndex
                                      ? "white"
                                      : "black",
                                  borderRadius: "50%",
                                  outline: "none",
                                  width: "50px",
                                  height: "50px",
                                  fontSize: "18px",
                                  fontWeight: "550",
                                  background:
                                    updateSizeIndex === sizeIndex
                                      ? "black"
                                      : "transparent",
                                }}
                                onClick={() => {
                                  setUpdateSizeIndex(sizeIndex);
                                  setUpdateSize(val.size);
                                }}
                              >
                                {val.size}
                              </button>
                            )
                          )}
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          style={{
                            background: "#da1c5c",
                            border: "none",
                            outline: "none",
                            width: "100%",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            handelProductSizeUpdate();
                            handelSizeModelOpen();
                          }}
                        >
                          Done
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                )}

                {isQtyModelOpen && (
                  <div>
                    <Modal
                      isOpen={isQtyModelOpen}
                      toggle={handelQtyModelOpen}
                      style={{ marginTop: "200px" }}
                    >
                      <ModalHeader toggle={handelQtyModelOpen}>
                        {" "}
                        Select Qty{" "}
                      </ModalHeader>
                      <ModalBody>
                        <div>
                          {qty.map((val, qtyIndex) => (
                            <button
                              key={qtyIndex}
                              className="m-2"
                              style={{
                                border:
                                  updateQtyIndex === qtyIndex
                                    ? "2px solid white"
                                    : "2px solid black",
                                color:
                                  updateQtyIndex === qtyIndex
                                    ? "white"
                                    : "black",
                                borderRadius: "50%",
                                outline: "none",
                                width: "50px",
                                height: "50px",
                                fontSize: "18px",
                                fontWeight: "550",
                                background:
                                  updateQtyIndex === qtyIndex
                                    ? "black"
                                    : "transparent",
                              }}
                              onClick={() => {
                                setUpdateQtyIndex(qtyIndex);
                                setUpdateQty(val);
                              }}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          style={{
                            background: "#da1c5c",
                            border: "none",
                            outline: "none",
                            width: "100%",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            handelProductQtyUpdate();
                            handelQtyModelOpen();
                          }}
                        >
                          Done
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="col-4" style={{ maxHeight: "300px" }}>
            {fixedAddress && (
              <div className="mt-3 p-3" style={{ border: "1px solid #dfdfdf" }}>
                <div className="d-flex justify-content-start">
                  <h5>Delivery Address : </h5>
                </div>
                <div className="d-flex justify-content-start">
                  <div>
                    <p className="m-0" style={{ fontSize: "14px" }}>
                      {" "}
                      <b> Name : </b> {fixedAddress.firstname}{" "}
                      {fixedAddress.lastname}{" "}
                    </p>
                    <p className="m-0" style={{ fontSize: "14px" }}>
                      {" "}
                      <b> Mobile Number : </b> {fixedAddress.phone}{" "}
                    </p>
                    <p className="m-0" style={{ fontSize: "14px" }}>
                      {" "}
                      <b> Address : </b>{" "}
                      <span className="text-wrap" style={{ width: "200px" }}>
                        {" "}
                        {fixedAddress.address}{" "}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div
              className={!fixedAddress ? "mt-3" : "mt-0"}
              style={{ border: "1px solid #dfdfdf" }}
            >
              <div className="m-3">
                <table className="w-100 price-table">
                  <tbody>
                    <tr className="d-flex justify-content-between m-1">
                      <td> Bag Total </td>
                      <td> ₹{bagTotal}.00 </td>
                    </tr>
                    <tr className="d-flex justify-content-between m-1">
                      <td> Processing Fee </td>
                      <td>
                        {" "}
                        <span className="text-secondary">
                          {" "}
                          <s> ₹99.00 </s>{" "}
                        </span>{" "}
                        ₹29.00{" "}
                      </td>
                    </tr>
                    <tr className="d-flex justify-content-between m-1">
                      <td> Bag Subtotal </td>
                      <td> ₹{bagTotal + 29}.00 </td>
                    </tr>
                    <tr className="d-flex justify-content-between m-1">
                      <td> Product Discount Amount </td>
                      <td> -₹{offTotal}.00 </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ color: "#40960f" }}>
                        {" "}
                        You will save ₹{offTotal}.00 on this order{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr />
              <div className="m-3 row">
                <div className="col-4">
                  <span className="fw-bold">
                    {" "}
                    Total <br /> ₹{bagTotal + 29 - offTotal}{" "}
                  </span>
                </div>
                <div className="col-8">
                  <div className="d-flex justify-content-end align-item-center">
                    {!fixedAddress ? (
                      <button
                        className="check-out-btn"
                        onClick={() => {
                          setIsCheckOutClicked(true);
                        }}
                      >
                        {" "}
                        Check Out{" "}
                      </button>
                    ) : (
                      <button
                        className="check-out-btn"
                        onClick={() => {
                          setIsPlaceOrderClicked(true);
                        }}
                      >
                        {" "}
                        Place Order{" "}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Alert </ModalHeader>
        <ModalBody> Are You Sure? You Want To Delete This Product! </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              cartProductDelete(deleteIndex);
              toggle();
            }}
          >
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isCheckOutClicked}>
        <ModalHeader toggle={checkOutModelOpen}> Delivery Address </ModalHeader>
        <ModalBody>
          <table>
            <tbody>
              <tr>
                <td>
                  <div
                    className={
                      isSubmit && userAddress.firstname === ""
                        ? "form active"
                        : "form"
                    }
                  >
                    <input
                      type="text"
                      name="firstname"
                      value={userAddress.firstname}
                      id="first-name"
                      className="form__input"
                      placeholder=" "
                      onChange={handelChange}
                    />
                    <label htmlFor="first-name" className="form__label">
                      First Name
                    </label>
                  </div>
                </td>
              </tr>
              {isSubmit && userAddress.firstname === "" && (
                <tr>
                  {" "}
                  <td
                    style={{
                      paddingLeft: "20px",
                      fontSize: "12px",
                      color: "red",
                    }}
                  >
                    {" "}
                    Please Enter FirstName{" "}
                  </td>{" "}
                </tr>
              )}
              <tr>
                <td>
                  <div
                    className={
                      isSubmit && userAddress.lastname === ""
                        ? "form active"
                        : "form"
                    }
                  >
                    <input
                      type="text"
                      name="lastname"
                      value={userAddress.lastname}
                      id="last-name"
                      className="form__input"
                      placeholder=" "
                      onChange={handelChange}
                    />
                    <label htmlFor="last-name" className="form__label">
                      Last Name
                    </label>
                  </div>
                </td>
              </tr>
              {isSubmit && userAddress.lastname === "" && (
                <tr>
                  {" "}
                  <td
                    style={{
                      paddingLeft: "20px",
                      fontSize: "12px",
                      color: "red",
                    }}
                  >
                    {" "}
                    Please Enter LastName{" "}
                  </td>{" "}
                </tr>
              )}
              <tr>
                <td>
                  <div
                    className={
                      isSubmit && userAddress.phone === ""
                        ? "form active"
                        : "form"
                    }
                  >
                    <input
                      type="number"
                      name="phone"
                      value={userAddress.phone}
                      id="number"
                      className="form__input"
                      onKeyDown={(e) =>
                        exceptThisSymbols.includes(e.key) && e.preventDefault()
                      }
                      placeholder=" "
                      onChange={handelChange}
                    />
                    <label htmlFor="number" className="form__label">
                      Mobile Number
                    </label>
                  </div>
                </td>
              </tr>
              {isSubmit && userAddress.phone === "" && (
                <tr>
                  {" "}
                  <td
                    style={{
                      paddingLeft: "20px",
                      fontSize: "12px",
                      color: "red",
                    }}
                  >
                    {" "}
                    Please Enter Mobile Number{" "}
                  </td>{" "}
                </tr>
              )}
              <tr>
                <td>
                  <div
                    className={
                      isSubmit && userAddress.address === ""
                        ? "form active"
                        : "form"
                    }
                    style={{ height: "100px" }}
                  >
                    <textarea
                      className="form__input"
                      name="address"
                      value={userAddress.address}
                      id="address"
                      placeholder=" "
                      onChange={handelChange}
                    ></textarea>
                    <label htmlFor="address" className="form__label">
                      Address
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#333232",
                        fontSize: "14px",
                        width: "25rem",
                      }}
                    >
                      {" "}
                      eg : 1/2345, Street Name, City Name, District Name - Pin
                      Code(123 456){" "}
                    </p>
                  </div>
                </td>
              </tr>
              {isSubmit && userAddress.address === "" && (
                <tr>
                  {" "}
                  <td
                    style={{
                      paddingLeft: "20px",
                      fontSize: "12px",
                      color: "red",
                    }}
                  >
                    {" "}
                    Please Enter Delivery Address{" "}
                  </td>{" "}
                </tr>
              )}
            </tbody>
          </table>
        </ModalBody>

        <ModalHeader> Payment Methoad </ModalHeader>
        <ModalBody>
          <div
            className={
              !isChecked && isSubmit ? "check-box active" : "check-box"
            }
          >
            <input
              type="checkbox"
              id="checkbox-input"
              onClick={() => {
                setIsChecked(!isChecked);
              }}
            />{" "}
            <label htmlFor="checkbox-input" style={{ cursor: "pointer" }}>
              {" "}
              Cash On Delivery{" "}
            </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setIsSubmit(true);
              handelOrderHistry(bagProducts);
              isChecked && addressCreate();
              isChecked && checkOutModelOpen();
              isChecked && setIsOrderSuccess(true);
            }}
            style={{
              background: "#da1c5c",
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Place Order
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isPlaceOrderClicked}>
        <ModalHeader toggle={placeOrderModelOpen}>
          {" "}
          Payment Methoad{" "}
        </ModalHeader>
        <ModalBody>
          <div
            className={
              !isChecked && isSubmit ? "check-box active" : "check-box"
            }
          >
            <input
              type="checkbox"
              id="checkbox-input"
              onClick={() => {
                setIsChecked(!isChecked);
              }}
            />{" "}
            <label htmlFor="checkbox-input"> Cash On Delivery </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setIsSubmit(true);
              handelOrderHistry(bagProducts);
              isChecked && setIsOrderSuccess(true);
              isChecked && placeOrderModelOpen();
            }}
            style={{
              background: "#da1c5c",
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Place Order
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isOrderSuccess} style={{ marginTop: "150px" }}>
        <ModalHeader> Order Success </ModalHeader>
        <ModalBody>
          <svg
            className="done-img"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
          >
            <circle
              className="path circle"
              fill="none"
              stroke="#73AF55"
              stroke-width="6"
              stroke-miterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <polyline
              className="path check"
              fill="none"
              stroke="#73AF55"
              stroke-width="6"
              stroke-linecap="round"
              stroke-miterlimit="10"
              points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
          </svg>
          <span className="d-flex justify-content-center">
            <p className="m-0 mt-4" style={{ fontSize: "18px" }}>
              {" "}
              Your Order is Successfully Placed!{" "}
            </p>
          </span>
        </ModalBody>
        <ModalFooter>
          <Link
            to={"/"}
            replace={true}
            color="primary"
            onClick={() => {
              orderSuccesModelOpen();
              setBagProducts([]);
              localStorage.removeItem("bagProduct");
              setisOrderSuccessBtnClicked(!isOrderSuccessBtnClicked);
            }}
            style={{
              background: "#da1c5c",
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "18px",
              fontWeight: "bold",
              textDecoration: "none",
              textAlign: "center",
              color: "white",
              padding: "10px 0px",
              borderRadius: "8px",
            }}
          >
            Done
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductBag;
