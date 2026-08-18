import { useState, useEffect } from "react";
import { createContext } from "react";
import { instanceApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken"),
  );

  const navigate = useNavigate();

  const saveToken = (tokens) => {
    if (!tokens) return;
    if (tokens.access) {
      localStorage.setItem("accessToken", tokens.access);
      instanceApi.defaults.headers.common["Authorization"] =
        `Bearer ${tokens.access}`;
    }
    if (tokens.refresh) {
      localStorage.setItem("refreshToken", tokens.refresh);
    }
  };

  const loginOAuth = async (tokens) => {
    saveToken(tokens);
    setIsAuthenticated(true);
    try {
      const res = await instanceApi.get("/user/profile/");
      setUser(res.data);
    } catch (e) {
      console.error("Erreur chargement profil OAuth:", e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      instanceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      instanceApi
        .get("/user/profile/")
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setIsAuthenticated(false);
        });
    }
  }, []);

  // register user
  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await instanceApi.post("/auth/register/", userData);
      const data = response.data;
      if (response.status === 200 || response.status === 201) {
        setUser(data.user ?? data);
        toast.success("Inscription réussie. Veuillez vérifier votre email");
        navigate("/auth/verify-email");
        return { success: true };
      }
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.detail ||
        errData?.message ||
        err.message ||
        "Erreur lors de l'inscription";
      setError(message);
      toast.error(message);
      return { success: false, fieldErrors: errData || {} };
    } finally {
      setLoading(false);
    }
  };

  // Verify email user
  const verifyEmail = async (code) => {
    try {
      const response = await instanceApi.post("/auth/verify-otp/", { code });
      const data = response.data;
      if (response.status === 200 || response.status === 201) {
        setUser(data.user ?? data);
        toast.success("Email vérifié avec succès");
        navigate("/auth/login");
        return { success: true };
      }
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.detail ||
        errData?.message ||
        err.message ||
        "Erreur lors de la vérification de l'email";
      setError(message);
      toast.error(message);
      return { success: false, fieldErrors: errData || {} };
    }
  };

  // login
  const login = async (credential) => {
    setLoading(true);
    setError(false);
    try {
      const response = await instanceApi.post("/auth/login/", credential);
      const data = response.data;
      if (response.status === 200 || response.status === 201) {
        setIsAuthenticated(true);
        toast.success("Connexion réussie");
        saveToken(data.tokens);

        let profile = null;
        try {
          const profileRes = await instanceApi.get("/user/profile/");
          profile = profileRes.data;
          setUser(profile);
        } catch {
          setUser(data.user ?? data);
        }

        if (data?.verify_email) {
          toast.info("Veuillez vérifier votre email");
          navigate("/auth/verify-email");
        } else if (data?.needs_onboarding) {
          toast.info("Veuillez compléter votre profil");
          navigate("/onboarding");
        } else if (profile?.is_staff || profile?.role === "ADMIN") {
          // Administrateur → espace admin
          navigate("/admin");
        } else {
          // Utilisateur normal → accueil
          navigate("/");
        }
      }
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.detail ||
        errData?.message ||
        err.message ||
        "Erreur lors de la connexion";
      setError(message);
      toast.error(message);
      return { success: false, fieldErrors: errData || {} };
    } finally {
      setLoading(false);
    }
  };

  // login with google
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:8000/api/auth/google/";
  };

  // Onboarding
  const completeOnboarding = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await instanceApi.patch("user/complete-onboarding/");
      const data = response.data;
      if (response.status === 200 || response.status === 201) {
        setUser((prev) => ({ ...prev, needs_onboarding: false }));
        toast.success("Onboarding complété avec succès");
        window.location.href = "/";
        return { success: true };
      }
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.detail ||
        errData?.message ||
        error.message ||
        "Erreur lors de la complétion de l'onboarding";
      setError(message);
      toast.error(message);
      return { success: false, fieldErrors: errData || {} };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await instanceApi.post("/user/logout/", {
        refresh: refreshToken,
      });
      const data = response.data;
      if (response.status === 200 || response.status === 201) {
        setUser(null);
        toast.success("Déconnexion réussie");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/auth/login");
        return { success: true };
      }
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.detail ||
        errData?.message ||
        error.message ||
        "Erreur lors de la déconnexion";
      setError(message);
      toast.error(message);
      return { success: false, fieldErrors: errData || {} };
    } finally {
      setLoading(false);
    }
  };

  // const profile = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await instanceApi.get("/user/profile/")
  //     const data = response.data
  //     if (response.status === 200 || response.status === 201) {
  //       setUser(data)
  //       return { success: true }
  //     }
  //   } catch (error) {
  //     const errData = error.response?.data
  //     const message =
  //       errData?.detail ||
  //       errData?.message ||
  //       error.message ||
  //       "Erreur lors de la récupération du profil"
  //     setError(message)
  //     toast.error(message)
  //     return { success: false, fieldErrors: errData || {} }
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        verifyEmail,
        login,
        loginWithGoogle,
        loginOAuth,
        saveToken,
        completeOnboarding,
        logout,
        user,
        loading,
        error,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
