import React,{ useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

 
function CreateCategory() {

 const[cid,setCid]=useState("");
 const [cname, setCname] = useState("");
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
 await axios.post("http://localhost:8080/admin/savecategory", {
    'cid':cid,
    'cname': cname,
 }).then((res)=>
 {
    console.log(token);

 });
 alert("Category created Successfully"); 
 } catch (err) {
 alert(err);
 }
 }
 
 return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <div class="card">
                <h1>Create Category</h1>
            <form>
            <div class="form-group">
                    <label>Category Id</label>
                    <input type="text" class="form-control" id="cid" placeholder="Enter Category Id" value={cid} onChange={(event)=>{
                        setCid(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>Category Name</label>
                    <input type="text" class="form-control" id="cname" placeholder="Enter Category Name" value={cname} onChange={(event)=>{
                        setCname(event.target.value);
                    }}
                    />
                </div>
                <button type="submit" class="btn btn-primary mt-4" onClick={save}>Save</button>
            </form>
            </div>
        </div>


    </div>
 );
 }
 
 export default CreateCategory;