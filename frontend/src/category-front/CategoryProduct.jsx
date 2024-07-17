import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import addToCart from '../pages/addtocart/AddToCart';
import Context from '../context';

export default function CategoryProduct() {
  const { id: _id } = useParams();
  const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const { fetchUserAddToCart } = useContext(Context);

  const itemsPerPage = 12;

  const handelAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate(`/category/${id}/single-card`);
  };

  const fetchProductCategory = async (page = 1) => {
    setLoading(true);
    try {
      const url = `${SummaryApi.getCategoriesProduct.url.replace(':id', _id)}?page=${page}&limit=${itemsPerPage}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setProduct(dataResponse.products);
      setCategoryName(dataResponse.category.productCategoryName);
      setTotalPages(Math.ceil(dataResponse.totalProducts / itemsPerPage));
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductCategory(currentPage);
  }, [_id, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={i === currentPage ? "active" : ""}>
          <Link to="#" onClick={() => handlePageChange(i)}>{i}</Link>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className='container'>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <Link to="/">Home</Link> <span className="mx-2 mb-0">/</span>
              <strong className="text-black text-capitalize">{categoryName}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {loading ? (
          <div className="col-12 text-center">
            <p>Loading...</p>
          </div>
        ) : product && product.length > 0 ? (
          product.map((el) => (
            <div key={el._id} className="col-sm-6 col-lg-4 text-center item mb-4">
              <div className="product-card">
                <div className="product-tumb">
                  <img src={el.productImage} alt="img" />
                </div>
                <div className="product-details">
                  <span className="product-catagory">{el.brandName}</span>
                  <h4>{el.productName}</h4>
                  <p>{el.description}</p>
                  <div className="product-bottom-details">
                    <div className="product-price"><small>${el.price}</small> ${el.sellingPrice}</div>
                    <div className="product-links">
                      <button className='btn btn-primary' onClick={(e) => handelAddToCart(e, el?._id)}>
                        <i className="fa fa-shopping-cart"></i> Add to Cart
                      </button>
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
              <li><Link to="#" onClick={() => handlePageChange(currentPage - 1)}>&lt;</Link></li>
              {renderPagination()}
              <li><Link to="#" onClick={() => handlePageChange(currentPage + 1)}>&gt;</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
