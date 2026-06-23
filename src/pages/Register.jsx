import React, { useState } from "react";
import screenImg from "../assets/screen.png";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await API.post("/users/register", {
  name: formData.fullName,
  email: formData.email,
  phone: formData.phone,
  password: formData.password,
});

    alert("Registration Successful");

    navigate("/");

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-[#031427] flex">
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 border-r border-slate-800">
        <div className="max-w-2xl w-full">
          <h2 className="text-5xl font-black text-white mb-8">
            Join the <span className="text-[#fbbf24]">Infrastructure</span>
          </h2>

          <div className="bg-slate-900 border border-slate-700 p-2 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
            <img
  src={screenImg}
  alt="Construction Site"
  className="w-full h-[450px] object-cover rounded-lg"
/>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[560px]">
          <div className="bg-[#07172e] border border-[#2a3d5a] p-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.45)]">

            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-white uppercase">
                Create Account
              </h2>

              <p className="text-slate-400 text-xs uppercase tracking-[0.25em] mt-3">
                New Operator Registration
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full h-[56px] bg-[#021327] border border-[#2a3d5a] px-5 text-white"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-[56px] bg-[#021327] border border-[#2a3d5a] px-5 text-white"
              />


           <input
  type="text"
  name="phone"
  placeholder="Phone Number"
  value={formData.phone}
  onChange={handleChange}
  className="w-full h-[56px] bg-[#021327] border border-[#2a3d5a] px-5 text-white"
/> 

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-[56px] bg-[#021327] border border-[#2a3d5a] px-5 text-white"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-[56px] bg-[#021327] border border-[#2a3d5a] px-5 text-white"
              />

              <button
                type="submit"
                className="w-full h-[60px] bg-[#fbbf24] text-black font-black uppercase tracking-[0.2em]"
              >
                Create Account
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;