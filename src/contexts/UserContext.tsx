import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface iUserContext {
  user: iUserData | null;
  setUser: React.Dispatch<React.SetStateAction<iUserData | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loginSubmit: (data: iFormLoginData) => Promise<void>;
  registerSubmit: (data: iFormRegisterData) => Promise<void>;
  handleRegister: () => void;
}
/*loading,
        setLoading,
        loginSubmit,
        registerSubmit,
        handleRegister,*/

export const UserContext = createContext<iUserContext>({} as iUserContext);

interface iUserProviderProps {
  children: React.ReactNode;
}

interface iUserData {
  id: string;
  name: string;
  email: string;
}

interface iFormLoginData {
  email: string;
  password: string;
}

interface iFormRegisterData {
  email: string;
  password: string;
  name: string;
}

interface iLoginResponse {
  accessToken: string;
  user: iUserData;
}

interface iRegisterResponse {
  accessToken: string;
  user: iUserData;
}

export const UserProvider = ({ children }: iUserProviderProps) => {
  const [user, setUser] = useState<iUserData | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogin = () => {
    navigate("/");
  };

  const loginSubmit = async (data: iFormLoginData) => {
    setLoading(true);
    try {
      const response = await api.post<iLoginResponse>("/login", data);
      localStorage.setItem("authToken", response.data.accessToken);
      setUser(response.data.user);
      console.log(response);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      // toast.success("Sucesso! Redirecionando.");
      //nao está importando o toast
      setTimeout(() => {
        handleDashboard();
      }, 2000);
    } catch (err) {
      //se precisar tipar error, voltar no min 17 demo revisão
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const registerSubmit = async (data: iFormRegisterData) => {
    setLoading(true);
    try {
      const response = await api.post<iRegisterResponse>("/users", data);
      console.log(response);
      //toast
      //não está importando

      setTimeout(() => {
        handleLogin();
      }, 2000);
    } catch (err) {
      //se precisar tipar error, voltar no min 17 demo revisão
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        loginSubmit,
        registerSubmit,
        handleRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};