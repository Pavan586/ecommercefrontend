import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom';
import Dashboard from './Dashboard';


function AdminViewSubProducts() {
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
    useEffect(()=> {
        axios.get('http://localhost:8080/fetch/subproductsbyproduct/'+name)
        .then(res=>setData(res.data))
        .catch(err=>console.log(err));
    },[])
    const deleteSubProduct=async(id)=> {
        await axios.delete(`http://localhost:8080/admin/deletesubproduct/${id}`)
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
                        <th>Product Price</th>
                        <th>Available Products</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((product,index)=> {
                            return <tr key={index}>
                                <td>{product.pid}</td>
                                <td>{product.pname}</td>
                                <td>{product.pprice}</td>
                                <td>{product.noOfProducts}</td>
                                <td>
                                    <Link className='text-decoration-none btn btn-sm btn-warning' to={`/updatesubproduct/${product.pid}`}>Edit</Link>
                                    <button className='text-decoration-none btn btn-sm btn-danger' onClick={()=>deleteSubProduct(product.pid)}>Delete</button>
                                </td>
                                
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

export default AdminViewSubProducts