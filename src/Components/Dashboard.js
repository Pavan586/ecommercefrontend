import React from 'react'
import {Link,Outlet} from'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './NavbarStyles.css';
const Dashboard = ()=> {
    const navigate = useNavigate();

    const handleClick=()=> {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
        window.location.reload();

    }
    return(
    <div>
        <h1>Welcome Admin</h1>
        <div>
            <ul className="cont">
                <li className="con"><Link to="/dashboard/addcategories">Add Categories</Link></li>
                <li className="con"><Link to="/dashboard/viewcategories">Add Products</Link></li>
                <li className="con"><Link to="/dashboard/viewproducts">Add SubProducts</Link></li>
                <li className="con"><Link to="/dashboard/view">View</Link></li>
                <li className="back"><Link to="/">Back</Link></li>
                <li className="back"><button className='text-decoration-none btn btn-sm btn-danger' onClick={()=>handleClick()}>Log Out</button></li>
            </ul>
        
        </div>
        <Outlet/>
    </div>
    );
    
}
export default Dashboard

