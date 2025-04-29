import { useState, useEffect } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async() => {
    console.log('fetchData function called in useFetch');
    try {
      console.log('Setting loading to true');
      setLoading(true);
      setError(null);
      console.log('Calling provided fetchFunction...');
      const result = await fetchFunction();
      console.log('fetchFunction returned result:', result ? 'Data received' : 'No data');
      setData(result);
      return result;
    } catch(err) {
      console.error('Error caught in fetchData:', err);
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return null;
    } finally {
      console.log('Finally block: Setting loading to false');
      setLoading(false);
    }
  }

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;