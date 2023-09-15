import {  useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

import axios from "axios";
import jwtDecode from 'jwt-decode';



function Login() {
    const [role,setRole]=useState("");
    const[res,setRes]=useState("");
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [result,setResult]=useState("");

    const navigate = useNavigate();
    let token;
    async function login(event) {

        event.preventDefault();

        try {

          await axios.post("http://localhost:8080/user/authenticate", {

            username: username,

            password: password,


            }).then((res) =>

            {
                localStorage.clear();
                localStorage.setItem('token',res.data);
                console.log(localStorage.getItem('token'));
                token=res.data;
                setResult(res.data);
                console.log(res.data);
                const decodedToken=jwtDecode(token);
                const userRoles=decodedToken.roles;
                console.log(userRoles);
                if(userRoles == 'ROLE_ADMIN') {
                    alert("Admin Login Success");
                    navigate('/dashboard');

                } else {
                    alert("User Login Success");
                    navigate('/userdashboard');
                }
                
            
          }, fail => {
            setRes(fail.response.data);

           console.error(fail.response.data); // Error!

  });

        }


         catch (err) {

          alert(err);

        }


      }


    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <div class="row">
                {
                res
            }
                    <h2>User Login</h2>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <form>
                            <div class="form-group">
                                <label>User Name</label>
                                <input type="text" class="form-control" id="username" placeholder="Enter Username" value={username} onChange={(event)=>{
                                    setUsername(event.target.value);
                                }}
                                />
                            </div>
                            <div class="form-group">
                                <label>User Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Enter Password" value={password} onChange={(event)=>{
                                    setPassword(event.target.value);
                                }}
                                />
                            </div>
                            <button type="submit" class="btn btn-primary mt-4" onClick={login}>Login</button>
                            <p>New User ?</p>
                            <Link to='/userregister'><button type="button" class="btn btn-primary">Register</button></Link>
                    
                        </form>
                    </div>
                </div>
            </div>
        </div>

       
    );

  }


  export default Login;