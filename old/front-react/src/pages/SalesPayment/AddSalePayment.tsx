import React from 'react'

const AddSalePayment = () => {
  return (
    <div className="content-wrapper">
         
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>payments</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">payment</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-default">
                      
                        <form>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Payment Type</label>
                                            <select className="form-control">
                                                <option>Alabama</option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Remaining Debt</label>
                                            <input type="number" disabled className="form-control" name="remain" value=""/>
                                        </div>

                                    </div>
                                    <div className="col-md-6">

                                        <div className="form-group">
                                            <label htmlFor="pay">Payment Value</label>
                                            <input type="number" className="form-control" id="pay" name="pay" value=""
                                                placeholder="Enter Payment Value"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="remain-after">Remaining After pay </label>
                                            <input type="number" disabled className="form-control" id="remain-after"
                                                name="remain-after" value=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
             

            
                </div>
            </section>
        
        </div>
  )
}

export default AddSalePayment;