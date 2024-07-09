import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function SuccessPage() {
    const user = useSelector(state => state?.user?.user)
    const userId = user?._id;
    return (
        <>
            <div class="site-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <span class="icon-check_circle display-3 text-success"></span>
                            <h2 class="display-3 text-black">Thank you!</h2>
                            <p class="lead mb-5">You order was successfuly completed.</p>
                            <p><Link to={`/order/${userId}`} class="btn btn-md height-auto px-4 py-3 btn-primary">Your orders</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
