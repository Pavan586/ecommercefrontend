import React,{ useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Dashboard from "./Dashboard"; 
import UserDashboard from "./UserDashboard";

 
function ReplaceItem() {

    
 const[rid,setRid]=useState("");
 const [reason, setReason] = useState("");
 const [comment, setComment] = useState("");

 const navigate = useNavigate();
 const {id} =useParams();

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
 await axios.post('http://localhost:8080/fetch/savereplaceitem/'+id, {
    'reason': reason,
    'comments':comment
 }).then((res)=>
 {
    console.log(token);

 });
 alert("Product Replace Request Sent Successfully");
 } catch (err) {
 alert(err);
 }
 }
 
 return (
    <>
    <UserDashboard/>
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <div class="card">
                <h1>Replace Product</h1>
            <form>
                <div class="form-group">
                    <label>Reason</label>
                    <input type="text" class="form-control" id="reason" placeholder="Enter Reason" value={reason} onChange={(event)=>{
                        setReason(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>Additional Comments</label>
                    <input type="text" class="form-control" id="comment" placeholder="Enter any additional comments" value={comment} onChange={(event)=>{
                        setComment(event.target.value);
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
 
 export default ReplaceItem;