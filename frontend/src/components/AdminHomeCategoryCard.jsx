import React, { useState } from 'react'
import EditHomeProduct from './EditHomeProduct'

export default function AdminHomeCategoryCard({ data, fetchdata }) {
  const [edit, setEdit] = useState(false)

  const handelEdit = () => {
    setEdit(false)
  }

  const handleEditClose=()=>{
    setEdit(true)
  }



  return (
    <>
      <tbody>
        <tr>

          <td className='text-capitalize'>{data?.productCategoryName}</td>
          <td className='text-capitalize'>{data?.productCategoryDescription}</td>
          <td className='text-capitalize'>{data?.subcategory}</td>
          <td><img src={data?.productCategoryimage[0]} alt="img" width={80} height={100} /></td>
          <td>
            <div className='d-flex'>
              <button className='btn btn-success' onClick={handleEditClose}>Edit</button>
              <button className='btn btn-danger mx-2'>Delete</button>
            </div>

          </td>
        </tr>
      </tbody>
      {
        edit && (
          <EditHomeProduct productData={data} onClose={handelEdit} fetchdata={fetchdata} />
        )
      }

    </>
  )
}

