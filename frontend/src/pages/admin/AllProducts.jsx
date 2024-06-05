import React, { useState } from 'react'
import DashboardSidebar from '../../components/Dashboard-sidebar'
import UploadProducts from '../../components/UploadProducts'

export default function AllProducts() {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    return (
        <>
            <DashboardSidebar />
            <div className='content container mt-4'>
                <div className='row d-flex justify-content-between p-4'>
                    <div className=''>
                        <h1 >All products</h1>
                    </div>
                    <div className=''>
                        <button className='btn btn-warning' onClick={() => setOpenUploadProduct(true)}>Upload products</button>
                    </div>

                </div>
                {
                    openUploadProduct && (
                        <UploadProducts onClose={() => setOpenUploadProduct(false)} />
                    )
                }
            </div>

        </>
    )
}
