import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import blueprintImg from "../assets/unnamed.jpg";
import trustImg from "../assets/unnamed(1).jpg";

const LoginNew = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#031427] flex">
      {/* Left Side */}
     <div className="hidden lg:flex flex-1 items-center justify-center p-16 border-r border-slate-800">
        <div className="max-w-2xl w-full">
        <div className="mb-8">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-12 h-[2px] bg-[#fbbf24]"></div>

    <span className="text-[10px] uppercase tracking-[0.35em] text-[#fbbf24] font-bold">
      PROJECT BRIEF V4.2
    </span>
  </div>

  <h2 className="text-6xl font-black uppercase tracking-tight">
    <span className="text-white">BUILD MY </span>
    <span className="text-[#fbbf24]">HOME</span>
  </h2>

</div>
 <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg w-[520px] mx-auto">
  <p className="text-slate-500 uppercase tracking-[0.3em] text-xs mb-8">
  Engineering Excellence In
  <br />
  Construction Management
</p>
 
 
 
  <img
    src={blueprintImg}
    alt="Blueprint"
    className="w-full h-[380px] object-contain"
  />
</div>

<div className="grid grid-cols-2 gap-16 mt-12">

  <div className="flex items-start gap-3">
    <div className="text-cyan-400 text-xl">⌘</div>

    <div>
      <h4 className="text-white text-sm font-bold uppercase tracking-[0.15em]">
        Precision Grid
      </h4>

      <p className="text-slate-500 text-sm uppercase tracking-[0.1em]">
        Active Sync
      </p>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <div className="text-[#fbbf24] text-xl">◈</div>

    <div>
      <h4 className="text-white text-sm font-bold uppercase tracking-[0.15em]">
        BIM Ready
      </h4>

      <p className="text-slate-500 text-sm uppercase tracking-[0.1em]">
        Data Loaded
      </p>
    </div>
  </div>

</div>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[560px]">
        <div className="bg-[#07172e] border border-[#2a3d5a] p-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.45)]">

  <div className="text-center mb-10">
    <h2 className="text-3xl font-black text-white uppercase tracking-[0.15em]">
      Terminal Access
    </h2>

    <p className="text-slate-400 uppercase tracking-[0.25em] text-xs mt-3">
      Authorized Personnel Only
    </p>
  </div>

  <form onSubmit={handleLogin} className="space-y-6">

    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-[0.25em] mb-3">
        Identifier / Email
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="USER_ID@CONSTRUCT.PRO"
        className="w-full h-[56px] bg-[#021327] border border-[#2a3d5a] px-5 text-white"
      />
    </div>

    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-[0.25em] mb-3">
        Access Token
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full h-[56px] bg-[#021327] border border-[#2a3d5a] px-5 pr-14 text-white"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {showPassword ? "🙈" : "👁"}
        </button>
      </div>
    </div>

    <button
      type="submit"
      className="w-full h-[60px] bg-[#fbbf24] text-slate-950 font-black uppercase tracking-[0.25em]"
    >
      Initialize Session
    </button>

    <div className="pt-6 border-t border-[#2a3d5a] flex justify-between items-center">
      <span className="text-slate-500 uppercase text-xs">
        New Operator?
      </span>

      <button
        type="button"
        onClick={() => navigate("/register")}
        className="text-cyan-400 uppercase text-sm"
      >
        Register Account →
      </button>
    </div>

    <div className="pt-4 flex items-center gap-4">
      <img
        src={trustImg}
        alt="Trust"
        className="w-14 h-14 object-contain"
      />

      <div>
        <h4 className="text-[#fbbf24] font-black uppercase">
          Building Trust Together
        </h4>

        <p className="text-slate-400 text-sm">
          ConstructFlow Management Excellence
        </p>
      </div>
    </div>

  </form>

</div>
        </div>
      </div>
    </div>
  );
};

export default LoginNew;