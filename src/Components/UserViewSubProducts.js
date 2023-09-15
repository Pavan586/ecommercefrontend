import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import UserDashboard from './UserDashboard';

function UserViewSubProducts() {
    const token=localStorage.getItem('token');
    axios.interceptors.request.use(
        config=> {
            config.headers.authorization=`Bearer ${token}`;
            return config;
        },
        error=> {
            return Promise.reject(error);
        }

    );
    const {name} =useParams();
    const [data,setData]=useState([])
    const[rest,setRest]=useState([])
    useEffect(()=> {
        axios.get('http://localhost:8080/fetch/subproductsbyproduct/'+name)
        .then(res=>{
            setData(res.data);
            console.log(res.data)
            console.log(data[0].imageUrl);

        })
        .catch(err=>console.log(err));
    },[])
    const handler =(id)=>{
        alert("Product added to cart Successfully");
        axios.get('http://localhost:8080/fetch/savecartdata/'+id)
        .then(resp=>setRest(resp.data))
        .catch(err=>console.log(err));
    }
    
  return (
    <>
    <div>
    <UserDashboard/>
    {
    data.map((product,index)=>(
        <div key={index}>
            <div className="card" >
                <div className="card-body">
                <img src={product.imageUrl} alt="Laptop"/>
                    {/* <img src={process.env.PUBLIC_URL+{product.imageUrl}} alt="Laptop"/> */}
                    <h5 className="card-title">ID :{product.pid}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Name :{product.pname}</h6>

                    <h5 className="card-subtitle mb-2 text-muted">Price :{product.pprice}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">In Stock :{product.noOfProducts}</h6>
                    <button className='text-decoration-none btn btn-sm btn-success' onClick={()=>handler(product.pid)}>Add To Cart</button>
                </div>
            </div>
        </div>
    ))

    }
    </div>
    </>
  )
}
//     <>
//     <UserDashboard/>
//     <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
//         <div className='w-50 border bg-secondary text-white p-5'>
//             <table className='table'>
//                 <thead>
//                     <tr>
//                         <th>Product ID</th>
//                         <th>Product Name</th>
//                         <th>Product Price</th>
//                         <th>Available Products</th>
//                         <th>Add Item</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         data.map((product,index)=> {
//                             return <tr key={index}>
//                                 <td>{product.pid}</td>
//                                 <td>{product.pname}</td>
//                                 <td>{product.pprice}</td>
//                                 <td>{product.noOfProducts}</td>
//                                 <td><button className='text-decoration-none btn btn-sm btn-success' onClick={()=>handler(product.pid)}>Add To Cart</button></td>
//                             </tr>
//                         })
//                     }
//                 </tbody>
//             </table>
//         </div>
//     </div>
//     </>
//   )
// }

export default UserViewSubProducts

