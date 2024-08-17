import React from "react";
import { useAppDispatch } from "../../app/hooks";

import { modal } from "../../features/modalSlice";
import {
  useUpdateSupplierMutation
} from "../../services/medicines/medicines";
import Alert from "../Alert";
import { useForm } from 'react-hook-form';

const EditComponent = (props) => {
  const { item } = props;

const [updateSupplier, updateSupplierStatus] = useUpdateSupplierMutation();
const updateErrors = updateSupplierStatus?.error?.data?.errors



 const { register , handleSubmit, formState: { errors } } = useForm();

 const formSubmit = (data) =>{
    const id = item.id
    const name= data.name
    const adress = data.address
    const city = data.city
    const mobile = data.mobile
    const phone = data.phone

  
  updateSupplier({id,name,adress,city,mobile,phone});
 }

  return (

    <form
    encType="application/json"
    onSubmit={handleSubmit(formSubmit)}
  
  >
  {updateSupplierStatus.isSuccess && (
        <Alert
          color={"success"}
          massage="Supplier updated done"
        ></Alert>
      )}
    <div className="row">
      <div className="col-md-6">

        <div className="form-group">
          <label htmlFor="Name">Name</label>

          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter Supplier Name"
            defaultValue={item.name}
            {...register('name', {required:'Name is required'})}
          />
          {errors?.name && (
                  <span className='text-danger'>{errors.name?.message}</span>
          ) }
          {updateSupplierStatus.isError && updateErrors.name && (
                  <span className='text-danger'>{updateErrors?.name[0]}</span>
          ) }
        </div>
        <div className="form-group">
          <label htmlFor="phone">phone</label>
          <input type="tel" name='phone' className="form-control" id="phone"
              placeholder="Enter Supplier Phone" defaultValue={item?.phone ?? ''}
              {...register('phone', {required:'Name is required'})}
          />
          {errors?.phone && (
                  <span className='text-danger'>{errors.phone?.message}</span>
          ) }
               {updateSupplierStatus.isError && updateErrors.phone && (
                  <span className='text-danger'>{updateErrors?.phone[0]}</span>
          ) }
      </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" className="form-control" name='city' id="city"
              placeholder="Enter Supplier City" defaultValue={item?.city ?? ''}
              {...register('city')}
              />
              {errors?.city && (
                <span className='text-danger'>{errors.city?.message}</span>
              ) }
                   {updateSupplierStatus.isError && updateErrors.city && (
                  <span className='text-danger'>{updateErrors?.city[0]}</span>
          ) }
            
      </div>
      <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" name='address' className="form-control" id="address"
              placeholder="Enter Supplier Address" defaultValue={item?.adress ?? ''} 
              {...register('address')}
              />
              {errors?.address && (
                 <span className='text-danger'>{errors.address?.message}</span>
              ) }
                   {updateSupplierStatus.isError && updateErrors.adress && (
                  <span className='text-danger'>{updateErrors?.adress[0]}</span>
          ) }
      </div>
      <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" name='mobile' className="form-control" id="mobile"
              placeholder="Enter Supplier Mobile" defaultValue={item?.mobile ?? ''}
              {...register('mobile')}
              />
              {errors?.mobile && updateErrors.mobile && (
                 <span className='text-danger'>{errors.mobile?.message}</span>
              ) }
                          {updateSupplierStatus.isError && (
                  <span className='text-danger'>{updateErrors?.mobile[0]}</span>
          ) }

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
  
  );
};

export default EditComponent;