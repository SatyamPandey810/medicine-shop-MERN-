import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import productCategory from '../helper/ProductCategory';
import uploadIamgeCloud from '../helper/uploadImage';
import SummaryApi from '../common';
import { toast } from 'react-toastify'


export default function UploadProducts({ onClose, fetchData }) {
    // const [allHomeProduct, setAllHomeproduct] = useState([])
    const[categories,setCategories]= useState([])
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        // category:"",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })

    const [uploadImage, setUploadImage] = useState("")

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.getHomeCategoryProduct.url)
        const dataResponse = await response.json()

        setCategories(dataResponse?.data)
        console.log(dataResponse);

    }
    useEffect(() => {
        fetchAllProduct()
    }, [])


    const inputChange = (event) => {
        const { name, value } = event.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const submit = async (event) => {
        event.preventDefault()
        const response = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()
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
        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadIamgeCloudinary.url],
            }
        })

        console.log("upload image", uploadIamgeCloudinary);
    }



    return (
        <div className='container'>
            <div className='row d-flex justify-content-between p-3'>
                <div>
                    <h2>upload product</h2>
                </div>
                <div>
                    <FontAwesomeIcon icon={faXmark} className='cancle-btn' onClick={onClose} />
                </div>

            </div>
            <div className='row'>
                <div className='col'>
                    <form onSubmit={submit}>
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
                                required
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
                                required
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category name</label>
                            <select className='form-control' onChange={inputChange} name='category' required>
                                <option>Select category</option>
                                {
                                    categories.map((category) => {
                                        return (
                                            <option value={category._id} key={category._id}>{category.productCategoryName}</option>
                                        )
                                    })
                                }
                                
                            </select>
                        </div>
                        {/* {data.category && (
                            <div className="mb-3">
                                <label htmlFor="subcategory" className="form-label">Subcategory</label>
                                <select className='form-control' onChange={inputChange} name='subcategory' required>
                                    <option>Select subcategory</option>
                                    {productCategory.find(category => category.value === data.category)?.subcategories?.map((subcategory) => (
                                        <option key={subcategory.id} value={subcategory.value}>{subcategory.label}</option>
                                    ))}
                                </select>
                            </div>
                        )} */}
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
                                    data?.productImage[0] ? (
                                        <div className="dataimg">

                                            {
                                                data.productImage.map(el => {
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
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name='price'
                                placeholder='Enter Price'
                                value={data.price}
                                onChange={inputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sellingPrice" className="form-label">Selling price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="sellingPrice"
                                name='sellingPrice'
                                placeholder='Enter selling price'
                                value={data.sellingPrice}
                                onChange={inputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Product discription</label><br />
                            <textarea
                                className='resize-none p-2'
                                rows={6} cols={155}
                                placeholder='Enter product  description'
                                name='description'
                                // id='description'
                                onChange={inputChange}
                                value={data.description}
                            ></textarea>
                        </div>
                        <button className='btn btn-success'>submit</button>
                    </form>

                </div>

            </div>
        </div>
    )
}
