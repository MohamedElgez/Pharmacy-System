
import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modal } from "../../features/modalSlice";
import {useGetTypesQuery, useDeleteTypeMutation,} from "../../services/medicines/medicines";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ModalComponent from "../../components/ModalComponent";
import Alert from "../../components/Alert";
import ShowTypeComponent from "../../components/types/ShowType";
import EditType from "../../components/types/EditType";
import dataTable from "./../../../public/dist/js/dataTable.js" 

const AllTypes = () => {
  const { data, isLoading, isError, isSuccess } = useGetTypesQuery();
  const types = data?.data?.types?.data;
  const [item, setItem] = useState("");
 
useEffect(()=>{
  dataTable()
}, [isSuccess])
  const dispatch = useAppDispatch();
  // const medicines = useAppSelector( (state)=> state.medicines.value);
  const modalStatus = useAppSelector((state) => state.modal.modalStatus);
  const [deleteType ,deleteTypeStatus] = useDeleteTypeMutation();

  return (
    <>
      {isLoading && <Loading></Loading>}

      <div className="content-wrapper">
        <Content
          title="All Types"
        
        />
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/addType"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"Add Type"}</span>
                  </Link>
                </h3>
              </div>

              <div className="card-body">
                {/* {deleteTypeStatus.isSuccess && (
                  <Alert
                    color={"danger"}
                    massage={deleteTypeStatus.data.message}
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
                      {types.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.created_at}</td>

                          <td className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="btn btn-warning"
                              onClick={() => {
                                dispatch(
                                  modal({ name: "editType", isOpen: true })
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
                                  modal({ name: "showType", isOpen: true })
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
                                deleteType(item.id);
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
                            
        {modalStatus.isOpen && modalStatus.name == "editType" && (
          <ModalComponent
            title="Edit Type"
            body={<EditType item={item} />}
          ></ModalComponent>
        )}
        {modalStatus.isOpen && modalStatus.name == "showType" && (
          <ModalComponent
            title="show Type"
            body={<ShowTypeComponent item={item} />}
          ></ModalComponent>
        )}
      </div>
    </>
  );
};

export default AllTypes;
