import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../../components/Dashboard-sidebar'
import SummaryApi from '../../common';
import moment from 'moment';

export default function TotalOrders() {

    const [order, setOrder] = useState([]);

    const fetchData = async () => {
        const response = await fetch(SummaryApi.getAdminAllOrder.url, {
            method: SummaryApi.getAdminAllOrder.method,
            credentials: "include",

        });
        const responseData = await response.json();

        if (responseData.success) {
            setOrder(responseData.data)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const groupOrdersByUser = (order) => {
        return order.reduce((acc, order) => {
            const { userId } = order;
            if (!acc[userId]) {
                acc[userId] = [];
            }
            acc[userId].push(order);
            return acc;
        }, {});
    };

    const groupedOrders = groupOrdersByUser(order);
    // console.log(groupedOrders);

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
            } else {
                // Update the order in state
                setOrder(prevOrders => {
                    const updatedOrders = prevOrders.map(order => {
                        if (order._id === orderId) {
                            return { ...order, status: newStatus };
                        }
                        return order;
                    });
                    return updatedOrders;
                });
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };


    useEffect(() => {
        updateOrderStatus()
    }, [])

    const handleStatusChange = (orderId, event) => {
        const newStatus = event.target.value;
        updateOrderStatus(orderId, newStatus);
    };

    // let paymentMethodText;

    // if (order.paymentMethod === 'cod') {
    //     paymentMethodText = 'Cash on delivery';
    // } else if (order.paymentMethod === 'online') {
    //     paymentMethodText = 'Paid online';
    // }



    return (
        <>
            <DashboardSidebar />
            <div className='content container'>
                {Object.entries(groupedOrders).map(([userId, userOrders]) => {
                    const { phone, address1, address2, city, state, country, zipCode } = userOrders[0].address;
                    const { name, email, status } = userOrders[0];
                    return (
                        <div key={userId} className="mb-5">
                            <div className='d-flex justify-content-between'>
                                <h4 className='fw-bold'>User ID: {userId}</h4>
                                <h4 style={{ color: status === 'Order Canceled' ? 'red' : 'inherit' }}>Order update by user : {status}</h4>
                            </div>
                            <p><b>Name:</b> {name}</p>
                            <p><b>Email:</b> {email}</p>
                            <p><b>Phone:</b> {phone}</p>
                            <p><b>Address:</b> {address1}, {address2}, {city}, {state}, {country}, {zipCode}</p>
                            <div>
                                <table className="table table-bordered"  style={{ width: "100%" }}>
                                    <thead>
                                        <tr className='table-danger'>
                                            <th scope="col">No</th>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col" className='text-nowrap'>Payment Method</th>
                                            <th scope="col">Status admin</th>
                                            <th scope="col" className='text-nowrap'>Order At</th>
                                            <th scope="col">Cart Items</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userOrders.map((order, index) => (
                                            <tr key={order._id} className='table-primary'>
                                                <td className='table-warning'>{index + 1}</td>
                                                <td>{order._id}</td>
                                                <td>{order.amount}</td>
                                                <td>{order.paymentMethod}</td>
                                                {/* <td>{paymentMethodText}</td> */}
                                                <td>
                                                    <button className={`btn ${order.status === 'order canceled' ? 'btn-danger' : 'btn-success'}`}>
                                                        {order.status}
                                                    </button>
                                                </td>
                                                <td className='text-nowrap'>{moment(order.createdAt).format('ll, LTS')}</td>
                                                <td>
                                                    <ul>
                                                        {order.cartItems.map((item) => (
                                                            <li key={item._id}>
                                                                {item.name} - {item.quantity} x ${item.price}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className='text-nowrap'>
                                                    <div className="form-check">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="orderStatus"
                                                            value="pending"
                                                            id="confirmedRadio"
                                                            onChange={(e) => handleStatusChange(order._id, e)}

                                                        />
                                                        <label class="form-check-label" htmlFor="flexCheckChecked">
                                                            Pending
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="orderStatus"
                                                            value="order confirmed"
                                                            id="packedRadio"
                                                            onChange={(e) => handleStatusChange(order._id, e)}
                                                        />
                                                        <label class="form-check-label" htmlFor="flexCheckChecked">
                                                            Order confirmed
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="orderStatus"
                                                            value="order packed"
                                                            id="packedRadio"
                                                            onChange={(e) => handleStatusChange(order._id, e)}
                                                        />
                                                        <label class="form-check-label" htmlFor="flexCheckChecked">
                                                            Order packed
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="orderStatus"
                                                            value="order delivered"
                                                            id="deliveredRadio"
                                                            onChange={(e) => handleStatusChange(order._id, e)}
                                                        />
                                                        <label class="form-check-label" htmlFor="flexCheckChecked">
                                                            Order delivered
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="orderStatus"
                                                            value="order canceled"
                                                            id="canceledRadio"
                                                            onChange={(e) => handleStatusChange(order._id, e)}
                                                        />
                                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                                            Order canceled
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
