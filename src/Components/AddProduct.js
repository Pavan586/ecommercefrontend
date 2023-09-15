import React,{ useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Dashboard from "./Dashboard"; 

 
function AddProduct() {

    
 const[id,setId]=useState("");
 const [name, setName] = useState("");
 const navigate = useNavigate();
 const {cid} =useParams();

 async function save(event) {
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
 event.preventDefault();
 try {
 await axios.post('http://localhost:8080/admin/saveproducts/'+cid, {
    'id':id,
    'name': name,
 }).then((res)=>
 {
    console.log(token);

 });
 alert("Product created Successfully");
 } catch (err) {
 alert(err);
 }
 }
 
 return (


    <>
    <Dashboard/>
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <div class="card">
                <h1>Create Product</h1>
            <form>
            <div class="form-group">
                    <label>Product Id</label>
                    <input type="text" class="form-control" id="id" placeholder="Enter Product Id" value={id} onChange={(event)=>{
                        setId(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>Product Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Product Name" value={name} onChange={(event)=>{
                        setName(event.target.value);
                    }}
                    />
                </div>
                <button type="submit" class="btn btn-primary mt-4" onClick={save}>Save</button>
            </form>
            </div>
        </div>


    </div>
    </>
 );
 }
 
 export default AddProduct;