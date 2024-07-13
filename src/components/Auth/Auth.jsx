import "./Auth.css";
import React from "react";
import imgBackground2 from "/assets/Login_Register_img2.jpg";
import logo from "/assets/Logo.png";
import pinkHome from "/assets/home_pink.png";
import blueHome from "/assets/home_blue.png";
import google from "/assets/google_icon.png";
import facebook from "/assets/facebook_icon.png";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth.action";
import { message } from "antd";
import store from "../../store/ReduxStore";
import { register } from "../../apis/auth.request";

const Auth = ({ comp, /* title, */ route, bgColor, bgCard, bgBtn }) => {
  const styleContainer = () => {
    return {
      backgroundColor: bgColor,
    };
  };
  const styleForm = () => {
    return {
      backgroundColor: bgCard,
    };
  };
  const styleBtn = () => {
    return {
      backgroundColor: bgBtn,
    };
  };
  const styleChoose = () => {
    return {
      color: bgBtn,
    };
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(30, "Username must not exceed 30 characters")
        .required("Please enter your username"),
      phone:
        comp === "register"
          ? Yup.string()
              .matches(`[^a-zA-Z]+`, "Only enter number")
              .matches(`^[0][1-9]*`, "Phone number must start at 0")
              .max(10, "Phone number must have 10 digits")
              .min(10, "Phone number must have 10 digits")
              .required("Please enter your phone")
          : Yup.string(),
      password: Yup.string()
        .min(8, "Password must have at least 8 characters or more")
        .required("Please enter your password"),
      confirmPassword:
        comp === "register"
          ? Yup.string()
              .oneOf(
                [Yup.ref("password"), null],
                "Confirm Password must match Password"
              )
              .required("Please enter your confirm password")
          : Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        if (comp === "login") {
          await dispatch(login(values));
          const res = store.getState().authReducer.res;
          if (res?.success) {
            message.success(res.message);
            formik.handleReset();
            navigate("/");
          } else {
            message.error(res.message);
          }
        } else {
          const response = await register(values);
          if (response.data.success) {
            message.success(response.data.message);
            navigate("/login");
          } else {
            message.error(response.data.message);
          }
        }
        // const res = store.getState().authReducer.res;
        // if (res?.success) {
        //   message.success(res.message);
        //   formik.handleReset();
        //   navigate("/");
        // } else {
        //   message.error(res.message);
        // }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <div className="register-whole-container">
      <div className="register-container" style={styleContainer()}>
        <div className="img-background">
          {/* <img src={imgBackground} className="image" /> */}

          <img
            src={imgBackground2}
            className={comp === "login" ? "image" : "image2"}
          />
        </div>

        <div className="form-register" style={styleForm()}>
          {comp === "login" ? (
            <img
              src={pinkHome}
              className="home"
              onClick={() => navigate("/")}
            />
          ) : (
            <img
              src={blueHome}
              className="home"
              onClick={() => navigate("/")}
            />
          )}

          <img src={logo} className="logo" />

          <form className="form-input" onSubmit={formik.handleSubmit}>
            <label className="label-title"> Username: </label>
            <input
              className="input"
              placeholder="Enter your username"
              name="username"
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username && (
              <p className="message-error">{formik.errors.username}</p>
            )}

            {comp === "register" && (
              <>
                <label className="label-title"> Phone: </label>
                <input
                  className="input"
                  placeholder="Enter your phone"
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="message-error">{formik.errors.phone}</p>
                )}
              </>
            )}

            <label className="label-title"> Password: </label>
            <input
              className="input"
              placeholder="Enter your password"
              type="password"
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="message-error">{formik.errors.password}</p>
            )}

            {comp === "register" && (
              <>
                <label className="label-title"> Confirm password: </label>
                <input
                  className="input"
                  placeholder="Confirm password"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <p className="message-error">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </>
            )}

            <button
              className={comp === "login" ? "btnlogin" : "btnregister"}
              type="submit"
              style={styleBtn()}
            >
              {comp === "login" ? "Sign In" : "Sign Up"}
            </button>

            {comp === "login" && (
              <div className="login-other">
                <p> - or - </p>
                <button>
                  <img src={google} />
                  Continue with Google
                </button>
                {/* <button>
                  <img src={facebook} />
                  Continue with Facebook
                </button> */}
              </div>
            )}
            <div className="text">
              <p className="des">
                {comp === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>

              <p
                className="login"
                style={styleChoose()}
                onClick={() => navigate(`/${route}`)}
              >
                {comp === "login" ? "Register Now!!" : "Sign In!"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
