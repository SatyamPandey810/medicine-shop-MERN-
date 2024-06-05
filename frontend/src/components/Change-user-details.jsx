import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ROLE from '../common/role';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

export default function ChangeUserDetails({ name, email, role, onClose, userId, callFunc }) {
    const [userRole, setuserRole] = useState(role);

    const changeSelect = (event) => {
        setuserRole(event.target.value)
        // console.log(event.target.value);
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })
        const responseData = await fetchResponse.json()
        if (responseData.success) {
            toast.success(responseData.message)
            onClose()
            callFunc()
        }
        console.log("role-updated", responseData);
    }

    return (
        <div className='row mt-4 background-op d-flex justify-content-center'>
            <div className='col-sm-4 '>
                <div className='box'>
                    <div className='box-child'>
                        <div className='d-flex justify-content-end p-2' >

                            <FontAwesomeIcon icon={faXmark} className='cancle-btn' onClick={onClose} />
                        </div>
                        <div className='p-3'>
                            <h3>Change Details</h3>
                            <p>Name: <span className='text-capitalize'>{name}</span></p>
                            <p>email: <span>{email}</span></p>
                            {/* <p>User id: <span>{id}</span></p> */}
                            <span>Role:</span>
                            <select className='form-control mb-4' value={userRole} onChange={changeSelect}>
                                {/* <option >Select role</option> */}
                                {
                                    Object.values(ROLE).map(el => {
                                        return (
                                            <option value={el} key={el}>{el}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className='d-flex justify-content-center'>
                                <button className='btn btn-success fw-bold' onClick={updateUserRole}>Change role</button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}
