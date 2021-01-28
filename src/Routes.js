import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// this is the home page file>>>
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminDashboard from "./user/AdminDashBoard";
import UserDashboard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";
import Managecategories from "./admin/Managecategories";
import addProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import Contact from "./core/Contact";
import ManageQueries from "./core/ManageQueries";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/contact" exact component={Contact} />

        <PrivateRoute
          path="/user/dashboard"
          exact
          component={UserDashboard}
        ></PrivateRoute>
        <AdminRoute
          path="/admin/dashboard"
          exact
          component={AdminDashboard}
        ></AdminRoute>
        <AdminRoute
          path="/admin/queries"
          exact
          component={ManageQueries}
        ></AdminRoute>
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        ></AdminRoute>
        <AdminRoute
          path="/admin/categories"
          exact
          component={Managecategories}
        ></AdminRoute>
        <AdminRoute
          path="/admin/create/product"
          exact
          component={addProduct}
        ></AdminRoute>
        <AdminRoute
          path="/admin/products"
          exact
          component={ManageProducts}
        ></AdminRoute>
        <AdminRoute
          path="/admin/categories"
          exact
          component={Managecategories}
        ></AdminRoute>
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        ></AdminRoute>
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        ></AdminRoute>
      </Switch>
    </BrowserRouter>
  );
}
