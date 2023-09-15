import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

import {Link} from 'react-router-dom';
import UserDashboard from './UserDashboard';

function UserViewMainProducts() {
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
  return (
    <>
    <div>
    <UserDashboard/>
    {
    data.map((product,index)=>(
        <div key={index}>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">ID :{product.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Name :{product.name}</h6>
                    <Link className='text-decoration-none btn btn-sm btn-success' to={`/userviewsub/${product.name}`}>View SubProducts</Link>
                </div>
            </div>
        </div>
    ))

    }
    </div>
    </>
  )
}

export default UserViewMainProducts
