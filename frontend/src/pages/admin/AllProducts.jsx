import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../../components/Dashboard-sidebar'
import UploadProducts from '../../components/UploadProducts'
import SummaryApi from '../../common'
import EditProduct from '../../components/EditProduct'
import AdminProductCard from '../../components/AdminProductCard'

export default function AllProducts() {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProduct, setAllproduct] = useState([])
    // const [editProduct, setEditProduct] = useState(false)




    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url)
        const dataResponse = await response.json()

        setAllproduct(dataResponse?.data || [])

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
                        <h1 >All products</h1>
                    </div>
                    <div className=''>
                        <button className='btn btn-warning' onClick={() => setOpenUploadProduct(true)}>Upload products</button>
                    </div>

                </div>
                {
                    openUploadProduct && (
                        <UploadProducts onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
                    )
                }
                {/* {
                    editProduct && (
                        <EditProduct productData={data} onClose={() => setEditProduct(false)} />
                    )
                } */}

                <table className="table table-bordered">
                    <thead>
                        <tr>

                            <th>Product name</th>
                            <th>Product brand</th>
                            <th>Price</th>
                            <th className='text-nowrap'>Selling price</th>
                            <th>category</th>
                            <th>description</th>
                            {/* <th className='text-nowrap'>sub category</th> */}
                            <th className='text-nowrap'>product image</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    {
                        allProduct.map((product, index) => {
                            return (
                                <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
                            )
                        })
                    }
                </table>
            </div>





        </>
    )
}
