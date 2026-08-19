import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginOAuth } = useAuth();

  useEffect(() => {
    const onboarding = searchParams.get("onboarding");
    const accessParam = searchParams.get("access");
    const refreshParam = searchParams.get("refresh");
    const tokenParam = searchParams.get("token");

    let access = accessParam;
    let refresh = refreshParam;

    if (!access && tokenParam) {
      try {
        // Tente de parser un dictionnaire/JSON de tokens
        const formatted = tokenParam.replace(/'/g, '"');
        const parsed = JSON.parse(formatted);
        access = parsed.access || parsed.accessToken;
        refresh = parsed.refresh || parsed.refreshToken;
      } catch {
        // Si tokenParam est directement la chaîne du token access
        access = tokenParam;
      }
    }

    if (access) {
      loginOAuth({ access, refresh });
    }

    if (onboarding === "1") {
      navigate("/onboarding");
    } else {
      navigate("/");
    }
  }, [navigate, searchParams, loginOAuth]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mb-4"></div>
      <p className="text-sm font-olympic text-gray-600">Connexion en cours...</p>
    </div>
  );
};

export default OAuthCallback;

