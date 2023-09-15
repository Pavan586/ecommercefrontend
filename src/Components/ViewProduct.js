import React,{useEffect,useState} from 'react'
import axios from 'axios'

function ViewProduct() {
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
        axios.get("http://localhost:8080/fetchAll")
        .then(res=>setData(res.data))
        .catch(err=>console.log(err));
    },[])
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((product,index)=> {
                            return <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>

                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ViewProduct