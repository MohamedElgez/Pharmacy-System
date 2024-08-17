import React from 'react'
import { useAddSalePaymentQuery, useStoreSalePaymentMutation  } from '../../services/medicines/medicines'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addSalePaymentSlice } from "../../features/sales/addSalePaymentSlice";
import { useForm } from 'react-hook-form';
import Alert from '../../components/Alert';

 const AddSalePayment = () => {

    const dispatch = useAppDispatch();

    const AddSalePayment = useAddSalePaymentQuery();

    const [storeSalePayment, statusstoreSalePayment] = useStoreSalePaymentMutation()
    const storePaymetErrors = statusstoreSalePayment?.error?.data?.errors



    const client = AddSalePayment?.data?.data?.clients;


    const paymentInfo = useAppSelector( (state) => state.addSalePayment.info);

    const { register , handleSubmit, formState: { errors } } = useForm();

    const remaid = () => {
       
        let remainingDebt = 0;
        client &&   client.filter((ele)=>{

          ele.id == paymentInfo?.client_id ? remainingDebt = ele.remaining_debt: 0
      
        });
        
        return remainingDebt
    }

    const storePaymet = (data) =>{
        const {id , remaining_debt} = paymentInfo
        storeSalePayment(paymentInfo)
            
    }   
    statusstoreSalePayment.isSuccess &&  dispatch(addSalePaymentSlice())


  return (

    <div className="content-wrapper">
         
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1> Client Payment</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Client Payment</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-default">
                    {statusstoreSalePayment.isSuccess && (
                   <Alert color={'success'} massage={statusstoreSalePayment?.data?.message}></Alert>
                )
                }
            
                        <form  onSubmit={handleSubmit(storePaymet)} onChange={(e)=>{
                            const formDate = new FormData(e.currentTarget);
                            const code = formDate.get('code');
                            const client_id = formDate.get('client_id');
                        
                            const past_remaining_debt = remaid();
                            const paid = formDate.get('paid')
                            const remaining_debt = +remaid() - +paid
                        
                            dispatch(addSalePaymentSlice({
                                code,
                                     client_id,
                                  remaining_debt,
                                  past_remaining_debt,
                                  paid,
                            

                            }))

                        }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                    <div className="form-group">
                                            <label>Invoice No</label>
                                            <input type="number"  className="form-control" name="code" value={paymentInfo?.code ?? ''}
                                                   {...register('code', {required: 'code is Required'})}
                                            />
                                               {errors.code && (
                                             <span className='text-danger'>{errors.code?.message}</span>
                                            )}
                                         {statusstoreSalePayment.isError && storePaymetErrors.code && (
                                             <span className='text-danger'>{storePaymetErrors?.code[0]}</span>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pay">Payment Value</label>
                                            <input type="number"  className="form-control" id="pay" name="paid" value={paymentInfo?.paid ?? 0}
                                                placeholder="Enter Payment Value"

                                                  {...register('paid')}
                                                />
                                                   {errors.paid && (
                                                     <span className='text-danger'>{errors.paid?.message}</span>
                                                     )}
                                        {statusstoreSalePayment.isError && storePaymetErrors.paid && (
                                             <span className='text-danger'>{storePaymetErrors?.paid[0]}</span>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label>Remaining Debt</label>
                                            <input type="number" readOnly className="form-control" name="past_remaining_debt" value={remaid()}
                                                   {...register('past_remaining_debt')}
                                            />
                                               {errors.past_remaining_debt && (
                                             <span className='text-danger'>{errors.past_remaining_debt?.message}</span>
                                            )}
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-group">
                                            <label>Client</label>
                                            <select className="form-control" name='client_id' value={paymentInfo?.client_id ?? ''}
                                            
                                                {...register('client_id', {required: 'Client is Required'})}
                                            >
                                                <option></option>
                                             {client && client.map((ele, index)=>(
                                                    <option value={ele.id} key={index}>{ele.name}</option>
                                             ))}
                                            </select>
                                            {errors.client_id && (
                                             <span className='text-danger'>{errors.client_id?.message}</span>
                                            )}
                                            {statusstoreSalePayment.isError && storePaymetErrors.client_id && (
                                             <span className='text-danger'>{storePaymetErrors?.client_id[0]}</span>
                                            )}
                                        </div>
                          
                                        <div className="form-group">
                                            <label htmlFor="remain-after">Remaining after pay</label>
                                            <input type="number"  readOnly className="form-control" id="remain-after"
                                                name="remaining_debt" value={(+remaid() - +paymentInfo?.paid) ?? ''}
                                                defaultValue='0'
                                                
                                                 {...register('remaining_debt')}

                                                />
                                                   {errors.remaining_debt && (
                                                     <span className='text-danger'>{errors.remaining_debt?.message}</span>
                                                     )}
                                             {statusstoreSalePayment.isError && storePaymetErrors.remaining_debt && (
                                             <span className='text-danger'>{storePaymetErrors?.remaining_debt[0]}</span>
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

export default AddSalePayment
