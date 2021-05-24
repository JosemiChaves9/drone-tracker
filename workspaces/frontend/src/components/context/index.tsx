import React, { useEffect, useState } from 'react';
import { ApiService } from '../../services/ApiService';
import { ApiUserLoginResponse } from '../../types';

interface Context {
  user: null | ApiUserLoginResponse;
  changeLogged: () => void;
}

export const UserContext = React.createContext<Context>({
  user: null,
  changeLogged: () => {},
});
export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<ApiUserLoginResponse | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const usertoken = localStorage.getItem('usertoken');

  useEffect(() => {
    if (user) {
      ApiService.checkToken(user).then(
        () => {},
        (rej) => {
          localStorage.removeItem('usertoken');
          setUser(null);
        }
      );
    }
  }, [user]);

  useEffect(() => {
    const getUser = (async () => {
      await ApiService.getUserByUsertoken(usertoken as string).then((res) => {
        if (res.ok) {
          setUser(res as ApiUserLoginResponse);
        } else {
          setUser(null);
        }
      });
    })();
  }, [isLogged]);

  const changeLogged = () => {
    setIsLogged(!isLogged);
  };

  return (
    <UserContext.Provider value={{ user, changeLogged }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserProvider = () => React.useContext(UserContext);
