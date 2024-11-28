import React, { createContext } from 'react';

export const PostContext = createContext({});

export function PostContextProvider(props: React.PropsWithChildren<{}>) {  
  return (
    <PostContext.Provider value={{}}>
      {props?.children}
    </PostContext.Provider>
  );
}