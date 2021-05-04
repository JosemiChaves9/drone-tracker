import React, { useEffect, useState } from 'react';
import { ApiService } from '../../services/apiService';

interface User {
  email: string;
  firstname: string;
  lastname: string;
  token: string;
}

export const UserContext = React.createContext<User | null>(null);
export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = (async () => {
      const user = await ApiService.getUserByusertoken();
      if (user) {
        setUser(user[0]);
      } else {
        setUser(null);
      }
    })();
  }, []);

  console.log(user);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const UserProvider = () => React.useContext(UserContext);
