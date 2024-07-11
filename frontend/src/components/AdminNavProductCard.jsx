import React, { useState } from 'react'
import EditNavProduct from './EditNavProduct'

export default function AdminNavProductCard({ data, fetchData, uniqueKey }) {
    const [edit, setEdit] = useState(false)

    const handelEdit = () => {
        setEdit(false)
    }

    const handleEditClose = () => {
        setEdit(true)
    }



    return (
        <>
           
            <tbody>
                <tr >
                    <td>{uniqueKey}.</td>
                    <td className='text-capitalize'>{data?.name}</td>
                    <td><img src={data?.image[0]} alt="img" width={80} height={100} /></td>
                    <td>
                        <div className='d-flex'>
                            <button className='btn btn-success' onClick={handleEditClose}>Edit</button>
                            <button className='btn btn-danger mx-2'>Delete</button>
                        </div>

                    </td>
                </tr>
            </tbody>
            <div>
                {
                    edit && (
                        <EditNavProduct productData={data} onClose={handelEdit} fetchdata={fetchData} />
                    )
                }
            </div>
        </>
    )
}
