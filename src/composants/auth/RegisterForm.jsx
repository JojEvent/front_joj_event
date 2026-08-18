import React, { useState } from "react";
import { GoogleIcon, InputField } from "./utilsForm";
import { useAuth } from "../../context/authContext";
import { Loader2 } from "lucide-react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [formError, setFormError] = useState({});
  const { loading, error, registerUser, loginWithGoogle } = useAuth();

  const validateFields = (data) => {
    const errors = {};

    if (!data.first_name || data.first_name.length === 0) {
      errors.first_name = "first name is required";
    }
    if (!data.last_name || data.last_name.length === 0) {
      errors.last_name = "last name is required";
    }
    if (!data.email || data.email.length === 0) {
      errors.email = "email is required";
    }
    if (!data.password || data.password.length === 0) {
      errors.password = "password is required";
    }
    if (!data.password_confirm || data.password_confirm.length === 0) {
      errors.password_confirm = "password_confirm is required";
    }

    if (data.password !== data.password_confirm) {
      errors.password_confirm = "Passwords do not match";
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

    const result = await registerUser(formData);

    if (result?.success) {
      setFormData({ first_name: "", last_name: "", email: "", password: "", password_confirm: "" });
    } else if (result?.fieldErrors) {
      const extract = (val) => (Array.isArray(val) ? val[0] : val);
      const backendErrors = {};
      const f = result.fieldErrors;
      if (f.first_name)      backendErrors.first_name     = extract(f.first_name);
      if (f.last_name)       backendErrors.last_name      = extract(f.last_name);
      if (f.email)           backendErrors.email          = extract(f.email);
      if (f.password)        backendErrors.password       = extract(f.password);
      if (f.password_confirm) backendErrors.password_confirm = extract(f.password_confirm);
      if (Object.keys(backendErrors).length > 0) setFormError(backendErrors);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col">
      {/* Titre */}
      <h1 className="text-2xl font-bold text-gray-900 text-center uppercase tracking-wide mb-7">
        Inscrivez-vous
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Prénom + Nom */}
        <div className="flex gap-3">
          <div className="flex-1">
            <InputField
              id="prenom"
              label="Prenom"
              placeholder="Votre prenom"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
            />
            {formError.first_name && (
              <p className="text-red-500 text-xs mt-1">{formError.first_name}</p>
            )}
          </div>
          <div className="flex-1">
            <InputField
              id="nom"
              label="Nom"
              placeholder="Votre nom"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
            />
            {formError.last_name && (
              <p className="text-red-500 text-xs mt-1">{formError.last_name}</p>
            )}
          </div>
        </div>

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
        {/* Confirmer mot de passe */}
        <InputField
          id="confirm-password"
          label="Confirmer mot de passe"
          placeholder="••••••••"
          hasToggle
          value={formData.password_confirm}
          onChange={(e) =>
            setFormData({ ...formData, password_confirm: e.target.value })
          }
        />
        {formError.password_confirm && (
          <p className="text-red-500 text-xs mt-1">{formError.password_confirm}</p>
        )}
        {/* Bouton S'inscrire */}
        <button
          disabled={loading}
          type="submit"
          className="w-full h-11 flex items-center justify-center mt-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-lg tracking-wider transition"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "S'inscrire"
          )}
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
          <span>Sign in with Google</span>
        </button>
      </form>

      {/* Lien connexion */}
      <p className="mt-5 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-blue-700 font-medium hover:underline"
        >
          Sign in
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
