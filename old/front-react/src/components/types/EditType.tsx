import React from "react";
import { useForm } from "react-hook-form";

import {
  useUpdateTypeMutation
} from "../../services/medicines/medicines";
import Alert from "../Alert";


const EditComponent = (props) => {
  const { item } = props;

  const { register , handleSubmit, formState: { errors } } = useForm();



const [updateType, updateTypeStatus] = useUpdateTypeMutation();
const updateData = (data)   =>{
  const id = item.id;
  const name = data.name;
  updateType({id, name});
  }
  return (

        <form
            encType="application/json"
            onSubmit={handleSubmit(updateData)}>

            {updateTypeStatus.isSuccess && (
                    <Alert
                    color={"success"}
                    massage={updateTypeStatus?.data?.message}
                    ></Alert>
                )}
                {updateTypeStatus.isError && (
                    <Alert
                    color={"danger"}
                    massage={updateTypeStatus?.error?.data}
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
                    placeholder="Enter Type Name"
                    {...register("name", {required: 'name is required'})}
                    value={item.name ?? '' }
                />
            {errors.name && (
                  <span className='text-danger'>{errors.name?.message}</span>
                )}
     {updateTypeStatus.isError && updateTypeStatus.error.data.errors.name && (
          <span className='text-danger'>{updateTypeStatus.error.data.errors.name[0]}</span>
      )}

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