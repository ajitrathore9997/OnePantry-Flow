import React from 'react'
import {Outlet} from 'react-router-dom';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';
import Sidebar from './Layout/Sidebar/Sidebar';

export default function Main() {

    // console.log(localStorage.getItem('Token'));
    // if (!localStorage.getItem('Token')) {
    //     return <Navigate to="/login" />
    // }

  return (
   <>
 {console.log('main.js')}
    <Header></Header>
    <Sidebar></Sidebar>

    <div className='content-wrapper'>
        <Outlet></Outlet>
    </div>
    <Footer></Footer>
   </>
   
  )
}
