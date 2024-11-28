import { useContext } from 'react';
import { APIContext } from '../contexts/api-context';

export function useAPI() {
  return useContext(APIContext);
}