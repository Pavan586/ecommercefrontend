import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import UserDashboard from './UserDashboard';

function ViewBuydata() {
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
    const navigate = useNavigate();


    useEffect(()=> {
        axios.get("http://localhost:8080/fetch/getbuyitems")
        .then(res=>setData(res.data))
        .catch(err=>console.log(err));
    },[])
    const onReplace=(bdate,bid)=> {
        console.log(bdate);
        console.log(bdate);

        axios.get('http://localhost:8080/fetch/replace/'+bdate)
        .then(res=>{
            console.log(res.data);
            if(res.data == "You can replace the item.") {
                navigate(`/replaceitem/${bid}`);
            } else {
            alert(res.data); 
            }
        }) 
        .catch(err=>console.log(err));
    }
  return (
    <>
<div>
<UserDashboard/>
{
data.map((product,index)=>(
    <div key={index}>
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title"> ID :{product.bid}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Required Products :{product.requiredProducts}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Date :{product.bdate}</h6>
                <h5>View your Order</h5>
                <h5>----------------</h5>
                <h5 className="card-title">Product ID :{product.cartData.cdid}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Product Name :{product.cartData.cdname}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Product Proce :{product.cartData.cdprice}</h6>

                <button className='text-decoration-none btn btn-sm btn-warning' onClick={()=>onReplace(product.bdate,product.bid)}>Replace</button>

            </div>
        </div>
    </div>
))

}
</div>
</>
)
}
export default ViewBuydata
