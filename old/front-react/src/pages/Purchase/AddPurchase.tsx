import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Content from "../../components/Content";
import { useForm } from "react-hook-form";
import { addPurchaseSlice } from "../../features/purchases/addPurchaseSlice";
import { itemsPurchaseSlice } from "../../features/purchases/itemsPurchaseSlice";
import { addPurchasItemSlice } from "../../features/purchases/addPurchasItemSlice";

import {useStorepurchasMutation, useGetAddPurchasQuery } from "../../services/medicines/medicines";

import Alert from '../../components/Alert';
import { AddItemForm } from "../../components/AddItemForm";



 const AddPurchase = () => {

  const dispatch = useAppDispatch();

  const addPurchasItem = useAppSelector( (state) => state.addPurchasItem.item);
  
  const addPurchaseInvoice = useAppSelector((state) => state.addPurchase.invoiceInfo);
  
  const purchaseItems = useAppSelector((state) => state.itemsPurchase.items);

  const getAddPurchas  = useGetAddPurchasQuery();
  

  const [storePurchase, storePurchaseStatus] = useStorepurchasMutation();

 const storePurchaseErrors = storePurchaseStatus.error?.data;

  const [itemsSearch, SetItemSearh] = useState([])

  const [itemAction,setItemAction] = useState([{action: 'Add' , index: ''}]); 

 
const { register , handleSubmit, formState: { errors } } = useForm();
const AddPurchasSubmit = (data) => {storePurchase([{...addPurchaseInvoice, purchaseItems }])}

const itemCode = (e) => {

    const value = e.target.value;
    const items = getAddPurchas.data.items
    const regex = new RegExp(/^(A-Za-z)+$/i);
    let arr = []
    items.filter((item)=>{

     item.name.match(value) ?  arr.push(item) : arr = []
})
    SetItemSearh(arr)
  }
 
  
const invoiceTotal = ()=>{
let total = 0;
purchaseItems && purchaseItems.map((item)=>{
        Number(item?.total) ? 
        total =  +total + +item.total :''
    })
    return +total
  };

 const invoiceRemaind = ()=>{
    let remaind = 0;
    remaind =  addPurchaseInvoice?.paid ? invoiceTotal() -  addPurchaseInvoice?.paid : invoiceTotal()
        return +remaind
      };
      
     const [itemsErrors , setItemErrors] = useState([])

const selectItemData = () =>{
      let itemData = {'price':'', 'name':''};
      getAddPurchas?.data?.items?.filter((item)=> {
        if(item.id == addPurchasItem?.item_id)
        {
          itemData.price = item.price
          itemData.name = item.name
        }
    })
    
      return itemData
    }
// const validation = (props) => {
    
//     const { item_id , suplier_price ,sell_price, quantity, expire_date, total  } = props
//     let errors = [];
//     !item_id ||  item_id == '' ? errors['item_id'] = 'Code is Required' : ''
//     !suplier_price || suplier_price == '' ? errors['supplier_Price'] = 'supplier Price is Required' :''
//     !sell_price ||sell_price == '' ? errors['sell_Price'] = 'sell Price is Required' : ''
//     !quantity || quantity == '' ? errors['quantity'] = 'Quantity is Required':''
//     !expire_date ||  expire_date == '' ? errors['expire_date'] = 'Expire date is Required' :''
//     !total || total == '' ? errors['total'] = 'Total is Required' : ''

//     setItemErrors(errors)

//     return errors.length == 0;

// }
useEffect(()=>{
  addPurchaseSlice
  dispatch(addPurchaseSlice())
  dispatch(addPurchasItemSlice())
  dispatch(itemsPurchaseSlice())
}, [ storePurchaseStatus.isSuccess ])

  return (  
    <div className="content-wrapper">
      <Content title="Add Purchase" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">
                <Link to={"/AllPurchases"}>
                  <i className="fa fa-bars"></i>
                  <span className="ms-2">{"List Purchases"}</span>
                </Link>
              </h3>
            </div>
            <div className="card-body">
            {storePurchaseStatus.isSuccess && (
                   <Alert color={'success'} massage={'Purchas insert done'}></Alert>
                )
                }
              <form 
                onSubmit={handleSubmit(AddPurchasSubmit)}

                onChange={(e)=>{
                    const formDate = new FormData(e.currentTarget);
                    const code = formDate.get('invoice');
                    const Date = formDate.get('date');
                    const details = formDate.get('details');
                    const supplier_id = formDate.get('supplier');
                    const payment_type = formDate.get('payment_type');
                    const total = formDate.get('totalPrice');
                    const paid = formDate.get('paid');
                    const remaind = +total - +paid;
                    const user_id = 1;

                    dispatch(addPurchaseSlice({
                            code,
                            Date,
                            details,
                            supplier_id ,
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
                        <label htmlFor="purchase">Invoice No</label>
                        <input
                          type="number"
                          name="invoice"
                          className="form-control"
                          id="purchase"
                          {...register("invoice", {required:'Invoice.No is required', pattern:{
                            value: /^[0-9]+$/i,
                            message:'Must be Number'
                          }
                        }
                          )}
                          value={addPurchaseInvoice?.code ?? ''}
                          placeholder="Enter Invoice number"
                        />
                       
                          {errors.invoice && (
                            <span className='text-danger'>{errors.invoice?.message}</span>
                          )}
                          {storePurchaseStatus.isError &&  storePurchaseErrors.code && (
                            <span className='text-danger'>{storePurchaseErrors.code[0]}</span>
                          )}
                  
                      </div>
                      <div className="form-group">
                        <label htmlFor="Date">Date</label>
                        <input
                          type="date"
                          name="date"
                          {...register('date', {required: 'Date is required'})} 
                          value={addPurchaseInvoice?.Date ?? ''}
                          className="form-control"
                          id="Date"
                          placeholder="Enter Date"
                        />
                        {errors.date && (
                            <span className='text-danger'>{errors.date?.message}</span>
                          )}
                            {storePurchaseStatus.isError &&  storePurchaseErrors.Date && (
                            <span className='text-danger'>{storePurchaseErrors.Date[0]}</span>
                          )}
                       
                      </div>
                      <div className="form-group">
                        <label htmlFor="Details">Details</label>
                        <textarea
                          name="details"
                          id="Details"
                          value={addPurchaseInvoice?.details ?? ''}
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Payment Type</label>
                        <select className="form-control" name='payment_type'  value={addPurchaseInvoice?.payment_type ?? ''}>
                          <option value='0'>Cash</option>
                          <option value='1'>Visa</option>
                        </select>
                        {storePurchaseStatus.isError &&  storePurchaseErrors.payment_type && (
                            <span className='text-danger'>{storePurchaseErrors?.payment_type[0]}</span>
                          )}
                      </div>
                      <div className="form-group">
                        <label>Supplier</label>
                        <select className="form-control select2" name="supplier"  value={addPurchaseInvoice?.supplier_id ?? ''}
                        
                        {...register('supplier', {required: 'Supplier is required'})} 
                        >
                          <option></option>
                          {getAddPurchas.isSuccess && getAddPurchas.data.supplier.map((ele, index)=>(
                               <option value={ele.id} key={index}>{ele.name}</option>
                          )) }
                        
                        </select>
                        {storePurchaseStatus.isError &&  storePurchaseErrors.supplier_id && (
                            <span className='text-danger'>{storePurchaseErrors.supplier_id[0]}</span>
                          )}
                        {errors.supplier && (
                            <span className='text-danger'>{errors.supplier?.message}</span>
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
                            value={invoiceTotal() ?? ''}
                            className="form-control"
                           
                            id="totalPrice"
                          />
                        {storePurchaseStatus.total &&  storePurchaseErrors.total && (
                            <span className='text-danger'>{storePurchaseErrors.total[0]}</span>
                          )}  
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
                            value= {addPurchaseInvoice?.paid ?? 0}

                            {...register('paid',  {pattern:{ value: /^[0-9]+$/i,
                                message: 'Must be Number'
                              }
                            },)} 
                            defaultValue='0'
                          />
                            {+addPurchaseInvoice?.paid > +addPurchaseInvoice?.total && (
                            <span className='text-danger'>Paid Can not be greate than Total</span>
                          )}
                          {errors.paid && (
                            <span className='text-danger'>{errors.paid?.message}</span>
                          )}
                        {storePurchaseStatus?.paid &&  storePurchaseErrors?.paid && (
                            <span className='text-danger'>{storePurchaseErrors?.paid[0]}</span>
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
                            value={addPurchaseInvoice?.paid < 0  || addPurchaseInvoice?.paid > addPurchaseInvoice?.total ?  0 : invoiceRemaind()}

                            {...register('remaind',  {pattern:{
                              value: /^[0-9]+$/i,
                              message: 'Must be Number'
                            }})} 
                           
                            readOnly={true}
                            name='remaind'
                            className="form-control"
                            id="due"
                          />
                         {+addPurchaseInvoice?.paid > +addPurchaseInvoice?.total || addPurchaseInvoice?.paid < 0 && (
                            <span className='text-danger'>Some Thing is Wrong</span>
                          )}
                          {errors.remaind && (
                            <span className='text-danger'>{errors.remaind?.message}</span>
                          )}
                             {storePurchaseStatus.remaind &&  storePurchaseErrors.remaind && (
                            <span className='text-danger'>{storePurchaseErrors.remaind[0]}</span>
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
                            {/* <AddItemForm addPurchaseItem={addPurchaseItem} itemsPurchaseSlice={itemsPurchaseSlice} addPurchasItemSlice={addPurchasItemSlice} /> */}
                  <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch(itemsPurchaseSlice({ addPurchaseItem }));
                            }}
                            onChange={(e) => {
                                const formDate = new FormData(e.currentTarget);
                                const item_id = formDate.get("code");
                                const itemName = selectItemData().name
                                const suplier_price = formDate.get("supplierPrice");
                                const sell_price = formDate.get("sellPrice");
                                const quantity = formDate.get("quantity");
                                const expire_date	 = formDate.get("expireDate");
                                const discount = formDate.get("discount");
                                let total = formDate.get("total");
                                   total = suplier_price*quantity

                                    
                                dispatch(
                                  addPurchasItemSlice({
                                    item_id,
                                    itemName ,
                                    suplier_price,
                                    sell_price,
                                    quantity,
                                    expire_date,
                                    discount,
                                    total,
                                 
                                })
                                );

                                // validation({       
                                //   item_id,
                                //   suplier_price,
                                //   sell_price,
                                //   quantity,
                                //   expire_date,
                                //   discount,
                                //   total,})
                            }}
                            >   
                      <table className="table">
                        <thead>
                          <tr>
                          <th>No</th>
                            <th>Medicine Name</th>
                            <th>Supplier Price</th>
                            <th>sell Price</th>
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
                                <select className="form-control select2" name="code" value={addPurchasItem?.item_id ?? ''}
                                  //  {...register('code',  {required:'Code is required'})} 
                                >
                                <option></option>
                                  {getAddPurchas.isSuccess && getAddPurchas.data.items.map((ele, index)=>(
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
                                name="supplierPrice"
                                id=""
                                placeholder=""
                                value={addPurchasItem?.suplier_price ?? ''}
                              //   {...register('supplierPrice',  {required:'Supplier Price is required', 
                              //   pattern:{
                              //     value: /^[0-9]+$/i,
                              //     message: 'Must be Number'
                              //   }
                                
                              // })} 
                              />
                            {errors.supplierPrice && (
                            <span className='text-danger'>{errors.supplierPrice?.message}</span>
                          )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="sellPrice"
                                id=""
                                placeholder=""
                              //   {...register('sellPrice',  {required:'Sell Price is required', 
                              //   pattern:{
                              //     value: /^[0-9]+$/i,
                              //     message: 'Must be Number'
                              //   }
                                
                              // })} 
                                value={addPurchasItem?.sell_price ?? ''}
                              />
                          {errors.sellPrice && (
                            <span className='text-danger'>{errors.sellPrice?.message}</span>
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
                                value={addPurchasItem?.quantity ?? ''}
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
                                value={addPurchasItem?.expire_date ?? ''}
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
                       
                                value={addPurchasItem?.discount ?? ''}
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
                                value={addPurchasItem?.total ?? ''}
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

                                disabled={itemsErrors.length && true }
                             
                                className="btn btn-primary"
                                onClick={(e) => {
                                  e.preventDefault();

                                  dispatch(
                                    itemsPurchaseSlice([
                                      {
                                        ...addPurchasItem,
                                      },
                                     ...purchaseItems ?? ''
                                    ])
                                  );

                                  dispatch(addPurchasItemSlice())
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
                                        let editArr = [...purchaseItems];
                                        editArr[itemAction[0].index] = {...addPurchasItem}

                                     dispatch(itemsPurchaseSlice(editArr));      
                                     dispatch(addPurchasItemSlice())
                                     setItemAction([{action:'Add', index:''}])
                                   }}
                                 >
                                   
                                   {itemAction[0].action}
                                 </button>

                                 <button 
                                 type="submit"
                                 className="btn btn-danger"
                                 
                                 onClick={()=>{
                                
                                  dispatch(addPurchasItemSlice())
                                  setItemAction([{action:'Add', index:''}])
                                 }}
                                 
                                 >x</button>
                                </>
                            )}
                           
                            </td>
                          </tr>
                            <br></br>
                          {purchaseItems && purchaseItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td> {item?.itemName}</td>
                                            <td> {item?.suplier_price}</td>
                                            <td> {item?.sell_price}</td>
                                            <td> {item?.quantity}</td>
                                            <td> {item?.expire_date}</td>
                                            <td> {item?.discount}</td>
                                            <td> {item?.total}</td>
                                         
                                            <td className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="btn btn-warning"
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(addPurchasItemSlice({
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
                                let arr = [...purchaseItems];
                                arr.splice(index,1);
                                dispatch(itemsPurchaseSlice(arr))
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

export default AddPurchase;
