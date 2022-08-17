import React, { Fragment } from "react";
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

const Products = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated } = useSelector((state) => state.user);

  function logoutUser() {
    if (isAuthenticated) {
      dispatch(logout());
      history.push("/");
      alert.success("Logout Successfully");
    } else {
      history.push("/");
    }
  }

  return <Fragment>{logoutUser()}</Fragment>;
};

export default Products;
