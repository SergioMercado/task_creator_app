import { useState } from 'react';
import useSwr from 'swr';
import { httpClient } from '../utils/axios_instance';

const baseUrl = 'http://localhost:8000/api';
export function useToggle(value = false) {
  const [toggle, setToggle] = useState(value);

  const toggleHandler = () => setToggle(!toggle);

  return [toggle, toggleHandler];
}

const fetcher = async (path) => {
  const { data } = await httpClient.get(path);
  return data;
};

export function useRequest(path) {
  if (!path) {
    throw new Error('Path is required');
  }

  const { data, error, mutate } = useSwr(path, fetcher);

  const isLoading = !data && !error;

  return { data, isLoading, error, isLoading, mutate };
}
