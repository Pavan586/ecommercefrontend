import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function UpdateMainProducts() {
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
    })
    useEffect(()=> {
        axios.get('http://localhost:8080/fetch/productbyid/'+id)
        .then(res => {
            setValues({...values,name:res.data.name})
        })
        .catch(err=> console.log(err))
    },[])
    const navigate=useNavigate()
    const handleSubmit=(e)=> {
        e.preventDefault();
        axios.put('http://localhost:8080/admin/updateproduct/'+id,values)
        .then(res => {
            navigate('/dashboard/view');
        })
        .catch(err=> console.log(err))
    }


  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">Product Id:</label>
                    <input type="text" name='id' className='form-control' placeholder='Enter Product Id' value={values.id} onChange={e=> setValues({...values,id:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="name">Product Name:</label>
                    <input type="text" name='name' className='form-control' placeholder='Enter Product Name' value={values.name} onChange={e=> setValues({...values,name:e.target.value})}/>
                </div>
                <button className='btn btn-info'>Update</button>
            </form>
        </div>
        
    </div>
  )
}

export default UpdateMainProducts