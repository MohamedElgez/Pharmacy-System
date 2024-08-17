import { Link } from "react-router-dom";

import Content from "../../components/Content";

import React, { useEffect } from "react";

import { addCategorySlice } from "../../features/categories/addCategorySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {

  useStoreCategoryMutation,
} from "../../services/medicines/medicines";
import Alert from "../../components/Alert";
import { useForm } from "react-hook-form";

const AddCategory = () => {


  const dispatch = useAppDispatch();
  const addCategoryValue = useAppSelector((state) => state.addCategory.value);

  const [storeCategory, storeCategoryStatus] = useStoreCategoryMutation();


const { register , handleSubmit, formState: { errors }, reset } = useForm();

const storeData = (data) => {

  storeCategory({ ...addCategoryValue });
}

useEffect(()=>{

  dispatch(addCategorySlice() )

}, [storeCategoryStatus.isSuccess])

  return (
    <>
      <div className="content-wrapper">
        <Content title="Add Category"/>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/AllCategories"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"List Categories"}</span>
                  </Link>
                </h3>
              </div>
              <div className="card-body">
                {storeCategoryStatus.isSuccess && (
                        <Alert color={'success'} massage={storeCategoryStatus.data.message}></Alert>
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
               
                    dispatch(addCategorySlice({name} ));
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
                          placeholder="Enter Category Name"
                          value={addCategoryValue?.name ?? ''}
                          {...register("name", {required: 'Name is required'})}
                        />
                   
                          {errors.name && (
                            <span className='text-danger'>{errors.name?.message}</span>
                          )}
                        {storeCategoryStatus.isError && storeCategoryStatus.error.data.errors.name && (
                             <span className='text-danger'>{storeCategoryStatus?.error?.data?.errors?.name[0]}</span>
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

export default AddCategory;
