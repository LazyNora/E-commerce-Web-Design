import React from "react";
// import  "../assets/js/login.js";
import "../assets/css/Register.css"
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import { Facebook, Instagram, RemoveRedEye, Twitter, YouTube } from "@material-ui/icons";



const Register = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <div className="login">

        
       <h1 className="login-title">Register</h1>
        
        <div className="icon">
          <button><Facebook/></button>
          <button><YouTube/></button>
          <button><Instagram/></button>
          <button><Twitter/></button>
        </div>
       
          <div className="input-box item">
            <input type="text" placeholder="Your Frist Name" />
          </div>
          <div className="input-box item">
            <input type="text" placeholder="Your Last Name" />
          </div>
          <div className="input-box item">
            <input type="text" placeholder="Your Email" />
          </div>
          <div className="input-box item relative" >
            <input type="text" placeholder="Your Password" />
       <button className="absolute right-2 top-[25%]"> <RemoveRedEye/></button>
          </div>
          
          <div className="text">
            <p>Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
          </div>


        <div className="signin-button">
          <button className="sf__btn sf__btn-primary grid">REGISTER</button>
        </div>
        <div className="text">
            <p>Subscribe for Newsletter</p>
             <input type="checkbox"  name="" id="checkbox" />
            
        </div>
       
        

        <a href="Login" className="register text">Login</a>
      </div>
    





      <Footer />
      

    </div>
  );
  
};
{/* <script src="https://code.jquery.com/jquery-3.7.1.js" ></script> */}



export default Register;
