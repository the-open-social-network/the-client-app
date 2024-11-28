import React, { Dispatch, SetStateAction, createContext, useState } from 'react';

type APIContextProps = {
  GET: (endpoint: string, data?: Record<string, string>) => Promise<Response>;
  POST: (endpoint: string, body: unknown) => Promise<Response>;
  setAPIURL: Dispatch<SetStateAction<string>>;
  APIURL: string;
};

export const APIContext = createContext({
  // partial server context props.
} as APIContextProps);

export function APIContextProvider(props: React.PropsWithChildren<{}>) {  
  const [ APIURL, setAPIURL ] = useState('http://localhost:9090');

  async function POST(endpoint: string, body: unknown): Promise<Response> {
    return fetch(`${APIURL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response;
        }
        
        throw response;
      });
  }
  
  async function GET(endpoint: string, data: Record<string, string> = {}): Promise<Response> {
    const params: string = Object.keys(data)
      ? `?${new URLSearchParams(data).toString()}`
      : "";
    
    return fetch(`${APIURL}${endpoint}${params}`, {
      method: 'GET',
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          return response;
        }
        
        throw response;
      });
  }

  return (
    <APIContext.Provider value={{
      GET,
      POST,
      APIURL,
      setAPIURL,
    }}>
      {props?.children}
    </APIContext.Provider>
  );
}