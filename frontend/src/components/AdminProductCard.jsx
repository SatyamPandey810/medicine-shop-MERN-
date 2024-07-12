import React, { useEffect, useState } from 'react'
import EditProduct from './EditProduct'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

export default function AdminProductCard({ data, fetchdata,uniqueKey }) {
    const [editProduct, setEditProduct] = useState(false)
    

    const deleteProduct = async (id) => {
        const response = await fetch(SummaryApi.productDelete.url, {
            method: SummaryApi.productDelete.method,
            credentials: "include",
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,

            })
        })
        const responseData = await response.json()

        if (responseData.success) {
            toast.success('product deleted')
            fetchdata()
        }
    }
    

    return (
        <>
            <tbody>
                <tr>
                    <td>{uniqueKey}.</td>
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
                            <button className='btn btn-danger mx-2' onClick={()=>deleteProduct(data?._id)}>Delete</button>
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
