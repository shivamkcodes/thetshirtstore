import React from 'react'
import Base from "../core/Base"
import {isAuthenticated}  from "../auth/helper/index"
import { Link } from 'react-router-dom';


const AdminDashboard=( )=> {

    const {user:{name,email,role}}=isAuthenticated();

    const adminLeftSide=()=>{
        return(
            <div className="card">
            <h4 className="card-header bg-dark text-white">
    Admin Navigation
            </h4>

            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link text-success" to="/admin/create/category">Create Categories</Link></li>
                <li className="list-group-item">
                    <Link className="nav-link text-success" to="/admin/categories">Manage Categories</Link></li>
                <li className="list-group-item">

                    <Link className="nav-link text-success" to="/admin/create/product">Create Product</Link></li>
                <li className="list-group-item">
                    <Link className="nav-link text-success" to="/admin/queries">Manage queries</Link></li>
                <li className="list-group-item">
                    <Link className="nav-link text-success" to="/admin/products">Manage Product</Link>
                </li>
            </ul>
            </div>
            
        )
    }
    const adminRightSide=()=>{
return(
<div className="card b-4">
    <h4 className="card-header">
        Admin Information
    </h4>
    <ul className="list-group">
        <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
        </li>
        <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
        </li>
        <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
        </li>
    </ul>
</div>

)
    }
    return (
       <Base className="container mt-4 mb-4 bg-success p-4" title=" welcome to AdminDashboard" description="manage all of your products here.."> 

       <div className="row">
           <div className="col-md-3">
       {adminLeftSide()}

           </div>

           <div className="col-md-9">

       {adminRightSide()}
           </div>
       </div>



       </Base>
    )
}

export default AdminDashboard;