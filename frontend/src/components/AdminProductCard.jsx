import React, { useState } from 'react'
import EditProduct from './EditProduct'

export default function AdminProductCard({ data }) {
    const [editProduct, setEditProduct] = useState(false)
    return (
        <>
          {
                editProduct && (
                    <EditProduct productData={data} onClose={() => setEditProduct(false)} />
                )
            }
            <tbody>
                <tr>

                    <td className='text-capitalize'>{data?.productName}</td>
                    <td className='text-capitalize'>{data?.brandName}</td>
                    <td>{data?.price}</td>
                    <td>{data?.sellingPrice}</td>
                    <td>{data?.category}</td>
                    <td><img src={data?.productImage[0]} alt="img" width={100} height={100} /></td>
                    <td><button className='btn btn-success' onClick={() => setEditProduct(true)}>Edit</button>
                        <button className='btn btn-danger mx-2'>Delete</button>
                    </td>
                </tr>
            </tbody>

          

        </>
    )
}
