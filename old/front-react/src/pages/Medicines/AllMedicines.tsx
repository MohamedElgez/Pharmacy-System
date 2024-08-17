
import React, { useState, useEffect } from "react";
import Content from "../../components/Content";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modal } from "../../features/modalSlice";
import {
  useGetMedicinesQuery,
  useDeleteMedicineMutation
} from "../../services/medicines/medicines";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ModalComponent from "../../components/ModalComponent";
import EditComponent from "../../components/medicines/EditComponent";
import ShowMedicienComponent from "../../components/medicines/ShowMedicienComponent";
import Alert from "../../components/Alert";
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from "../../components/Footer";
import dataTable from "./../../../public/dist/js/dataTable.js" 


const AllMedicines = () => {
  
  const [page, setPage] = useState('1')

  const { data, isLoading, isError, isSuccess } = useGetMedicinesQuery(page);
  
  const medicines = data?.data?.items?.data;
 
  const itemPage = data?.data?.items

  console.log(itemPage);
  
  const handelPages = (index) => {

        return index
    }
   
useEffect(()=>{
  dataTable()
}, [isSuccess])

  const numberOfPage = Array.from(Array(data?.data?.items?.last_page).keys()); 

  const [item, setItem] = useState("");

  
  //console.log(medicines);
  const dispatch = useAppDispatch();
  // const medicines = useAppSelector( (state)=> state.medicines.value);
  const modalStatus = useAppSelector((state) => state.modal.modalStatus);
  const [deleteMedicine, deleteMedicineStatus] = useDeleteMedicineMutation();

  return (
    <>
       
      {isLoading && <Loading></Loading>}
    
        <div className="content-wrapper">
          <Content
            title="All Medicine"
            list="Add Medicine"
            listLink="addMedicine"
          />
          <section className="content">
            <div className="container-fluid">
              <div className="card card-default">
                <div className="card-header">
                  <h3 className="card-title">
                    <Link to={"/addMedicine"}>
                      <i className="fa fa-bars"></i>
                      <span className="ms-2">{"Add Medicine"}</span>
                    </Link>
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
                        <th>Price</th>
                        <th>Category</th>
                        <th>Quantity</th>
                    
                  
                        <th>Expiration</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicines && medicines.map((item, index) => (

                        <tr key={index}>
                          <td>{item.code}</td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.category?.name}</td>
                          <td>{item.quantity}</td>
                       
                          <td>{item.expiration}</td>
                          <td className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="btn btn-warning"
                              onClick={() => {
                                dispatch(
                                  modal({ name: "editMedicine", isOpen: true })
                                );

                                setItem(item);
                              }}
                            >
                              Edit
                            </button>

                       
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={() => {
                                dispatch(
                                  modal({ name: "showMedicine", isOpen: true })
                                );

                                setItem(item);
                              }}
                            >
                              Show
                            </button>

                            <button
                              type="submit"
                              className="btn btn-danger"
                              onClick={() => {
                                deleteMedicine(item?.id)
                              }}
                            >
                              Delete
                            </button>
                          
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Quantity</th>
                   
                       
                        <th>Expiration</th>
                        <th>Actions</th>
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

          {modalStatus.isOpen && modalStatus.name == 'editMedicine' && (
            <ModalComponent
              title="Edit Medicien"
              body={<EditComponent item={item} />}
            ></ModalComponent>
          )}
         {modalStatus.isOpen && modalStatus.name == 'showMedicine' && (
            <ModalComponent
              title="show Medicien"
              body={<ShowMedicienComponent item={item} />}
            ></ModalComponent>
          )}
        </div>
          
    </>
      
  );
         
}; 



export default AllMedicines;
