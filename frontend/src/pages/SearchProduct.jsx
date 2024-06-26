import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryApi from '../common'

export default function SearchProduct() {
    const query = useLocation()

    const fetchProduct = async () => {
        const response = await fetch(SummaryApi.searchprodct.url + query.search)
        const dataResponse = await response.json()
        console.log("query", dataResponse);
    }

    useEffect(() => {
        fetchProduct()
    }, [query])

    return (
        <div>SearchProduct</div>
    )
}
