import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import logo from "../../images/uiu_logo_update.png";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginErr, setLoginErr] = useState("");
  const location=useLocation();
  const navigate=useNavigate();

  const from= location.state?.from?.pathname || '/';

  const onSubmit = (data) => {
    console.log(data);
    setLoginErr("");
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast("User Login Successfully");
        navigate(from,{replace:true});
      })
      .catch((err) => {
        console.log(err);
        setLoginErr(err.message);
      });
  };
  return (
    <div className="container mt-5">
      <div className="row g-3 w-50 border p-4 d-block m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12">
            <img
              className="mx-auto d-block mb-2"
              src={logo}
              height="70px"
            ></img>
            <h5 className="text-center">Login</h5>
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Use Valid Email",
                },
              })}
            />
            <label htmlFor="inputEmail4" className="form-label">
              {errors.email && (
                <p className="text-danger">{errors.email?.message}</p>
              )}
            </label>
          </div>
          <div className="col-md-12 ">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or Longer.",
                },
              })}
            />
            {errors.password && (
              <p className="text-danger">{errors.password?.message}</p>
            )}
          </div>
          <div className="col-12 text-center mt-3">
            <button type="submit" className="btn btn-primary w-100 button">
              Login
            </button>
          </div>
          <div>
            {loginErr && (
              <p className="text-danger">
                Please provide valid Email and password
              </p>
            )}
          </div>
        </form>
        <div className="col-12 text-center mt-3">
          <button type="submit" className="btn btn-dark w-100">
            Login Using Gmail
          </button>
        </div>
        <p className="text-center">
          New in <span className="logoColor ">Uni</span>share?
          <Link to="/register">Create New Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
