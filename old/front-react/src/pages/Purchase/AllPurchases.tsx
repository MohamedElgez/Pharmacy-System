
import React, { useState, useEffect } from "react";
import Content from "../../components/Content";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modal } from "../../features/modalSlice";
import {useGetPurchasQuery} from "../../services/medicines/medicines";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ModalComponent from "../../components/ModalComponent";
import Alert from "../../components/Alert";
import ShowTypeComponent from "../../components/types/ShowType";
import EditType from "../../components/types/EditType";
import ShowPurchasComponent from '../../components/purchases/ShowPurchas';

import dataTable from "./../../../public/dist/js/dataTable.js" 

const AllPurchases = () => {

  const [page, setPage] = useState('1')
  const { data, isLoading, isError, isSuccess } = useGetPurchasQuery(page);

  const purchases = data?.data

  const numberOfPage = Array.from(Array(data?.last_page).keys()); 

  console.log(numberOfPage);
  
  const [item, setItem] = useState("");

  const dispatch = useAppDispatch();
  // const medicines = useAppSelector( (state)=> state.medicines.value);
  const modalStatus = useAppSelector((state) => state.modal.modalStatus);

  useEffect(()=>{
    dataTable()
  }, [isSuccess])
  return (
    <>
      {isLoading && <Loading></Loading>}

      <div className="content-wrapper">
        <Content
          title="All Pruchases"
        
        />
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/addPurchase"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"Add Purchase"}</span>
                  </Link>
                </h3>
              </div>
              <div className="card-body">
          
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Remaind</th>
                        <th>Date</th>
                        <th>Supplier</th>
                        <th>Added By</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases && purchases.map((item, index) => (
                        <tr key={index}>
                          <td>{item.code}</td>
                          <td>{item.total}</td>
                          <td>{item.paid}</td>
                          <td>{item.remaind}</td>
                          <td>{item.Date}</td>
                          <td>{item.get_supplier?.name}</td>
                          <td>{item?.get_user.name}</td>

                          <td className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={() => {
                                dispatch(
                                  modal({ name: "show", isOpen: true })
                                );
                                setItem(item.items_invoice);
                               
                              }}
                            >
                              Show
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                      <th>Code</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Remaind</th>
                        <th>Date</th>
                        <th>Supplier</th>
                        <th>Added By</th>
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
          {modalStatus.isOpen && modalStatus.name == 'show' && (
            <ModalComponent
              title="show Purchas Detail"
              body={<ShowPurchasComponent item={ item} />}
            ></ModalComponent>
          )}
        </section>

      </div>
    </>
  );
};

export default AllPurchases;
