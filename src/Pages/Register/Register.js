import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import logo from "../../images/uiu_logo_update.png";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    setSignUPError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User Created Successfully");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setSignUPError(err.message);
      });
      saveUser(data?.name, data?.email);
  };
  const saveUser = (name, email) => {
    const user = { name, email, point: 15 };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
        navigate("/");
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
            <h5 className="text-center">Register</h5>
            <label htmlFor="inputEmail1" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="inputEmail1"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name?.message}</p>
            )}
            <label htmlFor="inputEmail2" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail2"
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
            <label htmlFor="inputPassword5" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword5"
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
          {signUpError && <p className="text-danger">{signUpError}</p>}
          <div className="col-12 text-center mt-3">
            <button type="submit" className="btn btn-primary w-100 button">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center">
          Already Have an Account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
