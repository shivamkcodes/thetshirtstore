import React, { useState } from "react";
import Base from "./Base";
import { Link, Redirect } from "react-router-dom";
import { createContact } from "./helper/contactHelper";
import { isAuthenticated } from "../auth/helper";

const { user, token } = isAuthenticated();

const Contact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    query: "",
    error: false,
    success: false,
  });

  const { name, email, query, error, success } = values;

  const handleChanges = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const SuccessMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            There is a error
            {/* <Link to="/signin">Login here</Link> */}
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            request send successfully
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // setError("");
    // setSuccess(false)

    createContact(user._id, token, { values })
      .then((data) => {
        if (data.error) {
          // setError(true)
          // setValues(...values,error=true)
          setValues({ ...values, error: true });
        } else {
          console.log("success");

          // setValues(...values,error=false,name="",email="",query="");
          setValues({
            ...values,
            error: false,
            success: true,
            name: "",
            email: "",
            query: "",
          });

          // setError("")
          // setSuccess(true)
          // setName("")
        }
      })
      .catch((err) => console.log(err));
  };

  const ContactForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                placeholder="e.g. samuel miller"
                required
                onChange={handleChanges("name")}
                value={name}
                className="form-control"
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                placeholder="e.g. abc@gmail.com"
                required
                onChange={handleChanges("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Query</label>
              <textarea
                placeholder="ask your doubt"
                required
                onChange={handleChanges("query")}
                value={query}
                className="form-control"
                type="email"
              />
            </div>

            <button onClick={onSubmit} className="btn btn-success btn-block">
              submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Base
        title="Contact page "
        description="feel free to ask your doubts we will answer all that.."
        contact="false"
      >
        <Link to="/" className="btn btn-md btn-warning mb-3">
          Home
        </Link>
        {/* <h1 className="text-white">this is contact</h1> */}
        {SuccessMessage()}
        {errorMessage()}
        {ContactForm()}
      </Base>
    </div>
  );
};

export default Contact;
