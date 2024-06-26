import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../../common'
import Context from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function CartView() {
    const [data, setData] = useState([])

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
                _id: id,
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
                    _id: id,
                    quantity: qty - 1
                })
            })
            const responseData = await response.json()

            if (responseData.success) {
                fetchData()

            }
        }
    }
    // delete cart product 
    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,

            })
        })
        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }


    //-----------------total product qty---------------
    let totalQuantity = 0;

    data.forEach(innerArray => {
        innerArray.forEach(obj => {
            totalQuantity += obj.quantity;
        });
    });

    //--------------total sellin price------------------
    let totalSellingPrice = 0;

    if (Array.isArray(data) && data.length > 0) {
        data[0].forEach(item => {
            if (item && item.productId && item.productId.sellingPrice && item.quantity) {
                const sellingPrice = parseFloat(item.productId.sellingPrice);
                const quantity = parseInt(item.quantity);

                if (!isNaN(sellingPrice) && !isNaN(quantity) && quantity > 0) {
                    totalSellingPrice += sellingPrice * quantity;
                }
            }
        });
    }

    return (
        <>
            <div className='container'>
                <div className='text-center p-5'>
                    <h1 >Shooping Cart</h1>
                </div>
            </div>
            {hasProducts ? (


                <div className="container">
                    <div className="row mb-5">
                        <form className="col-md-9">
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
                                                <td>${(product?.productId?.sellingPrice * product?.quantity).toFixed(2)}</td>
                                                <td><p className="btn btn-primary height-auto btn-sm" onClick={() => deleteCartProduct(product?._id)}><FontAwesomeIcon icon={faTrash} /></p></td>
                                                {/* <td>{subtotal}</td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </form>
                        <div className="col-md-3 pl-5">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12 text-center border-bottom mb-3">
                                            <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <span className="text-black">Quantity</span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <strong className="text-black">{totalQuantity}</strong>
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
                                            <strong className="text-black">${totalSellingPrice}</strong>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <button className="btn btn-primary btn-lg">Proceed To
                                                Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

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

