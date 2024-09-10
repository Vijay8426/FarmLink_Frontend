import React from 'react'
import './Contract.css'
function Contract_res() {
  return (
    <div>
            <div style={{paddingTop:'10%'}}>
        <div className="container mt-5 d-flex justify-content-center">


 
</div>

<div className="container profile-page">
    <div className="row">

        <div className="col-xl-6 col-lg-7 col-md-12">
            <div className="card1 profile-header">
                <div className="body1">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-12 py-3">
                            <div className="profile-image float-md-right"> <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/> </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-12">
                            <h4 className="m-t-0 m-b-0"><strong>Michael</strong> Deo</h4>
                            <span className="job_post">Ui UX Designer</span>
                            <p>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                            <p className='text-success'>Accepted</p>
                            <div className='d-flex pb-4'>

                                <button className="btn btn-primary btn-round btn-simple">Make Payment</button>
                            </div>

                        </div>                
                    </div>
                </div>                    
            </div>
        </div>
        <div className="col-xl-6 col-lg-7 col-md-12">
            <div className="card1 profile-header">
                <div className="body1">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-12 py-3">
                            <div className="profile-image float-md-right"> <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/> </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-12">
                            <h4 className="m-t-0 m-b-0"><strong>Michael</strong> Deo</h4>
                            <span className="job_post">Ui UX Designer</span>
                            <p>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                            <p className='text-danger'>Contract Declined</p>
                            <div className='d-flex pb-4'>
                            <button className="btn btn-warning btn-round">Declined</button>
                            </div>

                        </div>                
                    </div>
                </div>                    
            </div>
        </div>

        
        

    </div>
        

</div>
    </div>
    </div>
  )
}

export default Contract_res