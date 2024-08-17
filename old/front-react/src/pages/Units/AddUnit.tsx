import { Link } from "react-router-dom";

import Content from "../../components/Content";

import React, { useEffect } from "react";

import { addUnitSlice } from "../../features/units/addUnitSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {

  useStoreUnitMutation,
} from "../../services/medicines/medicines";
import Alert from "../../components/Alert";
import { useForm } from "react-hook-form";

const AddUnit = () => {

  const { register , handleSubmit, formState: { errors } } = useForm();

  const dispatch = useAppDispatch();
  const addUnitValue = useAppSelector((state) => state.addUnit.value);

  const [storeUnit, storeUnitStatus] = useStoreUnitMutation();


 
 const storeData = () =>{

  storeUnit({ ...addUnitValue });
 }

  return (
    <>
      <div className="content-wrapper">
        <Content title="Add Unit"/>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/AllUnits"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"List Units"}</span>
                  </Link>
                </h3>
              </div>
              <div className="card-body">
                {storeUnitStatus.isSuccess && (
                        <Alert color={'success'} massage={storeUnitStatus?.data?.message}></Alert>
                )
                }
     
                {/* <MedicineForm dispatch= {dispatch} data = {data} ></MedicineForm> */}
                <form
                  encType="application/json"
                  onSubmit={handleSubmit(storeData)}
                
                  onChange={(e) => {
                    e.preventDefault();
                    const formDate = new FormData(e.currentTarget);
                    const name = formDate.get("name");
               
                    dispatch(addUnitSlice({name} ));
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
                          placeholder="Enter Unit Name"
                          value={addUnitValue?.name ?? ''}
                          {...register("name", {required: 'Name is required'})}
                        />
                        {errors.name && (
                            <span className='text-danger'>{errors.name?.message}</span>
                          )}
                        {storeUnitStatus.isError && storeUnitStatus.error.data.errors.name && (
                             <span className='text-danger'>{storeUnitStatus?.error?.data?.errors?.name[0]}</span>
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

export default AddUnit;
