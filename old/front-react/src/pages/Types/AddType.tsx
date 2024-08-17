import { Link } from "react-router-dom";

import Content from "../../components/Content";

import React, { useEffect } from "react";

// import { addTypeSlice } from "../../features/types/addTypeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {

  useStoreTypeMutation,
} from "../../services/medicines/medicines";
import Alert from "../../components/Alert";
import { store } from '../../app/store';
import { useForm } from "react-hook-form";

const AddType = () => {

  const { register , handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useAppDispatch();
  // const addTypeValue = useAppSelector((state) => state.addType.value);

  const [storeType, storeTypeStatus] = useStoreTypeMutation();



const storeData = (data) => {
  const name = data.name
  storeType({name });
}

useEffect(()=>{

    window.document.getElementById('Name').value = ' '

}, storeTypeStatus.isSuccess)

  return (
    <>
      <div className="content-wrapper">
        <Content title="Add Type"/>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/AllTypes"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"List Types"}</span>
                  </Link>
                </h3>
              </div>
              <div className="card-body">
                {storeTypeStatus.isSuccess && (
                        <Alert color={'success'} massage={storeTypeStatus?.data?.message}></Alert>
                )
                }
       
          
                {/* <MedicineForm dispatch= {dispatch} data = {data} ></MedicineForm> */}
                <form
                  encType="application/json"
                  onSubmit={handleSubmit(storeData)}
                
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
                          placeholder="Enter Type Name"
                          {...register("name", {required: 'Name is required'})}
                         
                        />
                        {errors.name && (
                            <span className='text-danger'>{errors.name?.message}</span>
                          )}
                        {storeTypeStatus.isError && storeTypeStatus.error.data.errors.name && (
                             <span className='text-danger'>{storeTypeStatus?.error?.data?.errors?.name[0]}</span>
                          )}
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

export default AddType;
