import React,{ useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

 
function Register() {
 
 const [uname, setUname] = useState("");
 const [pwd, setPwd] = useState("");
 const [role, setRole] = useState("");
 const [age, setAge] = useState("");
 const [email, setEmail] = useState("");

 const navigate = useNavigate();
 async function save(event) {
 event.preventDefault();
 try {
 await axios.post("http://localhost:8080/user/new", {
 uname: uname,
 pwd: pwd,
 email:email,
 role: role,
 age:age
 });
 alert("User Registation Successfully"); 
 navigate("/");
 } catch (err) {
 alert(err);
 }
 }
 
 return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <div class="card">
                <h1>User Registation</h1>
            <form>
                <div class="form-group">
                    <label>User Name</label>
                    <input type="text" class="form-control" id="uname" placeholder="Enter Name" value={uname} onChange={(event)=>{
                        setUname(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>User Password</label>
                    <input type="password" class="form-control" id="pwd" placeholder="Enter Password" value={pwd} onChange={(event)=>{
                        setPwd(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>User Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter Email" value={email} onChange={(event)=>{
                        setEmail(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>User Age</label>
                    <input type="number" class="form-control" id="age" placeholder="Enter Age" value={age} onChange={(event)=>{
                        setAge(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <input type="text" class="form-control" id="role" placeholder="Enter Role" value={role} onChange={(event)=>{
                        setRole(event.target.value);
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
 
 export default Register;