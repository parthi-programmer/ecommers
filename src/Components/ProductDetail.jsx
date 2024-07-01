import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TextContext } from "../App";

function ProductDetail() {
  const { clickedProduct } = useContext(TextContext);
  const { handelBagProduct } = useContext(TextContext);
  const { clickedBtnIndex } = useContext(TextContext);
  const { setClickedBtnIndex } = useContext(TextContext);
  const { userAddress } = useContext(TextContext);
  const { handelOrderHistry } = useContext(TextContext);
  const { exceptThisSymbols } = useContext(TextContext);
  const { handelChange } = useContext(TextContext);
  const { handelProductSizeUpdate } = useContext(TextContext);
  const { fixedAddress } = useContext(TextContext);
  const { isCheckBoxClicked } = useContext(TextContext);
  const { setIsCheckBoxClicked } = useContext(TextContext);
  const { isPlaceBtnClicked } = useContext(TextContext);
  const { setIsPlaceBtnClicked } = useContext(TextContext);
  const { addressCreate } = useContext(TextContext);
  const { setisOrderSuccessBtnClicked } = useContext(TextContext);
  const { isOrderSuccessBtnClicked } = useContext(TextContext);

  clickedProduct.length !== 0 &&
    localStorage.setItem("clickedProduct", JSON.stringify(clickedProduct));

  const currentProduct = JSON.parse(localStorage.getItem("clickedProduct"));

  const [clickedProductIndex, setClickedProductIndex] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isSizeSeleted, setIsSizeSeleted] = useState(false);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const [isBuyNowClicked, setIsBuyNowClicked] = useState(false);
  const [isBuyNowClickedWithAddress, setIsBuyNowClickedWithAddress] =
    useState(false);
  const [isBuyNowSuccess, setIsBuyNowSuccess] = useState(false);

  useEffect(() => {
    let fadeOut;
    if (isSizeSeleted) {
      fadeOut = setTimeout(() => {
        setIsSizeSeleted(false);
      }, 4000);
    }

    return () => clearTimeout(fadeOut);
  }, [isSizeSeleted]);

  useEffect(() => {
    if (selectedSize !== "") {
      currentProduct[clickedProductIndex].currentsize = selectedSize;
      isAddBtnClicked
        ? handelBagProduct(...currentProduct)
        : handelOrderHistry(currentProduct);
      setSelectedSize("");
      setClickedBtnIndex("");
      console.log("Add to Bag", currentProduct);
    }
  }, [selectedSize]);

  useEffect(() => {
    return () => {};
  });

  function handelPlaceOrderModelOpen() {
    setIsBuyNowClicked(!isBuyNowClicked);
  }

  function handelPlaceOrderModelOpenWidthAddress() {
    setIsBuyNowClickedWithAddress(!isBuyNowClickedWithAddress);
  }

  function handelBuyNowSuccesModelOpen() {
    setIsBuyNowSuccess(!isBuyNowSuccess);
  }

  return (
    <div>
      {currentProduct.length !== 0 &&
        currentProduct.map((val, index) => (
          <div key={index} className="product-detial-section row m-5">
            <div className="col-12 col-lg-5">
              <div>
                <img
                  src={val.image}
                  alt=""
                  style={{ border: "1px solid #d5d5d5", borderRadius: "20px" }}
                />
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      position: "absolute",
                      background: "#ff0f59",
                      width: "70px",
                      height: "40px",
                      color: "white",
                      top: "200px",
                      left: "55px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 10px 36px 0px, rgba(0, 0, 0, 0.25) 0px 0px 0px 1px",
                    }}
                  >
                    {" "}
                    <span> {val.discountPercent} off </span>{" "}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      borderTop: "20px solid transparent",
                      borderBottom: "20px solid transparent",
                      borderLeft: "20px solid #ff0f59",
                      width: "0px",
                      height: "0px",
                      top: "200px",
                      left: "125px",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-7 my-3">
              <div className="product-detail">
                <h6 style={{ fontSize: "18px" }}> {val.categorie} </h6>
                <p style={{ color: "#8e8e8e", fontsize: "14px" }}>
                  {" "}
                  {val.productDescription}{" "}
                </p>
                <div className="price">
                  <span className="current-price" style={{ fontSize: "18px" }}>
                    {" "}
                    ₹{val.currentPrice}{" "}
                  </span>
                  <span
                    className="mrp-price"
                    style={{ fontSize: "14px", color: "#a0a0a0" }}
                  >
                    {" "}
                    MRP: <s> ₹{val.mrp} </s>{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      marginLeft: "5px",
                      color: "#4cbd23",
                      fontWeight: "630",
                    }}
                  >
                    {" "}
                    {val.discountPercent} off{" "}
                  </span>
                  <p className="text-secondary" style={{ fontSize: "12px" }}>
                    Inclusive of all taxes
                  </p>
                </div>
                <div className="rating">
                  <span className="rateCount" style={{ fontSize: "14px" }}>
                    {" "}
                    {val.starRating}{" "}
                    <span style={{ fontSize: "11px" }}>
                      {" "}
                      <i className="bi bi-star-fill"></i>{" "}
                    </span>{" "}
                  </span>
                  <span
                    className="peoplerated ms-2"
                    style={{ fontSize: "16px" }}
                  >
                    {" "}
                    <b> {val.peopleRated} </b> Ratings &{" "}
                    <b> {val.peopleReviewed} </b> Reviews{" "}
                  </span>
                </div>
              </div>

              <hr />

              <div className="product-size">
                <h6 className="fw-bold" style={{ fontSize: "15px" }}>
                  Select Size
                </h6>
                <div>
                  {val.productsize.map((sizeVal, sizeIndex) => (
                    <button
                      key={sizeIndex + 1}
                      className="m-2"
                      style={{
                        border:
                          clickedBtnIndex === sizeIndex
                            ? "2px solid white"
                            : "2px solid black",
                        color:
                          clickedBtnIndex === sizeIndex ? "white" : "black",
                        borderRadius: "50%",
                        outline: "none",
                        width: "50px",
                        height: "50px",
                        fontSize: "18px",
                        fontWeight: "550",
                        background:
                          clickedBtnIndex === sizeIndex
                            ? "black"
                            : "transparent",
                      }}
                      onClick={() => {
                        setClickedBtnIndex(sizeIndex);
                        setIsAddBtnClicked(false);
                        handelProductSizeUpdate(sizeVal.size);
                      }}
                    >
                      {" "}
                      {sizeVal.size}{" "}
                    </button>
                  ))}
                </div>
              </div>

              <hr />

              <div className="shipping-detail">
                <h6 className="fw-bold" style={{ fontSize: "15px" }}>
                  Ship To
                </h6>

                <div className="pincode-input ms-2 mt-4">
                  <input type="number" placeholder="Enter Pincode" />
                  <button>Change Pincode</button>
                </div>

                <div className="delivery-date ms-2 mt-4">
                  <span className="delivery-icon">
                    {" "}
                    <i className="bi bi-truck"></i>{" "}
                  </span>
                  <span className="delivery-text">
                    {" "}
                    Deliveryed WithIn <b> 7 Days </b>{" "}
                  </span>
                </div>

                <div className="return-date ms-2">
                  <span className="return-icon">
                    {" "}
                    <i className="bi bi-arrow-repeat"></i>{" "}
                  </span>
                  <span className="return-text">
                    {" "}
                    <b> 7 Days Return and Replacement available </b> |{" "}
                    <button> Know More </button>{" "}
                  </span>
                </div>
              </div>

              <hr />

              <div className="bag-buy-btn">
                <button
                  className="buy-btn"
                  onClick={() => {
                    clickedBtnIndex === ""
                      ? setIsSizeSeleted(true)
                      : !JSON.parse(localStorage.getItem("address"))
                      ? setIsBuyNowClicked(!isBuyNowClicked)
                      : setIsBuyNowClickedWithAddress(
                          !isBuyNowClickedWithAddress
                        );

                    setClickedProductIndex(index);
                    clickedBtnIndex !== "" &&
                      setSelectedSize(val.productsize[clickedBtnIndex].size);
                  }}
                >
                  {" "}
                  Buy Now{" "}
                </button>
                {isAddBtnClicked ? (
                  <Link to={"/cart"} className="go-bag-btn">
                    {" "}
                    Go To Bag{" "}
                  </Link>
                ) : (
                  <button
                    className="bag-btn"
                    onClick={() => {
                      clickedBtnIndex === ""
                        ? setIsSizeSeleted(true)
                        : setSelectedSize(
                            val.productsize[clickedBtnIndex].size
                          );
                      setClickedProductIndex(index);
                      clickedBtnIndex !== "" && setIsAddBtnClicked(true);
                    }}
                  >
                    {""}
                    Add To Bag{" "}
                  </button>
                )}
              </div>
            </div>

            <div
              className="size-error-msg"
              style={{ display: isSizeSeleted ? "inline" : "none" }}
            >
              <p>Please Select a Size to Continue</p>
            </div>
          </div>
        ))}

      <Modal isOpen={isBuyNowClickedWithAddress}>
        <ModalHeader toggle={handelPlaceOrderModelOpenWidthAddress}>
          {" "}
          Payment Methoad{" "}
        </ModalHeader>
        <ModalBody>
          <div
            className={
              !isCheckBoxClicked && isPlaceBtnClicked
                ? "check-box active"
                : "check-box"
            }
          >
            <input
              type="checkbox"
              id="checkbox-input"
              onClick={() => {
                setIsCheckBoxClicked(!isCheckBoxClicked);
              }}
            />{" "}
            <label htmlFor="checkbox-input"> Cash On Delivery </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setIsPlaceBtnClicked(true);
              isCheckBoxClicked && setIsBuyNowSuccess(true);
              isCheckBoxClicked && handelPlaceOrderModelOpenWidthAddress();
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

      <Modal isOpen={isBuyNowClicked}>
        <ModalHeader toggle={handelPlaceOrderModelOpen}>
          {" "}
          Delivery Address{" "}
        </ModalHeader>
        <ModalBody>
          <table>
            <tbody>
              <tr>
                <td>
                  <div
                    className={
                      isPlaceBtnClicked && userAddress.firstname === ""
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
              {isPlaceBtnClicked && userAddress.firstname === "" && (
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
                      isPlaceBtnClicked && userAddress.lastname === ""
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
              {isPlaceBtnClicked && userAddress.lastname === "" && (
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
                      isPlaceBtnClicked && userAddress.phone === ""
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
              {isPlaceBtnClicked && userAddress.phone === "" && (
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
                      isPlaceBtnClicked && userAddress.address === ""
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
              {isPlaceBtnClicked && userAddress.address === "" && (
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
              !isCheckBoxClicked && isPlaceBtnClicked
                ? "check-box active"
                : "check-box"
            }
          >
            <input
              type="checkbox"
              id="checkbox-input"
              onClick={() => {
                setIsCheckBoxClicked(!isCheckBoxClicked);
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
              setIsPlaceBtnClicked(true);
              isCheckBoxClicked && addressCreate();
              isCheckBoxClicked && handelPlaceOrderModelOpen();
              isCheckBoxClicked && setIsBuyNowSuccess(true);
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

      <Modal isOpen={isBuyNowSuccess} style={{ marginTop: "150px" }}>
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
              handelBuyNowSuccesModelOpen();
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
}

export default ProductDetail;
