import { useState, useEffect } from "react";
import axios from 'axios';

const useLocalStorage = (key: string, initialValue: any) => {
    const [value, setValue] = useState(() => {
        try {
            const localValue = window.localStorage.getItem(key);
            return localValue ? JSON.parse(localValue) : initialValue;
        } catch (error) {
            return initialValue
        }
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage;