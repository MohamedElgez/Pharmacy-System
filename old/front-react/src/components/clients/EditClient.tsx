import React from "react";
import { useAppDispatch } from "../../app/hooks";

import { modal } from "../../features/modalSlice";
import {
  useUpdateClientMutation
} from "../../services/medicines/medicines";
import Alert from "../Alert";
import { useForm } from 'react-hook-form';

const EditComponent = (props) => {
  const { item } = props;

const [updateClient, updateClientStatus] = useUpdateClientMutation();
const updateErrors = updateClientStatus?.error?.data?.errors
console.log(updateClientStatus?.error?.data?.errors);
console.log(updateClientStatus.error);


 const { register , handleSubmit, formState: { errors } , reset} = useForm();

 const formSubmit = (data) =>{
    const id = item.id
    const name= data.name
    const adress = data.address
    const city = data.city
    const mobile = data.mobile
    const phone = data.phone

  
  updateClient({id,name,adress,city,mobile,phone});
 }

  return (

    <form
    encType="application/json"
    onSubmit={handleSubmit(formSubmit)}
  
  >
  {updateClientStatus.isSuccess && (
        <Alert
          color={"success"}
          massage="Client updated done"
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
            placeholder="Enter Client Name"
            defaultValue={item.name}
            {...register('name', {required:'Name is required'})}
          />
          {errors?.name && (
                  <span className='text-danger'>{errors.name?.message}</span>
          ) }
          {updateClientStatus.isError && updateErrors.name && (
                  <span className='text-danger'>{updateErrors?.name[0]}</span>
          ) }
        </div>
        <div className="form-group">
          <label htmlFor="phone">phone</label>
          <input type="tel" name='phone' className="form-control" id="phone"
              placeholder="Enter Client Phone" defaultValue={item?.phone ?? ''}
              {...register('phone', {required:'Name is required'})}
          />
          {errors?.phone && (
                  <span className='text-danger'>{errors.phone?.message}</span>
          ) }
               {updateClientStatus.isError && updateErrors.phone && (
                  <span className='text-danger'>{updateErrors?.phone[0]}</span>
          ) }
      </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" className="form-control" name='city' id="city"
              placeholder="Enter Client City" defaultValue={item?.city ?? ''}
              {...register('city')}
              />
              {errors?.city && (
                <span className='text-danger'>{errors.city?.message}</span>
              ) }
                   {updateClientStatus.isError && updateErrors.city && (
                  <span className='text-danger'>{updateErrors?.city[0]}</span>
          ) }
            
      </div>
      <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" name='address' className="form-control" id="address"
              placeholder="Enter Client Address" defaultValue={item?.adress ?? ''} 
              {...register('address')}
              />
              {errors?.address && (
                 <span className='text-danger'>{errors.address?.message}</span>
              ) }
                   {updateClientStatus.isError && updateErrors.adress && (
                  <span className='text-danger'>{updateErrors?.adress[0]}</span>
          ) }
      </div>
      <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" name='mobile' className="form-control" id="mobile"
              placeholder="Enter Client Mobile" defaultValue={item?.mobile ?? ''}
              {...register('mobile')}
              />
              {errors?.mobile && updateErrors.mobile && (
                 <span className='text-danger'>{errors.mobile?.message}</span>
              ) }
                          {updateClientStatus.isError && (
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