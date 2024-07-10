import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../../components/Dashboard-sidebar'
import UploadHomeCategory from '../../components/UploadHomeCategory'
import AdminHomeCategoryCard from '../../components/AdminHomeCategoryCard'
import SummaryApi from '../../common'

export default function HomeCategory() {
    const [openUploadHomeProduct, setOpenUploadHomeProduct] = useState(false)
    const [allHomeProduct, setAllHomeproduct] = useState([])

    const handleUploadClick = () => {
        setOpenUploadHomeProduct(true);
    };
    const handleUploadClose = () => {
        setOpenUploadHomeProduct(false);
    };


    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.getHomeCategoryProduct.url)
        const dataResponse = await response.json()

        setAllHomeproduct(dataResponse?.data || [])

    }
    useEffect(() => {
        fetchAllProduct()
    }, [])


    return (
        <>
            <DashboardSidebar />
            <div className='content container  mt-4'>
                <div className='row d-flex justify-content-between p-4'>
                    <div className=''>
                        <h1 >All home products</h1>
                    </div>
                    <div className=''>
                        <button className='btn btn-warning' onClick={handleUploadClick}>Upload products</button>
                    </div>
                </div>
                {
                    openUploadHomeProduct && <UploadHomeCategory onClose={handleUploadClose} fetchData={fetchAllProduct} />
                }
                {/* {
                    openUploadProduct && (
                        <UploadProducts onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
                    )
                } */}


                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Descriptionn</th>
                            {/* <th>Category</th> */}
                            <th className='text-nowrap'>Product image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        allHomeProduct.map((product, index) => {

                            return (
                               
                                <AdminHomeCategoryCard data={product} key={index + "allHomeProduct"} fetchdata={fetchAllProduct} />

                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}
