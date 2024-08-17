import { Link } from "react-router-dom";

import Content from "../../components/Content";

import React from "react";

import { addUserSlice } from "../../features/users/addUserSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useStoreUserMutation } from "../../services/medicines/medicines";
import Alert from "../../components/Alert";
import { useForm } from 'react-hook-form';

const AddUser = () => {
  const dispatch = useAppDispatch();
  const addUserValue = useAppSelector((state) => state.addUser.value);

  const { register , handleSubmit, formState: { errors } } = useForm();

  const [storeUser, storeUserStatus] = useStoreUserMutation();
  
  const storeUserErorrs = storeUserStatus?.error?.data?.errors

  storeUserStatus.isSuccess && dispatch(addUserSlice())
  const submitSote = () => {

    storeUser({ ...addUserValue });
  }
  
  return (
    <>
      <div className="content-wrapper">
        <Content title="Add User" />
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <Link to={"/AllUsers"}>
                    <i className="fa fa-bars"></i>
                    <span className="ms-2">{"List Users"}</span>
                  </Link>
                </h3>
              </div>
              <div className="card-body">
                {storeUserStatus.isSuccess && (
                  <Alert
                    color={"success"}
                    massage={storeUserStatus?.data?.message}
                  ></Alert>
                )}
        

                {/* <MedicineForm dispatch= {dispatch} data = {data} ></MedicineForm> */}
                <form
                  
                  onSubmit={handleSubmit(submitSote)}
                  onChange={(e) => {
                    e.preventDefault();
                    const formDate = new FormData(e.currentTarget);
                    const name = formDate.get("name");
                    const email = formDate.get("email");
                    const password = formDate.get("password");
                    const password_confirmation = formDate.get("password_confirmation");
                    const phone = formDate.get("phone");
                    const role = formDate.get("role");
                    const National_id = formDate.get('National_id');

                    dispatch(addUserSlice({
                      name,
                      email,
                      password,
                      password_confirmation,
                      phone,
                      role,
                    }));
                  }}
                >
                 
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            name='name'
                            value={addUserValue?.name ?? ''}
                            className="form-control"
                            placeholder="Enter User Name"

                          {...register("name", {required: 'name is required',
                            pattern: {
                              value: /^[A-Za-z]+$/i ,
                              message: "Name must be string"
                            }
                          , minLength:{
                              value:3,
                              message:' Must be greater than 3 char'
                            },
                            maxLength:{
                              value:32,
                              message:' Must be less than 32 char'
                            }
                          })}
                          />
                        {errors.name && (
                            <span className='text-danger'>{errors.name?.message}</span>
                          )}
                        {storeUserStatus.isError && storeUserErorrs.name && (
                             <span className='text-danger'>{storeUserErorrs.name[0]}</span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="Email">Email</label>
                          <input
                            type="email"
                            name='email'
                            className="form-control"
                            id="Email"
                            placeholder="Enter User email"
                            value={addUserValue?.email ?? ''}
                               {...register("email", {required: 'Email is required',
                            pattern: {
                              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ ,
                              message: "Email Format not valid"
                            }
                          
                          })}
                          />
                        {errors.email && (
                            <span className='text-danger'>{errors.email?.message}</span>
                          )}
                        {storeUserStatus.isError && storeUserErorrs.email && (
                             <span className='text-danger'>{storeUserErorrs.email[0]}</span>
                          )}
                          
                          
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">phone</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="phone"
                              name='phone'
                              value={addUserValue?.phone ?? ''}
                              placeholder="Enter User Phone"

                              {...register("phone", {required: 'Phone is required',
                              pattern: {
                                value: /^01[0125][0-9]{8}$/,
                                message: "Phone Format not valid"
                              }
                            
                            })}
                            />
                          {errors.phone && (
                              <span className='text-danger'>{errors.phone?.message}</span>
                            )}
                        {storeUserStatus.isError && storeUserErorrs.phone && (
                             <span className='text-danger'>{storeUserErorrs.phone[0]}</span>
                          )}
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              name='password'
                              value={addUserValue?.password ?? ''}
                              placeholder="Enter User password"
                           
                              {...register("password", {required: 'password is required'
                        
                            
                            })}
                            />
                          {errors.password && (
                              <span className='text-danger'>{errors.password?.message}</span>
                            )}
                        {storeUserStatus.isError && storeUserErorrs.password && (
                             <span className='text-danger'>{storeUserErorrs.password[0]}</span>
                          )} 

                          </div>
                        
                          <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name='password_confirmation'
                              id="password_confirmation" 
                              value={addUserValue?.password_confirmation ?? ''}
                              placeholder="Enter User password"
                              {...register("password_confirmation", {required: 'Password confirmation is required',
                              pattern: {
                                value: addUserValue?.password,
                                message: "Password Not Match"
                              }
                            })}
                            />
                          {errors.password_confirmation && (
                              <span className='text-danger'>{errors.password_confirmation?.message}</span>
                            )}
                             {storeUserStatus.isError && storeUserErorrs.password_confirmation && (
                             <span className='text-danger'>{storeUserErorrs.password_confirmation[0]}</span>
                          )}  

                          </div>
                      
                           <div className="form-group">
                          <label htmlFor="phone">Role</label>
                          <select  className="form-control" name='role' id='role'  value={addUserValue?.role ?? ''}
                          {...register("role", {required: 'Role is required',
                                })}
                          >
                            <option value='1'>Admin</option>
                            <option value='0'>sales</option>
                          </select>

                          {errors.role && (
                              <span className='text-danger'>{errors.role?.message}</span>
                            )}

                          {storeUserStatus.isError && storeUserErorrs.role && (
                             <span className='text-danger'>{storeUserErorrs.password_confirmation[0]}</span>
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddUser;
