import React, { useEffect, useState } from 'react';
import { setLocalStorage } from '../../hooks/setLocalStorage';
import { ApiService } from '../../services/ApiService';
import { ContextUser } from '../../types';

interface Context {
  user: null | ContextUser;
  changeLogged: () => void;
}

export const UserContext = React.createContext<Context>({
  user: null,
  changeLogged: () => {},
});
export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<ContextUser | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const { getLocalStorageKey } = setLocalStorage();

  useEffect(() => {
    const usertoken = getLocalStorageKey('usertoken');
    const getUser = (async () => {
      await ApiService.getUserByusertoken(usertoken as string).then((res) => {
        setUser(res);
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
