import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Content from "../../components/Content";
import { useForm } from "react-hook-form";

import { returnSaleSlice } from "../../features/sales/returnSaleSlice";
import { returnItemsSaleSlice } from "../../features/sales/returnItemsSaleSlice";
import { returnSaleItemSlice } from "../../features/sales/returnSaleItemSlice";

import {useStoreReturnSaleMutation, useAddReturnSaleQuery } from "../../services/medicines/medicines";

import Alert from '../../components/Alert';
import { AddItemForm } from "../../components/AddItemForm";


const AddReturnSale = () => {

  const dispatch = useAppDispatch();

  const addSaleItem = useAppSelector( (state) => state.returnSaleItem.item);
  
  const addSaleInvoice = useAppSelector((state) => state.returnSale.invoiceInfo);
  
  const salesItems = useAppSelector((state) => state.returnItemsSale.items);

  const AddReturnSale  = useAddReturnSaleQuery();

  const salesInvoice = AddReturnSale?.data?.purchas_data

  
  const [storeReturnSale, storeSaleReturnStatus] = useStoreReturnSaleMutation();

  const [itemsSearch, SetItemSearh] = useState([])

  const [itemAction,setItemAction] = useState([{action: 'Add' , index: ''}]); 


const { register , handleSubmit, formState: { errors } } = useForm();
const AddSaleSubmit = (data) => {storeReturnSale([{...addSaleInvoice, salesItems }])}

const [client, setClient] = useState()

useEffect(()=>{

  salesInvoice && salesInvoice.filter((item)=>{
    if(item.code == addSaleInvoice.code){

      console.log(item);
      
   dispatch(returnItemsSaleSlice(item.items_invoice))


      setClient(item.client)

    }else{
     // dispatch(returnItemsSaleSlice())
     // setClient()

    } 
        })

}, [addSaleInvoice?.code])

console.log(addSaleInvoice);


const itemCode = (e) => {

    const value = e.target.value;
    const items = getAddSale.data.items
    const regex = new RegExp(/^(A-Za-z)+$/i);
    let arr = []
    items.filter((item)=>{

     item.name.match(value) ?  arr.push(item) : arr = []
})
    SetItemSearh(arr)
  }
  
const invoiceTotal = ()=>{
let total = 0;
salesItems && salesItems.map((item)=>{
        Number(item.total) ? 
        total =  +total + +item.total :''
    })
    return +total
  };

//storeSaleStatus.isSuccess && dispatch(addSaleSlice())

  return (  
    <div className="content-wrapper">
      <Content title="Add Return Sale" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">
                <Link to={"/AllReturnSales"}>
                  <i className="fa fa-bars"></i>
                  <span className="ms-2">{"List ReturnSales"}</span>
                </Link>
              </h3>
            </div>
            <div className="card-body">
            {storeSaleReturnStatus.isSuccess && (
                   <Alert color={'success'} massage={'Sale insert done'}></Alert>
                )
                }
              <form 
                onSubmit={handleSubmit(AddSaleSubmit)}

                onChange={(e)=>{
                    const formDate = new FormData(e.currentTarget);
                    const code = formDate.get('invoice');
                    const Date = formDate.get('date');
                    const details = formDate.get('details');
                    const client_id = formDate.get('client');
                    const payment_type = formDate.get('payment_type');
                    const total = formDate.get('totalPrice');
                    const paid = formDate.get('paid');
                    const remaind = +total - +paid;
                    const user_id = 1;

                    dispatch(returnSaleSlice({
                            code,
                            Date,
                            details,
                            client_id ,
                            payment_type,
                            total,
                            paid,
                            remaind,
                            user_id,
                    }))

                }}
              >
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="sale">Invoice No</label>
                        <select
                          type="number"
                          name="invoice"
                          className="form-control"
                          id="sale"
                          {...register("invoice", {required:'Invoice.No is required'
                        }
                          )}
                          value={addSaleInvoice?.code}
                      
                        >
                        {AddReturnSale.isSuccess && salesInvoice?.map((ele, index)=>(
                               <option value={ele.code} key={index}  >{ele.code}
                               </option>


                          )) }
                        </select>
                          {errors.invoice && (
                            <span className='text-danger'>{errors.invoice?.message}</span>
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="Date">Date</label>
                        <input
                          type="date"
                          name="date"
                          {...register('date', {required: 'Date is required'})} 
                          value={addSaleInvoice?.date}
                          className="form-control"
                          id="Date"
                          placeholder="Enter Date"
                        />
                        {errors.date && (
                            <span className='text-danger'>{errors.date?.message}</span>
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="Details">Details</label>
                        <textarea
                          name="details"
                          id="Details"
                          value={addSaleInvoice?.details}
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Payment Type</label>
                        <select className="form-control" name='payment_type'  value={addSaleInvoice?.payment_type}>
                          <option value='0'>Cash</option>
                          <option value='1'>Visa</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Client</label>
                 
                        <select className="form-control select2" name="client" value={client?.id?? ''}
                                  //  {...register('code',  {required:'Code is required'})} 
                        >
                                <option></option>
                                <option value={client?.id ?? ''} selected={client?.id && 'selected'} >{client?.name ?? ''}</option>
                          </select>

                        {errors.client && (
                            <span className='text-danger'>{errors.client?.message}</span>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row form-group">
                        <label htmlFor="totalPrice" className="col-sm-4">
                          Total Price
                        </label>
                        <div className="col-sm-4">

                          <input
                            type="number"
                            name="totalPrice"
                            readOnly={true}
                            {...register('totalPrice', {required: 'Total Price is required'})} 
                            value={invoiceTotal()}
                            className="form-control"
                           
                            id="totalPrice"
                          />
                        {errors.totalPrice && (
                            <span className='text-danger'>{errors.totalPrice?.message}</span>
                          )}
                       
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4"></div>
                 
                  </div>
                  <div className="row">
                    <div className="col-md-6">  
                      <div className="row form-group"> 
                        <label htmlFor="Vat" className="col-sm-4">
                          Vat
                        </label>
                        <div className="col-sm-4">
                          <input
                            type="number"

                            {...register('vat')} 
                            className="form-control"
                            id="Vat"
                          />
                          {errors.vat && (
                            <span className='text-danger'>{errors.vat?.message}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
              
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row form-group">
                        <label htmlFor="paid" className="col-sm-4">
                          Paid Amount
                        </label>
                        <div className="col-sm-4">
                          <input
                            type="number"
                            name='paid'
                            className="form-control"
                            id="paid"
                            value= {addSaleInvoice?.paid}

                            {...register('paid')} 
                            defaultValue='0'
                          />
                            {+addSaleInvoice.paid > +addSaleInvoice.total && (
                            <span className='text-danger'>Paid Can not be greate than Total</span>
                          )}
                          {errors.paid && (
                            <span className='text-danger'>{errors.paid?.message}</span>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row form-group">
                        <label htmlFor="due" className="col-sm-4">
                        Remaind
                        </label>
                        <div className="col-sm-4">
                          <input
                            type="number"
                            defaultValue={0}
                           
                            value={addSaleInvoice.remaind > 0 || addSaleInvoice.paid > 0  ? addSaleInvoice.remaind : 0}
                            {...register('remaind',  {pattern:{
                              value: /^[0-9]+$/i,
                              message: 'Must be Number'
                            }})} 
                           
                            readOnly={true}
                            name='remaind'
                            className="form-control"
                            id="due"
                          />
                   
                         {+addSaleInvoice.paid > +addSaleInvoice.total || addSaleInvoice.paid < 0 && (
                            <span className='text-danger'>Some Thing is Wrong</span>
                          )}
                          {errors.remaind && (
                            <span className='text-danger'>{errors.remaind?.message}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
                  <div className="row">
                            {/* <AddItemForm addSaleItem={addSaleItem} itemsSaleSlice={itemsSaleSlice} addSaleItemSlice={addSaleItemSlice} /> */}
                  <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch(returnItemsSaleSlice({ addSaleItem }));
                            }}
                            onChange={(e) => {
                                const formDate = new FormData(e.currentTarget);
                                const item_id = formDate.get("code");
                                const price = formDate.get("price");
                                const quantity = formDate.get("quantity");
                                const expire_date	 = formDate.get("expireDate");
                                const discount = formDate.get("discount");
                                let total = formDate.get("total");

                               discount > 1 ? total = (price - (price/discount))*quantity 
                                    : total = price*quantity

                                dispatch(
                                  returnSaleItemSlice({
                                    item_id,
                                    price,
                                    quantity,
                                    expire_date,
                                    discount,
                                    total,
                                 
                                })
                                );
                            }}
                            >   
                      <table className="table">
                        <thead>
                          <tr>
                          <th>No</th>
                            <th>Medicine Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Expire Date</th>
                            <th>Discount %</th>
                            <th>total</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody id="table-inputs">
                        <tr>
                            <td>-</td>
                       <td>
                              {/* <input
                                type="text"
                                className="form-control"
                                name="code"
                                id=""
                                
                                placeholder=""
                                onChange={itemCode}
                              /> */}
                                <select className="form-control select2" name="code" value={addSaleItem?.item_id ?? ''}
                                  //  {...register('code',  {required:'Code is required'})} 
                                >
                                <option></option>
                                  {AddReturnSale.isSuccess && AddReturnSale.data.items.map((ele, index)=>(
                                      <option value={ele.id} key={index}>{ele.name}</option>
                                  ))}

                              </select>
                              {errors.code && (
                            <span className='text-danger'>{errors.code?.message}</span>
                          )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="price"
                                id=""
                                placeholder=""
                                value={addSaleItem?.price ?? ''}
                              //   {...register('supplierPrice',  {required:'Supplier Price is required', 
                              //   pattern:{
                              //     value: /^[0-9]+$/i,
                              //     message: 'Must be Number'
                              //   }
                                
                              // })} 
                              />
                            {errors.price && (
                            <span className='text-danger'>{errors.price?.message}</span>
                          )}
                            </td>
                       
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="quantity"
                                id=""
                              //   {...register('quantity',  {required:'Quantity is required', 
                              //   pattern:{
                              //     value: /^[0-9]+$/i,
                              //     message: 'Must be Number'
                              //   }
                                
                              // })} 
                                value={addSaleItem?.quantity ?? ''}
                                placeholder=""
                              />
                            {errors.quantity && (
                            <span className='text-danger'>{errors.quantity?.message}</span>
                          )}
                            </td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                name="expireDate"
                                id=""
                              //   {...register('expireDate',  {required:'ExpireDate is required', 
                              //   pattern:{
                              //     value: /^[0-9]+$/i,
                              //     message: 'Must be Number'
                              //   }
        
                              // })} 
                                value={addSaleItem?.expire_date ?? ''}
                                placeholder=""
                              />
                            {errors.expireDate && (
                            <span className='text-danger'>{errors.expireDate?.message}</span>
                            )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="discount"
                                id=""
                       
                                value={addSaleItem?.discount ?? ''}
                                placeholder=""
                              />
                            {errors.discount && (
                            <span className='text-danger'>{errors.discount?.message}</span>
                            )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="total"
                                id=""
                                // {...register('total',  {
                                //   pattern:{
                                //     value: /^[0-9]+$/i,
                                //     message: 'Must be Number'
                                //   }
        
                                // })} 
                                readOnly={true}
                                value={addSaleItem?.total ?? ''}
                                placeholder=""
                              />
                          {errors.total && (
                            <span className='text-danger'>{errors.total?.message}</span>
                            )}
                            </td>
                            <td>
                            {itemAction[0].action == 'Add' && (
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={(e) => {
                                  e.preventDefault();

                                  dispatch(
                                    returnItemsSaleSlice([
                                      {
                                        ...addSaleItem,
                                      },
                                      ...salesItems,
                                    ])
                                  );

                                  dispatch(returnSaleItemSlice())
                                }}
                              >
                                
                                {itemAction[0].action}
                              </button>
                            )}
                            {itemAction[0].action == 'Edit' && (
                              <>
                                   <button
                                   type="submit"
                                   className="btn btn-success"

                                   onClick={(e) => {
                                     e.preventDefault();
                                        let editArr = [...salesItems];
                                        editArr[itemAction[0].index] = {...addSaleItem}

                                     dispatch(returnItemsSaleSlice(editArr));      
                                     dispatch(returnSaleItemSlice({}))
                                     setItemAction([{action:'Add', index:''}])
                                   }}
                                 >
                                   
                                   {itemAction[0].action}
                                 </button>

                                 <button 
                                 type="submit"
                                 className="btn btn-danger"
                                 
                                 onClick={()=>{
                                
                                  dispatch(returnSaleItemSlice({}))
                                  setItemAction([{action:'Add', index:''}])
                                 }}
                                 
                                 >x</button>
                                </>
                            )}
                           
                            </td>
                          </tr>
                            <br></br>
                          {salesItems && salesItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td> {item.item_id}</td>
                                            <td> {item.price}</td>
                                            <td> {item.quantity}</td>
                                            <td> {item.expire_date}</td>
                                            <td> {item.discount}</td>
                                            <td> {item.total}</td>
                                            <td className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="btn btn-warning"
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(returnSaleItemSlice({
                                    ...item
                                }))
                                setItemAction([{action:'Edit', index}])
                            
                              }}
                            >
                              <i className="fa fa-pen text-danger nav-icon"
                                    aria-hidden="true"></i>
                            </button>


                            <button
                              type="submit"
                              className="btn btn-danger"
                              onClick={(e) => {
                                e.preventDefault();
                                let arr = [...salesItems];
                                arr.splice(index,1);
                                dispatch(returnItemsSaleSlice(arr))
                              }}
                            >
                              <i className="fa fa-trash text-warning nav-icon"
                                                                aria-hidden="true">
                              </i>
                            </button>
                          </td>
                        </tr>
                        
                             ))}
                        </tbody>
                      </table>
                      </form>
               
                  </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddReturnSale;
