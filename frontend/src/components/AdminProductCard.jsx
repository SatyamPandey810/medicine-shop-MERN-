import React, { useEffect, useState } from 'react'
import EditProduct from './EditProduct'
import SummaryApi from '../common'

export default function AdminProductCard({ data, fetchdata }) {
    const [editProduct, setEditProduct] = useState(false)
    const[categories,setCategories]= useState([])
    // const fetchAllProduct = async () => {
    //     const response = await fetch(SummaryApi.getHomeCategoryProduct.url)
    //     const dataResponse = await response.json()

    //     setCategories(dataResponse?.saveHomeCategory)
    //     console.log(dataResponse);

    // }
    // useEffect(() => {
    //     fetchAllProduct()
    // }, [])

    return (
        <>
            <tbody>
                <tr>
                    <td className='text-capitalize'>{data?.productName}</td>
                    <td className='text-capitalize'>{data?.brandName}</td>
                    <td>{data?.price}</td>
                    <td>{data?.sellingPrice}</td>
                    <td>{data?.category}</td>
                    <td>{data?.description}</td>
                    <td><img src={data?.productImage[0]} alt="img" width={80} height={100} /></td>
                    <td>
                        <div className='d-flex'>
                            <button className='btn btn-success' onClick={() => setEditProduct(true)}>Edit</button>
                            <button className='btn btn-danger mx-2'>Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
            <div>
                {
                    editProduct && (
                        <EditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                    )
                }
            </div>
        </>
    )
}
