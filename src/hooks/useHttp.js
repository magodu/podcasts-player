import { useState, useCallback } from 'react';
import axios from 'axios';
import { wait } from '@testing-library/user-event/dist/utils';

const CORS_PROXY = "https://api.allorigins.win/get?url=";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const method = requestConfig.method ? requestConfig.method.toLowerCase() : 'get';
            const encodedUrl = `${CORS_PROXY}${encodeURIComponent(requestConfig.url)}`;
            const headers = requestConfig.headers ? requestConfig.headers : {};
            const data = requestConfig.body ? requestConfig.body : null;

            const response = await axios[method](encodedUrl, data, { headers });
            const parsedData = JSON.parse(response.data.contents);

            applyData(parsedData);

        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }

        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    };
};

export default useHttp;
