import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { interactive } from "../../features/interactiveSlice";
import { modal } from "../../features/modalSlice";
import {
  useUpdateCategoryMutation
} from "../../services/medicines/medicines";
import Alert from "../Alert";

const EditComponent = (props) => {
  const { item } = props;
  const dispatch = useAppDispatch();

const [updateCategory, updateCategoryStatus] = useUpdateCategoryMutation();

  return (

        <form
            encType="application/json"
            onSubmit={(e) => {
            e.preventDefault();
            const formDate = new FormData(e.currentTarget);
            const id = item.id;
            const name = formDate.get("name");
            updateCategory({id, name});

            }}
       
            >

            {updateCategoryStatus.isSuccess && (
                    <Alert
                    color={"success"}
                    massage={updateCategoryStatus.data.message}
                    ></Alert>
                )}
                {updateCategoryStatus.isError && (
                    <Alert
                    color={"danger"}
                    massage={updateCategoryStatus?.error?.data}
                    ></Alert>
                )}
            <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                <label htmlFor="Name">Name</label>
                
                <input
                    type="text"
                    className="form-control"
                    id="Name"
                    name="name"
                    placeholder="Enter Category Name"
                    defaultValue={item.name}
                />
                </div>

            </div>

            </div>

            {/* <!-- /.card-body --> */}
            <div className="card-footer">
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </div>
        </form>
  
  );
};

export default EditComponent;