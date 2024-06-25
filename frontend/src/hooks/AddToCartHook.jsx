import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'

export default function AddToCartHook() {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: "include",
            headers: {
                "content-type": 'application/json'
            },
        })
        const responseData = await response.json()
        // console.log("data",data);
        if (responseData.success) {
            setData(responseData.data)

        }

    }
    useEffect(() => {
        fetchData()
    }, [])
  return data
}
