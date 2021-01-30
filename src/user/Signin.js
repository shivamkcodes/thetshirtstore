import React, { useState } from "react";
import Base from "../core/Base";

import { Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChanges = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              email: "",
              password: "",
            });
          });
        }
      })
      .catch(console.log(""));
  };

  const performRedirect = () => {
    //TODO: do a redirect here
    if (didRedirect) {
      if (user && user.role === 1) {
        // return <p>redirect to admin</p>;
        return <Redirect to="/admin/dashboard" />;
      } else {
        // return <p>redirect to user dashboard</p>;
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>loading...</h2>
        </div>
      )
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const SignInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChanges("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChanges("password")}
                value={password}
                className="form-control"
                type="password"
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
      <Base title="Signin page" description="A page for user to Signin">
        {SignInForm()}
        {loadingMessage()}
        {errorMessage()}
        {performRedirect()}
        {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
      </Base>
    </div>
  );
};

export default Signin;
