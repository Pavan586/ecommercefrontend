import React from 'react'
import {Link,Outlet} from'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './NavbarStyles.css';
const UserDashboard = ()=> {
    const navigate=useNavigate()
    const handleClick=()=> {
        console.log(localStorage.getItem('token'));
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
        window.location.reload();

    }
    return(
    <div>
        <h1>Welcome User</h1>
        <div>
            <ul className="cont">
                <li className="con"><Link to="/view">View Products</Link></li>
                <li className="con"><Link to="/viewcart">View Cart</Link></li>
                <li className="con"><Link to="/viewbuyitems">Buy Items</Link></li>
                <li className="back"><Link to="/">Back</Link></li>
                <li className="back"><button className='text-decoration-none btn btn-sm btn-danger' onClick={()=>handleClick()}>Log Out</button></li>
            </ul>
        
        </div>
        <Outlet/>
    </div>
    );
    
}
export default UserDashboard

