import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import productCategory from '../helper/ProductCategory';


export default function UploadProducts({ onclose }) {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        selling: ""
    })

    const [uploadImage, setUploadImage] = useState("")


    const inputChange = (event) => {

    }

    const uploadIamge = (event) => {
        const file = event.target.files[0]
        setUploadImage(file.name)
        console.log('file', file);
        cosnt uploadIamgeCloudinary=await uploadIamge
    }
    return (
        <div className='container'>
            <div className='row d-flex justify-content-between p-3'>
                <div>
                    <h2>upload product</h2>
                </div>
                <div>
                    <FontAwesomeIcon icon={faXmark} className='cancle-btn' onClick={onclose} />
                </div>

            </div>
            <div className='row'>
                <div className='col'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Product name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productName"
                                name='productName'
                                placeholder='Enter product name'
                                value={data.productName}
                                onChange={inputChange}
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="brandName" className="form-label">Brand name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="brandName"
                                name='brandName'
                                placeholder='Enter brand name'
                                value={data.brandName}
                                onChange={inputChange}
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category name</label>
                            <select className='form-control'>
                                {
                                    productCategory.map((el, index) => {
                                        return (
                                            <option value={el.value} key={index}>{el.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productImage" className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="productImage"
                                name='productImage'
                                placeholder='Enter productImage name'
                                value={data.productImage}
                                onChange={uploadIamge}
                            />

                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}
