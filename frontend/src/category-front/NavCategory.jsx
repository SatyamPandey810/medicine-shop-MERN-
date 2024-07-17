import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import Context from '../context';
import addToCart from '../pages/addtocart/AddToCart';

export default function NavCategory() {
    const [product, setProduct] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [mainProducts, setMainProducts] = useState([]);

    const { id: _id } = useParams();
    const navigate = useNavigate()

    const { fetchUserAddToCart } = useContext(Context);

    const handelAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
        navigate(`/category/${id}/single-card`)

    }



    const fetchNavCategory = async () => {

        try {
            const url = `${SummaryApi.getNavCategoryProduct.url.replace(':id', _id)}`;
            // console.log('Fetching URL:', url); 
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const dataResponse = await response.json();
            setProduct(dataResponse.navCategory);
            setCategoryName(dataResponse.navCategory.name);
            setCategoryImage(dataResponse.navCategory.image[0]);
            setMainProducts(dataResponse.mainProduct);
            // console.log(dataResponse);
        } catch (error) {
            console.error("Error fetching category products:", error);
        } finally {

        }
    };

    useEffect(() => {

        fetchNavCategory();

    }, [_id])

    return (
        <div className='container'>
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0"><Link to="/">Home</Link> <span className="mx-2 mb-0">/</span>
                            <strong className="text-black text-capitalize">{categoryName}</strong>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ul>
                {mainProducts.map((item, index) => (
                    <li key={index}>
                        <h2>{item.productName}</h2>
                        <p>Brand: {item.brandName}</p>
                        <img src={item.productImage[0]} alt={item.productName} />
                        <p>Description: {item.description}</p>
                        <p>Price: ${item.price}</p>
                        <p>Selling Price: ${item.sellingPrice}</p>
                    </li>
                ))}
            </ul> */}
            <div className="row">
                {
                    mainProducts && mainProducts.length > 0 ? (
                        mainProducts.map((el) => (
                            <div key={el._id} className="col-sm-6 col-lg-4 text-center item mb-4">
                                <div className="product-card">
                                    {/* <div className="badge">Hot</div> */}
                                    <div className="product-tumb">
                                        <img src={el.productImage} alt="img" />
                                    </div>
                                    <div className="product-details">
                                        <span className="product-catagory">{el.brandName}</span>
                                        <h4>{el.productName}</h4>
                                        <p>{el.description}</p>
                                        {/* <p>{el._id}</p> */}
                                        <div className="product-bottom-details">
                                            <div className="product-price"><small>${el.price}</small> ${el.sellingPrice}</div>
                                            <div className="product-links">
                                                {/* <i className="fa fa-heart"></i> */}
                                                <button className='btn btn-primary'
                                                    onClick={(e) => handelAddToCart(e, el?._id)}>
                                                    <i className="fa fa-shopping-cart" >
                                                    </i> Add to Cart</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <img src="\images\no-products-found.png" />
                        </div>
                    )}
            </div>
        </div>
    )
}
