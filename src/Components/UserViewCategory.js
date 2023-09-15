import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import UserDashboard from './UserDashboard';
function UserViewCategory() {
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
    <>
    <div>
    <UserDashboard/>
    {
    data.map((category,index)=>(
        <div key={index}>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title"> ID :{category.cid}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Name :{category.cname}</h6>
                    <Link className='text-decoration-none btn btn-sm btn-success' to={`/userviewprod/${category.cname}`}>View Products</Link>
                </div>
            </div>
        </div>
    ))

    }
    </div>
    </>
  )
}
  

export default UserViewCategory