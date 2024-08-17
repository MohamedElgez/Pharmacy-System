import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { interactive } from "../../features/interactiveSlice";
import { modal } from "../../features/modalSlice";
import {
  useUpdateUserMutation
} from "../../services/medicines/medicines";
import Alert from "../Alert";

const EditComponent = (props) => {
  const { item } = props;
  const dispatch = useAppDispatch();
  const { register , handleSubmit, formState: { errors } } = useForm();

const [updateUser, updateUserStatus] = useUpdateUserMutation();
const updateUserErorrs = updateUserStatus?.error?.data?.errors

  return (

        <form
            encType="application/json"
            onSubmit={(e) => {
            e.preventDefault();
            const formDate = new FormData(e.currentTarget);
            const id = item.id;
            const name = formDate.get("name");
            updateUser({id, name});

            }}
       
            >

            {updateUserStatus.isSuccess && (
                    <Alert
                    color={"success"}
                    massage={updateUserStatus.data.message}
                    ></Alert>
                )}
                {updateUserStatus.isError && (
                    <Alert
                    color={"danger"}
                    massage={updateUserStatus.error.data}
                    ></Alert>
                )}
             <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            name='name'
                            value={item?.name ?? ''}
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
                        {updateUserStatus.isError && updateUserErorrs.name && (
                             <span className='text-danger'>{updateUserErorrs.name[0]}</span>
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
                            value={item?.email ?? ''}
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
                        {updateUserStatus.isError && updateUserErorrs.email && (
                             <span className='text-danger'>{updateUserErorrs.email[0]}</span>
                          )}
                          
                          
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">phone</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="phone"
                              name='phone'
                              value={item?.phone ?? ''}
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
                        {updateUserStatus.isError && updateUserErorrs.phone && (
                             <span className='text-danger'>{updateUserErorrs.phone[0]}</span>
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
                              value={item?.password ?? ''}
                              placeholder="Enter User password"
                           
                              {...register("password", {required: 'password is required'
                        
                            
                            })}
                            />
                          {errors.password && (
                              <span className='text-danger'>{errors.password?.message}</span>
                            )}
                        {updateUserStatus.isError && updateUserErorrs.password && (
                             <span className='text-danger'>{updateUserErorrs.password[0]}</span>
                          )} 

                          </div>
                        
                          <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name='password_confirmation'
                              id="password_confirmation" 
                              value={item?.password_confirmation ?? ''}
                              placeholder="Enter User password"
                              {...register("password_confirmation", {required: 'Password confirmation is required',
                              pattern: {
                                value: item?.password,
                                message: "Password Not Match"
                              }
                            })}
                            />
                          {errors.password_confirmation && (
                              <span className='text-danger'>{errors.password_confirmation?.message}</span>
                            )}
                             {updateUserStatus.isError && updateUserErorrs.password_confirmation && (
                             <span className='text-danger'>{updateUserErorrs.password_confirmation[0]}</span>
                          )}  

                          </div>
                      
                           <div className="form-group">
                          <label htmlFor="phone">Role</label>
                          <select  className="form-control" name='role' id='role'  value={item?.role ?? ''}
                          {...register("role", {required: 'Role is required',
                                })}
                          >
                            <option value='1'>Admin</option>
                            <option value='0'>sales</option>
                          </select>

                          {errors.role && (
                              <span className='text-danger'>{errors.role?.message}</span>
                            )}

                          {updateUserStatus.isError && updateUserErorrs.role && (
                             <span className='text-danger'>{updateUserErorrs.password_confirmation[0]}</span>
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