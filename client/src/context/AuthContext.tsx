import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";

// interface Subscriber {
//     name: string
//     email: string
//     password: string
// }

export interface AuthContextType {
  admin: AdminType | null;
  setAdmin: React.Dispatch<React.SetStateAction<AdminType | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}

interface AdminType {
  email: string;
  password: string;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [admin, setAdmin] = useState<AdminType | null>(null);

  useEffect(() => {
    const adminJson = localStorage.getItem("admin");
    if (adminJson) {
      setAdmin(JSON.parse(adminJson));
    }
  }, []);

  //     const [subscriber, setSubscriber] = useState<null|'string'>(null);
  //     const [registerError, setRegisterError] = useState(null);
  //     const [isLoading, setIsLoading] = useState(false);

  //     const [loginError, setLoginError] = useState(null);
  //     const [isLoginLoading, setIsLoginLoading] = useState(false);
  //     const [registerInfo, setRegisterInfo] = useState({
  //         name: "",
  //         email: "",
  //         password: "",
  //     });
  //     const [loginInfo, setLoginInfo] = useState({
  //         email: "",
  //         password: "",
  //     })

  //     useEffect(() => {
  //         const subscriber = localStorage.getItem("Subscriber");
  //         setSubscriber(JSON.parse(subscriber))
  //     }, [])

  //     const updateRegisterInfo = useCallback((info: any) => {
  //         setRegisterInfo(info);
  //     }, []);

  //     const updateLoginInfo = useCallback((info: any) => {
  //         setLoginInfo(info);
  //     }, []);

  //     const registerSubscriber = useCallback(async (e: any) => {
  //         e.preventDefault();
  //         setIsLoading(true);
  //         setRegisterError(null);
  //         try {
  //         const response = await axios.post(`/subscribers/register`, registerInfo);
  //         localStorage.setItem("Subscriber", JSON.stringify(response.data));
  //         setSubscriber(response.data);
  //         }catch(error) {
  //             setRegisterError((error as any).message)
  //         }
  //         setIsLoading(false);
  //     }, [registerInfo]);

  //     const loginSubscriber = useCallback(async (e: any) => {
  //         e.preventDefault();
  //         setIsLoginLoading(true);
  //         setLoginError(null);
  // try {
  //      const response = await axios.post(`/subscribers/login`, loginInfo);

  //         localStorage.setItem("Subscriber", JSON.stringify(response.data));
  //         setSubscriber(response.data);
  // } catch (error) {
  //     setLoginError((error as any).message)
  // }
  //        setIsLoginLoading(false);
  //     }, [loginInfo])

  //     const logoutSubscriber = useCallback(() => {
  //         localStorage.removeItem("Subscriber");
  //         setSubscriber(null);
  //     }, [])

  return (
    <AuthContext.Provider
      value={{
        admin,
        setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
