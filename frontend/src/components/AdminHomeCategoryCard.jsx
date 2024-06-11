import React from 'react'

export default function AdminHomeCategoryCard({data,fetchdata}) {




  return (
    <>
      <tbody>
        <tr>
          <td className='text-capitalize'>{data?.productCategoryName}</td>
          <td className='text-capitalize'>{data?.productCategoryDescription}</td>         
          <td><img src={data?.productCategoryimage[0]} alt="img" width={80} height={100} /></td>
          <td>
            <div className='d-flex'>
              <button className='btn btn-success' >Edit</button>
              <button className='btn btn-danger mx-2'>Delete</button>
            </div>

          </td>
        </tr>
      </tbody>

    </>
  )
}

