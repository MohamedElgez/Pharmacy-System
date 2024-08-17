
import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modal } from "../../features/modalSlice";
import {
    useGetClientPaymentQuery,

} from "../../services/medicines/medicines";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import dataTable from "./../../../public/dist/js/dataTable.js" 

const ClientPayments = () => {
  

  const { data, isLoading, isError, isSuccess } = useGetClientPaymentQuery();

  useEffect(()=>{
  dataTable()
}, [isSuccess])
  const items = data?.data?.clientPaymentInvoices?.data

    console.log(items);
    
  return (
    <>
      {isLoading && <Loading></Loading>}
    
        <div className="content-wrapper">
          <Content
            title="Clients Payment"
        
          />
          <section className="content">
            <div className="container-fluid">
              <div className="card card-default">
                <div className="card-header">
                  <h3 className="card-title">
                
                  </h3>
                </div>

                <div className="card-body">
        
                {isError && 

                <h2 color="danger">Please tyr reload this page!!</h2>}
                {isSuccess &&  (
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Client</th>
                        <th>past Remaining Debt</th>
                        <th>paid</th>
                        <th>Remaining Debt</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (

                        <tr key={index}>
                          <td>{item.code}</td>
                          <td>{item?.client?.name}</td>
                          <td>{item.past_remaining_debt}</td>
                          <td>{item.paid}</td>
                          <td>{item.remaining_debt}</td>
 
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                      <th>Code</th>
                        <th>Client</th>
                        <th>past Remaining Debt</th>
                        <th>paid</th>
                        <th>Remaining Debt</th>
           
                      
                      </tr>
                    </tfoot>
       
                  </table>
                  
         
                   )}

                </div>
              </div>
            </div>
          </section>


        </div>

    </>
  );

};


export default ClientPayments;
