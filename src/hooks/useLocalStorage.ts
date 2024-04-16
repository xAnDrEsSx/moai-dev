"use client";

// ReactJS
import { useState } from "react";

// Dependencies
import { toast } from "sonner";

function useLocalStorage(key: string, initialValue = "") {
    // State
    const [storedValue, setStoredValue] = useState(() => {
        try {
            let item: string | null = null;

            if (typeof window !== "undefined") {
                item = window.localStorage.getItem(key);
            }

            return item !== null ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value: unknown) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch {
            toast.error("Algo salió mal");
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
