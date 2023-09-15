import React, { useEffect, useState } from 'react'

function Cart(props) {
    const [data,setData] = useState([props])
    
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d,i)=>(
                        <tr key={i}>
                            <td>{d.pid}</td>
                            <td>{d.pname}</td>
                            <td>{d.pprice}</td>
                            
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Cart