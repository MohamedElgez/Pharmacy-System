
import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modal } from "../../features/modalSlice";
import {useGetClientsQuery, useDeleteClientMutation,} from "../../services/medicines/medicines";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ModalComponent from "../../components/ModalComponent";
import Alert from "../../components/Alert";
import EditClient from "../../components/clients/EditClient";
import dataTable from "./../../../public/dist/js/dataTable.js" 

const AllClients = () => {
  const { data, isLoading, isError, isSuccess } = useGetClientsQuery();
  const clients = data?.data
  const [item, setItem] = useState("");
 
useEffect(()=>{
  dataTable()
}, [isSuccess])
  const dispatch = useAppDispatch();
  // const medicines = useAppSelector( (state)=> state.medicines.value);
  const modalStatus = useAppSelector((state) => state.modal.modalStatus);
  const [deleteClient ,deleteClientStatus] = useDeleteClientMutation();

    console.log(item);
    
  return (
    <>
      {isLoading && <Loading></Loading>}

      <div className="content-wrapper">
        <Content
          title="All Clients"
        
        />
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/addClient"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"Add Client"}</span>
                  </Link>
                </h3>
              </div>

              <div className="card-body">
                {deleteClientStatus.isSuccess && (
                  <Alert
                    color={"danger"}
                    massage="Client Deleted Sucsses"
                  ></Alert>
                )}
                {isError && <h2>Please tyr reload this page</h2>}
                {isSuccess && (
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>city</th>
                        <th>address</th>
                        <th>mobile</th>
                        <th>created at</th>

                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                           <td>{item.city}</td>
                          <td>{item.address}</td>
                          <td>{item.mobile}</td>
                          <td>{item.created_at}</td>

                          <td className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="btn btn-warning"
                              onClick={() => {
                                dispatch(
                                  modal({ name: "editClient", isOpen: true })
                                );

                                setItem(item);
                              }}
                            >
                              Edit
                            </button>
{/* 
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={() => {
                                dispatch(
                                  modal({ name: "showClient", isOpen: true })
                                );

                                setItem(item);
                                console.log(item);
                              }}
                            >
                              Show
                            </button> */}

                            <button
                              type="submit"
                              className="btn btn-danger"
                              onClick={() => {
                                deleteClient(item.id);
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
                       <th>Name</th>
                        <th>city</th>
                        <th>address</th>
                        <th>mobile</th>
                        <th>created at</th>
                        <th>Actions</th>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
            </div>
          </div>
        </section>
                            
        {modalStatus.isOpen && modalStatus.name == "editClient" && (
          <ModalComponent
            title="Edit Client"
            body={<EditClient item={item} />}
          ></ModalComponent>
        )}
   
      </div>
    </>
  );
};

export default AllClients;
