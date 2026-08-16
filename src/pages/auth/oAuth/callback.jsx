import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const onboarding = searchParams.get("onboarding");

    if (onboarding === "1") {
      navigate("/onboarding");
    } else {
      navigate("/");
    }
  }, [navigate, searchParams]);
};

export default OAuthCallback;
