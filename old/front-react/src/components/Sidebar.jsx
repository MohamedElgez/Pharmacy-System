import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-light-primary elevation-4">
      {/* <!-- Sidebar --> */}
      <div className="sidebar">
        {/* <!-- Sidebar user panel (optional) --> */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image"></div>
          <div className="info"></div>
        </div>
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* <!-- Add icons to the links using the .nav-icon className
                    with font-awesome or any other icon font library --> */}
            <li className="nav-item menu-open">
              <Link to={"/"} className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Home</p>
              </Link>
            </li>
            {/* <!-- medicines --> */}
            <li className="nav-item menu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="fas fa-capsules nav-icon"></i>
                <p>
                  Medicine
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"./AllMedicines"} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p> All Medicines</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"./addMedicine"} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Medicine</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* categories */}
            <li className="nav-item menu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="fa fa-th-large nav-icon" aria-hidden="true"></i>
                <p>
                  Categories
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"AllCategories"} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>All Categories</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"AddCategory"} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Category</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* units */}
            <li className="nav-item menu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="fa fa-th-large nav-icon" aria-hidden="true"></i>
                <p>
                  Units
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"AllUnits"} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>All Units</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"addUnit"} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Unit</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* types */}
            <li className="nav-item menu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="fa fa-leaf nav-icon" aria-hidden="true"></i>

                <p>
                  Types
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"AllTypes"} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>All Types</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"addType"} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Type</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* purchase */}
            <li className="nav-item enu-is-opening menu-open">
              <a href="#" className="nav-link ">
                <i
                  className="fa fa-shopping-cart nav-icon"
                  aria-hidden="true"
                ></i>
                <p>
                  purchase
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"AllPurchases"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p> All purchases</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"AddPurchase"} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add purchase</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* return purchase */}
            <li className="nav-item enu-is-opening menu-open">
              <a href="#" className="nav-link ">
                <i className="fas fa-route  nav-icon  "></i>
                <p>
                  Return Purchase
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"AllReturnPurchases"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p>All Return purchases</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"AddReturnPurchas"} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Return purchase</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* <!-- Invoices --> */}
            <li className="nav-item enu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="fas fa-file-invoice-dollar nav-icon"></i>
                <p>
                  Invoice
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"AllSalesInvoice"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p> All Invoices</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"AddSaleInvoice"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Invoice</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* <!-- Return Invoices --> */}
            <li className="nav-item enu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="fas fa-route  nav-icon  "></i>
                <p>
                  Return Invoice
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"AllReturnSales"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p>All Return Invoice</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"addReturnSale"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Return Invoice</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* <!-- Reports --> */}
            <li className="nav-item enu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="fa fa-file nav-icon" aria-hidden="true"></i>
                <p>
                  Reports
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"expiration"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p> Expiration</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"stockout"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p>Stockout</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* <!-- Customers --> */}
            <li className="nav-item enu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="nav-icon  fa fa-users" aria-hidden="true"></i>
                <p>
                  Customers
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"AllClients"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p> All Customers</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"AddClient"} className="nav-link">
                    {" "}
                    <i
                      className="fa fa-user-plus nav-icon"
                      aria-hidden="true"
                    ></i>
                    <p>Add Customer</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item enu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="fas fa-money-check-alt   nav-icon "></i>
                <p>
                  Payments
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>

              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"slasPayment"} className="nav-link">
                    
                    <i className="far fa-circle nav-icon"></i>
                    <p> Add Client Payment</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"clientsPayment"} className="nav-link">
                  
                    <i className="far fa-circle nav-icon"></i>
                    <p> All Client Payment</p>
                  </Link>
                </li>
                

                <li className="nav-item">
                  <Link to={"purchasPayment"} className="nav-link">
                   
                    <i className="far fa-circle nav-icon"></i>
                    <p> Add Supplier Payment</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"suppliersPayment"} className="nav-link">
                   
                    <i className="far fa-circle nav-icon"></i>
                    <p> All Supplier Payment</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* <!-- Suppliers --> */}
            <li className="nav-item enu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="nav-icon fa fa-truck"></i>
                <p>
                  Suppliers
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"AllSupliers"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p> All Supliers</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"AddSuplier"} className="nav-link">
                    {" "}
                    <i className="far fa-circle nav-icon"></i>
                    <p>Add Supplier</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* <!-- Users --> */}
            <li className="nav-item enu-is-opening menu-open">
              <a href="#" className="nav-link">
                <i className="fa fa-user-md nav-icon" aria-hidden="true"></i>
                <p>
                  Users
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to={"AllUsers"} className="nav-link">
                    <i className="nav-icon  fa fa-users" aria-hidden="true"></i>
                    <p> All Users</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"addUser"} className="nav-link">
                    <i
                      className="fa fa-user-plus nav-icon"
                      aria-hidden="true"
                    ></i>
                    <p>Add User</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* <!-- forms --> */}
          </ul>
        </nav>
        {/* <!-- /.sidebar-menu --> */}
      </div>
      {/* <!-- /.sidebar --> */}
    </aside>
  );
};

export default Sidebar;