import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';

import useHttp from 'src/hooks/useHttp';

import { InputProps, SiteContextObj, PodcastsData, PodcastsObj } from 'src/models/appTypes';


const PODCASTS_URI = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export const SiteContext = React.createContext<SiteContextObj>({
    data: {},
    isLoading: false,
    errorLoading: false,
    setData: (data: PodcastsData) => {}
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

    const getData = useCallback(() => {
        setLoading(true);
        const transformData = (response: any) => {
            let podcasts: PodcastsObj[] = [];
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
        };

        fetchData({
                url: PODCASTS_URI
            },
            transformData
        );

    }, [fetchData]);

    useEffect(() => {
       getData();
       getError();

    }, [getData, getError]);

    useEffect(() => {
        setLoading(isLoading);

    }, [isLoading]);

    const setDataHandler = (data: any) => {
        setData(data);
    };

    const contextValue: SiteContextObj = {
        data: data,
        isLoading: loading,
        errorLoading: errorLoading,
        setData: setDataHandler
    };

    return <SiteContext.Provider value={contextValue}>
        {props.children}
    </SiteContext.Provider>
};

export default SiteContextProvider;

export const useSiteContext = () => useContext(SiteContext);
