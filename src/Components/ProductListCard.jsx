import React, { useContext, useState } from "react";
import "../App.css";
import productImg1 from "../Asset/images/product-img-1.webp";
import productImg2 from "../Asset/images/product-img-2.webp";
import productImg3 from "../Asset/images/product-img-3.webp";
import productImg4 from "../Asset/images/product-img-4.webp";
import productImg5 from "../Asset/images/product-img-5.webp";
import productImg6 from "../Asset/images/product-img-6.webp";
import productImg7 from "../Asset/images/product-img-7.webp";
import productImg8 from "../Asset/images/product-img-8.webp";
import similerIcon from "../Asset/images/similer-icon.png";
import { Link } from "react-router-dom";
import { TextContext } from "../App";

function ProductListCard() {
  const { handelClickedValue } = useContext(TextContext);

  let productList = [
    {
      id: 1,
      categorie: "Puma",
      productDescription:
        "Puma Men's Softride Pro Echo One8 Inky Blue Running Shoes",
      currentPrice: "3359",
      mrp: "7999",
      discountPercent: "58%",
      image: productImg1,
      starRating: "4.3",
      peopleRated: "9",
      peopleReviewed: "3",
      color: "Inky Blue",
      qty: 1,
      productsize: [
        { id: 1, size: 6 },
        { id: 2, size: 7 },
        { id: 3, size: 8 },
        { id: 4, size: 9 },
        { id: 5, size: 10 },
      ],
    },
    {
      id: 2,
      categorie: "Puma",
      productDescription: "Puma Men's RS-X MiX White Running Shoes",
      currentPrice: "4949",
      mrp: "9999",
      discountPercent: "51%",
      image: productImg2,
      starRating: "5",
      peopleRated: "8",
      peopleReviewed: "2",
      color: "White",
      qty: 1,
      productsize: [
        { id: 1, size: 6 },
        { id: 2, size: 7 },
        { id: 3, size: 8 },
        { id: 4, size: 9 },
        { id: 5, size: 10 },
      ],
    },
    {
      id: 3,
      categorie: "Puma",
      productDescription: "Puma Black Regular Fit Training T-Shirt",
      currentPrice: "629",
      mrp: "1499",
      discountPercent: "58%",
      image: productImg3,
      starRating: "4.5",
      peopleRated: "64",
      peopleReviewed: "9",
      color: "Black",
      qty: 1,
      productsize: [
        { id: 1, size: 32 },
        { id: 2, size: 34 },
        { id: 3, size: 36 },
        { id: 4, size: 38 },
        { id: 5, size: 40 },
      ],
    },
    {
      id: 4,
      categorie: "Puma",
      productDescription: "Puma White Regular Fit Training T-Shirt",
      currentPrice: "629",
      mrp: "1499",
      discountPercent: "58%",
      image: productImg4,
      starRating: "4.5",
      peopleRated: "64",
      peopleReviewed: "9",
      color: "White",
      qty: 1,
      productsize: [
        { id: 1, size: 32 },
        { id: 2, size: 34 },
        { id: 3, size: 36 },
        { id: 4, size: 38 },
        { id: 5, size: 40 },
      ],
    },
    {
      id: 5,
      categorie: "TOMMY HILFIGER",
      productDescription: "Sleepy Blue & White Stripes Regular Fit Shirt",
      currentPrice: "4199",
      mrp: "5999",
      discountPercent: "30%",
      image: productImg5,
      starRating: "4.0",
      peopleRated: "80",
      peopleReviewed: "20",
      color: "Sleepy Blue & White Stripes",
      qty: 1,
      productsize: [
        { id: 1, size: 32 },
        { id: 2, size: 34 },
        { id: 3, size: 36 },
        { id: 4, size: 38 },
        { id: 5, size: 40 },
      ],
    },
    {
      id: 6,
      categorie: "Levi's",
      productDescription: "Levi's Blue Slim Tapered Fit Jeans",
      currentPrice: "2295",
      mrp: "5099",
      discountPercent: "55%",
      image: productImg6,
      starRating: "3.5",
      peopleRated: "2",
      peopleReviewed: "10",
      color: "Sleepy Blue & White Stripes",
      qty: 1,
      productsize: [
        { id: 1, size: 32 },
        { id: 2, size: 34 },
        { id: 3, size: 36 },
        { id: 4, size: 38 },
        { id: 5, size: 40 },
      ],
    },
    {
      id: 7,
      categorie: "Levi's",
      productDescription: "Levi's Multicolored Cotton Regular Fit Colour Block Sweater",
      currentPrice: "1665",
      mrp: "3699",
      discountPercent: "55%",
      image: productImg7,
      starRating: "5.0",
      peopleRated: "200",
      peopleReviewed: "1000",
      color: "Gray",
      qty: 1,
      productsize: [
        { id: 1, size: 32 },
        { id: 2, size: 34 },
        { id: 3, size: 36 },
        { id: 4, size: 38 },
        { id: 5, size: 40 },
      ],
    },
    {
      id: 8,
      categorie: "Levi's",
      productDescription: "Levi's Black Cotton Regular Fit Self Pattern Sweater",
      currentPrice: "1530",
      mrp: "3399",
      discountPercent: "55%",
      image: productImg8,
      starRating: "4.8",
      peopleRated: "70",
      peopleReviewed: "200",
      color: "Black",
      qty: 1,
      productsize: [
        { id: 1, size: 32 },
        { id: 2, size: 34 },
        { id: 3, size: 36 },
        { id: 4, size: 38 },
        { id: 5, size: 40 },
      ],
    },
  ];

  return (
    <div>
      <h3 className="ms-4 m-3" style={{ userSelect: "none" }}>
        Showing items for "Puma"
      </h3>

      <div className="m-3 p-3 d-flex justify-content-center flex-wrap">
        {productList.map((val, index) => (
          <Link
            key={index}
            to={"/" + val.productDescription.replaceAll(" ", "-")}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              className="card m-4 product-list-card"
              onClick={() => {
                handelClickedValue(val);
              }}
              style={{ width: "12rem", cursor: "pointer", border: "none" }}
            >
              <img
                src={val.image}
                className="card-img-top"
                alt="..."
                style={{ borderRadius: "3px" }}
              />
              <div className="card-body">
                <h5 className="fw-bold text-dark" sty le={{ fontSize: "18px" }}>
                  {val.categorie}
                </h5>
                <p
                  className="card-text text-secondary"
                  style={{ fontSize: "14px" }}
                >
                  {val.productDescription}
                </p>
                <div>
                  <span
                    className="fw-bold text-dark"
                    style={{ fontSize: "16px" }}
                  >
                    ₹{val.currentPrice}
                  </span>
                  <span
                    className="text-decoration-line-through text-secondary ms-2"
                    style={{ fontSize: "13px", marginRight: "5px" }}
                  >
                    ₹{val.mrp}
                  </span>
                  <span style={{ fontSize: "13px", color: "#49942f" }}>
                    {val.discountPercent} off
                  </span>
                </div>

                <div>
                  <span
                    className="star-rating align-item-center rounded-pill"
                    style={{
                      width: "max-content",
                      padding: "0px 5px",
                      fontSize: "10px",
                      border: "1px solid #ececec",
                    }}
                  >
                    {val.starRating}
                    <span
                      style={{
                        color: "#49942f",
                        fontSize: "11px",
                      }}
                    >
                      <i className="bi bi-star-fill"></i>
                    </span>
                  </span>
                  <span
                    className="ms-1 mt-0 text-secondary"
                    style={{ fontSize: "11px" }}
                  >
                    ( {val.peopleRated} )
                  </span>
                </div>
              </div>

              <div className="card-img-overlay">
                <span className="d-flex justify-content-end align-content-center">
                  <i
                    className="bi bi-heart"
                    style={{
                      width: "30px",
                      background: "#fafafa",
                      borderRadius: "6px",
                      padding: "5px",
                      paddingLeft: "7px",
                      fontWeight: "bold",
                    }}
                  ></i>
                </span>

                <div
                  className="d-flex justify-content-end"
                  style={{ height: "195px" }}
                >
                  <span className="align-content-end">
                    <img
                      src={similerIcon}
                      alt=""
                      style={{
                        width: "30px",
                        background: "#fafafa",
                        borderRadius: "6px",
                        padding: "5px",
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductListCard;
