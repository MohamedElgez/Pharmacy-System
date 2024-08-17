import { Link } from "react-router-dom";
import Content from "../../components/Content";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { addMedicineSlice } from "../../features/medicines/addMedicineSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  useGetAddMedicineQuery,
  useStoreMedicineMutation,
} from "../../services/medicines/medicines";
import { medicine } from "../../types/common";
import Alert from "../../components/Alert";
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';


const AddMedicine = () => {

  const addMedicines = useGetAddMedicineQuery();
  const data = addMedicines?.data?.data;

  
  const dispatch = useAppDispatch();
  let addMedicineValue = useAppSelector((state) => state.addMedicine.value);
  const [storeMedicine, storeMedicineStatus] = useStoreMedicineMutation();
  const { register , handleSubmit, formState: { errors } } = useForm();

 
  
  const addMedicineSubmit = (data) => {
  
    storeMedicine({ ...addMedicineValue });

  }
//  

 useEffect(()=>{

  dispatch(addMedicineSlice())

 }, [ storeMedicineStatus.isSuccess ])

  // storeMedicineStatus.isSuccess && dispatch(addMedicineSlice({}) )


  return (
    <>
  
      <div className="content-wrapper">
      <Content
          title="Add Medicine"
          list="List Medicines"
          listLink="AllMedicines"
        />
    
        <section className="content">
       
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/AllMedicines"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"List Medicines"}</span>
                  </Link>
                </h3>
              </div>
              <div className="card-body">
                {storeMedicineStatus.isSuccess && (
                   <Alert color={'success'} massage={storeMedicineStatus.data?.message}></Alert>
                )
                }
               
          
                {/* <MedicineForm dispatch= {dispatch} data = {data} ></MedicineForm> */}
                <form
                  encType="application/json"
                  onSubmit={handleSubmit(addMedicineSubmit)}
                
                  onChange={(e) => {
                    e.preventDefault();
                    const formDate = new FormData(e.currentTarget);
                    const name = formDate.get("name");
                    const code = formDate.get("code");
                    const price = formDate.get("price");
                    const unit_price = formDate.get("unit_price");
                    const quantity = formDate.get("quantity");
                    const category_id = formDate.get("category_id");
                    const unit_id = formDate.get("unit_id");
                    const type_id = formDate.get("type_id");
                    const supplier_id = formDate.get("supplier_id");
                    const expiration = formDate.get("expiration");
                    dispatch(
                      addMedicineSlice({
                        name,
                        type_id,
                        code,
                        price,
                        unit_price,
                        quantity,
                        category_id,
                        unit_id,
                        supplier_id,
                        expiration,
                      } as unknown as medicine)
                    );
                  }}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="Name">Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="Name"
                          name="name"
                          {...register("name", {required: 'name is required',
                     
                         minLength:{
                            value:3,
                            message:' Must be greater than 3 char'
                          },
                          maxLength:{
                            value:32,
                            message:' Must be less than 32 char'
                          }
                        })}
                        
                          placeholder="Enter Medicine Name"
                          value={addMedicineValue?.name ?? ''}
                        />
                          {errors.name && (
                            <span className='text-danger'>{errors.name?.message}</span>
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="Code">Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="Code"
                          name="code"
                          {...register("code", {required: 'Code is required',
                 
                          minLength:{
                            value:3,
                            message:' Must be greater than 3 char'
                          }})}
                          placeholder="Enter Medicine Code"
                          value={addMedicineValue?.code ?? ''}
                        />
                          {errors.name && (
                            <span className='text-danger'>{errors.code?.message}</span>
                          )}
                          {storeMedicineStatus.isError && storeMedicineStatus.error.data.errors.code && (
                             <span className='text-danger'>{storeMedicineStatus.error.data.errors.code[0]}</span>
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="Price">Price</label>
                        <input
                          type="number"
                          name="price"
                          className="form-control"
                          {...register("price", {required: 'price is required'})}
                          id="Price"
                          placeholder="Enter Medicine Price"
                          value={addMedicineValue?.price ?? ''}
                        />
                           {errors.price && (
                            <span className='text-danger'>{errors.price?.message}</span>
                          )}
                             {storeMedicineStatus.isError && storeMedicineStatus.error.data.errors.price && (
                             <span className='text-danger'>{storeMedicineStatus.error.data.errors.price[0]}</span>
                          )}
                   
                      </div>
                      <div className="form-group">
                        <label htmlFor="Unit Price">Unit Price</label>
                        <input
                          type="number"
                          name="unit_price"
                          className="form-control"
                          id="Unit Price"
                          {...register("unit_price", {required: 'Unit Price is required'})}
                          placeholder="Enter Medicine Unit Price"
                          value={addMedicineValue?.unit_price ?? ''}
                        />
                           {errors.unit_price && (
                            <span className='text-danger'>{errors.unit_price?.message}</span>
                          )}
                               {storeMedicineStatus.isError && storeMedicineStatus.error.data.errors.unit_price && (
                             <span className='text-danger'>{storeMedicineStatus.error.data.errors.unit_price[0]}</span>
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="Quantity">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          id="Quantity"
                          {...register("quantity", {required: 'Quantity is required'})}
                          placeholder="Enter Medicine Quantity"
                          name="quantity"
                          value={addMedicineValue?.quantity ?? ''}
                        />
                         {errors.quantity && (
                            <span className='text-danger'>{errors.quantity?.message}</span>
                          )}
                        {storeMedicineStatus.isError && storeMedicineStatus.error.data.errors.quantity && (
                             <span className='text-danger'>{storeMedicineStatus.error.data.errors.quantity[0]}</span>
                          )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      {/* <!-- supplier-category-type-unit-expiration --> */}
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          className="form-control select2"
                          name="category_id"
                          {...register("category_id", {required: 'Category is required'})}

                          value={addMedicineValue?.category_id ?? ''}
                        >
                            <option></option>
                          {data &&
                            data.categories.map((category, index) => (
                              <option key={index} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <span className='text-danger'>{errors.category_id?.message}</span>
                          )}
                               {storeMedicineStatus.isError && storeMedicineStatus.error.data.errors.category_id && (
                             <span className='text-danger'>{storeMedicineStatus.error.data.errors.category_id[0]}</span>
                          )}
                      </div>
                      <div className="form-group">
                        <label>Unit</label>
                        <select
                          className="form-control select2"
                          name="unit_id"
                          {...register("unit_id", {required: 'Unit is required'})}
                          value={addMedicineValue?.unit_id ?? ''}
                        >
                            <option></option>
                          {data &&
                            data.units.map((unit, index) => (
                              <option key={index} value={unit.id}>
                                {unit.name}
                              </option>
                            ))}
                        </select>
                        {errors.unit_id && (
                            <span className='text-danger'>{errors.unit_id?.message}</span>
                          )}
                                {storeMedicineStatus.isError && storeMedicineStatus.error.data.errors.unit_id && (
                             <span className='text-danger'>{storeMedicineStatus.error.data.errors.unit_id[0]}</span>
                          )}
                      </div>
                      <div className="form-group">
                        <label>Type</label>
                        <select
                          className="form-control select2"
                          name="type_id"
                          {...register("type_id", {required: 'Type is required'})}
                          value={addMedicineValue?.type_id ?? ''}
                        >
                            <option></option>
                          {data &&
                            data.types.map((type, index) => (
                              <option key={index} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                        </select>
                        {errors.type_id && (
                            <span className='text-danger'>{errors.type_id?.message}</span>
                          )}
                                  {storeMedicineStatus.isError && storeMedicineStatus.error.data.errors.type_id && (
                             <span className='text-danger'>{storeMedicineStatus.error.data.errors.type_id[0]}</span>
                          )}
                      </div>
                      <div className="form-group">
                        <label>Supplier</label>
                        <select
                          className="form-control select2"
                          name="supplier_id"
                          {...register("supplier_id", {required: 'Supplier is required'})}
                          value={addMedicineValue?.supplier_id ?? ''}
                        >
                          <option></option>
                        {data &&
                            data.suppliers.map((supplier, index) => (
                              <option key={index} value={supplier.id}>
                                {supplier.name}
                              </option>
                            ))}
                        </select>
                        {errors.supplier_id && (
                            <span className='text-danger'>{errors.supplier_id?.message}</span>
                          )}
                      {storeMedicineStatus.isError && storeMedicineStatus.error.data.errors.supplier_id && (
                             <span className='text-danger'>{storeMedicineStatus.error.data.errors.supplier_id[0]}</span>
                          )}
                      </div>
                      <div className="form-group">
                        <label>Expiration Date:</label>
                        <div className="input-group">
                          <input
                            type="date"
                            name="expiration"
                            {...register("expiration", {required: 'Expiration is required'})}
                            className="form-control  float-right"
                            id="reservation"
                            value={addMedicineValue?.expiration ?? ''}
                          />
                     
                        </div>
                        {errors.expiration && (
                            <span className='text-danger'>{errors.expiration?.message}</span>
                          )}
                           {storeMedicineStatus.isError && storeMedicineStatus.error.data.errors.expiration && (
                             <span className='text-danger'>{storeMedicineStatus.error.data.errors.expiration[0]}</span>
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

export default AddMedicine;
