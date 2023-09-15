import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom';
import Dashboard from './Dashboard';
import UserDashboard from './UserDashboard';


function CartItems() {
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
    const[newdata,setNewdata]=useState([])
    const [sum,setSum]=useState(0)
    useEffect(()=> {
        axios.get("http://localhost:8080/fetch/getallcartdatabyuserid")
        .then(res=> {
            setData(res.data)
            getTotal();
        })
        .catch(err=>console.log(err));
    },[])
    const getTotal=()=> {
        axios.get("http://localhost:8080/fetch/getcartsum")
        .then(resp=>setSum(resp.data))
        .catch(err=>console.log(err));
    }
    const removeItem=(id)=> {
        axios.delete('http://localhost:8080/fetch/removefromcart/'+id)
     }
  return (
    <>
<div>
<UserDashboard/>
<h2>Your Total Cart Price is {sum}</h2>

{
data.map((product,index)=>(
    <div key={index}>
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title"> ID :{product.cdid}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Name :{product.cdname}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Price :{product.cdprice}</h6>
                <Link className='text-decoration-none btn btn-sm btn-success' to={`/buynow/${product.cdid}`}>Buy Now</Link>
                <button className='text-decoration-none btn btn-sm btn-danger' onClick={()=>removeItem(product.cdid)}>Remove</button>

            </div>
        </div>
    </div>
))

}
</div>
</>
)
}
export default CartItems
