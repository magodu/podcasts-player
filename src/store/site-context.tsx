import React, { useState, useEffect, useCallback, useContext } from 'react';

import useHttp from 'src/hooks/useHttp';

import { InputProps, SiteContextObj, PodcastsData, PodcastsType } from 'src/models/appTypes';


const PODCASTS_URI = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export const SiteContext = React.createContext<SiteContextObj>({
    data: {},
    isLoading: false,
    errorLoading: false,
    setData: (data: PodcastsData) => {},
    setLoading: (isLoading: boolean) => {}
} as SiteContextObj);


const SiteContextProvider: React.FC<InputProps> = ( props ) => {
    const [ data, setData ] = useState<PodcastsData>({});
    const [ loading, setLoading ] = useState<boolean>(false);
    const { isLoading, error, sendRequest: fetchData } = useHttp();
    const [ errorLoading, setErrorLoading ] = useState<boolean>(false);

    const getError = useCallback(() => {
        if (error) {
            console.error(error);
            setLoading(false);
            setErrorLoading(true);
        }
    }, [error]);

    const getData = useCallback(async() => {
        let podcasts: PodcastsType[] = [];
        setLoading(true);
        try {
            const response = await fetchData({ url: PODCASTS_URI });
            let podcasts: PodcastsType[] = [];
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
            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }

    }, [fetchData]);

    useEffect(() => {
       getData();
       getError();

    }, [getData, getError]);

    useEffect(() => {
        setLoading(isLoading);

    }, [isLoading]);

    const setLoadingHandler = (isLoading: boolean) => {
        setLoading(isLoading);
    };

    const setDataHandler = (data: any) => {
        setData(data);
    };

    const contextValue: SiteContextObj = {
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
