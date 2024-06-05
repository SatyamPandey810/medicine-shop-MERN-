
const url = `https://api.cloudinary.com/v1_1/dctjaduoc/image/upload`
const uploadIamgeCloud = async (image) => {


    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "medicine_product")


    const dataResponse = await fetch(url, {
        method: "post",
        body: formData
    })
    console.log(dataResponse);
    return dataResponse.json()
}
export default uploadIamgeCloud