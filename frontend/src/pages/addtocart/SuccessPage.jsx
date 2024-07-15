import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function SuccessPage() {
    const user = useSelector(state => state?.user?.user)
    const userId = user?._id;
    return (
        <>
            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <span className="icon-check_circle display-3 text-success"></span>
                            <h2 className="display-3 text-black">Thank you!</h2>
                            <p className="lead mb-5">You order was successfuly completed.</p>
                            <p><Link to={`/order/${userId}`} className="btn btn-md height-auto px-4 py-3 btn-primary">Your orders</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
