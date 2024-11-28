import React, { createContext, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAPI } from '../hooks/useAPI';

export type Me = {
  handle: string;
  bg: string;
  avatar: string;
  userid: string;
  fullname: string;
  domain: string;
  active: boolean;
  banned: boolean;
  locale: string;
  minibio: string;
  following_count: number;
  followers_count: number;
  banned_at: string;
  deactivated_at: string;
  // those fields are not part of user profile
  // on the db schema, but are returned by /me
  // when there is no profile yet for any reason.
  // the field email is returned as a masked value
  onboarding: boolean;
  unverified: boolean;
  email: string;
}

export type ContextMe = {
  me: Me,
  logged: boolean;
  loading: boolean,
  signOut: () => void,
  updateMe: (overrides: Partial<Me>) => void,
};

export const AuthContext = createContext({} as ContextMe);

export function AuthContextProvider(props: React.PropsWithChildren<{}>) {
  const { GET } = useAPI();
  const [ me, setMe ] = useState<Me>({} as Me);
  const [ loading, setLoading ] = useState(true);
  
  const signOut = () => {
    GET('/auth/signout')
    .then(() => (window.location.href = "/"))
    .catch(() => toast.error('An unexpected error occurred. Please try again in a few minutes'))
  }

  useEffect(() => {
    GET('/me')
      .then(response => response.json())
      .then(setMe)
      .finally(() => setLoading(false))
  }, []);

  const updateMe = useCallback((overrides: Partial<Me>) => {
    setMe({ ...me, ...overrides });
  }, [me, setMe]);

  return (
    <AuthContext.Provider value={{
      me,
      loading,
      signOut,
      updateMe,
      logged: Boolean(me?.userid)
    }}>
      {props?.children}
    </AuthContext.Provider>
  );
}