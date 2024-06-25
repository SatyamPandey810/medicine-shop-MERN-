import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import addToCart from '../pages/addtocart/AddToCart';
import Context from '../context';

export default function CategoryProduct() {
  const { id: _id } = useParams();
  const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const { fetchUserAddToCart } = useContext(Context);

  const handelAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate(`/category/${id}/single-card`)
    // navigate("/category/_id/single-card")
  }



  const fetchProductCategory = async () => {
    setLoading(true);
    try {
      const url = `${SummaryApi.getCategoriesProduct.url.replace(':id', _id)}`;
      // console.log('Fetching URL:', url); 
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setProduct(dataResponse.products);
      setCategoryName(dataResponse.category.productCategoryName);
      // console.log(dataResponse.products);
      // console.log(dataResponse.category.productCategoryName);
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };





  useEffect(() => {
    fetchProductCategory(_id)
  }, [_id])




  return (
    <div>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0"><Link to="/">Home</Link> <span className="mx-2 mb-0">/</span>
              <strong className="text-black">{categoryName?.productCategoryName}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {
          product && product.length > 0 ? (
            product.map((el) => (
              <div key={el._id} className="col-sm-6 col-lg-4 text-center item mb-4">
                <div className="product-card">
                  <div className="badge">Hot</div>
                  <div className="product-tumb">
                    <img src={el.productImage} alt="" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">{el.brandName}</span>
                    <h4><a href="">{el.productName}</a></h4>
                    <p>{el.description}</p>
                    {/* <p>{el._id}</p> */}
                    <div className="product-bottom-details">
                      <div className="product-price"><small>${el.price}</small> ${el.sellingPrice}</div>
                      <div className="product-links">
                        {/* <i className="fa fa-heart"></i> */}
                        <button className='btn btn-primary' onClick={(e) => handelAddToCart(e, el?._id)}><i className="fa fa-shopping-cart" ></i> Add to Cart</button>
                        <a href=""></a>
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
      <div className="row mt-5">
        <div className="col-md-12 text-center">
          <div className="site-block-27">
            <ul>
              <li><a href="#">&lt;</a></li>
              <li className="active"><span>1</span></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li><a href="#">&gt;</a></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}
