import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../../../../Services/APIservice'
import { PostService } from '../../../../Services/ConstantService'
import { ImageURL } from '../../../../Environment/Environment'
import {no_user} from '../../../../assets/img/no_user.jpg'


const ViewUser = () => {
    const no_user = '../../../../assets/img/no_user.jpg'
    const {id} = useParams()
    const [user,setUser] = useState()
                

    const getUserData = async () =>{
        console.log(id)

        const data = {
            user_id: id
        }

        PostService(API_URL.GET_USER_BY_ID,data).then((res) => {
            console.log(res)
            if(res.status === 200){
                setUser(res.data.data)
                console.log(user)
            }
        }, (err) => {
            console.log(err.response.data)
             
        })

    }

    useEffect(()=>{
        getUserData()
    },[])

    return (
        <>
            <div className="ng-star-inserted">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="default_color">
                                    View User
                                </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/panel/dashboard" href="/panel/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/panel/User" href="/panel/User">
                                            Users List
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        View User
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content d-flex justify-content-center">
                    <div className="container p-2">
                        <div className="card p-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="img_box">
                                            <img alt="userImage" className="profile_img rounded-circle" height={100} style={{ cursor: 'pointer' }} src={ user && user.image?(ImageURL+(user.image)):'../../../../assets/img/no_user.jpg' } />
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="ms-3">
                                            <h6 className="text-muted">
                                                User Name : {user && user.first_name} {user && user.last_name}
                                            </h6>
                                            <h6 className="text-muted">
                                                Email : {user && user.email}
                                            </h6>
                                            <h6 className="text-muted">
                                                Role :
                                                <span >
                                                    {user && user.role.name}
                                                </span>
                                            </h6>
                                            <h6 className="text-muted">      
                                                Status :
                                                {user && user.isActive &&  <span className="text-success">
                                                  Active
                                                </span>}
                                                {user && !(user.isActive) &&  <span className="text-danger">
                                                  Deactive
                                                </span>}
                                            </h6>
                                            <h6 className="text-muted">
                                                Phone : {user && user.phone_number? user.phoneNumber:<>Not available</>}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                 
            </div>

        </>
    )
}

export default ViewUser