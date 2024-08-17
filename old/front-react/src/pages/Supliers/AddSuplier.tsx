import { Link } from "react-router-dom";

import Content from "../../components/Content";

import React from "react";

import { addSuplierSlice } from "../../features/supliers/addSuplierSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  useStoreSupplierMutation,
} from "../../services/medicines/medicines";
import Alert from "../../components/Alert";

const AddSuplier = () => {


  const dispatch = useAppDispatch();
  const addSuplierValue = useAppSelector((state) => state.addSuplier.value);

  const [storeSuplier, storeSuplierStatus] = useStoreSupplierMutation();


 storeSuplierStatus.isSuccess && dispatch(addSuplierSlice())


  return (
    <>
      <div className="content-wrapper">
        <Content title="Add Suplier"/>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/AllSupliers"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"List Supliers"}</span>
                  </Link>
                </h3>
              </div>
              <div className="card-body">
                {storeSuplierStatus.isSuccess && (
                        <Alert color={'success'} massage="Supplier is added success"></Alert>
                )
                }
      
          
                {/* <MedicineForm dispatch= {dispatch} data = {data} ></MedicineForm> */}
                <form
                  encType="application/json"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formDate = new FormData(e.currentTarget);
                    storeSuplier({ ...addSuplierValue });

                  }}
                
                  onChange={(e) => {
                    e.preventDefault();
                    const formDate = new FormData(e.currentTarget);
                    const name = formDate.get("name");
                    const code = formDate.get("code");
                    const email = formDate.get("email");
                    const city = formDate.get("city");
                    const adress = formDate.get("address");
                    const phone = formDate.get("phone");
                    const mobile = formDate.get("mobile");
               
                    dispatch(addSuplierSlice({
                      name,code,email,city,adress,phone,mobile
                    
                    } ));
                  }}
                >
                  <div className="row">
                  
                    <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="phone">code</label>
                        <input type="code" className="form-control" name='code' id="code"
                            placeholder="Enter Supplier code"/>
                    </div>
                      <div className="form-group">
                        <label htmlFor="Name">Name</label>
                      
                        <input
                          type="text"
                          className="form-control"
                          id="Name"
                          name="name"
                          placeholder="Enter Suplier Name"
                          Value={addSuplierValue?.name ?? ''}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">phone</label>
                        <input type="tel" name='phone' className="form-control" id="phone"
                            placeholder="Enter Supplier Phone"
                            Value={addSuplierValue?.phone ?? ''}
                            />
                    </div>

                      <div className="form-group">
                          <label htmlFor="Email">Email</label>
                          <input type="email" name='email' className="form-control" id="Email"
                              placeholder="Enter Supplier email"
                              Value={addSuplierValue?.email ?? ''}
                              />
                      </div>
                      </div>
                      <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="city">City</label>
                              <input type="text" className="form-control" name='city' id="city"
                                  placeholder="Enter Supplier City"
                                  Value={addSuplierValue?.city ?? ''}
                                  />
                          </div>
                          <div className="form-group">
                              <label htmlFor="address">Address</label>
                              <input type="text" name='address' className="form-control" id="address"
                                  placeholder="Enter Supplier Address"
                                  Value={addSuplierValue?.adress ?? ''}
                                  />
                          </div>
                          <div className="form-group">
                              <label htmlFor="mobile">Mobile</label>
                              <input type="text" name='mobile' className="form-control" id="mobile"
                                  placeholder="Enter Supplier Mobile"
                                  Value={addSuplierValue?.mobile ?? ''}
                                  />
                          </div>
                        </div>
                 

                  </div>

                  {/* <!-- /.card-body --> */}
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddSuplier;
