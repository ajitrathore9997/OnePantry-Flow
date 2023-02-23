import React from 'react'
import {Outlet} from 'react-router-dom';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';
import Sidebar from './Layout/Sidebar/Sidebar';

export default function Main({admin}) {

    // console.log(localStorage.getItem('Token'));
    // if (!localStorage.getItem('Token')) {
    //     return <Navigate to="/login" />
    // }

  return (
   <>
 {/* {console.log('main.js')} */}
    <Header></Header>
    <Sidebar adminDetail={admin}></Sidebar>
    <div className='content-wrapper'>
        <Outlet></Outlet>
    </div>
    {/* {console.log('main.js 19')} */}
    <Footer></Footer>
   </>
   
  )
}
