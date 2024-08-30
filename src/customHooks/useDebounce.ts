import { useState, useEffect } from 'react';

function useDebounce<T>(
    value: T,
    delay: number,
    callback?: (debouncedValue: T) => void
): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            if (callback) {
                callback(value);
            }
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, callback]);

    return debouncedValue;
}

export default useDebounce;
