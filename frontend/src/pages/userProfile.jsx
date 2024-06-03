import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

export default function UserProfile() {
  const [openUdateUser, setOpenUdateUser] = useState(false)
  const [userRole, setUserRole] = useState()

  const user = useSelector(state => state?.user?.user)






  const updateUserName = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: userRole
      })
    })
    const responseData = await fetchResponse.json()
    console.log("name-updated", responseData);
  }

  return (
    <div className="container text-dark">
      <div className="row mt-4">
        <div className="col-12 ">
          <h4 className="text-center">Hello mr {user?.name}</h4>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <p>Name: <span className='text-capitalize'>{user?.name}</span></p>
            <p>Email: <span>{user?.email}</span></p>
            {/* <p>email:{email}</p> */}
            <button onClick={() => setOpenUdateUser(true)} >change</button>

          </div>



        </div>

        {
          openUdateUser && (
            <div className='row mt-4 background-op'>
              <div className='col-sm-6'>
                <div className='box'>
                  <div className='box-child'>
                    <div className='d-flex justify-content-end p-2' >

                      <FontAwesomeIcon icon={faXmark} className='cancle-btn' onClick={() => setOpenUdateUser(false)} />
                    </div>
                    <div className='p-3'>
                      <h3>Change Details</h3>
                      <p>Name: <span>test</span></p>
                      <p>email: <span>email@gmail.com</span></p>
                      <p>address: <span>street no 3 noida</span></p>
                      <div className='d-flex justify-content-between'>
                        <button className='btn btn-primary'>Submit</button>
                        <button className='btn btn-warning' onClick={() => setOpenUdateUser(false)}>Cancle</button>
                      </div>

                    </div>

                  </div>

                </div>
              </div>

            </div>
          )
        }

      </div>
      <div className='row mt-5'>
        <div className='col-sm-12'>
          <h2>Shopping details</h2>

        </div>

      </div>

    </div>
  )
}
