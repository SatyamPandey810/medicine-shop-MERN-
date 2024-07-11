import React, { useState } from 'react'
import SummaryApi from '../common'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify'
import uploadIamgeCloud from '../helper/uploadImage';

export default function EditNavProduct({ onClose, productData, fetchdata }) {

    const [dataCategory, setDataCategory] = useState({
        ...productData,
        name: productData?.name,
        image: productData?.image,

    })
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
        const response = await fetch(SummaryApi.updateNavProduct.url, {
            method: SummaryApi.updateNavProduct.method,
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
                image: [...prev.image, uploadIamgeCloudinary.url],
            }
        })

        console.log("upload image", uploadIamgeCloudinary);
    }
    return (
        <div className='container mb-4'>
            <div className='row d-flex justify-content-between p-3'>
                <div>
                    <h2>Edit product</h2>
                </div>
                <div>
                    <FontAwesomeIcon icon={faXmark} className='cancle-btn' onClick={onClose} />
                </div>

            </div>
            <div className='row'>
                <div className='col'>
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Product name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name='name'
                                placeholder='Enter product name'
                                value={dataCategory.name}
                                onChange={inputChange}
                                required
                            />
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
                                        dataCategory?.image ? (
                                            <div className="dataimg">
                                                {
                                                    dataCategory.image.map(el => {
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
                        </div>
                        <button className='btn btn-success'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
