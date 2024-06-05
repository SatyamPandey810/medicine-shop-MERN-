const url = `https://api.cloudinary.com/v1_1/:cloud_name/:action/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadIamge = async (image) => {

    const formData = new formData()
    formData.append("file", image)
    formData.append("upload_preset", "medicine_products")


    const dataResponse = await fetch(url, {
        method: "post",
        body: formData
    })
    return dataResponse.json()
}
export default uploadIamge()