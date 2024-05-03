import React from "react";
// import  "../assets/js/login.js";
import "../assets/css/Login.css";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import { Facebook, Instagram, RemoveRedEye, Twitter, YouTube } from "@material-ui/icons";



const Login = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <div className="login">
       <h1 className="login-title">Log In</h1>

       
          <div className="input-box item">
            <input type="text" placeholder="Your Email" />
          </div>
          <div className="input-box item relative" >
            <input type="text" placeholder="Your Password" />
       <button className="absolute right-2 top-[25%]"> <RemoveRedEye/></button>
          </div>
       

        <a href="#forgot_pass" className="fg-pass">Forgot your password?</a>

        <div className="signin-button">
          <button className="sf__btn sf__btn-primary grid">SIGN IN</button>
        </div>
        <div className="icon">
          <button><Facebook/></button>
          <button><YouTube/></button>
          <button><Instagram/></button>
          <button><Twitter/></button>
        </div>

        <a href="#register" className="register">Register</a>
      </div>
      <Footer />
    </div>
  );
  
};
{/* <script src="https://code.jquery.com/jquery-3.7.1.js" ></script> */}



export default Login;
