import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function UpdateCategory() {
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
    const {cid} =useParams();
    const [values,setValues]=useState({
        cid:cid,
        cname:'',
    })
    useEffect(()=> {
        axios.get('http://localhost:8080/fetch/categorybyid/'+cid)
        .then(res => {
            setValues({...values,cname:res.data.cname})
        })
        .catch(err=> console.log(err))
    },[])
    const navigate=useNavigate()
    const handleSubmit=(e)=> {
        e.preventDefault();
        axios.put('http://localhost:8080/admin/updatecategory/'+cid,values)
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
                    <label htmlFor="cid">Category Id:</label>
                    <input type="text" name='cid' className='form-control' placeholder='Enter Category Id' value={values.cid} onChange={e=> setValues({...values,cid:e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="name">Category Name:</label>
                    <input type="text" name='cname' className='form-control' placeholder='Enter Category Name' value={values.cname} onChange={e=> setValues({...values,cname:e.target.value})}/>
                </div>
                <button className='btn btn-info'>Update</button>
            </form>
        </div>
        
    </div>
  )
}

export default UpdateCategory