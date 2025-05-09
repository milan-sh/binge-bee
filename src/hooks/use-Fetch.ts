import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface ApiError {
  code: string
  message: string
  details?: unknown
  status?: number
}

function useFetch<T = any>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get<T>(url);
      setData(res.data);
      setError(null);
    } catch (err) {
      //handle Axios Error
      if(axios.isAxiosError(err)){
        setError({
          code: err?.code || "AXIOS ERROR",
          message: err.message,
          status: err?.response?.status,
          details: err.response?.data
        })
      } 
      //handle generic error
      else if(err instanceof Error){
        setError({
          code: "Unknown Error",
          message: err.message
        })
      }
      //fallback for not throw errors
      else{
        setError({
          code:"Unknown Error",
          message: String(err)
        })
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;