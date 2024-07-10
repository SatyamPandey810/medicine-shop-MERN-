import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../../components/Dashboard-sidebar'
import SummaryApi from '../../common';

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

console.log("order",order);
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
    return (
        <>
            <DashboardSidebar />
            <div className='content container'>
                {Object.entries(groupedOrders).map(([userId, userOrders,]) => {
                    const { phone, address1, address2, city, state, country, zipCode } = userOrders[0].address;
                    const { name, email } = userOrders[0]
                    return (
                        <div key={userId} className="mb-5">
                            <h2>User ID: {userId}</h2>
                            <p><b>Name:</b> {name}</p>
                            <p><b>Email:</b> {email}</p>
                            <p><b>Phone:</b> {phone}</p>
                            <p><b>Address:</b> {address1}, {address2}, {city}, {state}, {country}, {zipCode}</p>
                            <div className='w-100'>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Payment Method</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Order At</th>
                                            <th scope="col">Cart Items</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userOrders.map((order, index) => (
                                            <tr key={order._id}>
                                                <td>{index + 1}</td>
                                                <td>{order._id}</td>
                                                <td>{order.amount}</td>
                                                <td>{order.paymentMethod}</td>
                                                <td>{order.status}</td>
                                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                                <td>
                                                    <ul>
                                                        {order.cartItems.map((item) => (
                                                            <li key={item._id}>

                                                                {item.name} - {item.quantity} x ${item.price}
                                                            </li>
                                                        ))}
                                                    </ul>
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
