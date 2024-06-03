import React from 'react'

export default function userProfile() {
  return (
    <div class="container text-dark">
        <div class="row mt-4">
            <div class="col-12 ">
                <h4 class="text-center">Hello mr due</h4>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <form>
                        <div>
                            <label>Name:</label>
                            <input type="email" class="user-form" value="Jhon doe"/>
                        </div>
                        <div>
                            <label>Gmail:</label>
                            <input type="email" class="user-form" value="Jhon@gmail.com"/>
                        </div>
                        <div>
                            <label>Address:</label>
                            <input type="email" class="user-form" value="street no-2 noida sec-44"/>
                        </div>
                        <button class="btn btn-primary fw-bold">Edit <i class="fa-solid fa-pen"></i></button>

                    </form>
                </div>



            </div>

        </div>


    </div>
  )
}
