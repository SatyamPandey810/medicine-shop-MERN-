import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'
import moment from 'moment';

export default function Orders() {
    const [order, setOrder] = useState({});
    const [previousStatus, setPreviousStatus] = useState('');

    const [user, setUser] = useState({});

    const fetchOrders = async () => {
        try {
            const response = await fetch(SummaryApi.getOrder.url, {
                method: SummaryApi.getOrder.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();

            if (responseData.data && responseData.data.order && responseData.data.user) {
                setOrder(responseData.data.order);
                setUser(responseData.data.user);
            } else {
                console.error("Invalid data format received from server:", responseData.data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }


    }
    useEffect(() => {
        fetchOrders()
    }, [])

    let paymentMethodText;

    if (order.paymentMethod === 'cod') {
        paymentMethodText = 'Cash on delivery';
    } else if (order.paymentMethod === 'online') {
        paymentMethodText = 'Paid online';
    }
    // user order confirmation by user

    // update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const url = `${SummaryApi.orderUpdate.url.replace(':id', orderId)}`;
            const response = await fetch(url, {
                method: SummaryApi.orderUpdate.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();
            // console.log('Response:', data);

            if (data.error) {
                console.error('Failed to update order status:', data.error);
                setOrder({ ...order, status: previousStatus });
            } else {
                setOrder({ ...order, status: newStatus });

                // Show alert message after updating
                if (newStatus === 'order canceled') {
                    const confirmed = window.confirm('Are you sure you want to cancel this order?');
                    if (confirmed) {
                        alert('Order canceled successfully.');
                    } else {
                        setOrder({ ...order, status: previousStatus }); // Assuming 'pending' is the default status
                    }
                }
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            setOrder({ ...order, status: previousStatus });

        }
    };


    useEffect(() => {
        updateOrderStatus()
    }, [])



    // const handleStatusChange = (orderId, event) => {
    //     const newStatus = event.target.value;
    //     updateOrderStatus(orderId, newStatus);
    // };



    return (

        <div className="container">
            <div className="Medi-book">
                <div className="mani-mac-2">
                    <div className="medi-dat">
                        <p>Home</p>
                    </div>
                    <div className="medi-dat">
                        <p>Order</p>
                    </div>
                    {/* <div className="medi-dat">
                        <p>Order ID {order._id}</p>
                    </div> */}
                </div>
                <div className="mak-2">
                    <div className="medi-dat">
                        <p className="bran-tx-3">Order ID: {order._id}</p>
                        <p className="bran-tx-2"><b>Order Date:</b> {moment(order.createdAt).format('ll, LTS')}</p>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Contact no: </b>{order.address?.phone}</p>
                        <p><b>Shipping address: </b>
                            {order?.address?.address1},
                            {order?.address?.address2},
                            {order?.address?.city},
                            {order?.address?.state},
                            {order?.address?.country},
                            {order?.address?.zipCode}</p>
                        {/* <p><b>Payment method: </b> {order.paymentMethod}</p> */}
                        <p><b>Payment method: </b>{paymentMethodText}</p>
                    </div>
                    <div className="medi-dat-1">
                        <div><button type="button" className="Invol">Involce</button></div>
                        <div>
                            <button type="button" className={`btn ${order.status === 'pending' ? 'btn-danger' : 'btn-success'}`}>{order.status}</button>
                        </div>
                    </div>

                </div>
                {
                    order?.cartItems?.map((item, index) => (
                        <div key={index} className="mak-1 mt-2 pt-3">
                            <div className="mani-mac">
                                <div className="card-m">
                                    <img src={item?.image} alt="" className="med-ims" />
                                </div>
                                <div className="medi-dat">
                                    <p className="bran-tx">{item?.name}</p>
                                    <p className="ram-tx">{item?.brand}</p>
                                </div>
                            </div>
                            <div className="pric-tx">
                                <p className="bran-tx"> ₦ {item?.price}</p>
                                <p className="ram-tx">QTY {item?.quantity}</p>
                            </div>
                        </div>
                    ))
                }
                <div className='d-flex justify-content-between align-items-center mt-4'>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox1"
                                value="option1"
                            />
                        </div>
                        <button className='btn btn-danger' onClick={() => updateOrderStatus(order._id, 'order canceled')}>Cancle your order</button>
                    </div>

                    <h5 className='text-nowrap'>Total bill: ₦ {order.amount}</h5>

                </div>
            </div>
        </div>
    )
}
