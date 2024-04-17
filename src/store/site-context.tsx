import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';

import useHttp from 'src/hooks/useHttp';

import { InputProps, SiteContextObj, PodcastsData, PodcastsObj } from 'src/models/appTypes';


export const SiteContext = React.createContext<SiteContextObj>({
    data: {},
    isLoading: false,
    errorLoading: false,
    setData: (data: PodcastsData) => {}
} as SiteContextObj);


const SiteContextProvider: React.FC<InputProps> = ( props ) => {
    const [ data, setData ] = useState<PodcastsData>({});
    const [ loading, setLoading ] = useState<boolean>(false);
    const { error, sendRequest: fetchData } = useHttp();
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
            console.log('podcasts', podcasts);
            setData((prevState: PodcastsData) => ({ ...prevState, podcastsList: podcasts }));

            setLoading(false);
        };
        console.log('Get Podcasts');
        fetchData({
                url: `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
            },
            transformData
        );

    }, [fetchData]);

    useEffect(() => {
       getData();
       getError();

    }, [getData, getError]);


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
