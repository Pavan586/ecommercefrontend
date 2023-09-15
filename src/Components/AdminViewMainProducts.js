import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

import {Link} from 'react-router-dom';
import Dashboard from './Dashboard';

function AdminViewMainProducts() {
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
    const {cname} =useParams();
    const [data,setData]=useState([])
    useEffect(()=> {
        axios.get('http://localhost:8080/fetch/productsbycategory/'+cname)
        .then(res=>setData(res.data))
        .catch(err=>console.log(err));
    },[])
    const deleteMainProducts=async(id)=> {
        await axios.delete(`http://localhost:8080/admin/deleteproduct/${id}`)
    }
  return (
    <>
    <Dashboard/>
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Action</th>
                        <th>View Subproducts</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((product,index)=> {
                            return <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td><Link className='text-decoration-none btn btn-sm btn-warning' to={`/updatemainproduct/${product.id}`}>Edit</Link>
                                <button className='text-decoration-none btn btn-sm btn-danger' onClick={()=>deleteMainProducts(product.id)}>Delete</button>
                                </td>
                                <td><Link className='text-decoration-none btn btn-sm btn-success' to={`/viewsub/${product.name}`}>View SubProducts</Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default AdminViewMainProducts