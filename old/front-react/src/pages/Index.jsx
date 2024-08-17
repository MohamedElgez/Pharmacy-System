import AddPurchase from "./Purchase/AddPurchase";
import AddPurchasPayment from "./Purchase/AddPurchasPayment";
import AddSale from './Sales/AddSale';
import AddSalePayment from "./Sales/AddSalePayment";


const Index = () => {

    return(
 
      <>

   
      {/* <!-- Content Header (Page header) --> */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
          
            <div style={{marginLeft: '280px'}}>


          
            <ul className="nav nav-tabs my-2" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Add Sales Invoice</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Add Purchases</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Add Client Payment</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="supplier-tab" data-bs-toggle="tab" data-bs-target="#supplier" type="button" role="tab" aria-controls="contact" aria-selected="false">Add Supplier Payment</button>
              </li>
            </ul>
            </div>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">{<AddSale/>}</div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">{<AddPurchase/>}</div>
              <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">{<AddSalePayment/>}</div>
              <div className="tab-pane fade" id="supplier" role="tabpanel" aria-labelledby="contact-tab">{<AddPurchasPayment/>}</div>
            </div>
            {/* <!-- /.col --> */}
          </div>
          {/* <!-- /.row --> */}
        </div>
        {/* <!-- /.container-fluid --> */}
      </div>
      {/* <!-- /.content-header --> */}

      {/* <!-- Main content --> */}
     
      {/* <!-- /.content --> */}
      </>
)

}

export default Index;