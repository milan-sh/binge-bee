// context/AuthProvider.jsx
import { createContext, useState, useEffect, useContext, useLayoutEffect, ReactNode } from 'react';
import { api } from '@/api/api';
import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router';

interface User {
  avatar: string,
  coverImage?:string
  createdAt: string
  email: string
  fullName:string
  username:string
  watchHistory: string[]
  _id: string
}

interface Credentials {
  email:string
  password:string
}

interface AuthContextValue {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  login: (credentials: Credentials) => Promise<boolean>
  logout: ()=> Promise<void>
}

interface AuthPorviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextValue | null>(null); 

export const UseAuth = ():AuthContextValue => {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error('useAuth must be inside Auth Proider')
  }
  return context
};

export const AuthProvider = ({ children }:AuthPorviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()
  const redirectToLogin= ()=>{
    navigate("/login", {replace:true})
  }

  useEffect(() => {
    const checkAuthStatus = async (): Promise<void> => {
      setLoading(true);
      try {
        const response: AxiosResponse<{data: User}> = await api.get('/api/v1/users/current-user');
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data.data); 
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{message:string}>
        setIsAuthenticated(false);
        setUser(null);
        console.error("Authentication check failed:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      // The browser will automatically send the accessToken cookie for requests to the same domain.
      // We might not need to explicitly add an Authorization header here unless some backend routes require it
      // in addition to the cookie. If so, you might need to fetch the cookie value.
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, []);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Request to the refresh token endpoint. The refreshToken cookie will be sent automatically.
            const refreshResponse = await axios.post('/api/users/refresh-token');

            if (refreshResponse.status === 200) {
              // Backend should have set a new accessToken cookie.
              // We don't need to do anything in our state regarding the token itself.
              // Retry the original request.
              return api(originalRequest);
            } else {
              // Refresh token failed, likely the user needs to log in again.
              setIsAuthenticated(false);
              setUser(null);
              redirectToLogin()
              
            }
          } catch (refreshError: unknown) {
            const err = refreshError as AxiosError<{message:string}>
            console.error("Token refresh failed:", err.response?.data?.message || err.message);
            setIsAuthenticated(false);
            setUser(null);
            redirectToLogin()
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  const login = async (credentials:Credentials): Promise<boolean> => {
    try {
      const response: AxiosResponse<{data: {user: User}}> = await api.post('/api/v1/users/login', credentials);
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.data.user); // Assuming user info is nested like this
        return true; // Indicate successful login
      }
      return false;
    } catch (error: unknown) {
      const err = error as AxiosError<{message:string}>
      console.error("Login failed:", err.response?.data?.message || err.message);
      return false; // Indicate failed login
    }
  };

  const logout = async ():Promise<void> => {
    try {
      // Optional: Call a backend logout endpoint to clear session on the server
      await api.post('/api/users/logout');
    } catch (error:unknown) {
      const err = error as AxiosError<{message:string}>
      console.error("Logout error:", err.response?.data?.message || err.message);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      redirectToLogin()
    }
  };

  const contextValue:AuthContextValue = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};