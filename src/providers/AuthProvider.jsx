import React, { useEffect } from "react";
import { checkToken } from "../apicalls/auth";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const checkUserToken = async () => {
    try {
      const res = await checkToken();
      if (res.isSuccess) {
      } else {
          navigate("/")
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
