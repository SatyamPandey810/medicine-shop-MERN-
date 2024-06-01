import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartBar, faKeyboard, faTachometerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminPannelSidebar from '../../components/Admin-pannel-sidebar';

export default function AdminPanel() {
    const user = useSelector(state => state?.user?.user)


   

    return (
        <>
            <div class="container-fluid position-relative d-flex p-0">
                <AdminPannelSidebar />

                <div class="content">
                   


                    <h1 className='text-light'>hello world</h1>
                </div>



            </div>
        </>
    )
}
