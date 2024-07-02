import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'

export default function PaymentView() {
    const [data, setData] = useState({})


    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.getCheckout.url, {
                method: SummaryApi.getCheckout.method,
                credentials: "include",
                headers: {
                    "Content-Type": 'application/json'
                },
            });


            const responseData = await response.json();
            console.log(responseData);
            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        fetchData()
    }, [])
    return (

        <>
            <div class="site-section">
                <div class="container">
                    <div class="row mb-5">
                        <form class="col-md-12" method="post">
                            <div class="site-blocks-table">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <td colSpan={6}><h3>Customer details</h3></td>
                                        </tr>
                                        <tr>
                                            <td class="product-price">Name</td>
                                            <td class="product-price"> email</td>
                                            <td class="product-price">Phone</td>
                                            <td class="product-price">Address</td>
                                            <td class="product-price">Nationalty</td>
                                            {/* <td class="product-total">Total</td> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.checkouts?.map((checkout, index) => (
                                                <tr key={index}>
                                                    <td class="product-thumbnail">
                                                        {checkout.checkout?.name}
                                                    </td>
                                                    <td class="product-name">
                                                        {checkout.checkout?.email}
                                                    </td>
                                                    <td>{checkout.checkout?.phone}</td>

                                                    <td>Address 1:-{checkout.checkout?.address1}<br />
                                                        Address 2:-{checkout.checkout?.address2}
                                                    </td>
                                                    <td>Country:-{checkout.checkout?.country}<br />
                                                        State:-{checkout.checkout?.state}<br />
                                                        City:-{checkout.checkout?.city}<br/>
                                                        Zipcode:-{checkout.checkout?.zipCode}
                                                    </td>
                                                    <td><a href="#" class="btn btn-primary height-auto btn-sm">X</a></td>
                                                </tr>

                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="row mb-5">
                                <div class="col-md-6 mb-3 mb-md-0">
                                    <button class="btn btn-primary btn-md btn-block">Update Cart</button>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-outline-primary btn-md btn-block">Continue Shopping</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="text-black h4" for="coupon">Coupon</label>
                                    <p>Enter your coupon code if you have one.</p>
                                </div>
                                <div class="col-md-8 mb-3 mb-md-0">
                                    <input type="text" class="form-control py-3" id="coupon" placeholder="Coupon Code" />
                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-primary btn-md px-4">Apply Coupon</button>
                                </div>
                            </div>
                        </div>
                        {/* <div class="col-md-6 pl-5">
            <div class="row justify-content-end">
              <div class="col-md-7">
                <div class="row">
                  <div class="col-md-12 text-right border-bottom mb-5">
                    <h3 class="text-black h4 text-uppercase">Cart Totals</h3>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <span class="text-black">Subtotal</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black">$230.00</strong>
                  </div>
                </div>
                <div class="row mb-5">
                  <div class="col-md-6">
                    <span class="text-black">Total</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black">$230.00</strong>
                  </div>
                </div>
    
                <div class="row">
                  <div class="col-md-12">
                    <button class="btn btn-primary btn-lg btn-block" onclick="window.location='checkout.html'">Proceed To
                      Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
                    </div>
                </div>
            </div>
            <h1>User Details</h1>
            <p>Name: {data.user?.name}</p>
            <p>Email: {data.user?.email}</p>
            <p>Role: {data.user?.role}</p>

            <h2>Checkouts</h2>
            {data.checkouts?.length > 0 ? (
                data.checkouts.map((checkout, index) => (
                    <div key={index}>
                        <h3>Checkout {index + 1}</h3>
                        <p>Name: {checkout.checkout?.name}</p>
                        <p>Email: {checkout.checkout?.email}</p>
                        <p>Phone: {checkout.checkout?.phone}</p>
                        <p>Address 1: {checkout.checkout?.address1}</p>
                        <p>Address 2: {checkout.checkout?.address2}</p>
                        <p>Country: {checkout.checkout?.country}</p>
                        <p>State: {checkout.checkout?.state}</p>
                        <p>City: {checkout.checkout?.city}</p>
                        <p>Zip Code: {checkout.checkout?.zipCode}</p>

                        <h4>Products</h4>
                        {checkout.products?.map((product, prodIndex) => (
                            <div key={prodIndex}>
                                <p>Product Name: {product.productName}</p>
                                <p>Brand Name: {product.brandName}</p>
                                <p>Category: {product.category}</p>
                                <img src={product.productImage[0]} alt={product.productName} width={100} height={100} />
                                <p>Description: {product.description}</p>
                                <p>Price: {product.price}</p>
                                <p>Selling Price: {product.sellingPrice}</p>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No checkouts available</p>
            )}

        </>
    )
}
