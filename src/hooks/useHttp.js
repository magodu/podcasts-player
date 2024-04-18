import { useState, useCallback } from 'react';
import axios from 'axios';

import { useSiteContext } from 'src/store/site-context';

const CORS_PROXY = "https://api.allorigins.win/get?url=";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setLoading } = useSiteContext();

    const sendRequest = useCallback(async (requestConfig) => {
        setIsLoading(true);
        setLoading(true); // Context Loading
        setError(null);
        try {
            const method = requestConfig.method ? requestConfig.method.toLowerCase() : 'get';
            const encodedUrl = `${CORS_PROXY}${encodeURIComponent(requestConfig.url)}`;
            const headers = requestConfig.headers ? requestConfig.headers : {};
            const data = requestConfig.body ? requestConfig.body : null;

            const response = await axios[method](encodedUrl, data, { headers });
            const parsedData = JSON.parse(response.data.contents);

            return parsedData;
        } catch (error) {
            setError(error.message || 'Something went wrong!');
            throw error;
        } finally {
            setIsLoading(false);
            setLoading(false); // Context Loading
        }
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    };
};

export default useHttp;
