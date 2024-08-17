import { Link } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Content = (props) => {
    const {title} = props;


    return(
        <>

        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>{title}</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item">
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item active">{title}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section></>
        
    )


}

export default Content;