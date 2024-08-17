import { Link } from "react-router-dom";

import Content from "../../components/Content";

import React from "react";

import { addClientSlice } from "../../features/clients/addClientSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  useStoreClientMutation,
} from "../../services/medicines/medicines";
import Alert from "../../components/Alert";

const AddClient = () => {


  const dispatch = useAppDispatch();
  const addClientValue = useAppSelector((state) => state.addClient.value);

  const [storeClient, storeClientStatus] = useStoreClientMutation();

 storeClientStatus.isSuccess && dispatch(addClientSlice())

console.log(storeClientStatus);


  return (
    <>
      <div className="content-wrapper">
        <Content title="Add Client"/>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/AllClients"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"List Clients"}</span>
                  </Link>
                </h3>
              </div>
              <div className="card-body">
                {storeClientStatus.isSuccess && (
                        <Alert color={'success'} massage="Client insert Sucess "></Alert>
                )
                }

                {/* <MedicineForm dispatch= {dispatch} data = {data} ></MedicineForm> */}
                <form
                  encType="application/json"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formDate = new FormData(e.currentTarget);
                    storeClient({ ...addClientValue });

                  }}
                
                  onChange={(e) => {
                    e.preventDefault();
                    const formDate = new FormData(e.currentTarget);
                    const name = formDate.get("name");              
                    const city = formDate.get("city");
                    const adress = formDate.get("address");
                    const phone = formDate.get("phone");
                    const mobile = formDate.get("mobile");
               
                    dispatch(addClientSlice({
                      name,city,adress,phone,mobile
                    
                    } ));
                  }}
                >
                  <div className="row">
                    <div className="col-md-6">
         
                      <div className="form-group">
                        <label htmlFor="Name">Name</label>
    
                        <input
                          type="text"
                          className="form-control"
                          id="Name"
                          name="name"
                          placeholder="Enter Client Name"
                          value={addClientValue?.name ?? ''}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">phone</label>
                        <input type="tel" name='phone' className="form-control" id="phone"
                            placeholder="Enter Client Phone" value={addClientValue?.phone ?? ''}/>
                    </div>
            
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" className="form-control" name='city' id="city"
                            placeholder="Enter Client City" value={addClientValue?.city ?? ''}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" name='address' className="form-control" id="address"
                            placeholder="Enter Client Address" value={addClientValue?.adress ?? ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" name='mobile' className="form-control" id="mobile"
                            placeholder="Enter Client Mobile" value={addClientValue?.mobile ?? ''}/>
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

export default AddClient;
