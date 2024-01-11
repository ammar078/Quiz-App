import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="card w-400 p-3 bg-secondary br-3">
        <div className="flex flex-col ">
          <div className="flex justify-center mb-3">
            <h1 className="text-2xl text-primary ">تسجيل الدخول</h1>
            
          </div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="email" label="البريد الالكتروني">
              <input type="text" />
            </Form.Item>
            <Form.Item name="password" label="الرمز السري">
              <input type="password" />
            </Form.Item>

            <div className="btn-group flex justify-between items-center mt-2">
            <button type="submit" className="login-btn bg-primary text-light">
              تسجيل
            </button>
            <Link to="/register" className="text-primary " >انشاء حساب</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
