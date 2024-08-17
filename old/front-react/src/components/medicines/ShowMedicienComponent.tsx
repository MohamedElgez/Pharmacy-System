import React from 'react'

const ShowMedicienComponent = (props) => {
    const {item } = props;

  return (

      //   <div classNameName="card text-white bg-primary mb-3">
      //       <div classNameName="card-header">{item.name}</div>
      //       <div classNameName="card-body">
      //           <h5 classNameName="card-title">price:{item.price}</h5>
      //           <p classNameName="card-text">Quantity:{item.quantity}</p>
      //       </div>
      //  </div>


      <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3> Item Data</h3>
                </div>
               
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{item.name}</td>
                      </tr>
                      <tr>
                        <th>Code</th>
                        <td>{item?.code}</td>
                      </tr>
                      <tr>
                        <th>Category</th>
                        <td>{item.category?.name}</td>
                      </tr>
                      <tr>
                        <th>Unit</th>
                        <td>{item.unit?.name}</td>
                      </tr>
                  
                      <tr>
                        <th>Type</th>
                        <td>{item.type?.name}</td>
                      </tr>
                      <tr>
                        <th>Expiration Date</th>
                        
                        <td>{item?.expiration}</td>
                      </tr>
                      <tr>
                        <th>Created At</th>
                        <td>{item?.created_at}</td>

                      </tr>
                      <tr>
                        <th>Updated At</th>
                        <td>{item?.updated_at}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              
              </div>
            
            </div>
          </div>
  )
}

export default ShowMedicienComponent;