import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

const UserDashboard = () => {
  const {
    user: { name, email, _id, phone },
  } = isAuthenticated();

  const userRightSide = () => {
    // console.log(isAuthenticated());
    return (
      <div className="card   b-4">
        <h4 className="card-header text-dark text-center">user Information</h4>
        <ul className="list-group">
          <li className="list-group-item text-dark">
            <span className="badge badge-success mr-2 ">Name:</span>
            {name}
          </li>
          <li className="list-group-item text-dark">
            <span className="badge badge-success mr-2 ">Email:</span>
            {email}
          </li>
          <li className="list-group-item text-dark">
            <span className="badge badge-success mr-2 ">Phone:</span>
            {phone}
          </li>
          <li className="list-group-item text-dark">
            <span className="badge badge-success mr-2 ">UserId:</span>
            {_id}
          </li>
          <li className="list-group-item">
            <span className="badge badge-dark text-white">user Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base title="UserDashboard Page" description="this is User dashboard ">
      <div className="row">
        <div className="col-md-6 mx-auto">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashboard;
