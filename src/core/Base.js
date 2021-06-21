import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Menu from "./menu";

const ContactButton = (contact) => {
  const { user } = isAuthenticated();
  if (contact === "true") {
    if (user) {
      return (
        <Link to="/contact" className="btn btn-outline-light btn-lg">
          Contact Us
        </Link>
      );
    } else {
      return (
        <Link to="/signin" className="btn btn-light btn-lg">
          Contact Us
        </Link>
      );
    }
  }
};

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  contact = "true",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="mt-4 bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>

        <Link
          className="text-white"
          target="blank"
          to={{ pathname: "https://www.instagram.com/shivam__guglani" }}
        >
          <i className="fa fa-instagram fa-2x"> </i>
        </Link>

        <Link
          className="text-white"
          target="blank"
          to={{ pathname: "https://www.facebook.com/shivam.guglani.581" }}
        >
          <i className="fa fa-facebook-square fa-2x"> </i>
        </Link>
        <Link
          className="text-white"
          target="blank"
          to={{
            pathname:
              "https://l.instagram.com/?u=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fshivam-guglani-b536aa1a7&e=ATN-0DmRKIvylMoBFnWaS4uXbaCHfwn9Kv_eVZMFxoVQmdSrlCtFqc82969m17UYZMyeq1wO2TiL0J79&s=1",
          }}
        >
          <i className="fa fa-linkedin fa-2x"></i>
        </Link>

        <Link
          className="text-white"
          target="blank"
          to={{ pathname: "https://github.com/shivamkcodes" }}
        >
          <i className="fa fa-github fa-2x"></i>
        </Link>
        <br />

        {ContactButton(contact)}
      </div>
      <div className="container">
        <span className="text-muted">
          <span className="text-white">
            &#169; 2020-2021 mytshirtstore.netlify.app
          </span>
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
