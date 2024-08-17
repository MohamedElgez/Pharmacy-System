
import {useLoginMutation} from "../services/medicines/medicines";
import { useForm } from "react-hook-form";
import Alert from "../components/Alert";
import { useAppDispatch, useAppSelector } from "./../app/hooks";
import {loginSlice} from "../features/loginSlice";
import { useNavigate } from "react-router-dom";
import "../../public/dist/css/custom.css"
import('../../public/dist/css/login.css')
const Login = () => {

 const navigate = useNavigate();
 
 const [auth, loginStatus] =  useLoginMutation();
  const user = loginStatus?.data?.data?.user
const { register , handleSubmit, formState: { errors } } = useForm();
const dispatch = useAppDispatch();

if(loginStatus.isSuccess)
{
  dispatch(loginSlice(
    {
    'auth': true,
    'id': user?.id,
    'token': user?.token,
    'name': user?.name,
    'role': user?.role,
    'phone' : user?.phone,
 
    }
  ))
  localStorage.setItem("token", loginStatus.data?.data?.user?.token);
window.location.href = '/'
}

const loginSubmit = (data) => {
  const phone = data.phone;
  const password = data.password;

  auth({
    phone,
    password
  })
}
    return(

      <div id="login-container" className="login-container">
        <div id="login-container-form">
    
            <div id="login-form-div" className="p-4">
            {loginStatus.isSuccess && (
              
                  <Alert
                    color={"success"}
                    massage={loginStatus.data.message}
                  ></Alert>
                )}
                {loginStatus.isError && (
                  <Alert
                    color={"danger"}
                    massage="These credentials do not match our records."
                  ></Alert>
                )}
                  <div className="m-3">
                    <h3 className="text-light text-center">Log IN</h3>
                  </div>
              <form action="" onSubmit={handleSubmit(loginSubmit)}>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="inputEmail4" className="form-label text-light">Phone</label>
                    <input type="text" className="form-control" name='phone' id="inputEmail4"
                      {...register("phone", {required: 'phone is required'})}
                      
                    />
                      {
                      errors.phone &&  
                     ( <span className='text-danger'>{errors.phone.message}</span>)
                    } 
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="inputPassword4" className="form-label text-light">Password</label>
                    <input type="password"  {...register("password", {required: 'password is required'})} name='password' className="form-control" id="inputPassword4"/>
                    {
                      errors.password && (
                      <span className='text-danger'>{errors.password.message}</span>
                      )
                    } 
                  </div>
                </div>
          
                <div className="row mb-3">
                  <div className="col-12">
                    <button type="submit" id="form-btn">Log In</button>
                  </div>
                </div>
              
    
                </form>
            </div>
        
        </div>
  
    </div>
)

}

export default Login;