import React, { useEffect, useState } from 'react'
import DashboardSidebar from '../../components/Dashboard-sidebar'
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

export default function UserMessage() {
    const [data, setData] = useState([])


    const fetchData = async () => {
        const response = await fetch(SummaryApi.getContactUs.url, {
            method: SummaryApi.getContactUs.method,
            credentials: "include",

        });
        const responseData = await response.json();
        console.log(responseData);

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

// delete message 

const deleteMessage = async (id) => {
    const response = await fetch(SummaryApi.delteContactUs.url, {
        method: SummaryApi.delteContactUs.method,
        credentials: "include",
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify({
            _id: id,
        })
    })
    const responseData = await response.json()

    if (responseData.success) {
        toast.success(responseData.message)
        fetchData()
    }
}


    return (
        <>
            <DashboardSidebar />
            <div className='content container  mt-4'>
                <table class="table  table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className='text-nowrap'>S no.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Message</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((me, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td className='text-nowrap'>{me?.name}</td>
                                    <td className='text-nowrap'>{me?.email}</td>
                                    <td className='text-nowrap'>{me?.subject}</td>
                                    <td>{me?.message}</td>
                                    <td><button className='btn btn-danger' onClick={()=>deleteMessage(me?._id)}>Delete</button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}
