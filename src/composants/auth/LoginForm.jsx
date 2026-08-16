import React, { useState } from "react";
import { GoogleIcon, InputField } from "./utilsForm";
import { useAuth } from "../../context/authContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const { loading, error, login, loginWithGoogle } = useAuth();

  const validateFields = (data) => {
    const errors = {};
    if (!data.email || data.email.length === 0) {
      errors.email = "email is required";
    }
    if (!data.password || data.password.length === 0) {
      errors.password = "password is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const frontErrors = validateFields(formData);
    if (Object.keys(frontErrors).length > 0) {
      setFormError(frontErrors);
      return;
    }

    setFormError({});

    const result = await login(formData);

    if (result?.success) {
      setFormData({ email: "", password: "" });
    } else if (result?.fieldErrors) {
      const extract = (val) => (Array.isArray(val) ? val[0] : val);
      const backendErrors = {};
      const f = result.fieldErrors;
      if (f.email) backendErrors.email = extract(f.email);
      if (f.password) backendErrors.password = extract(f.password);
      if (Object.keys(backendErrors).length > 0) setFormError(backendErrors);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col">
      {/* Titre */}
      <h1 className="text-2xl font-bold text-gray-900 text-center uppercase tracking-wide mb-7">
        connectez-vous
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Email */}
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="exemple@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {formError.email && (
          <p className="text-red-500 text-xs mt-1">{formError.email}</p>
        )}

        {/* Mot de passe */}
        <InputField
          id="password"
          label="Mot de passe"
          placeholder="••••••••"
          hasToggle
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {formError.password && (
          <p className="text-red-500 text-xs mt-1">{formError.password}</p>
        )}
        {/* Bouton Se connecter */}
        <button
          type="submit"
          className="w-full h-11 mt-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-lg tracking-wider transition"
        >
          Se connecter
        </button>

        {/* Séparateur Or */}
        <div className="flex items-center gap-3 my-1">
          <span className="flex-1 h-px bg-slate-300" />
          <span className="text-sm text-slate-500">Or</span>
          <span className="flex-1 h-px bg-slate-300" />
        </div>

        {/* Bouton Google */}
        <button
          type="button"
          className="w-full h-12 flex items-center justify-center gap-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-sm font-normal transition"
          onClick={loginWithGoogle}
        >
          <GoogleIcon />
          <span>Se connecter avec Google</span>
        </button>
      </form>

      {/* Lien connexion */}
      <p className="mt-5 text-center text-sm text-slate-600">
        Vous n'avez pas de compte?{" "}
        <a
          href="/auth/register"
          className="text-blue-700 font-medium hover:underline"
        >
          Inscrivez-vous
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
