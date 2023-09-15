import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import Dashboard from './Dashboard';
function ViewCategory() {
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

    const [data,setData]=useState([])
    useEffect(()=> {
        axios.get("http://localhost:8080/fetch/allcategories")
        .then(res=>setData(res.data))
        .catch(err=>console.log(err));
    },[])
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Add Product</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((category,index)=> {
                            return <tr key={index}>
                                <td>{category.cid}</td>
                                <td>{category.cname}</td>
                                <td><Link className='text-decoration-none btn btn-sm btn-success' to={`/addproduct/${category.cid}`}>Add</Link></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ViewCategory