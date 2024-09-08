import React from 'react'
import './Contractform.css'
function Contractform() {
  return (


        <div style={{padding:'7%'}} className="IssueTender">
            <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                <h3>Sign Contract</h3>
                
                <div className="card">
                    <h5 className="text-center mb-4">Powering world-class companies</h5>
                    <form className="form-card" onsubmit="event.preventDefault()">
                    <div className="row justify-content-between text-left">
                            <div className="form-group col-12 flex-column d-flex"> <h6 className="form-control-label px-3">Tender Title<span className="text-danger"> *</span></h6> <input type="text" id="ans" name="ans" placeholder="" onblur="validate(6)"/> </div>
                        </div>
                        <div className="row justify-content-between text-left">
                            <div className="form-group col-sm-6 flex-column d-flex"> <h6 className="form-control-label px-3">Opening date and time<span className="text-danger"> *</span></h6> <input type="datetime-local" id="fname" name="fname" placeholder="Enter your first name" onblur="validate(1)"/> </div>
                            <div className="form-group col-sm-6 flex-column d-flex"> <h6 className="form-control-label px-3">Clossing date and time<span className="text-danger"> *</span></h6> <input type="datetime-local" id="lname" name="lname" placeholder="Enter your last name" onblur="validate(2)"/> </div>
                        </div>
                        <div class="form-group">
        <h6 for="exampleFormControlTextarea1">Description <span className="text-danger"> *</span></h6>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <div className="d-flex justify-content-center pb-5 form-group mt-3" >
                        <label
                          htmlFor="dropzone-file"
                          className="d-flex flex-column align-items-center justify-content-center w-100 h-64 border border-secondary border-dashed rounded bg-light hover:bg-secondary hover:text-white cursor-pointer"
                        >
                          <div className="d-flex flex-column align-items-center justify-content-center pt-5 pb-6">
                            <svg
                              className="w-2 h-2 mb-5 text-secondary"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-center text-secondary">
                              <span className="font-weight-bold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-center text-muted">file: docs, txt, pdf</p>
                          </div>
                          <input id="dropzone-file" type="file" name="file" className="d-none" />
                        </label>
                      </div>
    
                        <div className="row justify-content-center ">
                            <div className="form-group "> <button type="submit" className="btn btn-success w-100">Issue</button> </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        </div>
      )

  
}

export default Contractform