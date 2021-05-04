import React, { useEffect, useState } from 'react';
import { ApiService } from '../../services/apiService';
export const UserContext = React.createContext('');

export const ContextProvider = (props: any) => {
  const userToken = localStorage.getItem('usertoken');
  const [user, setUser] = useState('');

  useEffect(() => {
    ApiService.getUserByUserToken(userToken as string).then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
export const UserProvider = () => React.useContext(UserContext);
