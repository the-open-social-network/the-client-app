import { useContext } from 'react';
import { PostContext } from '../contexts/post-context';

export function usePost() {
  return useContext(PostContext);
}