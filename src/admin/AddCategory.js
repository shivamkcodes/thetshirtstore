import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from "../core/Base"
import { createCategory } from './helper/adminapicall'


const AddCategory=()=> {
     
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token}=isAuthenticated();


    const handleChanges=(event)=>{

    
        setError("");
        setName(event.target.value)
    }

    const onSubmit=(e)=>{

        e.preventDefault();
        setError("");
        setSuccess(false)

        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true)
            }
            else{
                setError("")
                setSuccess(true)
                setName("")
            }
        })
        .catch(err => console.log(err)
        )

    }


    const suceessMessage=()=>{
        if(success){
            return <h4 className="text-suceess">category created successfully</h4>
        }
    }
    const errorMessage=()=>{
        if(error){
            return <h4 className="text-suceess">failed to create category</h4>
        }
    }

    const myCategoryForm=()=>(
        <form >
            <div className="form-group">
                <div className="lead">Enter a category</div>
                <input type="text" className="form-control my-3" autoFocus required onChange={handleChanges}       value={name}   placeholder="forex summer"/>
                <button onClick={onSubmit} className="btn btn-outline-info">create category</button>
            </div>
        </form>
    )


    const goBack=()=>(
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Dashboard</Link>
        </div>
    )

    return (
        <Base title="welcome Admin..you need to add category here.." description="add a new category for new products" className="container bg-info p-4 my-4">

            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {myCategoryForm()}
                    {suceessMessage()}
                    {errorMessage()}
                    {goBack()}
                </div>
            </div>
       
           
            </Base>
    )
}

export default AddCategory;
