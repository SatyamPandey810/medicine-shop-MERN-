import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export default function PaymentView() {
    const [data, setData] = useState({})
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({})
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [checkoutData, setCheckoutData] = useState({
        checkoutId: '',
        paymentMethod: '',
        orderStatus: 'Processing'

    })


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
    const calculateTotals = () => {
        let totalProducts = 0;
        let totalPrice = 0;

        // Iterate through each checkout
        data.checkouts?.forEach(checkout => {
            // Iterate through each product in products array
            checkout.products.forEach(product => {
                totalProducts += 1; // Increment total products
                totalPrice += product.sellingPrice; // Add product selling price to total price
            });
        });

        return { totalProducts, totalPrice };
    };

    // Call calculateTotals to get the totals
    const { totalProducts, totalPrice } = calculateTotals();




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
        setFormData(data.checkouts[index].checkout);
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

    // payment handler
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardDetailsChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handleCreatePayment = async (e) => {
        e.preventDefault()
        try {
            const dataResponse = await fetch(SummaryApi.paymentCreate.url, {
                method: SummaryApi.paymentCreate.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(checkoutData)
            });
            const responseData = await dataResponse.json();

            if (responseData.success) {
                console.log('Payment created successfully:', responseData.data);
                // Optionally, redirect to a success page or display a success message
            } else {
                console.error('Payment creation failed:', responseData.message);
                // Optionally, display an error message to the user
            }

        } catch (error) {
            console.error('Error creating payment:', error);
        }
    }

    return (

        <>
            <div className='container'>

                {data.checkouts?.map((checkoutData, index) => (
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
                                                <div>
                                                    <tr className='table'>
                                                        <td>
                                                            <label>Name</label>
                                                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                                                        </td>
                                                        <td>
                                                            <label>Email</label>
                                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                                                        </td>
                                                        <td>
                                                            <label>Phone</label>
                                                            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>Address1</label>
                                                            <input type="text" name="address1" value={formData.address1} onChange={handleInputChange} />
                                                        </td>
                                                        <td>
                                                            <label>Address2</label>
                                                            <input type="text" name="address2" value={formData.address2} onChange={handleInputChange} />
                                                        </td>
                                                        <td>
                                                            <label>Country</label>
                                                            <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label>State</label>
                                                            <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
                                                        </td>
                                                        <td>
                                                            <label>City</label>
                                                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                                                        </td>
                                                        <td>
                                                            <label>Zip code</label>
                                                            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} className='text-center'>
                                                            <div>
                                                                <button onClick={(e) => handleEditSubmit(e, checkoutData.checkout._id)} className="btn btn-primary">Save</button>
                                                                <button onClick={handleCancelClick} className="btn btn-secondary mx-3">Cancel</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </div>
                                            ) : (
                                                <tr className='table-success'>
                                                    <td className='text-nowrap'>{checkoutData.checkout.name}</td>
                                                    <td>{checkoutData.checkout.email}</td>
                                                    <td>{checkoutData.checkout.phone}</td>
                                                    <td>{checkoutData.checkout.address1}<br />
                                                        {checkoutData.checkout.address2}
                                                    </td>
                                                    <td>{checkoutData.checkout.country}</td>
                                                    <td>{checkoutData.checkout.state}</td>
                                                    <td>{checkoutData.checkout.city}<br />
                                                        Zip code:{checkoutData.checkout.zipCode}
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
                        <div className='row mt-4 d-flex  justify-content-between'>
                            <div className='col-md-6'>


                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Product Image</th>
                                            <th>Product Name</th>
                                            <th>Price</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {checkoutData.products.map(product => (
                                            <tr key={product._id}>
                                                <td><img src={product.productImage[0]} alt={product.productName} width="50" /></td>
                                                <td>{product.productName}</td>
                                                <td>₦ {product.sellingPrice}</td>
                                                {/* <td>{new Date(product.createdAt).toLocaleString()}</td>
                                                <td>{new Date(product.updatedAt).toLocaleString()}</td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-12 text-center border-bottom mb-2">
                                        <h3 class="text-black h4 text-uppercase">Cart Totals</h3>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <span class="text-black">Total Products</span>
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <strong class="text-black">{totalProducts}</strong>
                                    </div>
                                </div>
                                <div class="row mb-5">
                                    <div class="col-md-6">
                                        <span class="text-black">Total</span>
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <strong class="text-black">₦ {totalPrice}</strong>
                                    </div>
                                </div>
                                <form onSubmit={handleCreatePayment}>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                value={checkoutData.paymentMethod}
                                                checked={paymentMethod === 'COD'}
                                                onChange={handlePaymentMethodChange}
                                            />
                                            &nbsp;  Cash on Delivery
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                value="Online"
                                                checked={paymentMethod === 'Online'}
                                                onChange={handlePaymentMethodChange}
                                            />
                                            &nbsp;  Online Payment
                                        </label>
                                    </div>
                                    {paymentMethod === 'Online' && (
                                        <div>
                                            <h3>Card Details</h3>
                                            <label>
                                                <span> Card Number: </span><br />
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    // value={cardDetails.cardNumber}
                                                    onChange={handlePaymentMethodChange}

                                                />
                                            </label>
                                            <label>
                                                <span> Expiry Date:</span><br />
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    // value={cardDetails.expiryDate}
                                                    onChange={handlePaymentMethodChange}

                                                />
                                            </label>
                                            <label>
                                                <span> CVV:</span><br />

                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    // value={cardDetails.cvv}
                                                    onChange={handlePaymentMethodChange}

                                                />
                                            </label>
                                        </div>
                                    )}

                                    <div class="row">
                                        <div class="col-md-12">
                                            <button class="btn btn-primary btn-lg btn-block" onclick="window.location='checkout.html'">Proceed To
                                                payment</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <h1>User Details</h1>
            <p>Name: {data.user?.name}</p>
            <p>Email: {data.user?.email}</p>
            <p>Role: {data.user?.role}</p> */}



        </>
    )
}
