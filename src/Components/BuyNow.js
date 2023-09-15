import React,{ useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import UserDashboard from "./UserDashboard";

 
function BuyNow() {

 const [requiredProducts, setRequiredProducts] = useState("");
 const [address, setAddress] = useState("");
 const [paymentMethod, setPaymentMethod] = useState("");
 const [bdate, setBdate] = useState(new Date());
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
 await axios.post('http://localhost:8080/fetch/savebuydata/'+id, {
    'requiredProducts': requiredProducts,
    'address': address,
    'paymentMethod': paymentMethod,
    'bdate':bdate
 }).then((res)=>
 {
    console.log(token);

 });
 alert("Product Placed Succesfully"); 
 } catch (err) {
 alert(err);
 }
 }
//  let currentDay= String(bdate.getDate()).padStart(2, '0');

// let currentMonth = String(bdate.getMonth()+1).padStart(2,"0");

// let currentYear = bdate.getFullYear();

// we will display the date as DD-MM-YYYY 

// let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
let day = bdate.getDate()
let month = bdate.getMonth() + 1
let year = bdate.getFullYear()

let fullDate = `${day}-${month}-${year}`
console.log(fullDate);
 
 return (
    <>
    <UserDashboard/>
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <div class="card">
                <h1>Buy Product</h1>
            <form>
                <div class="form-group">
                    <label>Date</label>
                    <input type="text" class="form-control" id="bdate" value={fullDate}/>
                </div>
                <div class="form-group">
                    <label>Required Products</label>
                    <input type="text" class="form-control" id="requiredProducts" placeholder="Enter Products you want" value={requiredProducts} onChange={(event)=>{
                        setRequiredProducts(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="textarea" class="form-control" rows="4" cols="50" id="address" placeholder="Enter Address" value={address} onChange={(event)=>{
                        setAddress(event.target.value);
                    }}
                    />
                </div>
                <div class="form-group">
                    <label>Payment Method</label>
                    <select name="paymentMethod" id="paymentMethod" onChange={(event)=>{
                        setPaymentMethod(event.target.value);
                    }}>
                        <option value=""></option>
                        <option value="Phone Pay">Phone Pay</option>
                        <option value="Paytm">Paytm</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="Amazon Pay">Amazon Pay</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary mt-4" onClick={save}>Buy Item</button>
            </form>
            </div>
        </div>


    </div>
    </>
 );
 }
 
 export default BuyNow;