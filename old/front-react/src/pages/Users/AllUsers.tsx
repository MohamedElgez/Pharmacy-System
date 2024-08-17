
import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modal } from "../../features/modalSlice";
import {useGetUsersQuery, useDeleteUserMutation,} from "../../services/medicines/medicines";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ModalComponent from "../../components/ModalComponent";
import Alert from "../../components/Alert";
import ShowUserComponent from "../../components/users/ShowUser";
import EditUser from "../../components/users/EditUser";
import dataTable from "./../../../public/dist/js/dataTable.js" 

const AllUsers = () => {
  const { data, isLoading, isError, isSuccess } = useGetUsersQuery();
  console.log(data?.data?.users);
  
  const users = data?.data?.users?.data;
   
useEffect(()=>{
  dataTable()
}, [isSuccess])
  const [item, setItem] = useState("");

  const dispatch = useAppDispatch();
  // const medicines = useAppSelector( (state)=> state.medicines.value);
  const modalStatus = useAppSelector((state) => state.modal.modalStatus);
  const [deleteUser ,deleteUserStatus] = useDeleteUserMutation();

  return (
    <>
      {isLoading && <Loading></Loading>}

      <div className="content-wrapper">
        <Content
          title="All Users"
        
        />
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/addUser"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"Add User"}</span>
                  </Link>
                </h3>
              </div>

              <div className="card-body">
                {deleteUserStatus.isSuccess && (
                  <Alert
                    color={"danger"}
                    massage={deleteUserStatus.data.message}
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
                        <th>created at</th>

                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users && users.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.created_at}</td>

                          <td className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="btn btn-warning"
                              onClick={() => {
                                dispatch(
                                  modal({ name: "editUser", isOpen: true })
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
                                  modal({ name: "showUser", isOpen: true })
                                );

                                setItem(item);
                                console.log(item);
                              }}
                            >
                              Show
                            </button>

                            <button
                              type="submit"
                              className="btn btn-danger"
                              onClick={() => {
                                deleteUser(item.id);
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
                            
        {modalStatus.isOpen && modalStatus.name == "editUser" && (
          <ModalComponent
            title="Edit User"
            body={<EditUser item={item} />}
          ></ModalComponent>
        )}
        {modalStatus.isOpen && modalStatus.name == "showUser" && (
          <ModalComponent
            title="show User"
            body={<ShowUserComponent item={item} />}
          ></ModalComponent>
        )}
      </div>
    </>
  );
};

export default AllUsers;
