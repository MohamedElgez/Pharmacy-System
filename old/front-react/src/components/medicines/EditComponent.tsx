import React from "react";

import {useGetAddMedicineQuery,useUpdateMedicineMutation} from "../../services/medicines/medicines";
import Alert from "../Alert";

const EditComponent = (props) => {
  const { item } = props;
  const addMedicines = useGetAddMedicineQuery();
  const data = addMedicines?.data?.data;
  const [updateMedicine, updateMedicineStatus] = useUpdateMedicineMutation();

  return (
    <form
      encType="application/json"
      onSubmit={(e) => {
        e.preventDefault();
        const formDate = new FormData(e.currentTarget);
        const id = item.id;
        const name = formDate.get("name");
        const code = formDate.get("code");
        const price = formDate.get("price");
        const unit_price = formDate.get("unit_price");
        const quantity = formDate.get("quantity");
        const category_id = formDate.get("category_id");
        const unit_id = formDate.get("unit_id");
        const type_id = formDate.get("type_id");
        const supplier_id = formDate.get("supplier_id");
        const expiration = formDate.get("expiration");

        updateMedicine({
          id,
          name,
          type_id,
          code,
          price,
          unit_price,
          quantity,
          category_id,
          unit_id,
          supplier_id,
          expiration,
        });
      }}
    >
      {updateMedicineStatus.isSuccess && (
        <Alert
          color={"success"}
          massage={updateMedicineStatus.data.message}
        ></Alert>
      )}
      {updateMedicineStatus.isError && (
        <Alert
          color={"danger"}
          massage={updateMedicineStatus.error.data }
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
              placeholder="Enter Medicine Name"
              defaultValue={item.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Code">Code</label>
            <input
              type="number"
              className="form-control"
              id="Code"
              name="code"
              placeholder="Enter Medicine Code"
              defaultValue={item.code}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Price">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              id="Price"
              placeholder="Enter Medicine Price"
              defaultValue={item.price}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Unit Price">Unit Price</label>
            <input
              type="number"
              name="unit_price"
              className="form-control"
              id="Unit Price"
              placeholder="Enter Medicine Unit Price"
              defaultValue={item.unit_price}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="Quantity"
              placeholder="Enter Medicine Quantity"
              name="quantity"
              defaultValue={item.quantity}
            />
          </div>
        </div>

        <div className="col-md-6">
          {/* <!-- supplier-category-type-unit-expiration --> */}
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control select2"
              name="category_id"
              defaultValue={item.category}
            >
              {data &&
                data.categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Unit</label>
            <select
              className="form-control select2"
              name="unit_id"
              defaultValue={item.unit}
            >
              {data &&
                data.units.map((unit, index) => (
                  <option key={index} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              className="form-control select2"
              name="type_id"
              defaultValue={item.type}
            >
              {data &&
                data.types.map((type, index) => (
                  <option key={index} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Supplier</label>
            <select
              className="form-control select2"
              name="supplier_id"
              defaultValue={item.supplier}
            >
              <option value="1">Alabama</option>
            </select>
          </div>
          <div className="form-group">
            <label>Expiration Date:</label>
            <div className="input-group">
              <input
                type="date"
                name="expiration"
                className="form-control  float-right"
                id="reservation"
                defaultValue={item.expiration}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <!-- /.card-body --> */}
      <div className="card-footer">
        <button type="submit" className="btn btn-primary">
          Save changes
        </button>
      </div>
    </form>
  );
};

export default EditComponent;

