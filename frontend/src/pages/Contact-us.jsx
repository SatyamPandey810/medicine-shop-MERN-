import React, { useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

export default function ContactUs({ onClose, fetchData }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    subject: "",
    message: "",

  })


  const inputChange = (event) => {
    const { name, value } = event.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const submit = async (event) => {
    event.preventDefault()
    const response = await fetch(SummaryApi.contactUs.url, {
      method: SummaryApi.contactUs.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json()

    if (responseData.success) {
      toast.success(responseData?.message)
      // onClose()
      // fetchData()
      setData({
        name: "",
        email: "",
        subject: "",
        subject: "",
        message: "",
      });
    }

    if (responseData.error) {
      toast.error(responseData?.message)
    }
  }





  return (
    <>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <a href="index.html">Home</a> <span className="mx-2 mb-0">/</span>
              <strong className="text-black">Contact</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="h3 mb-5 text-black">Get In Touch</h2>
            </div>
            <div className="col-md-12">

              <form onSubmit={submit}>

                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor='name' className="text-black">First Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={inputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="text-black">Email <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={inputChange}
                        placeholder="" />
                    </div>
                    {/* <div className="col-md-6">
                      <label for="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="c_lname" name="c_lname" />
                    </div> */}
                  </div>
                  <div className="form-group row">

                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="subject" className="text-black">Subject </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={data.subject}
                        onChange={inputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label for="c_message" className="text-black">Message </label>
                      <textarea
                        name="message"
                        id="message"
                        value={data.message}
                        cols="30"
                        rows="7"
                        onChange={inputChange}
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <input type="submit" className="btn btn-primary btn-lg btn-block" value="Send Message" />
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>



      <div className="site-section bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="text-white mb-4">Offices</h2>
            </div>
            <div className="col-lg-4">
              <div className="p-4 bg-white mb-3 rounded">
                <span className="d-block text-black h6 text-uppercase">New York</span>
                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="p-4 bg-white mb-3 rounded">
                <span className="d-block text-black h6 text-uppercase">London</span>
                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="p-4 bg-white mb-3 rounded">
                <span className="d-block text-black h6 text-uppercase">Canada</span>
                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
