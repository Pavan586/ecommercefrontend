import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function UpdateSubProducts() {
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
    const {pid} =useParams();
    const [values,setValues]=useState({
        pid:pid,
        pname:'',
        pprice:'',
        noOfProducts:''
    })
    useEffect(()=> {
        axios.get('http://localhost:8080/fetch/subproductbyId/'+pid)
        .then(res => {
            setValues({...values,pname:res.data.pname,pprice:res.data.pprice,noOfProducts:res.data.noOfProducts})
        })
        .catch(err=> console.log(err))
    },[])
    const navigate=useNavigate()
    const handleSubmit=(e)=> {
        e.preventDefault();
        axios.put('http://localhost:8080/admin/updatesubproduct/'+pid,values)
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
                    <label htmlFor="pname">Product Name:</label>
                    <input type="text" name='pname' className='form-control' placeholder='Enter Product Name' value={values.pname} onChange={e=> setValues({...values,pname:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="pprice">Product Price:</label>
                    <input type="text" name='pprice' className='form-control' placeholder='Enter Product Price' value={values.pprice} onChange={e=> setValues({...values,pprice:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="noOfProducts">Products In Stock:</label>
                    <input type="text" name='noOfProducts' className='form-control' placeholder='Enter Availability Products' value={values.noOfProducts} onChange={e=> setValues({...values,noOfProducts:e.target.value})}/>
                </div>
                <button className='btn btn-info'>Update</button>
            </form>
        </div>
        
    </div>
  )
}

export default UpdateSubProducts