import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'
import { useNavigate, useParams } from 'react-router-dom';

export default function SingleAddtocart() {
    const [data, setData] = useState(null)
    const { id } = useParams();
    const [totalSellingPrice, setTotalSellingPrice] = useState(0);
    const navigate = useNavigate()

    // Find the product
    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();

            if (responseData.success) {
                const flatData = responseData.data.flat();
                const product = flatData.find(
                    (item) => item.productId?._id === id
                );
                setData(product);
                if (product) {
                    const sellingPricePerUnit = product.productId?.sellingPrice || 0;
                    const quantity = product.quantity || 0;
                    setTotalSellingPrice(sellingPricePerUnit * quantity);
                }
            } else {
                console.error('Fetch failed:', responseData.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);


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


    const handleCheckout = () => {
        if (data && data.productId) {
            // navigate(`o/category/${id}/cart-view/${encodeURICompnent(data.productId.productName)}`);
            navigate("/cart-view")
        }
    };


    //   console.log(data);
    return (
        <>
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <a
                            href="shop.html">Store</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">{data?.productId?.productName}</strong></div>
                    </div>
                </div>
            </div>
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 mr-auto">
                            <div className="border text-center addtocart">
                                <img src={data?.productId?.productImage[0]} alt="Image" className="img-fluid p-5" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h2 className="text-black text-capitalize">{data?.productId?.productName}</h2>
                            <p>{data?.productId?.description}</p>
                            <p>
                                <del>${data?.productId?.price}</del>
                                <strong className="text-primary h4 mx-4">${totalSellingPrice}</strong>
                            </p>
                            <div className="mb-5">
                                <div className="input-group mb-3" style={{ maxWidth: "220px" }}>
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-primary js-btn-minus" type="button" onClick={() => decraseQuantity(data?._id, data?.quantity)}>&minus;</button>
                                    </div>
                                    <input type="text" className="form-control text-center" value={data?.quantity} placeholder=""
                                        aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                    <div className="input-group-append">
                                        <button onClick={() => increseQuantity(data?._id, data?.quantity)} className="btn btn-outline-primary js-btn-plus" type="button">+</button>
                                    </div>
                                </div>
                            </div>
                            <p>
                                <button className="buy-now btn btn-sm height-auto px-4 py-3 btn-primary" onClick={handleCheckout}>Checkout</button>
                            </p>
                            <div className="mt-5">
                                <ul className="nav nav-pills mb-3 custom-pill" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                                            aria-controls="pills-home" aria-selected="true">Ordering Information</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                                            aria-controls="pills-profile" aria-selected="false">Specifications</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <table className="table custom-table">
                                            <thead>
                                                <th>Material</th>
                                                <th>Description</th>
                                                <th>Packaging</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">OTC022401</th>
                                                    <td>Pain Management: Acetaminophen PM Extra-Strength Caplets, 500 mg, 100/Bottle</td>
                                                    <td>1 BT</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">OTC022401</th>
                                                    <td>Pain Management: Acetaminophen PM Extra-Strength Caplets, 500 mg, 100/Bottle</td>
                                                    <td>144/CS</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">OTC022401</th>
                                                    <td>Pain Management: Acetaminophen PM Extra-Strength Caplets, 500 mg, 100/Bottle</td>
                                                    <td>1 EA</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                        <table className="table custom-table">

                                            <tbody>
                                                <tr>
                                                    <td>HPIS CODE</td>
                                                    <td className="bg-light">999_200_40_0</td>
                                                </tr>
                                                <tr>
                                                    <td>HEALTHCARE PROVIDERS ONLY</td>
                                                    <td className="bg-light">No</td>
                                                </tr>
                                                <tr>
                                                    <td>LATEX FREE</td>
                                                    <td className="bg-light">Yes, No</td>
                                                </tr>
                                                <tr>
                                                    <td>MEDICATION ROUTE</td>
                                                    <td className="bg-light">Topical</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}
