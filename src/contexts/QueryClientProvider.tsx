"use client";

// ReactJS
import { createContext, useContext, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Utils
import { queryClient } from "@utils/reactQueryClient";

const QueryClientContext = createContext<QueryClient | undefined>(undefined);

export const useQueryClientContext = () => useContext(QueryClientContext);

export const ReactQueryClientProvider = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <QueryClientContext.Provider value={queryClient}>
            {children}
        </QueryClientContext.Provider>
    </QueryClientProvider>
);
