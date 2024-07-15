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
            <div className='text-center'>
                <h1>Your Orders</h1>
                <h5>{user.name}</h5>
            </div>
            <div>
                <h1>Order Details</h1>
                <p><b>Order ID: </b>{order._id}</p>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Contact no: </b>{order.address?.phone}</p>
                <p><b>Address:</b> {order.address?.address1}<br />
                    {order.address?.address2}<br />
                    {order.address?.city} &nbsp;
                    {order.address?.state}  &nbsp; {order.address?.country}<br/>
                    <b>Pin code:</b> {order.address?.zipCode}<br />
                </p>
                <p><b>Payment method: </b> {order.paymentMethod}</p>
                <p className='text-capitalize'><b>Status:</b> {order.status}</p>
               

                {/* <h1>User Details</h1>
                <p>User ID: {user._id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p> */}
            </div>

        </div>
    )
}
