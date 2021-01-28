
import { updateCategory,getCategory } from './helper/adminapicall'
import Base from "../core/Base"


import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'


 const UpdateCategory=({match})=> {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token}=isAuthenticated();


    const preload=(categoryId)=>{
        getCategory(categoryId).then(
          data=>{
            // console.log(data);
            if(data.error){
            //   setValues({...values,error:data.error}) 
            setName("")
            setError(true)
            }
            else{
                // preloadCategories();
                setError("")
                // setSuccess(true)
                setName(data.name)
             
              
            }
          }
        )
      }
    
      useEffect(() => {
        preload(match.params.categoryId);
        
      }, [])

    
    const handleChanges=(event)=>{
        setError("");
        setName(event.target.value)
    }

    const onSubmit=(e)=>{

        e.preventDefault();
        setError("");
        setSuccess(false)

      
        updateCategory(match.params.categoryId,user._id,token,{name})
        
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

    const myCategoryForm=()=>(
        <form >
            <div className="form-group">
                <div className="lead">Enter a category</div>
                <input type="text" className="form-control my-3" autoFocus required onChange={handleChanges}       value={name}   placeholder="forex summer"/>
                <button onClick={onSubmit} className="btn btn-outline-info">update category</button>
            </div>
        </form>
    )


    
    const suceessMessage=()=>{
        if(success){
            return <h4 className="text-success">category update successfully</h4>
        }
    }
    const errorMessage=()=>{
        if(error){
            return <h4 className="text-danger">failed to update category</h4>
        }
    }

    const goBack=()=>(
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Dashboard</Link>
        </div>
    )

    return (
       <Base title="update category here......" description="this is the page to update category here...">

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

export default UpdateCategory;