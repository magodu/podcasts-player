import React, { useState, useEffect, useCallback, useContext } from 'react';

import useHttp from 'src/hooks/useHttp';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { InputProps, SiteContextType, PodcastsData, PodcastsType, localStorageDataType } from 'src/models/appTypes';

import { isOutdated } from 'src/utils';
import { PODCASTS_URI, LOCAL_STORAGE_KEY } from 'src/constants';

export const SiteContext = React.createContext<SiteContextType>({
    data: {},
    isLoading: false,
    errorLoading: false,
    setData: (data: PodcastsData) => {},
    setLoading: (isLoading: boolean) => {}
} as SiteContextType);


const SiteContextProvider: React.FC<InputProps> = ( props ) => {
    const [ data, setData ] = useState<PodcastsData>({});
    const [ loading, setLoading ] = useState<boolean>(false);
    const { isLoading, error, sendRequest: fetchData } = useHttp();
    const [ localStorageData, setLocalStorageData ] = useLocalStorage<localStorageDataType>(LOCAL_STORAGE_KEY);
    const [ errorLoading, setErrorLoading ] = useState<boolean>(false);

    const getError = useCallback(() => {
        if (error) {
            console.error(error);
            setLoading(false);
            setErrorLoading(true);
        }
    }, [error]);

    const storeDataLocalStorage = useCallback((data: PodcastsType[]) => {
        setLocalStorageData((prevState: PodcastsData) => ({
            ...prevState,
            podcastsList: data,
            podcastsListTimestamp: new Date().getTime()
        }));
    }, [setLocalStorageData]);

    const getData = useCallback(async() => {
        let podcasts: PodcastsType[] = [];
        setLoading(true);
        try {
            const response = await fetchData({ url: PODCASTS_URI });
            response?.feed?.entry.forEach((p: any) => {
                let podcast = {
                    id: p.id.attributes["im:id"],
                    img: p["im:image"][2].label,
                    name: p["im:name"].label,
                    author: p["im:artist"].label,
                    summary: p.summary ? p.summary.label : "No description"
                };
                podcasts.push(podcast);
            });

            setData((prevState: PodcastsData) => ({ ...prevState, podcastsList: podcasts }));
            storeDataLocalStorage(podcasts);

            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }

    }, [fetchData, storeDataLocalStorage]);

    useEffect(() => {
        const hasDataLocalStorageData = () => {
            if (localStorageData) {
                const podcastsListTimestamp = localStorageData.podcastsListTimestamp;
                return (localStorageData.podcastsListTimestamp && localStorageData.podcastsList) || !isOutdated(podcastsListTimestamp);
            } else {
                return false;
            }
        }

        if (hasDataLocalStorageData()) {
            setData((prevState: PodcastsData) => ({ ...prevState, podcastsList: localStorageData.podcastsList, podcastsListTimestamp: localStorageData.podcastsListTimestamp }));
        } else {
            getData();
        }
       
        getError();

    }, [getData, getError, localStorageData]);

    useEffect(() => {
        setLoading(isLoading);

    }, [isLoading]);

    const setLoadingHandler = useCallback((isLoading: boolean) => {
        setLoading(isLoading);
    }, []);

    const setDataHandler = useCallback((data: any) => {
        setData(data);
    }, []);

    const contextValue: SiteContextType = {
        data: data,
        isLoading: loading,
        errorLoading: errorLoading,
        setData: setDataHandler,
        setLoading: setLoadingHandler
    };

    return <SiteContext.Provider value={contextValue}>
        {props.children}
    </SiteContext.Provider>
};

export default SiteContextProvider;

export const useSiteContext = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error(
            'useSiteContext must be used within a SiteContextProvider'
        );
    }

    return context;
}
