import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Menu from '../../Menu';
import Header from '../../Header';
import { ReactSession } from 'react-client-session';


const Layout = () => {
    // const {
    //     isAuthenticated } = useSelector(state => state.auth)     
    //     const [loading, setLoading] = useState(false)
    // if (!localStorage.getItem('token')) {
    //     return <Navigate to="/login" />
    // } if (isAuthenticated === false) {
    //     return <Navigate to="/login" />
    // }

    console.log(localStorage.getItem('userToken'));
    if (!localStorage.getItem('userToken')) {
        return <Navigate to="/login" />
    }


    return (
        <>
            <div className='wrapper'>
                <Header />
                <Menu />
                <div>
                    <Outlet />
                </div>

            </div>
        </>
    )
}

export default Layout