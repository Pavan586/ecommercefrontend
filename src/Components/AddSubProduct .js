import React,{ useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Dashboard from "./Dashboard";

 
function AddSubProduct() {

 const[pid,setPid]=useState("");
 const [pname, setPname] = useState("");
 const [pprice, setPprice] = useState("");
 const [noOfProducts, setNoOfProducts] = useState("");
 const [imageUrl,setImageUrl]=useState("");
 const {cid} =useParams();

 const navigate = useNavigate();
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
 await axios.post('http://localhost:8080/admin/savesubproducts/'+cid, {
    'pid':pid,
    'pname': pname,
    'pprice':pprice,
    'noOfProducts':noOfProducts,
    'imageUrl':imageUrl
 }).then((res)=>
 {
    console.log(token);

 });
 alert("Sub Products Added Successfully"); 
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
                <h1>Create Sub Product</h1>
            <form>
            <div class="form-group">
                    <label>Product Id</label>
                    <input type="text" class="form-control" id="pid" placeholder="Enter Product Id" value={pid} onChange={(event)=>{
                        setPid(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>Product Name</label>
                    <input type="text" class="form-control" id="pname" placeholder="Enter Product Name" value={pname} onChange={(event)=>{
                        setPname(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>Product Price</label>
                    <input type="text" class="form-control" id="pprice" placeholder="Enter Product Price" value={pprice} onChange={(event)=>{
                        setPprice(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>Image Url</label>
                    <input type="text" class="form-control" id="imageUrl" placeholder="Enter Product Url" value={imageUrl} onChange={(event)=>{
                        setImageUrl(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>No Of Products</label>
                    <input type="text" class="form-control" id="noOfProducts" placeholder="Available No Of products" value={noOfProducts} onChange={(event)=>{
                        setNoOfProducts(event.target.value);
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
 
 export default AddSubProduct;