
import React, { useState } from "react";
import Content from "../../components/Content";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modal } from "../../features/modalSlice";
import {
    useReportsDuesQuery,


} from "../../services/medicines/medicines";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";


const Dues = () => {
  
  const reportsDues = useReportsDuesQuery();
  
  const items = reportsDues?.data?.Expire_item
console.log(items);

  return (
    <>
      {reportsDues.isLoading && <Loading></Loading>}
    
        <div className="content-wrapper">
          <Content
            title="Dues"
          />
          <section className="content">
            <div className="container-fluid">
              <div className="card card-default">
                <div className="card-header">
                  <h3 className="card-title">
                
                  </h3>
                </div>

                <div className="card-body">
        
                {reportsDues.isError && 

                <h2 color="danger">Please tyr reload this page!!</h2>}
                {reportsDues.isSuccess &&  (
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Expire Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (

                        <tr key={index}> 
                          <td>{item?.items?.code }</td>
                          <td>{item?.items?.name}</td>
                          <td>{item?.expire_date}</td>

                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Expire Date</th>
           
                      
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


export default Dues;
