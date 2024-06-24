import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../../common'
import Context from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function CartView() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const hasProducts = data[0] && data[0].length > 0;

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: "include",
            headers: {
                "content-type": 'application/json'
            },
        })
        const responseData = await response.json()
        // console.log(responseData.data);
        if (responseData.success) {
            setData(responseData.data)

        }

    }
    useEffect(() => {
        fetchData()
    }, [])

    // increse and decrase product updateQuantity

    const increseQuantity = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                quantity: qty + 1
            })
        })
        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    const decraseQuantity = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: "include",
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    
                    quantity: qty - 1
                })
            })
            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }
    }
    return (
        <>

            {hasProducts ? (

                <div classNameName="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 border-right min-vh-100">
                                    <div className="vh-100 overflow-scroll pr-2">
                                        <div className="d-flex justify-content-between align-items-end p-5 position-sticky bg-white" style={{ top: 0, zIndex: "10" }}>
                                            <div className="">
                                                <h4 className="text-primary mb-0">My Shop</h4>
                                                <small className="text-black-50">Bootstrap & jQuery</small>

                                            </div>
                                            <div className="">
                                                <div className="form-row">
                                                    <div className="mr-2">
                                                        <input type="text" className="form-control text-capitalize  " id="search" placeholder="search item" />
                                                    </div>
                                                    <div className="">
                                                        <select name="" id="category" className="custom-select">
                                                            <option value="0">All Category</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="products" className="card-columns">

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="site-section">
                        <div className="container">
                            <div className="row mb-5">
                                <form className="col-md-12">
                                    <div className="site-blocks-table">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="product-thumbnail">Image</th>
                                                    <th className="product-name">Product</th>
                                                    <th className="product-price">Brand</th>
                                                    <th className="product-price">Price</th>
                                                    <th className="product-quantity">Quantity</th>
                                                    <th className="product-total">Total</th>
                                                    <th className="product-remove">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data[0].map((product, index) => (
                                                    <tr key={product?._id}>
                                                        <td className="product-thumbnail">
                                                            <img src={product?.productId?.productImage[0]} alt="Image" className="img-fluid" />
                                                        </td>
                                                        <td className="product-name">
                                                            <p className="text-black">{product?.productId?.productName}</p>
                                                        </td>
                                                        <td>{product?.productId?.brandName}</td>
                                                        <td>{product?.productId?.sellingPrice}/-</td>
                                                        <td>
                                                            <div className="input-group mb-3" style={{ maxWidth: "120px" }}>
                                                                <div className="input-group-prepend">
                                                                    <button className="btn btn-outline-primary js-btn-minus" type="button" onClick={() => decraseQuantity(product?._id, product?.quantity)}>&minus;</button>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control text-center"
                                                                    value={product?.quantity}
                                                                    placeholder=""
                                                                    aria-label="Example text with button addon"
                                                                    aria-describedby="button-addon1"
                                                                />
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-outline-primary js-btn-plus" type="button" onClick={() => increseQuantity(product?._id, product?.quantity)}>+</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>${product?.productId?.sellingPrice}</td>
                                                        <td><p  className="btn btn-primary height-auto btn-sm"><FontAwesomeIcon icon={faTrash} /></p></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </form>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row mb-5">
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <button className="btn btn-primary btn-md btn-block">Update Cart</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button className="btn btn-outline-primary btn-md btn-block">Continue Shopping</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-black h4">Coupon</label>
                                            <p>Enter your coupon code if you have one.</p>
                                        </div>
                                        <div className="col-md-8 mb-3 mb-md-0">
                                            <input type="text" className="form-control py-3" placeholder="Coupon Code" />
                                        </div>
                                        <div className="col-md-4">
                                            <button className="btn btn-primary btn-md px-4">Apply Coupon</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 pl-5">
                                    <div className="row justify-content-end">
                                        <div className="col-md-7">
                                            <div className="row">
                                                <div className="col-md-12 text-right border-bottom mb-5">
                                                    <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <span className="text-black">Subtotal</span>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                    <strong className="text-black">$230.00</strong>
                                                </div>
                                            </div>
                                            <div className="row mb-5">
                                                <div className="col-md-6">
                                                    <span className="text-black">Total</span>
                                                </div>
                                                <div className="col-md-6 text-right">
                                                    <strong className="text-black">$230.00</strong>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <button className="btn btn-primary btn-lg btn-block">Proceed To
                                                        Checkout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-12 text-center">
                    <img src="\images\no-products-found.png" />
                </div>
            )}
        </>
    )
}
