import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common'
import { useSelector } from 'react-redux'
import DashboardSidebar from '../../components/Dashboard-sidebar'
import { toast } from 'react-toastify'
import moment from "moment"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChangeUserDetails from '../../components/Change-user-details'


export default function AllUser() {
    const [allUser, setAllUser] = useState([])
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id:"",
    })
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
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
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])
    return (
        <>
            <DashboardSidebar />
            <div className='content container mt-5'>
                <table className="table table-bordered">
                    <thead className='bg-dark text-light'>
                        <tr>
                            <th>S No.</th>
                            <th>Name</th>
                            <th>Customer Id</th>
                            <th>Gmail id</th>
                            <th>Role</th>
                            <th>Active date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allUser.map((el, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className='text-capitalize'>{el?.name}</td>
                                        <td>{el?._id}</td>
                                        <td>{el?.email}</td>
                                        <td>{el?.role}</td>
                                        <td>{moment(el?.createdAt).format('ll')}</td>
                                        <td><button className='btn btn-warning'
                                            onClick={() => {
                                                setUpdateUserDetails(el)
                                                setOpenUpdateRole(true)

                                            }}
                                        >Edit</button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                {
                    openUpdateRole && (
                        <ChangeUserDetails
                            onClose={() => setOpenUpdateRole(false)}
                            name={updateUserDetails.name}
                            email={updateUserDetails.email}
                            role={updateUserDetails.role}
                            userId={updateUserDetails._id}
                            callFunc={fetchAllUsers}

                        />
                    )
                }

            </div >

        </>

    )
}
