import React from "react";
import "../assets/css/Login.css";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import { RemoveRedEye } from "@material-ui/icons";

const Login = () => {
  return (
    <div>
      {/* <Announcement />
      <Navbar /> */}
      <div className="login">
       <h2>Log In</h2>

       
          <div className="input-box item">
            <input type="text" placeholder="Your Email" />
          </div>
          <div className="input-box item">
            <input type="text" placeholder="Your Password" />
          </div>
       

        <a href="#">Forgot your password?</a>

        <div className="signin-button item">
          <button>SIGN IN</button>
        </div>

        <a href="#">Register</a>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
