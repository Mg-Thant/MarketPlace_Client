import React, { useEffect } from "react";
import { checkToken } from "../apicalls/auth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";

import { setUser } from "../store/slices/userSlice";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUserToken = async () => {
    try {
      const res = await checkToken();
      if (res.isSuccess) {
        dispatch(setUser(res.userDoc));
      } else {
        navigate("/");
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    checkUserToken();
  }, []);
  return <section>{children}</section>;
};

export default AuthProvider;
