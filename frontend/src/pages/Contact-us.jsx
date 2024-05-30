import React from 'react'

export default function ContactUs() {
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
    
            <form action="#" method="post">
    
              <div className="p-3 p-lg-5 border">
                <div className="form-group row">
                  <div className="col-md-6">
                    <label for="c_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="c_fname" name="c_fname"/>
                  </div>
                  <div className="col-md-6">
                    <label for="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="c_lname" name="c_lname"/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <label for="c_email" className="text-black">Email <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" id="c_email" name="c_email" placeholder=""/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <label for="c_subject" className="text-black">Subject </label>
                    <input type="text" className="form-control" id="c_subject" name="c_subject"/>
                  </div>
                </div>
    
                <div className="form-group row">
                  <div className="col-md-12">
                    <label for="c_message" className="text-black">Message </label>
                    <textarea name="c_message" id="c_message" cols="30" rows="7" className="form-control"></textarea>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <input type="submit" className="btn btn-primary btn-lg btn-block" value="Send Message"/>
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
