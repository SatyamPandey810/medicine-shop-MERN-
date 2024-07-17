import React, { useState } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SummaryApi from '../common';
import uploadIamgeCloud from '../helper/uploadImage';
// import HomeProductCategory from '../helper/HomeProduct';
export default function EditHomeProduct({ onClose, productData, fetchdata }) {

  const [dataCategory, setDataCategory] = useState({
    ...productData,
    productCategoryName: productData?.productCategoryName,
    // category:productData?.category,
    // subcategory:productData?.subcategory,
    productCategoryimage: productData?.productCategoryimage || [],
    productCategoryDescription: productData?.productCategoryDescription

  })
  // const [uploadImage, setUploadImage] = useState("")


  const inputChange = (event) => {
    const { name, value } = event.target
    setDataCategory((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const submit = async (event) => {
    event.preventDefault()
    const response = await fetch(SummaryApi.updateHomeCategoryProduct.url, {
      method: SummaryApi.updateHomeCategoryProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(dataCategory)
    })
    const responseData = await response.json()

    if (responseData.success) {
      toast.success(responseData?.message)
      onClose()
      fetchdata()
    }

    if (responseData.error) {
      toast.error(responseData?.message)
    }

  }

  // image upload in cloudinary
  const uploadIamge = async (event) => {
    const file = event.target.files[0]
    console.log('file', file);

    const uploadIamgeCloudinary = await uploadIamgeCloud(file)
    setDataCategory((prev) => {
      return {
        ...prev,
        productCategoryimage: [...prev.productCategoryimage, uploadIamgeCloudinary.url],
      }
    })

    console.log("upload image", uploadIamgeCloudinary);
  }



  return (
    <div className='container'>
      <div className='row d-flex justify-content-between p-3'>
        <div>
          <h2>Edit product</h2>
        </div>
        <div>
          <FontAwesomeIcon icon={faXmark} className='cancle-btn' onClick={onClose} />
        </div>

      </div>
      <div className='row'>
        <div className='col-md-12'>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="productCategoryName" className="form-label">Product name</label>
              <input
                type="text"
                className="form-control"
                id="productCategoryName"
                name='productCategoryName'
                placeholder='Enter product name'
                value={dataCategory.productCategoryName}
                onChange={inputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productCategoryDescription" className="form-label">Description</label>
              {/* <input
                type="text"
                className="form-control"
                id="productCategoryDescription"
                name='productCategoryDescription'
                placeholder='Enter brand name'
                value={dataCategory.productCategoryDescription}
                onChange={inputChange}
                required
              /> */}
              <textarea
                className='resize-none p-2'
                rows={6} cols={50}
                placeholder='Enter product  description'
                name="productCategoryDescription"
                id="productCategoryDescription"
                value={dataCategory.productCategoryDescription}
                onChange={inputChange}
              // className="form-control"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="uploadImageInput" className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                id="uploadImageInput"
                placeholder='Enter productImage name'
                onChange={uploadIamge}
              />
              <div className='mt-3'>
                {
                  dataCategory?.productCategoryimage[0] ? (
                    <div className="dataimg">
                      {
                        dataCategory.productCategoryimage.map(el => {
                          return (
                            <img src={el} width={150} height={150} alt='img' />
                          )
                        })
                      }
                    </div>
                  ) : (
                    <p className='text-danger'>Upload product image</p>
                  )
                }
              </div>
            </div>

            <button className='btn btn-success mb-4'>Update products</button>
          </form>

        </div>

      </div>
    </div>
  )
}
