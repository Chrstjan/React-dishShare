import { useQuery } from "@tanstack/react-query";

export const useFetch = <T = unknown,>(url: string, options = {}) => {
  const { data, isLoading, error } = useQuery<T, Error>({
    queryKey: [url, options],
    queryFn: async (): Promise<T> => {
      try {
        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error(`Error: ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
      } catch (err: unknown) {
        if (err instanceof Error) {
          throw new Error(`Error: ${err.message}`);
        }
        throw new Error("An unknown error occurred");
      }
    },
    staleTime: 60000,
    retry: 3,
  });

  return { data, isLoading, error };
};
