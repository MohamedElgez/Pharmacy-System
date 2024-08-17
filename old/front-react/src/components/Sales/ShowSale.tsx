import React from 'react'

const ShowSaleComponent = (props) => {
    const { 'item': items } = props;
    console.log(items);
  return (
  
        <div className="card text-white  mb-3">
             <table className="table">
                        <thead className='bg-success'>
                          <tr>
                            <th>Medicine Name</th>
                            <th>Code</th>
                            <th>Price</th>
                            <th>Quantity</th>
                     
                         </tr>
                        </thead>
                        <tbody id="table-inputs" className='bg-info'>
                         
                          {items && items.map((item, index)=>(
                             <tr key='index'>
                              <td>{item.items.name}</td>
                              <td>{item.items.code}</td>
                              <td>{item.price}</td>
                              <td>{item.quantity}</td>

                             </tr>
                             ))
                             }
                         
                  
                        </tbody>
                        <tfoot></tfoot>
                </table>
   

       </div>
  )
}

export default ShowSaleComponent;