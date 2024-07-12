import React, { useState } from 'react'
import EditNavProduct from './EditNavProduct'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

export default function AdminNavProductCard({ data, fetchData, uniqueKey }) {
    const [edit, setEdit] = useState(false)

    const handelEdit = () => {
        setEdit(false)
    }

    const handleEditClose = () => {
        setEdit(true)
    }

    const deleteCategory = async (id) => {
        const response = await fetch(SummaryApi.deleteNavCategory.url, {
            method: SummaryApi.deleteNavCategory.method,
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
            toast.success(responseData.message)
            fetchData()
        }
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
                            <button className='btn btn-danger mx-2' onClick={() => deleteCategory(data?._id)}>Delete</button>
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
