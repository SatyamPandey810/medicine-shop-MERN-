import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../../components/Dashboard-sidebar';
import UploadNavCategory from '../../components/UploadNavCategory';
import SummaryApi from '../../common';
import AdminNavProductCard from '../../components/AdminNavProductCard';

export default function NavbarCategory() {
    const [openUploadNavProduct, setOpenUploadNavProduct] = useState(false)
    const [allNavProduct, setAllnavProduct] = useState([])
    const handleUploadClick = () => {
        setOpenUploadNavProduct(true);
    };
    const handleUploadClose = () => {
        setOpenUploadNavProduct(false);
    };

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.getNavProduct.url)
        const dataResponse = await response.json()

        setAllnavProduct(dataResponse?.data || [])
    }
    useEffect(() => {
        fetchAllProduct()
    }, [])
    // console.log(allNavProduct);



    return (
        <>
            <DashboardSidebar />
            <div className='content container  mt-4'>
                <div className='row d-flex justify-content-between p-4'>
                    <div className=''>
                        <h1 >All Nav products</h1>
                    </div>
                    <div className=''>
                        <button className='btn btn-warning' onClick={handleUploadClick}>Upload products</button>
                    </div>
                </div>
                {
                    openUploadNavProduct && <UploadNavCategory onClose={handleUploadClose} fetchdata={fetchAllProduct} />
                }

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product name</th>
                            <th>Product Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {
                        allNavProduct.map((product, index) => (
                            <AdminNavProductCard
                                data={product}
                                key={index + "allNavProduct"}
                                fetchData={fetchAllProduct}
                                uniqueKey={index + 1} />

                        ))
                    }

                </table>
            </div>

        </>
    )
}
