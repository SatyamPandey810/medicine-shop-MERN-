import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


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
  const [data, setData] = useState([])
  // const [totalProducts, setTotalProducts] = useState(0);
  // const { id} = useParams();


  const [formData, setFormData] = useState({
    // firstName: '',
    // lastName: '',
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    zipCode: '',
    country: '',
    state: '',
  })

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

  // user information post
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  };

  // shopping card total
  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": 'application/json'
      },
    })
    const responseData = await response.json()
    // console.log(responseData);
    setData(responseData.data)
    if (responseData.success) {

    }

  }

  useEffect(() => {
    fetchData()
  }, [])
   //-----------------total product qty---------------
   let totalQuantity = 0;

   data.forEach(innerArray => {
       innerArray.forEach(obj => {
           totalQuantity += obj.quantity;
       });
   });


  const submit = async (event, id) => {
    event?.preventDefault();
    console.log("Product ID:", id);
    const checkoutData = {
      ...formData,
      productsId: id, // Replace with actual product ID
    };
    console.log("Checkout Data:", checkoutData)
    console.log("Product ID:", id);

    try {
      const dataResponse = await fetch(SummaryApi.createCheckout.url, {
        method: SummaryApi.createCheckout.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(checkoutData)
      });

      const dataApi = await dataResponse.json();
      // console.log(dataApi);

      if (dataApi.success) {
        toast.success(dataApi.message);
        // Optionally clear the form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          address1: '',
          address2: '',
          city: '',
          zipCode: '',
          country: '',
          state: '',
        });
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error('Error submitting checkout:', error);
      toast.error('Failed to submit checkout');
    }

  }





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
                <form onSubmit={submit}>


                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="name" className="text-black">First Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        onChange={handleInputChange}
                        value={formData.name}


                      />
                    </div>
                    {/* <div className="col-md-6">
                      <label className="text-black">Last Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" />
                    </div> */}
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor='email' className="text-black">Email <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        className="form-control"
                        name='email'
                        id="email"
                        onChange={handleInputChange}
                        value={formData.email}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor='number' className="text-black">Phone <span className="text-danger">*</span></label>
                      <input
                        type="number"
                        className="form-control"
                        name='phone'
                        id='phone'
                        onChange={handleInputChange}
                        value={formData.phone}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor='address1' className="text-black">Address 1<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Street address"
                        name='address1'
                        id='address1'
                        onChange={handleInputChange}
                        value={formData.address1}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor='address2' className="text-black">Address 2<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Apartment, suite, unit etc. (optional)"
                        name='address2'
                        id='address2'
                        onChange={handleInputChange}
                        value={formData.address2}
                      />
                    </div>
                    {/* <input type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" /> */}
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor='country' className="text-black">Country <span className="text-danger">*</span></label>
                        <select value={formData.country} name="country" id="country" onChange={handleInputChange} className='form-control'>
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
                      <select disabled={!selectedState} className='form-control'>
                        <option value="">Select City</option>
                        {cities.map((city) => (
                          <option key={city.iso2} value={city.iso2}>{city.name}</option>
                        ))}
                      </select>

                    </div>
                    <div className="col-md-6">
                      <label className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                      <input
                        type="number"
                        className="form-control"
                        name='zipCode'
                        id='zipCode'
                        onChange={handleInputChange}
                        value={formData.zipCode}
                      />
                    </div>
                  </div>
                  <button className='btn btn-primary' type='submit'>Submit</button>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Your Order</h2>
                  <div className="p-3 p-lg-5 border">
                    <table className="table site-block-order-table mb-5">
                      {/* <thead>
                        <th>Product</th>
                        <th>Total</th>
                      </thead> */}
                      <tbody>
                      <tr>
                          <td> total Product</td>
                          {/* <td>{totalProducts}</td> */}
                        </tr>

                        <tr>
                          <td>Product qurantity</td>
                          <td>{totalQuantity}</td>
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
