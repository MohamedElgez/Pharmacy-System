
import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modal } from "../../features/modalSlice";
import {
  useReportsStockoutQuery,

} from "../../services/medicines/medicines";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import dataTable from "./../../../public/dist/js/dataTable.js" 

const Stockout = () => {
  
   const [page, setPage] = useState('1')
  const { data, isLoading, isError, isSuccess } = useReportsStockoutQuery(page);

    const numberOfPage = Array.from(Array(data?.last_page).keys()); 

  useEffect(()=>{
  dataTable()
}, [isSuccess])
  const items = data?.stockout?.data


  return (
    <>
      {isLoading && <Loading></Loading>}
    
        <div className="content-wrapper">
          <Content
            title="Stokout"
        
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
          
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items && items.map((item, index) => (

                        <tr key={index}>
                          <td>{item.code}</td>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                     
                        
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Quantity</th>
           
                      
                      </tr>
                    </tfoot>
       
                  </table>
                  
               <nav aria-label="Page reactPagination navigation example">
                    <ul className="pagination">
                    <li className="page-item"><a className="page-link" disabled={page == 1 && 'disabled'}
                      onClick={() => setPage(page-1)} href="#">Previous</a></li>

                      {numberOfPage && numberOfPage.map((index)=>(
                          <li className="page-item" key={index} onClick={() => setPage(index+1)}><a className="page-link" href="#">{index+1}</a></li>

                      ))}

                  <li className="page-item"
                    onClick={() => setPage(page+1)}><a className="page-link" >Next</a></li>
                    </ul>
                    </nav>  
           

                </div>
              </div>
            </div>
          </section>


        </div>

    </>
  );

};


export default Stockout;
