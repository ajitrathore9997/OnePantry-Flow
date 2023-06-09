// import logo from './logo.svg';

import './App.css';   
import Dashboard from './Admin/Main/Pages/Dashboard/Dashboard';
import Login from './Admin/Login/Login';
import { Navigate, Route,  Routes} from 'react-router-dom';
import Main from './Admin/Main/Main';
import ChangePassword from './Admin/Main/Pages/Setting/ChangePassword/ChangePassword';
import Profile from './Admin/Main/Pages/Setting/Profile/Profile';
import Order from './Admin/Main/Pages/Order/Order';
import ViewOrder from './Admin/Main/Pages/Order/ViewOrder';
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
import Commission from './Admin/Main/Pages/Commission/Commission';
import Transaction from './Admin/Main/Pages/Transaction/Transaction';
import Refund from './Admin/Main/Pages/Refund/Refund';
import ViewTransaction from './Admin/Main/Pages/Transaction/ViewTransaction';
import ViewDispute from './Admin/Main/Pages/Disputes/ViewDispute';
import Disputes from './Admin/Main/Pages/Disputes/Disputes';

import Notifications from './Admin/Main/Pages/Notifications/Notifications';
import Content from './Admin/Main/Pages/Content Management/Content';
import ViewContent from './Admin/Main/Pages/Content Management/ViewContent';
import EditContent from './Admin/Main/Pages/Content Management/EditContent';

import Help from './Admin/Main/Pages/Help Management/Help';


import {  useState } from 'react'; 

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
          <Route path="user" element={<User users='all' />} />
          <Route path = 'user/active' element={<User users='active' />} />
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
          <Route path='order/view/:id' element={<ViewOrder />} />
          <Route path='transactions' element={<Transaction/> } />
          <Route path='transactions/view/:id' element={<ViewTransaction /> } />
          <Route path='disputes' element={<Disputes />} />
          <Route path='disputes/view/:id' element={<ViewDispute/>} />
          <Route path='refunds' element={<Refund />} />
          <Route path='commission' element={<Commission/> } />

          <Route path='content' element={<Content/> } />
          <Route path='content/view/:id' element={<ViewContent />} />
          <Route path='content/edit/:id' element={<EditContent />} />
          
          <Route path='help' element={<Help/> } />

          <Route path='notifications' element={<Notifications/> } />


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