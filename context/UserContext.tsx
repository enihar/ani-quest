import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface UserContextType {
  userName: string;
  jobTitle: string;
  setUser: (userName: string, jobTitle: string) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userName, setUserName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');

  useEffect(() => {
    const storedUserName = Cookies.get('user-name');
    const storedJobTitle = Cookies.get('job-title');

    if (storedUserName && storedJobTitle) {
      setUserName(storedUserName);
      setJobTitle(storedJobTitle);
    }
  }, []);

  const setUser = (name: string, title: string) => {
    setUserName(name);
    setJobTitle(title);

    Cookies.set('user-name', name, { expires: 7 });
    Cookies.set('job-title', title, { expires: 7 });
  };

  const clearUser = () => {
    setUserName('');
    setJobTitle('');

    Cookies.remove('user-name');
    Cookies.remove('job-title');
  };

  return (
    <UserContext.Provider value={{ userName, jobTitle, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
