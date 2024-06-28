import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import emptyCart from "../Asset/images/empty-cart.webp";
import { useSelector } from 'react-redux';

function OrderHistry() {

    const product = useSelector((state) => state.orderedProduct)

    const orderedProducts = product.orderProduct

    // const {orderedProducts} = useContext(TextContext)

  return (
    <div>

        {!orderedProducts ? 
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "100px"}}>
                <div style={{width: "700px"}}>
                    <div className='mb-3' style={{display: "flex", justifyContent: "center"}}>
                        <img src={emptyCart} alt="empty-cart" style={{width: "250px"}} />
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div>
                            <h5 className='mb-4'> Your Order Page is Empty Now! </h5>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Link className='continue-shop' to={"/"} replace={true} > Continue Shopping </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className='mx-5 my-3'>

                <h3 className='my-4'> Order Histry </h3>

                {orderedProducts.map((val, index) => (
                    <div key={index} className="card mt-3 p-3">
    
                        <div className="row g-0">
                            <div className="col-md-2">
                                <img src={val.image} className="img-fluid rounded" alt="..." style={{height: "150px"}} />
                            </div>
                            <div className="col-md-10">
                                <div className="card-body py-0">
                                    <p className="card-text row"> 
                                        <span className='col-7' style={{fontSize: "14px",}}> {val.productDescription} </span> 
                                        <span className='col-5 d-flex justify-content-end'>
                                            <span className="delivery-date">
                                                <span className='delivery-icon' style={{fontSize: "20px"}}> <i className="bi bi-truck"></i> </span>
                                                <span className='delivery-text'style={{fontSize: "13px"}}> Deliveryed  WithIn <b> 7 Days </b> </span>
                                            </span>
                                        </span> 
                                        <span className="card-text m-0 mt-1"> <span style={{fontSize: "17px", fontWeight: "bold"}}> ₹{val.currentPrice * val.qty}.00 </span> <small className="text-muted ms-2"> <s> ₹{val.mrp * val.qty}.00 </s> </small> <span className='ms-2' style={{color: "#338715"}}> { (val.mrp - val.currentPrice) * val.qty }.00 off </span></span>
                                        <span className="card-text"> Color : {val.color} </span>
                                        <span className="card-text"> Size : {val.currentsize} </span>
                                        <span className="card-text"> Qty : {val.qty} </span>
                                        <span className="card-text"> Delivery Status : <span style={{color: "green"}}> Processing... </span> </span>
                                    </p>
                                </div>
                            </div>
                        </div>
    
                    </div>
                ))}
            </div>
        }


    </div>
  )
}

export default OrderHistry