import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      gcTime: 1000 * 60 * 1, // 1 minutes
    },
  },
});

export default queryClient;
