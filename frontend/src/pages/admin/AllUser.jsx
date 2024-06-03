import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'
import { useSelector } from 'react-redux'
import DashboardSidebar from '../../components/Dashboard-sidebar'
import { toast } from 'react-toastify'
import moment from "moment"

export default function AllUser() {
    const [allUser, setAllUser] = useState([])
    // const user = useSelector(state => state?.user?.user)
    // console.log("alluser",user);

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: "include"
        })
        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllUser(dataResponse.data)
        }
        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
        console.log("dataResponse", dataResponse);
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])
    return (
        <>
            <DashboardSidebar />
            <div className='content container mt-5'>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Name</th>
                            <th> customer Id</th>
                            <th>Gmail id</th>
                            <th>Active date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allUser.map((el, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td className='text-capitalize'>{el?.name}</td>
                                        <td>{el?._id}</td>
                                        <td>{el?.email}</td>
                                        <td>{moment(el?.createdAt).format('ll')}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div >

        </>

    )
}
