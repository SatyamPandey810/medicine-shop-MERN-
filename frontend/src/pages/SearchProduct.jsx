import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import { Oval } from 'react-loader-spinner'
import addToCart from './addtocart/AddToCart'
import Context from '../context'

export default function SearchProduct() {
    const query = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { fetchUserAddToCart } = useContext(Context);
    const fetchProduct = async () => {
        const response = await fetch(SummaryApi.searchprodct.url + query.search)
        const dataResponse = await response.json()
        setData(dataResponse.data)
    }

    useEffect(() => {
        fetchProduct()
    }, [query])
    const handelAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
        navigate(`/category/${id}/single-card`)
        // navigate(`/category/${encodeURIComponent(product.productName)}/single-card`);

    }
    return (

        <div className='container'>
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0"><Link to="/">Home</Link> <span className="mx-2 mb-0">/</span>
                            <strong className="text-black">Search</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tail-spin" style={{ width: '100%', height: '100%' }}>
                {
                    loading && (
                        <Oval
                            visible={true}
                            height="50"
                            width="50"
                            color="#4fa94d"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    )
                }
            </div>
            <p>Search result :{data.length}</p>
            {
                data.length === 0 && !loading && (
                    <div className="col-12 text-center">
                        <img src="\images\no-products-found.png" alt='img' />
                    </div>
                )
            }
            <div className='row'>
                {
                    data.length !== 0 && !loading && (
                        data.map((product) => (
                            <div key={product._id} className="col-sm-6 col-lg-4 text-center item mb-4">
                                <div className="product-card">
                                    {/* <div className="badge">Hot</div> */}
                                    <div className="product-tumb">
                                        <img src={product.productImage} alt="img" />
                                    </div>
                                    <div className="product-details">
                                        <span className="product-catagory">{product.brandName}</span>
                                        <h4><span>{product.productName}</span></h4>
                                        <p>{product.description}</p>
                                        {/* <p>{el._id}</p> */}
                                        <div className="product-bottom-details">
                                            <div className="product-price"><small>${product.price}</small> ${product.sellingPrice}</div>
                                            <div className="product-links">
                                                {/* <i className="fa fa-heart"></i> */}
                                                <button className='btn btn-primary'  onClick={(e) => handelAddToCart(e, product?._id)}><i className="fa fa-shopping-cart"></i> Add to Cart</button>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }

            </div>



        </div>
    )
}
