import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Content from "../../components/Content";
import { useForm } from "react-hook-form";
import { addSaleSlice } from "../../features/sales/addSaleSlice";
import { itemsSaleSlice } from "../../features/sales/itemsSaleSlice";
import { addSaleItemSlice } from "../../features/sales/addSaleItemSlice";

import {useStoreSaleMutation, useAddSaleQuery } from "../../services/medicines/medicines";

import Alert from '../../components/Alert';
import { AddItemForm } from "../../components/AddItemForm";

const AddSale = () => {

  const dispatch = useAppDispatch();

  const addSaleItem = useAppSelector( (state) => state.addSaleItem.item);
  
  const addSaleInvoice = useAppSelector((state) => state.addSale.invoiceInfo);
  
  const saleItems = useAppSelector((state) => state.itemsSale.items);

  const getAddSale  = useAddSaleQuery();

  
  const [storeSale, storeSaleStatus] = useStoreSaleMutation();

  const [itemsSearch, SetItemSearh] = useState([])

  const [itemAction,setItemAction] = useState([{action: 'Add' , index: ''}]); 


const { register , handleSubmit, formState: { errors } } = useForm();

const AddSaleSubmit = (data) => {storeSale([{...addSaleInvoice,'salesItems':saleItems }])}



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
saleItems && saleItems.map((item)=>{
        Number(item?.total) ? 
        total =  +total + +item.total :''
    })
    return +total
  };
const selectItemData = () =>{
  let itemData = {'price':'', 'name':''};
  getAddSale?.data?.items?.filter((item)=> {
    if(item.id == addSaleItem?.item_id)
    {
      itemData.price = item.price;
      itemData.name = item.name;
    }
  
})

  return itemData
}
  
  const invoiceRemaind = ()=>{
    let remaind = 0;
    remaind =  addSaleInvoice?.paid ? invoiceTotal() -  addSaleInvoice?.paid : invoiceTotal()
    invoiceTotal
        return +remaind
      };
      
      
storeSaleStatus.isSuccess && dispatch(addSaleSlice()) 
storeSaleStatus.isSuccess && dispatch(itemsSaleSlice())

  return (  
    <div className="content-wrapper">
      <Content title="Add Sale" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">
                <Link to={"/AllSales"}>
                  <i className="fa fa-bars"></i>
                  <span className="ms-2">{"List Sales"}</span>
                </Link>
              </h3>
            </div>
            <div className="card-body">
            {storeSaleStatus.isSuccess && (
                   <Alert color={'success'} massage={'Sale insert done'}></Alert>
                )
                }

                  <div className="row ">
                            {/* <AddItemForm addSaleItem={addSaleItem} itemsSaleSlice={itemsSaleSlice} addSaleItemSlice={addSaleItemSlice} /> */}
                  <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch(itemsSaleSlice({ addSaleItem }));
                            }}
                            onChange={(e) => {
                                const formDate = new FormData(e.currentTarget);
                                const item_id = formDate.get("code");
                                const price =  selectItemData()?.price
                                const itemName = selectItemData()?.name

                                const quantity = formDate.get("quantity");
                                const discount = formDate.get("discount");
                                let total = formDate.get("total");

                               discount > 1 ? total = (price - (price/discount))*quantity 
                                    : total = price*quantity

                                
                                dispatch(
                                  addSaleItemSlice({
                                    item_id,
                                    itemName,
                                    price,
                                    quantity,
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
                                  {getAddSale.isSuccess && getAddSale?.data?.items?.map((ele, index)=>(
                                      <option value={ele?.id} key={index}>{ele?.name}</option>
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
                                value={selectItemData()?.price}
                              //   {...register('supplierPrice',  {required:'Supplier Price is required', 
                              //   pattern:{
                              //     value: /^[0-9]+$/i,
                              //     message: 'Must be Number'
                              //   }
                                
                              // })} 
                              />
                            {errors.Price && (
                            <span className='text-danger'>{errors.Price?.message}</span>
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
                                    itemsSaleSlice([
                                      {
                                        ...addSaleItem,
                                      },
                                      ...saleItems,
                                    ])
                                  );

                                  dispatch(addSaleItemSlice({}))
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
                                        let editArr = [...saleItems];
                                        editArr[itemAction[0].index] = {...addSaleItem}

                                     dispatch(itemsSaleSlice(editArr));      
                                     dispatch(addSaleItemSlice())
                                     setItemAction([{action:'Add', index:''}])
                                   }}
                                 >
                                   
                                   {itemAction[0].action}
                                 </button>

                                 <button 
                                 type="submit"
                                 className="btn btn-danger"
                                 
                                 onClick={()=>{
                                
                                  dispatch(addSaleItemSlice())
                                  setItemAction([{action:'Add', index:''}])
                                 }}
                                 
                                 >x</button>
                                </>
                            )}
                           
                            </td>
                          </tr>
                            <br></br>
                          {saleItems && saleItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td> {item?.itemName}</td>
                                            <td> {item?.price}</td>
                                            <td> {item?.quantity}</td>
                                          
                                            <td> {item?.discount}</td>
                                            <td> {item?.total}</td>
                                         
                    <td className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="btn btn-warning"
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(addSaleItemSlice({
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
                                let arr = [...saleItems];
                                arr.splice(index,1);
                                dispatch(itemsSaleSlice(arr))
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
                    const remaind =  +total - +paid ;
                    const user_id = 1;

                    dispatch(addSaleSlice({
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
                        <input
                          type="number"
                          name="invoice"
                          className="form-control"
                          id="sale"
                          {...register("invoice", {required:'Invoice.No is required', pattern:{
                            value: /^[0-9]+$/i,
                            message:'Must be Number'
                          }
                        }
                          )}
                          value={addSaleInvoice?.code}
                          placeholder="Enter Invoice number"
                        />
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
                        <select className="form-control select2" name="client"  value={addSaleInvoice?.Client_id}
                        
                        {...register('client', {required: 'client is required'})} 
                        >
                        
                          {getAddSale.isSuccess && getAddSale.data.client.map((ele, index)=>(
                               <option value={ele.id} key={index}>{ele.name}</option>
                          )) }
                        
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
                            {...register('totalPrice', {required: 'Total Price is required', pattern:{
                              value: /^[0-9]+$/i,
                              message: 'Must be Number'
                            }})} 
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

                            {...register('vat', {pattern:{
                              value: /^[0-9]+$/i,
                              message: 'Must be Number'
                            }})} 
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

                            {...register('paid',  {pattern:{ value: /^[0-9]+$/i,
                                message: 'Must be Number'
                              }
                            },)} 
                            defaultValue='0'
                          />
                            {+addSaleInvoice?.paid > +addSaleInvoice?.total && (
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
                   
                           
                            value={addSaleInvoice?.paid < 0  || addSaleInvoice?.paid > addSaleInvoice?.total ?  0 : invoiceRemaind()}
                            {...register('remaind',  {pattern:{
                              value: /^[0-9]+$/i,
                              message: 'Must be Number'
                            }})} 
                           
                            readOnly={true}
                            name='remaind'
                            className="form-control"
                            id="due"
                          />
                   
                         {+addSaleInvoice?.paid > +addSaleInvoice?.total || addSaleInvoice?.paid < 0 && (
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
                 
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddSale;
