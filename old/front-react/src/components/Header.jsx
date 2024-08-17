import { useLogoutQuery } from "../services/medicines/medicines";
import { Link, redirect, useNavigate } from 'react-router-dom';

const Header = () => {


  const navigate = useNavigate();
  const logout =  () => {
    
    window.location.href = './login'
  }
    return(
        <nav className="main-header navbar navbar-expand ">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">Home</Link>
          </li>
        </ul>
  
        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
        
          <li className="nav-item">
            <a className="nav-link" onClick={()=>{
                localStorage.removeItem('token')
                logout()

            }}
            type='submit' role="button">
              <span>Logout</span>
            </a>
          </li>
        </ul>
        
      </nav>

    )


}

export default Header;