import React, { useEffect, useState } from 'react';
import { ApiService } from '../../services/apiService';

export const UserContext = React.createContext<any>(null);
export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const usertoken = localStorage.getItem('usertoken');
    const getUser = (async () => {
      await ApiService.getUserByusertoken(usertoken as string).then((res) => {
        setUser(res);
      });
    })();
  }, [isLogged]);

  const changeLogged = () => {
    setIsLogged(!isLogged);
  };
  console.log(isLogged);

  return (
    <UserContext.Provider value={{ user, changeLogged }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserProvider = () => React.useContext(UserContext);
