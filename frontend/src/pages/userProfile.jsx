import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

export default function UserProfile() {
  const [openUdateUser, setOpenUdateUser] = useState(false)
  const [userName, setUserName] = useState();
  const [updateuserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    _id:""
  })
  const [loggedInUser, setLoggedInUser] = useState(null);

  const user = useSelector(state => state?.user?.user)

  const fetchLoggedInUser = async () => {
    try {
      const fetchData = await fetch(SummaryApi.loggedInUser.url, {
        method: SummaryApi.loggedInUser.method,
        credentials: 'include'
      });
      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setLoggedInUser(dataResponse.data);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
      console.log("loggedInUser dataResponse", dataResponse);
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
    }
  };

 useEffect(() => {
    fetchLoggedInUser();
  }, []);




 
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
            <button onClick={() =>{ setOpenUdateUser(true)
               setUpdateUserDetails(user)}} >change</button>

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
                      <p>Name: <span className='text-capitalize'>{updateuserDetails.name}</span></p>
                      <p>email: <span>{updateuserDetails.email}</span></p>
                      <p>User id: <span>{updateuserDetails._id}</span></p>
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
