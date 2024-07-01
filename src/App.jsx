import React, { createContext, useEffect, useState } from "react";
import logo from "./Asset/images/logo.png";
import "./App.css";
import ProductListCard from "./Components/ProductListCard";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import ProductDetail from "./Components/ProductDetail";
import ProductBag from "./Components/ProductBag";
import OrderHistry from "./Components/OrderHistry";

export const TextContext = createContext();

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isInputClick, setIsInputClick] = useState(false);
  const [isDropBtnClicked, setIsDropBtnClicked] = useState(false);
  const [clickedProduct, setClickedProduct] = useState([]);
  const [bagProducts, setBagProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [fixedAddress, setFixedAddress] = useState([]);
  const [clickedBtnIndex, setClickedBtnIndex] = useState("");
  const [productSize, setProductSize] = useState("");
  const [bagLength, setBagLength] = useState("0");
  const [isOrderSuccessBtnClicked, setisOrderSuccessBtnClicked] =
    useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckBoxClicked, setIsCheckBoxClicked] = useState(false);
  const [isPlaceBtnClicked, setIsPlaceBtnClicked] = useState(false);
  const [userAddress, setUserAddress] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    payment: false,
  });

  const notLetters = /^[A-Za-z]+$/;
  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  function handelInputValue(e) {
    setInputValue(e.target.value);
  }

  function handelClickedValue(val) {
    setClickedProduct([val]);
  }

  async function handelOrderHistry(val) {
    let tempOrderedProduct = await JSON.parse(
      localStorage.getItem("orderedProduct")
    );

    if (!tempOrderedProduct) {
      localStorage.setItem("orderedProduct", JSON.stringify(val));
    } else {
      localStorage.setItem(
        "orderedProduct",
        JSON.stringify([...tempOrderedProduct, ...val])
      );
    }
  }

  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("orderedProduct"));
    setOrderedProducts(temp);
  }, [isOrderSuccessBtnClicked]);

  async function handelBagProduct(val) {
    let tempCartProduct = await JSON.parse(localStorage.getItem("bagProduct"));

    if (!tempCartProduct) {
      localStorage.setItem("bagProduct", JSON.stringify([val]));
    } else {
      localStorage.setItem(
        "bagProduct",
        JSON.stringify([...tempCartProduct, val])
      );
    }
  }

  useEffect(() => {
    setBagProducts(JSON.parse(localStorage.getItem("bagProduct")));
  }, [clickedBtnIndex]);

  useEffect(() => {
    if (bagProducts) {
      setBagLength(bagProducts.length);
    }
  }, [bagProducts]);

  function handelChange(e) {
    const value = e.target.value;

    if (e.target.name === "firstname") {
      if (value === "" || notLetters.test(value)) {
        setUserAddress({
          ...userAddress,
          firstname: value,
        });
      }
    } else if (e.target.name === "lastname") {
      if (value === "" || notLetters.test(value)) {
        setUserAddress({
          ...userAddress,
          lastname: value,
        });
      }
    } else if (e.target.name === "phone") {
      const limit = 10;
      setUserAddress({
        ...userAddress,
        phone: value.slice(0, limit),
      });
    } else {
      setUserAddress({
        ...userAddress,
        [e.target.name]: value,
      });
    }
  }

  function valuesEmpty() {
    setUserAddress({
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
    });
  }

  function addressCreate() {
    if (
      userAddress.firstname !== "" &&
      userAddress.lastname !== "" &&
      userAddress.phone !== "" &&
      userAddress.address !== "" &&
      (isChecked || isCheckBoxClicked)
    ) {
      let value = {
        firstname: userAddress.firstname,
        lastname: userAddress.lastname,
        phone: userAddress.phone,
        address: userAddress.address,
        payment: isChecked,
      };

      localStorage.setItem("address", JSON.stringify(value));
      setIsSubmit(false);
      setIsChecked(false);
      setIsPlaceBtnClicked(false);
      setIsCheckBoxClicked(false);
      valuesEmpty();
    }
  }

  function handelProductSizeUpdate(val) {
    setProductSize(val);
  }

  // useEffect(()=>{
  //   setFixedAddress(localStorage.getItem('address'))
  // }, [isPlaceBtnClicked])

  // console.log(bagProducts);

  return (
    <TextContext.Provider
      value={{
        handelClickedValue,
        clickedProduct,
        handelBagProduct,
        orderedProducts,
        bagProducts,
        handelOrderHistry,
        setFixedAddress,
        fixedAddress,
        setBagProducts,
        clickedBtnIndex,
        setClickedBtnIndex,
        bagLength,
        setBagLength,
        setisOrderSuccessBtnClicked,
        isOrderSuccessBtnClicked,
        userAddress,
        setUserAddress,
        handelChange,
        addressCreate,
        exceptThisSymbols,
        isSubmit,
        setIsSubmit,
        isChecked,
        setIsChecked,
        isCheckBoxClicked,
        setIsCheckBoxClicked,
        isPlaceBtnClicked,
        setIsPlaceBtnClicked,
        handelProductSizeUpdate,
      }}
    >
      <BrowserRouter>
        <nav
          className="navbar navbar-expand-sm navbar-light py-0"
          style={{ position: "sticky", top: "0", zIndex: "99" }}
        >
          <div className="container-fluid">
            <a className="navbar-brand mx-5" href="#">
              {" "}
              <img
                src={logo}
                alt=""
                className="ms-3"
                style={{ width: "85px", height: "45px" }}
              />{" "}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse row ms-5"
              id="navbarNavAltMarkup"
            >
              <div
                className="navbar-nav col-12 d-flex justify-content-between py-1 pe-5"
                style={{ background: "black" }}
              >
                <div className="navbar-nav col-4">
                  <a
                    className="nav-link text-white ms-2"
                    href="#"
                    style={{ fontSize: "13px" }}
                  >
                    Tata CLiQ Luxury
                  </a>
                </div>

                <div className="navbar-nav col-8 ms-2 d-flex justify-content-end">
                  <a
                    className="nav-link text-white me-3"
                    href="#"
                    style={{ fontSize: "13px" }}
                  >
                    CLiQ Cash
                  </a>
                  <a
                    className="nav-link text-white me-3"
                    href="#"
                    style={{ fontSize: "13px" }}
                  >
                    Gift Card
                  </a>
                  <a
                    className="nav-link text-white me-3"
                    href="#"
                    style={{ fontSize: "13px" }}
                  >
                    CLiQ Care
                  </a>
                  <a
                    className="nav-link text-white me-3"
                    href="#"
                    style={{ fontSize: "13px" }}
                  >
                    Track Orders
                  </a>
                  <a
                    className="nav-link text-white me-5"
                    href="#"
                    style={{ fontSize: "13px" }}
                  >
                    Sign in / Sign Up
                  </a>
                </div>
              </div>

              <div className="navbar-nav col-12">
                <div className="d-flex align-items-center col-9 p-2">
                  <div
                    style={{
                      width: "100%",
                      borderRadius: inputValue === "" && "5px",
                    }}
                    className={
                      isInputClick
                        ? "search-part active ps-3 d-flex align-items-center"
                        : "search-part ps-3 d-flex align-items-center"
                    }
                    onClick={() => {
                      setIsInputClick(true);
                    }}
                  >
                    <div className="search-icon">
                      {" "}
                      <i className="bi bi-search"></i>{" "}
                    </div>
                    <input
                      type="text"
                      value={inputValue}
                      className="search-input w-100"
                      placeholder="Search for Brands"
                      onChange={handelInputValue}
                    />
                  </div>
                  {inputValue !== "" && (
                    <div
                      className={
                        isInputClick
                          ? "close-part active d-flex align-items-center justify-content-center pe-2 ps-0"
                          : "close-part d-flex align-items-center justify-content-center pe-2 ps-0"
                      }
                      onClick={() => {
                        setIsInputClick(false);
                        setInputValue("");
                      }}
                    >
                      {" "}
                      <i class="bi bi-x-lg"></i>{" "}
                    </div>
                  )}
                </div>

                <div className="Heart-bag-icon-part col-2 d-flex justify-content-evenly align-item-center">
                  <Link
                    to="/cart"
                    className="bag-icon"
                    style={{
                      fontSize: "16px",
                      height: "max-content",
                      marginTop: "15px",
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    {" "}
                    <i className="bi bi-bag"></i>{" "}
                    {bagLength !== 0 && <span> {bagLength} </span>}{" "}
                  </Link>
                  <p
                    href="#"
                    className="heart-icon"
                    onClick={() => {
                      setIsDropBtnClicked(!isDropBtnClicked);
                    }}
                    style={{
                      fontSize: "16px",
                      height: "max-content",
                      marginTop: "15px",
                    }}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </p>
                  <span
                    className={
                      isDropBtnClicked ? "drop-options active" : "drop-options"
                    }
                  >
                    <span className="triangle"></span>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <Link className="drop-link">
                              {" "}
                              <span> My Profile </span>{" "}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link
                              to={"/all-orders"}
                              className="drop-link"
                              onClick={() => {
                                setIsDropBtnClicked(false);
                              }}
                            >
                              {" "}
                              <span> Order Histry </span>{" "}
                            </Link>{" "}
                            <br />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link className="drop-link">
                              {" "}
                              <span> My Address </span>{" "}
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ProductListCard />} />
          <Route path="/:producturl" element={<ProductDetail />} />
          <Route path="/cart" element={<ProductBag />} />
          <Route path="/all-orders" element={<OrderHistry />} />
        </Routes>
      </BrowserRouter>
    </TextContext.Provider>
  );
}

export default App;
