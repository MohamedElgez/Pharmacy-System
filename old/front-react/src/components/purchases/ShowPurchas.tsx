import React from 'react'

const ShowPurchasComponent = (props) => {
    const { 'item': items } = props;
    console.log(items);
  return (
  
        <div className="card text-black mb-3">
             <table className="table">
                        <thead>
                          <tr className='bg-light'>
                          <th>code</th>
                            <th>Medicine Name</th>
                            <th>Supplier Price</th>
                            <th>sell Price</th>
                            <th>Quantity</th>
                            <th>Discount %</th>
                            <th>total</th>
                            <th>Expire Date</th>
                         </tr>
                        </thead>
                        <tbody id="table-inputs">
                         
                          {items && items.map((item, index)=>(
                             <tr key='index'>
                              <td>{item.items?.code}</td>
                              <td>{item.items?.name}</td>
                              
                              <td>{item.suplier_price}</td>
                              <td>{item.sell_price}</td>
                              <td>{item.quantity}</td>
                              <td>{item.discount}</td>
                              <td>{item.total}</td>
                              <td>{item.expire_date}</td>
                             </tr>
                             ))
                             }
                         
                  
                        </tbody>
                        <tfoot></tfoot>
                </table>
   

       </div>
  )
}

export default ShowPurchasComponent;