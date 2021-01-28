import React,{useState} from 'react';
import Base from '../core/Base';

import {Link} from "react-router-dom";
import { signup } from '../auth/helper';

 const Signup=()=> {

    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        error:"",
        phone:"",
        success:false
    });

    const {name,email,password,phone,error,success}=values;

    const handleChanges=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }


    const onSubmit=e=>{
        e.preventDefault();
        setValues({...values,error:false})
        signup({name,email,password,phone})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({...values,name:"",email:"",password:"",phone:"",error:"",success:true})
            }
        })
        .catch(
            console.log("Error in signUp")
        )
    }



    const SuccessMessage=()=>{
       return(

        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
           
           <div className="alert alert-success" style={{display:success ? "" : "none"}}>
                new account signin successfully...........
                <Link to="/signin">Login here</Link>
        </div>
        </div>
        </div>)
    }
    const errorMessage=()=>{
      return( 
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          
          
          <div className="alert alert-danger" style={{display:error ? "" : "none"}}>
                {error}
        </div>
        
        </div>
        </div>
         )
    }




    const SignUpForm=()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form >

                        <div className="form-group">
                            <label  className="text-light">Name</label>
                            <input className="form-control" onChange={handleChanges("name")} type="text" value={name}/>
                        </div>
                        <div className="form-group">
                            <label  className="text-light">Email</label>
                            <input className="form-control" onChange={handleChanges("email")} value={email} type="email"/>
                        </div>
                        <div className="form-group">
                            <label  className="text-light">Password</label>
                            <input className="form-control" onChange={handleChanges("password")} value={password} type="password"/>
                        </div>
                        <div className="form-group">
                            <label  className="text-light">Phone</label>
                            <input className="form-control" value={phone} onChange={handleChanges("phone")} type="tel"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Base title="SignUp page" description="A page for user to signUp">
                {SuccessMessage()}
                {errorMessage()}
                {SignUpForm()}
    {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
            </Base>
        </div>
    )
}

export default Signup;