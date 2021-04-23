import React from 'react';

const token = localStorage.getItem('token');

export const UserContext = React.createContext(token);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
