import React, { useEffect, useState } from 'react'
import axios from 'axios';


const config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries',
  ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
};
export default function CheckOut() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      loadStates(selectedCountry);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      loadCities(selectedCountry, selectedState);
    } else {
      setCities([]);
    }
  }, [selectedState, selectedCountry]);

  const loadCountries = async () => {
    try {
      const response = await fetch(config.cUrl, { headers: { "X-CSCAPI-KEY": config.ckey } });
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error loading countries:', error);
    }
  };

  const loadStates = async (countryCode) => {
    try {
      const response = await fetch(`${config.cUrl}/${countryCode}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } });
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error loading states:', error);
    }
  };

  const loadCities = async (countryCode, stateCode) => {
    try {
      const response = await fetch(`${config.cUrl}/${countryCode}/states/${stateCode}/cities`, { headers: { "X-CSCAPI-KEY": config.ckey } });
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  };

  return (
    <div>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <a href="index.html">Home</a> <span className="mx-2 mb-0">/</span>
              <strong className="text-black">Checkout</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12">
              <div className="bg-light rounded p-3">
                <p className="mb-0">Returning customer? <a href="#" className="d-inline-block">Click here</a> to login</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="h3 mb-3 text-black">Billing Details</h2>
              <div className="p-3 p-lg-5 border">

                <div className="form-group row">
                  <div className="col-md-6">
                    <label  className="text-black">First Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control"/>
                  </div>
                  <div className="col-md-6">
                    <label className="text-black">Last Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label  className="text-black">Email <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label className="text-black">Address <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="Street address" />
                  </div>
                </div>

                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label for="c_country" className="text-black">Country <span className="text-danger">*</span></label>
                      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className='form-control'>
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country.iso2} value={country.iso2}>{country.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>State:</label>
                      <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry} className='form-control'>
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state.iso2} value={state.iso2}>{state.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group row mb-5">
                  <div className="col-md-6">
                    <label>City:</label>
                    <select disabled={!selectedState}  className='form-control'>
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.iso2} value={city.iso2}>{city.name}</option>
                      ))}
                    </select>

                  </div>
                  <div className="col-md-6">
                    <label className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                    <input type="number" className="form-control" />
                  </div>
                </div>

                <div className="form-group">
                  <label for="c_create_account" className="text-black" data-toggle="collapse" href="#create_an_account"
                    role="button" aria-expanded="false" aria-controls="create_an_account"><input type="checkbox" value="1"
                      id="c_create_account" /> Create an account?</label>
                  <div className="collapse" id="create_an_account">
                    <div className="py-2">
                      <p className="mb-3">Create an account by entering the information below. If you are a returning customer
                        please login at the top of the page.</p>
                      <div className="form-group">
                        <label for="c_account_password" className="text-black">Account Password</label>
                        <input type="email" className="form-control" id="c_account_password" name="c_account_password"
                          placeholder="" />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="form-group">
                  <label for="c_ship_different_address" className="text-black" data-toggle="collapse"
                    href="#ship_different_address" role="button" aria-expanded="false"
                    aria-controls="ship_different_address"><input type="checkbox" value="1" id="c_ship_different_address" />
                    Ship To A Different Address?</label>
                  <div className="collapse" id="ship_different_address">
                    <div className="py-2">

                      <div className="form-group">
                        <label for="c_diff_country" className="text-black">Country <span className="text-danger">*</span></label>
                        <select id="c_diff_country" className="form-control">
                          <option value="1">Select a country</option>
                          <option value="2">bangladesh</option>
                          <option value="3">Algeria</option>
                          <option value="4">Afghanistan</option>
                          <option value="5">Ghana</option>
                          <option value="6">Albania</option>
                          <option value="7">Bahrain</option>
                          <option value="8">Colombia</option>
                          <option value="9">Dominican Republic</option>
                        </select>
                      </div>


                      <div className="form-group row">
                        <div className="col-md-6">
                          <label for="c_diff_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" id="c_diff_fname" name="c_diff_fname" />
                        </div>
                        <div className="col-md-6">
                          <label for="c_diff_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" id="c_diff_lname" name="c_diff_lname" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-12">
                          <label for="c_diff_companyname" className="text-black">Company Name </label>
                          <input type="text" className="form-control" id="c_diff_companyname" name="c_diff_companyname" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-12">
                          <label for="c_diff_address" className="text-black">Address <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" id="c_diff_address" name="c_diff_address"
                            placeholder="Street address" />
                        </div>
                      </div>

                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                      </div>

                      <div className="form-group row">
                        <div className="col-md-6">
                          <label for="c_diff_state_country" className="text-black">State / Country <span
                            className="text-danger">*</span></label>
                          <input type="text" className="form-control" id="c_diff_state_country" name="c_diff_state_country" />
                        </div>
                        <div className="col-md-6">
                          <label for="c_diff_postal_zip" className="text-black">Posta / Zip <span
                            className="text-danger">*</span></label>
                          <input type="text" className="form-control" id="c_diff_postal_zip" name="c_diff_postal_zip" />
                        </div>
                      </div>

                      <div className="form-group row mb-5">
                        <div className="col-md-6">
                          <label for="c_diff_email_address" className="text-black">Email Address <span
                            className="text-danger">*</span></label>
                          <input type="text" className="form-control" id="c_diff_email_address" name="c_diff_email_address" />
                        </div>
                        <div className="col-md-6">
                          <label for="c_diff_phone" className="text-black">Phone <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" id="c_diff_phone" name="c_diff_phone"
                            placeholder="Phone Number" />
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                <div className="form-group">
                  <label for="c_order_notes" className="text-black">Order Notes</label>
                  <textarea name="c_order_notes" id="c_order_notes" cols="30" rows="5" className="form-control"
                    placeholder="Write your notes here..."></textarea>
                </div>

              </div>
            </div>
            <div className="col-md-6">

              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                  <div className="p-3 p-lg-5 border">

                    <label for="c_code" className="text-black mb-3">Enter your coupon code if you have one</label>
                    <div className="input-group w-75">
                      <input type="text" className="form-control" id="c_code" placeholder="Coupon Code" aria-label="Coupon Code"
                        aria-describedby="button-addon2" />
                      <div className="input-group-append">
                        <button className="btn btn-primary btn-sm px-4" type="button" id="button-addon2">Apply</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Your Order</h2>
                  <div className="p-3 p-lg-5 border">
                    <table className="table site-block-order-table mb-5">
                      <thead>
                        <th>Product</th>
                        <th>Total</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Bioderma <strong className="mx-2">x</strong> 1</td>
                          <td>$55.00</td>
                        </tr>
                        <tr>
                          <td>Ibuprofeen <strong className="mx-2">x</strong> 1</td>
                          <td>$45.00</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
                          <td className="text-black">$350.00</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold"><strong>Order Total</strong></td>
                          <td className="text-black font-weight-bold"><strong>$350.00</strong></td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="border mb-3">
                      <h3 className="h6 mb-0"><a className="d-block" data-toggle="collapse" href="#collapsebank" role="button"
                        aria-expanded="false" aria-controls="collapsebank">Direct Bank Transfer</a></h3>

                      <div className="collapse" id="collapsebank">
                        <div className="py-2 px-4">
                          <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the
                            payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                        </div>
                      </div>
                    </div>

                    <div className="border mb-3">
                      <h3 className="h6 mb-0"><a className="d-block" data-toggle="collapse" href="#collapsecheque" role="button"
                        aria-expanded="false" aria-controls="collapsecheque">Cheque Payment</a></h3>

                      <div className="collapse" id="collapsecheque">
                        <div className="py-2 px-4">
                          <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the
                            payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                        </div>
                      </div>
                    </div>

                    <div className="border mb-5">
                      <h3 className="h6 mb-0"><a className="d-block" data-toggle="collapse" href="#collapsepaypal" role="button"
                        aria-expanded="false" aria-controls="collapsepaypal">Paypal</a></h3>

                      <div className="collapse" id="collapsepaypal">
                        <div className="py-2 px-4">
                          <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the
                            payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <button className="btn btn-primary btn-lg btn-block" onclick="window.location='thankyou.html'">Place
                        Order</button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="site-section bg-secondary bg-image" style={{ backgroundImage: "url('images/bg_2.jpg')" }}>
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <a href="#" className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('images/bg_1.jpg')" }}>
                <div className="banner-1-inner align-self-center">
                  <h2>Pharma Products</h2>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                  </p>
                </div>
              </a>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <a href="#" className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('images/bg_2.jpg')" }}>
                <div className="banner-1-inner ml-auto  align-self-center">
                  <h2>Rated by Experts</h2>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <h1>Select Location</h1>
      <div>
        <label>Country:</label>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.iso2} value={country.iso2}>{country.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>State:</label>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.iso2} value={state.iso2}>{state.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>City:</label>
        <select disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.iso2} value={city.iso2}>{city.name}</option>
          ))}
        </select>
      </div> */}


    </div>
  )
}
