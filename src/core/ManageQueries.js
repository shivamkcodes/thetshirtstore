import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "./Base";
import { isAuthenticated } from "../auth/helper";
import { deleteQuery, getAllContacts } from "./helper/contactHelper";

export const ManageQueries = () => {
  const [contact, setContact] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllContacts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setContact(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisQuery = (contactId) => {
    deleteQuery(user._id, token, contactId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <div>
      <Base
        title="Manage Queries"
        description="here we need to manage quereies..."
      >
        <h1>Manage Query</h1>

        <h2 className="mb-4">All Queries:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">Total queries</h2>

            {contact.map((contact, index) => {
              return (
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-md-3">
                    <h3 className="text-white text-left">{contact.name}</h3>
                  </div>
                  <div className="col-md-3">
                    <h3 className="text-white text-left">
                      <span className="badge badge-success mr-2">
                        {contact.email}
                      </span>
                    </h3>
                  </div>
                  <div className="col-md-3">
                    <h3 className="text-white text-left">
                      <span className="badge badge-primary mr-2">
                        {contact.query}
                      </span>
                    </h3>
                  </div>

                  <div className="col-3">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteThisQuery(contact._id);
                      }}
                    >
                      delete{" "}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Base>
    </div>
  );
};

export default ManageQueries;
