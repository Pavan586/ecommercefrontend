import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import CreateProducts from './Components/CreateProducts';
import ViewProduct from './Components/ViewProduct';
import UpdateProduct from './Components/UpdateProduct';
import Update from './Components/Update';
import UserDashboard from './Components/UserDashboard';
import AddProduct from './Components/AddProduct';
import ViewSubProducts from './Components/ViewSubProducts';
import CreateCategory from './Components/CreateCategory';
import ViewCategory from './Components/ViewCategory';
import AddSubProduct from './Components/AddSubProduct ';
import ViewMainProducts from './Components/ViewMainProducts';
import AdminViewCategory from './Components/AdminViewCategory';
import AdminViewMainProducts from './Components/AdminViewMainProducts';
import AdminViewSubProducts from './Components/AdminViewSubProducts';
import UserViewCategory from './Components/UserViewCategory';
import UserViewMainProducts from './Components/UserViewMainProducts';
import UserViewSubProducts from './Components/UserViewSubProducts';
import UpdateCategory from './Components/UpdateCategory';
import UpdateMainProducts from './Components/UpdateMainProducts';
import UpdateSubProducts from './Components/UpdateSubProducts';
import CartItems from './Components/CartItems';
import BuyNow from './Components/BuyNow';
import ViewBuydata from './Components/ViewBuydata';
import ReplaceItem from './Components/ReplaceItem';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/userregister" element={<Register/>} />
        <Route path="/userdashboard" element={<UserDashboard/>} />
        <Route path='/viewprod/:cname' element={<AdminViewMainProducts/>}/>
        <Route path='/userviewprod/:cname' element={<UserViewMainProducts/>}/>
        <Route path='/viewsub/:name' element={<AdminViewSubProducts/>}/>
        <Route path='/userviewsub/:name' element={<UserViewSubProducts/>}/>
        <Route path='/updatecategory/:cid' element={<UpdateCategory/>}/>
        <Route path='/updatemainproduct/:id' element={<UpdateMainProducts/>}/>
        <Route path='/updatesubproduct/:pid' element={<UpdateSubProducts/>}/>
        <Route path='/buynow/:id' element={<BuyNow/>}/>
        <Route path='/viewbuyitems' element={<ViewBuydata/>}/>
        <Route path='/replaceitem/:id' element={<ReplaceItem/>}/>






        <Route path="/view" element={<UserViewCategory/>}/>
        <Route path="/viewcart" element={<CartItems/>}/>
        <Route path="/" element={<Login/>} />
        <Route path='/addproduct/:cid' element={<AddProduct/>}/>
        <Route path='/addsubproduct/:cid' element={<AddSubProduct/>}/>
        <Route path="/dashboard" element={<Dashboard/>} >
          <Route path="/dashboard/addcategories" element={<CreateCategory/>} />
          <Route path="/dashboard/viewcategories" element={<ViewCategory/>} />
          <Route path="/dashboard/viewproducts" element={<ViewMainProducts/>} />
          <Route path="/dashboard/view" element={<AdminViewCategory/>}/>
            {/* <Route path="/dashboard/view/viewmainproducts" element={<AdminViewCategory/>} />
            <Route path="/dashboard/view/viewsubproducts" element={<AdminViewMainProducts/>} />
          </Route> */}

        </Route>

      </Routes>
      </BrowserRouter>
    
      
    </div>
  );
}

export default App;
