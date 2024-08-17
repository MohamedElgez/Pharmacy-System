import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Content from "../../components/Content";
import { useForm } from "react-hook-form";

import { returnPurchaseSlice } from "../../features/purchases/returnPurchaseSlice";
import { returnItemsPurchaseSlice } from "../../features/purchases/returnItemsPurchaseSlice";
import { returnPurchasItemSlice } from "../../features/purchases/returnPurchasItemSlice";

import {useStoreReturnPurchasMutation, useAddRetutnPurchasQuery } from "../../services/medicines/medicines";

import Alert from '../../components/Alert';
import { AddItemForm } from "../../components/AddItemForm";


const AddReturnPurchas = () => {

  const dispatch = useAppDispatch();

  const addPurchasItem = useAppSelector( (state) => state.returnPurchasItem.item);
  
  const addPurchaseInvoice = useAppSelector((state) => state.returnPurchase.invoiceInfo);
  
  const purchaseItems = useAppSelector((state) => state.returnItemsPurchase.items);

  const AddReturnPurchas  = useAddRetutnPurchasQuery();
  
 const PurchasData = AddReturnPurchas?.data

 const purchasesInvoice = PurchasData?.purchas_data

  const [storeReturnPurchase, storePurchaseReturnStatus] = useStoreReturnPurchasMutation();

  const [itemsSearch, SetItemSearh] = useState([])

  const [itemAction,setItemAction] = useState([{action: 'Add' , index: ''}]); 

const { register , handleSubmit, formState: { errors } } = useForm();
const AddPurchasSubmit = (data) => {storeReturnPurchase([{...addPurchaseInvoice, purchaseItems }])}

const [supplier, setSupplier] = useState();
const [cuttentItem, setCurrentItem] = useState();

useEffect(()=>{
  purchasesInvoice && purchasesInvoice.filter((item)=>{
    if(item.code == addPurchaseInvoice?.code){
      dispatch(returnItemsPurchaseSlice(item.items_invoice))
      setSupplier(item.get_supplier)
    }else{

     // dispatch(returnItemsPurchaseSlice())
     // setSupplier()
    } 
        })

}, [addPurchaseInvoice?.code])

useEffect(()=>{

  dispatch(returnItemsPurchaseSlice())
  dispatch(returnPurchaseSlice())
  dispatch(returnPurchasItemSlice())

}, [storePurchaseReturnStatus.isSuccess])

const invoiceTotal = ()=>{
let total = 0;
purchaseItems && purchaseItems.map((item)=>{
        Number(item.total) ? 
        total =  +total + +item.total :''
    })
    return +total
  };
  const invoiceRemaind = ()=>{
    let remaind = 0;
    remaind =  addPurchaseInvoice?.paid ? invoiceTotal() -  addPurchaseInvoice?.paid : invoiceTotal()
        return +remaind
      };

   console.log(purchaseItems);
   
const selectItemData = () =>{
        let itemData = {'price':'', 'name':''};
        PurchasData?.items?.filter((item)=> {
          if(item.id == addPurchasItem?.item_id)
          {
            itemData.name = item.name
          }
      })
      
        return itemData
      }


//storePurchaseStatus.isSuccess && dispatch(addPurchaseSlice())

  return (  
    <div className="content-wrapper">
      <Content title="Add Return Purchase" />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">
                <Link to={"/AllReturnPurchases"}>
                  <i className="fa fa-bars"></i>
                  <span className="ms-2">{"List ReturnPurchases"}</span>
                </Link>
              </h3>
            </div>
            <div className="card-body">
            {storePurchaseReturnStatus.isSuccess && (
                   <Alert color={'success'} massage={'Purchase insert done'}></Alert>
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
               
                    dispatch(returnPurchaseSlice({
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
                        <select
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
                        >
                          <option></option>
                        {AddReturnPurchas.isSuccess && purchasesInvoice.map((ele, index)=>(
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
                          value={addPurchaseInvoice?.Date ?? ''}
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
                          value={addPurchaseInvoice?.details}
                          className="form-control"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Payment Type</label>
                        <select className="form-control" name='payment_type'  value={addPurchaseInvoice?.payment_type}>
                          <option value='0'>Cash</option>
                          <option value='1'>Visa</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Supplier</label>
                        <select className="form-control" value={supplier?.id} name="supplier"  readOnly
                          
                        {...register('supplier')} 
                        >

                        
                          <option value={supplier?.id ?? ''} selected={supplier?.id && 'selected'} >{supplier?.name ?? ''}</option>

                     
                        
                          {/* {AddReturnPurchas.isSuccess && AddReturnPurchas.data.supplier.map((ele, index)=>(
                               <option value={ele.id} key={index}>{ele.name}</option>
                          )) } */}
                        
                        </select>
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
                            value= {+addPurchaseInvoice?.paid ?? ''}
                            {...register('paid')} 
                            
                          />
                            {+addPurchaseInvoice?.paid > +addPurchaseInvoice?.total && (
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
                            value={addPurchaseInvoice?.paid < 0  || addPurchaseInvoice?.paid > addPurchaseInvoice?.total ?  0 : invoiceRemaind()}

                          
                            {...register('remaind')} 
                           
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
                                dispatch(returnItemsPurchaseSlice({ addPurchaseItem }));
                            }}
                            onChange={(e) => {
                                const formDate = new FormData(e.currentTarget);
                                const item_id = formDate.get("code");
                                const itemName = selectItemData()?.name
                                const suplier_price = formDate.get("supplierPrice");
                                const sell_price = formDate.get("sellPrice");
                                const quantity = formDate.get("quantity");
                                const expire_date	 = formDate.get("expireDate");
                                const discount = formDate.get("discount");
                                let total = formDate.get("total");

                               discount > 1 ? total = (suplier_price - (suplier_price/discount))*quantity 
                                    : total = suplier_price*quantity

                                
                                dispatch(
                                  returnPurchasItemSlice({
                                    item_id,
                                    itemName,
                                    suplier_price,
                                    sell_price,
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
                            <th>Supplier Price</th>
                            <th>sell0 Price</th>
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
                                  {AddReturnPurchas.isSuccess && PurchasData?.items?.map((ele, index)=>(
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
                                className="btn btn-primary"
                                onClick={(e) => {
                                  e.preventDefault();

                                  dispatch(
                                    returnItemsPurchaseSlice([
                                      {
                                        ...addPurchasItem,
                                      },
                                      
                                      ...purchaseItems,
                                    ])
                                  );

                                  dispatch(returnPurchasItemSlice({}))
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

                                     dispatch(returnItemsPurchaseSlice(editArr));      
                                     dispatch(returnPurchasItemSlice({}))
                                     setItemAction([{action:'Add', index:''}])
                                   }}
                                 >
                                   
                                   {itemAction[0].action}
                                 </button>

                                 <button 
                                 type="submit"
                                 className="btn btn-danger"
                                 
                                 onClick={()=>{
                                
                                  dispatch(returnPurchasItemSlice({}))
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
                                            <td> {item.itemName ?? item.items.name}</td>
                                            <td> {item.suplier_price}</td>
                                            <td> {item.sell_price}</td>
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
                                dispatch(returnPurchasItemSlice({
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
                                dispatch(returnItemsPurchaseSlice(arr))
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

export default AddReturnPurchas;
