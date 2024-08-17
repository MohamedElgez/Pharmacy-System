
import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modal } from "../../features/modalSlice";
import {useGetSuppliersQuery, useDeleteSupplierMutation,} from "../../services/medicines/medicines";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ModalComponent from "../../components/ModalComponent";
import Alert from "../../components/Alert";
import ShowSuplierComponent from "../../components/supliers/ShowSuplier";
import EditSuplier from "../../components/supliers/EditSuplier";
import dataTable from "./../../../public/dist/js/dataTable.js" 

const AllSupliers = () => {
  const { data, isLoading, isError, isSuccess } = useGetSuppliersQuery();
  const supliers = data?.data
  const [item, setItem] = useState("");
 
useEffect(()=>{
  dataTable()
}, [isSuccess])
  const dispatch = useAppDispatch();
  // const medicines = useAppSelector( (state)=> state.medicines.value);
  const modalStatus = useAppSelector((state) => state.modal.modalStatus);
  const [deleteSuplier ,deleteSuplierStatus] = useDeleteSupplierMutation();

    console.log(item);
    
  return (
    <>
      {isLoading && <Loading></Loading>}

      <div className="content-wrapper">
        <Content
          title="All Supliers"
        
        />
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/addSuplier"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"Add Suplier"}</span>
                  </Link>
                </h3>
              </div>

              <div className="card-body">
                {/* {deleteSuplierStatus.isSuccess && (
                  <Alert
                    color={"danger"}
                    massage={deleteSuplierStatus.data.message}
                  ></Alert>
                )} */}
                {isError && <h2>Please tyr reload this page</h2>}
                {isSuccess && (
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>created at</th>

                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supliers.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.created_at}</td>

                          <td className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="btn btn-warning"
                              onClick={() => {
                                dispatch(
                                  modal({ name: "editSuplier", isOpen: true })
                                );

                                setItem(item);
                              }}
                            >
                              Edit
                            </button>

                            {/* <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={() => {
                                dispatch(
                                  modal({ name: "showSuplier", isOpen: true })
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
                                deleteSuplier(item.id);
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
                        <th>Created_at</th>
                        <th>Name</th>

                        <th>Actions</th>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>  
            </div>
          </div>
        </section>
                            
        {modalStatus.isOpen && modalStatus.name == "editSuplier" && (
          <ModalComponent
            title="Edit Suplier"
            body={<EditSuplier item={item} />}
          ></ModalComponent>
        )}
        {modalStatus.isOpen && modalStatus.name == "showSuplier" && (
          <ModalComponent
            title="show Suplier"
            body={<ShowSuplierComponent item={item} />}
          ></ModalComponent>
        )}
      </div>
    </>
  );
};

export default AllSupliers;
