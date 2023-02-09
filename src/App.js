import "./App.css";
import Home from "./Pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllFile from "./Pages/AllFile/AllFile";
import Main from "./Pages/Layout/Main";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./Pages/Routes/PrivateRoute/PrivateRoute";
import DashboardLayout from "./Pages/Layout/DashboardLayout";
import UploadFile from "./Pages/Dashboard/UploadFIle/UploadFile";
import MyPost from "./Pages/Dashboard/MyPost/MyPost";
import AllUsers from "./Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./Pages/Routes/AdminRoute/AdminRoute";
import ManagePost from "./Pages/Dashboard/ManagePost/ManagePost";
import Request from "./Pages/Dashboard/Request/Request";
import ManageRequest from "./Pages/Dashboard/ManageRequest/ManageRequest";
import Review from "./Pages/Dashboard/Review/Review";
import ManageReview from "./Pages/Dashboard/ManageReview/ManageReview";
import Profile from "./Pages/Dashboard/Profile/Profile";
import Forum from "./Pages/Forum/Forum";
import Download from "./Pages/Download/Download";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        { path: "/", element: <PrivateRoute><Home></Home></PrivateRoute> },
        { path: "/home", element: <PrivateRoute><Home></Home></PrivateRoute>},
        { path: "/allFile", element:<PrivateRoute> <AllFile></AllFile> </PrivateRoute>},
        { path: "/forum", element:<PrivateRoute> <Forum></Forum> </PrivateRoute>},
        { path: "/download/:ids", element:<PrivateRoute> <Download></Download> </PrivateRoute>},
        { path: "/login", element: <Login></Login> },
        { path: "/register", element: <Register></Register> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <DashboardLayout></DashboardLayout>
        </PrivateRoute>
      ),
      children:[
        {path:'/dashboard',element:<Dashboard></Dashboard>},
        {path:'/dashboard/myProfile',element:<Profile></Profile>},
        {path:'/dashboard/uploadFile',element:<UploadFile></UploadFile>},
        {path:'/dashboard/history',element:<MyPost></MyPost>},
        {path:'/dashboard/request',element:<Request></Request>},
        {path:'/dashboard/review',element:<Review></Review>},
        {path:'/dashboard/allUsers',element:<AdminRoute><AllUsers></AllUsers></AdminRoute>},
        {path:'/dashboard/managePost',element:<AdminRoute><ManagePost></ManagePost></AdminRoute>},
        {path:'/dashboard/manageRequest',element:<AdminRoute><ManageRequest></ManageRequest></AdminRoute>},
        {path:'/dashboard/manageReview',element:<AdminRoute><ManageReview></ManageReview></AdminRoute>},
      ]
    },
  ]);
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
