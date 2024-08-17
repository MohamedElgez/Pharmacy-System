
import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { modal } from "../../features/modalSlice";
import {useGetCategoriesQuery, useDeleteCategoryMutation,} from "../../services/medicines/medicines";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ModalComponent from "../../components/ModalComponent";
import Alert from "../../components/Alert";
import ShowCategoryComponent from "../../components/categories/ShowCategory";
import EditCategory from "../../components/categories/EditCategory";
import dataTable from "./../../../public/dist/js/dataTable.js" 

const AllCategories = () => {
  const { data, isLoading, isError, isSuccess } = useGetCategoriesQuery();
  const categories = data?.data?.categories?.data;
  const [item, setItem] = useState("");
 
useEffect(()=>{
  dataTable()
}, [isSuccess])
  const dispatch = useAppDispatch();
  const modalStatus = useAppSelector((state) => state.modal.modalStatus);
  const [deleteCategory ,deleteCategoryStatus] = useDeleteCategoryMutation();
console.log(deleteCategoryStatus.data);

  return (
    <>
      {isLoading && <Loading></Loading>}

      <div className="content-wrapper">
        <Content
          title="All Categories"
        
        />
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/addCategory"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"Add Category"}</span>
                  </Link>
                </h3>
              </div>

              <div className="card-body">
         
                {isError && <h2>Please tyr reload this page</h2>}
           
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
                      {categories && categories.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.created_at}</td>

                          <td className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="btn btn-warning"
                              onClick={() => {
                                dispatch(
                                  modal({ name: "editCategory", isOpen: true })
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
                                  modal({ name: "showCategory", isOpen: true })
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
                                deleteCategory(item.id);
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
                        <th>Created_at</th>
                        <th>Actions</th>
                      </tr>
                    </tfoot>
                  </table>
        
              </div>
            </div>
          </div>
        </section>
                            
        {modalStatus.isOpen && modalStatus.name == "editCategory" && (
          <ModalComponent
            title="Edit Category"
            body={<EditCategory item={item} />}
          ></ModalComponent>
        )}
        {modalStatus.isOpen && modalStatus.name == "showCategory" && (
          <ModalComponent
            title="show Category"
            body={<ShowCategoryComponent item={item} />}
          ></ModalComponent>
        )}
      </div>
    </>
  );
};

export default AllCategories;
