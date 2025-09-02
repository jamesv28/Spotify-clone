import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { Loader } from "lucide-react";

const AuthProviders = ({ children }: { children: ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);

  const updateApiToken = (token: string | null) => {
    if (token)
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common["Authorization"];
  };
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error: unknown) {
        updateApiToken(null);
        console.log(`Error in auth provider: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);
  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  return <div>{children}</div>;
};

export default AuthProviders;
