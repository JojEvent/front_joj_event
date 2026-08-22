import React from "react";
import { GoogleIcon, IllustAdmin, LogoAdmin } from "../../assets";
import { useAuth } from "../../context/authContext";
import { useState } from "react";

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData)
    if(result?.success) {
        setFormData({email: "", password: ""})
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="relative w-full h-full">
        <img
          src={LogoAdmin}
          alt="logo Admin"
          className="absolute top-0 mt-10"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center h-full space-y-5 absolute -mt-50">
        <div className="space-y-2">
          <h2 className="text-center justify-center text-gray-900 text-3xl font-normal font-['Bebas_Neue'] uppercase leading-9 tracking-wide">
            Espace Administrateur
          </h2>
          <p className=" text-center justify-center text-gray-500 text-sm font-normal font-['Inter'] leading-5">
            Connectez-vous pour gérer JOJ Dakar 2026
          </p>
        </div>
        <form noValidate className="space-y-5 w-sm" onSubmit={handleSubmit} >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="rounded-md border-gray-400 border py-2 px-2"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              className="rounded-md border-gray-400 border py-2 px-2"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>
            <a href="#" className="text-blue-500 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
          <button
            type="submit"
            className="rounded-md bg-emerald-500 font-bold text-white py-2 px-4 w-full"
          >
            Se connecter
          </button>
          <div className="self-stretch inline-flex justify-start items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="w-3.5 h-5 relative">
              <div className="left-0 top-1 absolute justify-center text-gray-500 text-xs font-normal font-['Inter'] leading-5 tracking-wider">
                Ou
              </div>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="w-full h-12 bg-white rounded-lg outline -outline-offset-1 outline-gray-200 inline-flex justify-center items-center gap-3">
            <img className="size-5 max-w-96 relative" src={GoogleIcon} />
            <div className="text-center justify-center text-gray-900 text-sm font-bold font-['Inter'] leading-5 tracking-tight">
              Continuer avec Google
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
