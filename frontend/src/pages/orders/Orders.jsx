import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'

export default function Orders() {
    const [order, setOrder] = useState({});
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
            // console.log('responseData data', responseData.data);

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


    return (
        <div className='container'>
            <h1>All Orders</h1>
            <div>
                <h1>Order Details</h1>
                <p>Order ID: {order._id}</p>
                <p>Status: {order.status}</p>
                <p>address {order.address?.address1}</p>

                <h1>User Details</h1>
                <p>User ID: {user._id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                {/* Add more user details as needed */}
            </div>

        </div>
    )
}
