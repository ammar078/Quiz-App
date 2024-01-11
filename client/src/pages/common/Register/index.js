import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);

      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
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
          <Form.Item name="name" label="اسم المستخدم">
              <input type="text" />
            </Form.Item>
            <Form.Item name="email" label="البريد الالكتروني">
              <input type="text" />
            </Form.Item>
            <Form.Item name="password" label="الرمز السري">
              <input type="password" />
            </Form.Item>

            <div className="btn-group flex justify-between items-center mt-2">
            <button type="submit" className="login-btn bg-primary text-light">
              انشاء الحساب
            </button>
            <Link to="/login" className="text-primary " >تسيجل الدخول</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;


