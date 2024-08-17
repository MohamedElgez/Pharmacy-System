import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { interactive } from "../../features/interactiveSlice";
import { modal } from "../../features/modalSlice";
import {
  useUpdateUnitMutation
} from "../../services/medicines/medicines";
import Alert from "../Alert";

const EditComponent = (props) => {
  const { item } = props;
  const dispatch = useAppDispatch();

const [updateUnit, updateUnitStatus] = useUpdateUnitMutation();

  return (

        <form
            encType="application/json"
            onSubmit={(e) => {
            e.preventDefault();
            const formDate = new FormData(e.currentTarget);
            const id = item.id;
            const name = formDate.get("name");
            updateUnit({id, name});

            }}
       
            >

            {updateUnitStatus.isSuccess && (
                    <Alert
                    color={"success"}
                    massage={updateUnitStatus.data.message}
                    ></Alert>
                )}
                {updateUnitStatus.isError && (
                    <Alert
                    color={"danger"}
                    massage={updateUnitStatus.error.data}
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
                    placeholder="Enter Unit Name"
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