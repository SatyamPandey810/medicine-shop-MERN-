import React, {  useEffect, useState } from 'react'
import SummaryApi from '../../common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PaymentView() {
    const [data, setData] = useState([])
    const [product, setProduct] = useState([])
    const [totalUniqueProducts, setTotalUniqueProducts] = useState(0);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({})
    const [paymentMethod, setPaymentMethod] = useState('');

    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

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





    // user details edit function

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleEditClick = (index) => {
        setEditIndex(index);
        // setFormData(data.checkouts[index].checkout);
        setFormData(data[index] || {});
    };


    const handleEditSubmit = async (e, checkoutId) => {
        e.preventDefault()
        try {
            const response = await fetch(SummaryApi.checkoutUpdate.url(checkoutId), {
                method: SummaryApi.checkoutUpdate.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const responseData = await response.json();
            if (responseData.success) {
                toast.success(responseData.message)
                fetchData();
                setEditIndex(null);
            } else {
                console.error('Error updating data:', responseData.message);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }

    }
    const handleCancelClick = () => {
        setEditIndex(null);
        setFormData({});
    };

    // total products
    const fetchProduct = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: "include",
            headers: {
                "content-type": 'application/json'
            },
        })
        const responseData = await response.json()
        if (responseData.success) {


            const flattenedData = responseData.data.flat();
            const uniqueProductIds = new Set(flattenedData.map(item => item.productId._id));

            const totalUnique = uniqueProductIds.size;
            setTotalUniqueProducts(totalUnique);

            setProduct(flattenedData);

        }

    }
    useEffect(() => {
        fetchProduct()
    }, [])

    //-----------------total product qty---------------
    const getTotalQuantity = (productId) => {
        let totalQuantity = 0;
        product.forEach(item => {
            if (item.productId._id === productId) {
                totalQuantity += item.quantity;
            }
        });
        return totalQuantity;
    };
    // total price accroding to quantity

    const getTotalSellingPrice = () => {
        let total = 0;
        product.forEach(item => {
            total += item.quantity * item.productId.sellingPrice;
        });
        return total;
    };
    const totalSellingPrice = getTotalSellingPrice();


    // delete cart product 
    // const deleteCartProduct = async (id) => {
    //     const response = await fetch(SummaryApi.deleteCartProduct.url, {
    //         method: SummaryApi.deleteCartProduct.method,
    //         credentials: "include",
    //         headers: {
    //             "content-type": 'application/json'
    //         },
    //         body: JSON.stringify({
    //             _id: id,

    //         })
    //     })
    //     const responseData = await response.json()
    //     if (responseData.success) {
    //         fetchData()
    //         context.fetchUserAddToCart()
    //     }
    // }

    // const handlePayment = async () => {

    //     try {

    //         const response = await fetch(SummaryApi.paymentOrder.url, {
    //             method: SummaryApi.paymentOrder.method,
    //             credentials: "include",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 cartItems: product, 
    //             }),
    //         });

    //         console.log("response",response);
    //         // Parse the response
    //         const responseData = await response.json();
    //         console.log('Parsed response data:', responseData);

    //         // Check if the payment initialization was successful
    //         if (responseData.status && responseData.data && responseData.data.authorization_url) {
    //             console.log("Payment initialization successful:", responseData);
    //             // Redirect to Paystack payment page
    //             window.location.href = responseData.data.authorization_url;
    //         } else {
    //             console.error("Payment initialization failed", responseData);
    //             // Optionally show an error message to the user
    //             alert("Payment initialization failed. Please try again.");
    //         }
    //     } catch (error) {
    //         console.error("An error occurred during payment initialization:", error);
    //         // Optionally show an error message to the user
    //         alert("An error occurred. Please try again.");
    //     }
    // };

    const handlePayment = async () => {
        try {
            const response = await fetch(SummaryApi.paymentOrder.url, {
                method: SummaryApi.paymentOrder.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems: product,
                    paymentMethod: paymentMethod,
                }),
            });

            const responseData = await response.json();

            if (paymentMethod === 'online' && responseData.status && responseData.data && responseData.data.authorization_url) {
                window.location.href = responseData.data.authorization_url;

            } else if (paymentMethod === 'cod' && responseData.success) {
                // alert('Order placed successfully! You will pay on delivery.');
                toast.success('Order placed successfully!')
                setTimeout(() => {
                    // navigate(`/success/${userId}`);
                    navigate('/success')
                }, 1000);
            } else {
                toast.error('Please select payment method!')
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };


    return (
        <>
            <div className='container'>
                {data.map((checkoutData, index) => (
                    <div key={index}>
                        <div className='row'>
                            <div className='col-md-12'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr className='table-info'>
                                            <td colSpan={10} className='text-center'><h5>Customer details</h5></td>
                                        </tr>
                                        <tr className='table-danger'>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Country</th>
                                            <th>State</th>
                                            <th>City</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            editIndex === index ? (
                                                <>
                                                    <tr className='table'>
                                                        <td>
                                                            <label htmlFor='name'>Name</label><br />
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <label htmlFor='email'>Email</label><br />
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <label htmlFor='phone'>Phone</label><br />
                                                            <input
                                                                type="text"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label htmlFor='address1'>Address1</label><br />
                                                            <input
                                                                type="text"
                                                                name="address1"
                                                                value={formData.address1}
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <label htmlFor='address2'>Address2</label><br />
                                                            <input
                                                                type="text"
                                                                name="address2"
                                                                value={formData.address2}
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <label htmlFor='country'>Country</label><br />
                                                            <input
                                                                type="text"
                                                                name="country"
                                                                value={formData.country}
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label htmlFor='state'>State</label><br />
                                                            <input
                                                                type="text"
                                                                name="state"
                                                                value={formData.state}
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <label htmlFor='city'>City</label><br />
                                                            <input
                                                                type="text"
                                                                name="city"
                                                                value={formData.city}
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <label htmlFor='zipCode'>Zip code</label><br />
                                                            <input
                                                                type="text"
                                                                name="zipCode"
                                                                value={formData.zipCode}
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} className='text-center'>
                                                            <div>
                                                                <button onClick={(e) => handleEditSubmit(e, checkoutData._id)} className="btn btn-primary">Save</button>
                                                                <button onClick={handleCancelClick} className="btn btn-secondary mx-3">Cancel</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            ) : (
                                                <tr className='table-success'>
                                                    <td className='text-nowrap'>{user?.name}</td>
                                                    <td>{user?.email}</td>
                                                    <td>{checkoutData.phone}</td>
                                                    <td>{checkoutData.address1}<br />
                                                        {checkoutData.address2}
                                                    </td>
                                                    <td>{checkoutData.country}</td>
                                                    <td>{checkoutData.state}</td>
                                                    <td>{checkoutData.city}<br />
                                                        Zip code:{checkoutData.zipCode}
                                                    </td>
                                                    <td>
                                                        <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(index)} />
                                                    </td>
                                                    {/* <td>{new Date(checkoutData.checkout.createdAt).toLocaleString()}</td>
                                            <td>{new Date(checkoutData.checkout.updatedAt).toLocaleString()}</td> */}
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='row mt-4 d-flex  justify-content-between'>
                    <div className='col-md-6'>


                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Product Image</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    {/* <th>Remove Item</th> */}

                                </tr>
                            </thead>
                            <tbody>
                                {product.map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            {item.productId.productImage && item.productId.productImage.length > 0 ? (
                                                <img src={item.productId.productImage[0]} alt={item.productId.productName} width="50" />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </td>
                                        <td>{item.productId.productName}</td>
                                        <td>{getTotalQuantity(item.productId._id)}</td>
                                        {/* <td>₦ {item.productId.sellingPrice}</td> */}
                                        <td>₦ {(item?.productId?.sellingPrice * item?.quantity).toFixed(2)}</td>
                                        {/* <td><p className="btn btn-primary height-auto btn-sm" onClick={() => deleteCartProduct(item.productId?._id)}><FontAwesomeIcon icon={faTrash} /></p></td> */}
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12 text-center border-bottom mb-2">
                                <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <span className="text-black">Total Products</span>
                            </div>
                            <div className="col-md-6 text-right">
                                <strong className="text-black">{totalUniqueProducts}</strong>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <span className="text-black">Total</span>
                            </div>
                            <div className="col-md-6 text-right">
                                <strong className="text-black">₦ {totalSellingPrice}</strong>
                            </div>
                        </div>
                        <form >
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    &nbsp;  Cash on Delivery
                                </label>
                            </div>
                            <div>
                                <label >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="online"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    &nbsp;  Online Payment
                                </label>
                            </div>
                        </form>
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-primary btn-lg btn-block" onClick={handlePayment}>Order placed</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* <h1>User Details</h1>
            <p>Name: {data.user?.name}</p>
            <p>Email: {data.user?.email}</p>
            <p>Role: {data.user?.role}</p> */}



        </>
    )
}
