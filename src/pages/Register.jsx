import React, { useState } from "react";
import "../assets/css/LoginRegister.css";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { IconButton } from "@mui/material";
import {
	Facebook,
	Google,
	Visibility,
	VisibilityOff,
	X,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<Announcement />
			<Navbar />
			<main role="main" id="MainContent">
				<section className="section-customer__form">
					<h1 className="title | mb-12">Register</h1>
					<div className="form-wrapper">
						<div className="icon-wrapper | mb-8">
							<IconButton
								aria-label="Facebook"
								className="m-[4px!important]">
								<Facebook />
							</IconButton>
							<IconButton
								aria-label="X"
								className="m-[4px!important]">
								<X />
							</IconButton>
							<IconButton
								aria-label="Google"
								className="m-[4px!important]">
								<Google />
							</IconButton>
							<IconButton className="m-[4px!important]">
								<SvgIcon>
									<path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z" />
								</SvgIcon>
							</IconButton>
						</div>
						<form
							// For later use
							// action="/account/register"
							// method="post"
							id="customer_register"
							className="customer__form">
							<div className="input-box">
								<input
									id="first-name"
									name="customer[first_name]"
									className="form-control"
									type="text"
									placeholder="Your First Name"
								/>
							</div>
							<div className="input-box">
								<input
									id="last-name"
									name="customer[last_name]"
									className="form-control"
									type="text"
									placeholder="Your Last Name"
								/>
							</div>
							<div className="input-box">
								<input
									id="email"
									name="customer[email]"
									className="form-control"
									type="text"
									placeholder="Your Email"
								/>
							</div>
							<div className="input-box | relative">
								<input
									id="password"
									name="customer[password]"
									className="password form-control"
									type="password"
									placeholder="Your Password"
								/>
								<IconButton
									aria-label=" Show Password"
									className="show-pass"
									onClick={() => {
										const password =
											document.querySelector("#password");
										password.type = showPassword
											? "password"
											: "text";
										setShowPassword(!showPassword);
									}}>
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</div>
							<p className="mt-3 text-[#666]">
								Sign up for early Sale access plus tailored new
								arrivals, trends and promotions. To opt out,
								click unsubscribe in our emails.
							</p>
							<button
								className="sf__btn sf__btn-primary | mt-6 mb-3 w-full"
								type="submit">
								REGISTER
							</button>
							<div className="accept-marketing">
								<label htmlFor="accept_marketing">
									<span>
										<p>Subscribe for Newsletter</p>
									</span>
									<input
										id="accept_marketing"
										type="checkbox"
										name="customer[accepts_marketing]"
										required=""
										value="yes"
									/>
								</label>
							</div>
						</form>
					</div>
					<a
						href="/register"
						className="login-btn | btn-link mt-10 font-bold">
						Login
					</a>
				</section>
			</main>

			<Footer />
		</>
	);
};

export default Register;
