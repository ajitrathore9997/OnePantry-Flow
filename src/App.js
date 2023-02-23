// import logo from './logo.svg';

import './App.css';   
import Dashboard from './Admin/Main/Pages/Dashboard/Dashboard';
import Login from './Admin/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './Admin/Main/Main';
import ChangePassword from './Admin/Main/Pages/Setting/ChangePassword/ChangePassword';
import Profile from './Admin/Main/Pages/Setting/Profile/Profile';
import Order from './Admin/Main/Pages/Order/Order';
import { ToastContainer } from 'react-toastify';
import { User } from './Admin/Main/Pages/User/User';
import { Category } from './Admin/Main/Pages/Category Management/Category'; 
import { SubCategory } from './Admin/Main/Pages/SubCategory/SubCategory';
import ViewUser from './Admin/Main/Pages/User/ViewUser'
import EditUser from './Admin/Main/Pages/User/EditUser';
import UserProductMngt from './Admin/Main/Pages/User/UserProductMngt';
import UserOrderMngt from './Admin/Main/Pages/User/UserOrderMngt';
import Product from './Admin/Main/Pages/Product/Product';
import ViewProduct from './Admin/Main/Pages/Product/ViewProduct';
import EditProduct from './Admin/Main/Pages/Product/EditProduct';
// import Commission from './Admin/Main/Pages/Commission/Commission';
import {  useState } from 'react';
// import { GetService } from './Services/ConstantService';
// import { API_URL } from './Services/APIservice';
// import { toastEmmit } from './Helper/Toastr';

function App() {

  const [admin,setAdmin] = useState(false)

 

  const sendAdminDetails = ( ) => { 
    setAdmin(!admin)
  }


  return (
    <div className="wrapper">



      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path='/panel' element={<Main admin={admin} />}>
          <Route path="" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path='user/view/:id' element={<ViewUser/>} />
          <Route path='user/edit/:id' element={<EditUser/>} />
          <Route path='/panel/user/product-by-seller/view/:id' element={<UserProductMngt/>} />
          <Route path='/panel/User/order/view/:id' element={<UserOrderMngt/>} />
          <Route path="category" element={<Category />} />
          <Route path="sub-category" element={<SubCategory />} />
          <Route path='product' element={<Product />}>          </Route>
          <Route path='product/view/:id' element={<ViewProduct />} />
          <Route path='product/edit/:id' element={<EditProduct />} />
          <Route path="order" element={<Order />} />
          {/* <Route path='commission' element={<Commission/> } /> */}
          <Route path="profile"   element={<Profile sendAdminDetails={sendAdminDetails}/>} />
          <Route path="change-password" element={<ChangePassword/>} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
 
      <ToastContainer />

    </div>
  );
}

export default App;