import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function Update() {
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
    const {id} =useParams();
    const [values,setValues]=useState({
        id:id,
        name:'',
        price:''
    })
    useEffect(()=> {
        axios.get('http://localhost:8080'+id)
        .then(res => {
            setValues({...values,name:res.data.name,price:res.data.price})
        })
        .catch(err=> console.log(err))
    },[])
    const navigate=useNavigate()
    const handleSubmit=(e)=> {
        e.preventDefault();
        axios.put('http://localhost:8080/admin/update/'+id,values)
        .then(res => {
            navigate('/dashboard/update');
        })
        .catch(err=> console.log(err))
    }


  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Product Name:</label>
                    <input type="text" name='name' className='form-control' placeholder='Enter Product Name' value={values.name} onChange={e=> setValues({...values,name:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="price">Product Price:</label>
                    <input type="text" name='price' className='form-control' placeholder='Enter Product Price' value={values.price} onChange={e=> setValues({...values,price:e.target.value})}/>
                </div>
                <button className='btn btn-info'>Update</button>
            </form>
        </div>
        
    </div>
  )
}

export default Update