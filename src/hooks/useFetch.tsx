import { useQuery } from "@tanstack/react-query";

export const useFetch = <T = unknown,>(url: string) => {
  const { data, isLoading, error } = useQuery<T, Error>({
    queryKey: [url],
    queryFn: async (): Promise<T> => {
      try {
        const res = await fetch(url);

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
    retry: 1,
  });

  return { data, isLoading, error };
};
