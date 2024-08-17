import React from 'react'
import { useAddPurchasPaymentQuery, useStorePurchasPaymentMutation  } from '../../services/medicines/medicines'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addPurchasPaymentSlice } from "../../features/purchases/addPurchasPaymentSlice";
import { useForm } from 'react-hook-form';
import Alert from '../../components/Alert';

 const AddPurchasPayment = () => {

    const dispatch = useAppDispatch();

    const AddPurchasPayment = useAddPurchasPaymentQuery();

    const [storePurchasPayment, statusstorePurchasPayment] = useStorePurchasPaymentMutation()

    const supplier = AddPurchasPayment?.data?.data?.suppliers;

    const updateError = statusstorePurchasPayment.error?.data?.errors;
  
    
    const paymentInfo = useAppSelector( (state) => state.addPurchasPayment.info);

    const { register , handleSubmit, formState: { errors } } = useForm();

    const remaid = () => {
       
        let remainingDebt = 0;
        supplier &&   supplier.filter((ele)=>{

          ele.id == paymentInfo?.supplier_id ? remainingDebt = ele.remaining_debt: 0
      
        });
        
        return remainingDebt
    }

    const storePaymet = (data) =>{
      //  const {code , remaining_debt, supplier_id, past_remaining_debt } = paymentInfo
        storePurchasPayment(paymentInfo)
            
    }   
    statusstorePurchasPayment.isSuccess &&  dispatch(addPurchasPaymentSlice())


  return (

    <div className="content-wrapper">
         
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>payments</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">payment</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-default">
                    {statusstorePurchasPayment.isSuccess && (
                   <Alert color={'success'} massage={statusstorePurchasPayment?.data?.message}></Alert>
                )
                }
            
                        <form  onSubmit={handleSubmit(storePaymet)}
                         onChange={(e)=>{
                            const formDate = new FormData(e.currentTarget);
                            const code = formDate.get('code');
                            const supplier_id = formDate.get('supplier_id');
                            const past_remaining_debt = remaid();
                            const paid = formDate.get('paid')
                            const remaining_debt = +remaid() - +paid
                        
                            dispatch(addPurchasPaymentSlice({
                                  code,
                                  supplier_id,
                                  remaining_debt,
                                  past_remaining_debt,
                                  paid,
                            

                            }))

                        }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">

                                    <div className="form-group">
                                            <label>Invoice No </label>
                                            <input type="number"  className="form-control" name="code" value={paymentInfo?.code ?? ''}
                                                   {...register('code', {required: 'Invoice No is Required'})}
                                            />
                                               {errors.code && (
                                             <span className='text-danger'>{errors.code?.message}</span>
                                            )}
                                           {statusstorePurchasPayment.isError && updateError.code && (
                                               <span className='text-danger'>{updateError.code[0]}</span>
                                             )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pay">Payment Value</label>
                                            <input type="number"  className="form-control" id="pay" name="paid" value={paymentInfo?.paid ?? 0}
                                                placeholder="Enter Payment Value"

                                                  {...register('paid', {required: 'Payment is Required'})}
                                                />
                                                   {errors.paid && (
                                                     <span className='text-danger'>{errors.paid?.message}</span>
                                                     )}
                                                        {statusstorePurchasPayment.isError && updateError.paid && (
                                               <span className='text-danger'>{updateError.paid[0]}</span>
                                             )}
                                        </div>
                                        <div className="form-group">
                                            <label>Remaining Debt</label>
                                            <input type="number" readOnly className="form-control" name="remain" value={remaid() ?? 0}
                                                   {...register('remain')}
                                            />
                                               {errors.remain && (
                                             <span className='text-danger'>{errors.remain?.message}</span>
                                            )}
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-group">
                                            <label>Supplier</label>
                                            <select className="form-control" name='supplier_id' value={paymentInfo?.supplier_id ?? ''}
                                            
                                                {...register('supplier_id', {required: 'Supplier is Required'})}
                                            >
                                                <option></option>
                                             {supplier && supplier.map((ele, index)=>(
                                                    <option value={ele.id} key={index}>{ele.name}</option>
                                             ))}
                                            </select>
                                            {errors.supplier_id && (
                                             <span className='text-danger'>{errors.supplier_id?.message}</span>
                                            )}
                                            {statusstorePurchasPayment.isError && updateError.supplier_id && (
                                               <span className='text-danger'>{updateError.supplier_id[0]}</span>
                                             )}
                                        </div>
                                 
                                        <div className="form-group">
                                            <label htmlFor="remain-after">Remaining after pay</label>
                                            <input type="number"  readOnly className="form-control" id="remain-after"
                                                name="remain_after" value={(+remaid() - +paymentInfo?.paid)}
                                                defaultValue='0'
                                                
                                                 {...register('remain_after')}

                                                />
                                                   {errors.remain_after && (
                                                     <span className='text-danger'>{errors.remain_after?.message}</span>
                                                     )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                          
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
               

           
                </div>
            </section>
           
        </div>
  )
}

export default AddPurchasPayment
