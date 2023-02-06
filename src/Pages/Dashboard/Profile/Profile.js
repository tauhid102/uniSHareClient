import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import { Image } from "react-bootstrap";
import '../../Style/style.css'
const auth = getAuth();
const Profile = () => {
  const { user } = useContext(AuthContext);
  const { register,formState: { errors }, handleSubmit } = useForm();
  const imageHostKey = "aa91add8de89860b67783f4c97d0e4c3";
  const updateUserProfile = (fieldData) => {
    const image = fieldData?.img[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          updateProfile(auth.currentUser, {
            displayName: fieldData.name,
            photoURL: imgData.data.url,
          })
            .then(() => {
              console.log("Update");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        }
      });
  };
  console.log(user);

  return (
    <div className="container">
      <div class="card w-25 text-center mt-3 d-flex m-auto">
        <img src={user.photoURL} class="d-flex m-auto  profileImage"alt="..." height='200px' width='200px'/>
        <div class="card-body">
          <h5 class="card-title">{user.displayName}</h5>
          <h6 class="card-text">
            {user.email}
          </h6>
        </div>
      </div>
      <h4 className="text-center mt-4 border bg-info p-2">Change Profile</h4>
      <div className="row g-3 w-75 border p-4 d-block m-auto">
        <form onSubmit={handleSubmit(updateUserProfile)}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="inputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail1"
                {...register("name",{
                  required: "Name is required",
                })}
              />
              {errors.name && (
                  <p className="text-danger">{errors.name?.message}</p>
                )}
            </div>
            <div className="col-md-6 w-50">
              <div className="">
                <label htmlFor="inputState" className="form-label">
                  Email
                </label>
                <input
                  disabled
                  value={user.email}
                  type="text"
                  className="form-control"
                  id="inputEmail1"
                  {...register("email")}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 ">
            <label htmlFor="inputEmail1" className="form-label">
              Photo
            </label>
            <input
              type="file"
              className="form-control"
              id="inputEmail1"
              {...register("img",{
                required: "Image is required",
              })}
            />
            {errors.img && (
                  <p className="text-danger">{errors.img?.message}</p>
                )}
          </div>
          <div className="row"></div>
          <div className="col-12 text-center mt-3">
            <button
              type="submit"
              className="btn btn-primary w-100 button text-center"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
