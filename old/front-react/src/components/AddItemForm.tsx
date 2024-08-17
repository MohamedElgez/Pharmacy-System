import {React,useState} from "react";
import { useAppDispatch } from "../app/hooks";

// //D - add purh  || D-  item || S-  add 

export const AddItemForm = (props) => {

    const {itemsPurchaseSlice, addPurchasItemSlice , addPurchasItem } = props
    const dispatch = useAppDispatch();

    const [itemsSearch, SetItemSearh] = useState([])

    const [itemAction,setItemAction] = useState([{action: 'Add' , index: ''}]); 

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(itemsPurchaseSlice({ addPurchaseItem }));
      }}
      onChange={(e) => {
        const formDate = new FormData(e.currentTarget);
        const item_id = formDate.get("code");
        const suplier_price = formDate.get("supplierPrice");
        const sell_price = formDate.get("sellPrice");
        const quntity = formDate.get("quantity");
        const expire_date = formDate.get("expireDate");
        const discount = formDate.get("discount");
        let total = formDate.get("total");

        discount > 1
          ? (total = (suplier_price - suplier_price / discount) * quntity)
          : (total = suplier_price * quntity);

        dispatch(
          addPurchasItemSlice({
            item_id,
            suplier_price,
            sell_price,
            quntity,
            expire_date,
            discount,
            total,
          })
        );
      }}
    >
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Medicine Name</th>
            <th>Supplier Price</th>
            <th>sell0 Price</th>
            <th>Quantity</th>
            <th>Expire Date</th>
            <th>Discount %</th>
            <th>total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="table-inputs">
          <tr>
            <td>-</td>
            <td>
              {/* <input
                    type="text"
                    className="form-control"
                    name="code"
                    id=""
                    
                    placeholder=""
                    onChange={itemCode}
                /> */}
              <select
                className="form-control select2"
                name="code"
                value={addPurchasItem?.item_id ?? ""}
                // {...register("code", { required: "Code is required" })}
              >
                <option></option>
                {getAddPurchas.isSuccess &&
                  getAddPurchas.data.items.map((ele, index) => (
                    <option value={ele.id} key={index}>
                      {ele.name}
                    </option>
                  ))}
              </select>
              {/* {errors.code && (
                <span className="text-danger">{errors.code?.message}</span>
              )} */}
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="supplierPrice"
                id=""
                placeholder=""
                value={addPurchasItem?.suplier_price ?? ""}
                // {...register("supplierPrice", {
                //   required: "Supplier Price is required",
                //   pattern: {
                //     value: /^[0-9]+$/i,
                //     message: "Must be Number",
                //   },
                // })}
              />
              {errors.supplierPrice && (
                <span className="text-danger">
                  {errors.supplierPrice?.message}
                </span>
              )}
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="sellPrice"
                id=""
                placeholder=""
                // {...register("sellPrice", {
                //   required: "Sell Price is required",
                //   pattern: {
                //     value: /^[0-9]+$/i,
                //     message: "Must be Number",
                //   },
                // })}
                value={addPurchasItem?.sell_price ?? ""}
              />
              {errors.sellPrice && (
                <span className="text-danger">{errors.sellPrice?.message}</span>
              )}
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="quantity"
                id=""
                // {...register("quantity", {
                //   required: "Quantity is required",
                //   pattern: {
                //     value: /^[0-9]+$/i,
                //     message: "Must be Number",
                //   },
                // })}
                value={addPurchasItem?.quntity ?? ""}
                placeholder=""
              />
              {/* {errors.quantity && (
                <span className="text-danger">{errors.quantity?.message}</span>
              )} */}
            </td>
            <td>
              <input
                type="date"
                className="form-control"
                name="expireDate"
                id=""
                // {...register("expireDate", {
                //   required: "ExpireDate is required",
                //   pattern: {
                //     value: /^[0-9]+$/i,
                //     message: "Must be Number",
                //   },
                // })}
                value={addPurchasItem?.expire_date ?? ""}
                placeholder=""
              />
              {/* {errors.expireDate && (
                <span className="text-danger">
                  {errors.expireDate?.message}
                </span>
              )} */}
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="discount"
                id=""
                value={addPurchasItem?.discount ?? ""}
                placeholder=""
              />
              {/* {errors.discount && (
                <span className="text-danger">{errors.discount?.message}</span>
              )} */}
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="total"
                id=""
                // {...register("total", {
                //   pattern: {
                //     value: /^[0-9]+$/i,
                //     message: "Must be Number",
                //   },
                // })}
                readOnly={true}
                value={addPurchasItem?.total ?? ""}
                placeholder=""
              />
              {/* {errors.total && (
                <span className="text-danger">{errors.total?.message}</span>
              )} */}
            </td>
            <td>
              {itemAction[0].action == "Add" && (
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();

                    dispatch(
                      itemsPurchaseSlice([
                        {
                          ...addPurchasItem,
                        },
                        ...purchaseItems,
                      ])
                    );

                    dispatch(addPurchasItemSlice({}));
                  }}
                >
                  {itemAction[0].action}
                </button>
              )}
              {itemAction[0].action == "Edit" && (
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={(e) => {
                    e.preventDefault();
                    let editArr = [...purchaseItems];
                    editArr[itemAction[0].index] = { ...addPurchasItem };

                    dispatch(itemsPurchaseSlice(editArr));
                    dispatch(addPurchasItemSlice({}));
                    setItemAction([{ action: "Add", index: "" }]);
                  }}
                >
                  {itemAction[0].action}
                </button>
              )}
            </td>
          </tr>
          <br></br>
          {purchaseItems &&
            purchaseItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td> {item.item_id}</td>
                <td> {item.suplier_price}</td>
                <td> {item.sell_price}</td>
                <td> {item.quntity}</td>
                <td> {item.expire_date}</td>
                <td> {item.discount}</td>
                <td> {item.total}</td>

                <td className="d-flex justify-content-around">
                  <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        addPurchasItemSlice({
                          ...item,
                        })
                      );
                      setItemAction([{ action: "Edit", index }]);
                    }}
                  >
                    <i
                      className="fa fa-pen text-danger nav-icon"
                      aria-hidden="true"
                    ></i>
                  </button>

                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      let arr = [...purchaseItems];
                      arr.splice(index, 1);
                      dispatch(itemsPurchaseSlice(arr));
                    }}
                  >
                    <i
                      className="fa fa-trash text-warning nav-icon"
                      aria-hidden="true"
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </form>
  );
};
