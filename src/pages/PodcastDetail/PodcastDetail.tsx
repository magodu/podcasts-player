import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useParams } from "react-router-dom";
import { Grid, Placeholder } from "semantic-ui-react";

import PodcastInfo from 'src/components/PodcastInfo/PodcastInfo';

import { useSiteContext } from 'src/store/site-context';

import useHttp from 'src/hooks/useHttp';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { PodcastDetailType, EpisodeType, PodcastsData, localStorageDataType } from 'src/models/appTypes';
import { msToTime, isOutdated } from 'src/utils';

import { PODCASTS_DETAIL_URI, PODCASTS_EPISODES_URI, LOCAL_STORAGE_KEY } from 'src/constants';

const PodcastDetail: React.FC = () => {
    const { isLoading, error, sendRequest: fetchData } = useHttp();
    const { podcastId } = useParams();
    const [ podcast, setPodcast ] = useState<PodcastDetailType | null>(null);
    const { data, setData } = useSiteContext();
    const [ localStorageData, setLocalStorageData ] = useLocalStorage<localStorageDataType>(LOCAL_STORAGE_KEY);

    const storeDataLocalStorage = useCallback((podcastId: string, podcastDetail: PodcastDetailType) => {
        const lsObject = {...podcastDetail, podcastTimestamp: new Date().getTime()};
        setLocalStorageData((prevState: PodcastsData) => ({
            ...prevState, 
            podcastsDetail: {
                ...prevState.podcastsDetail,
                [podcastId!]: lsObject
            }
        }));
    }, [setLocalStorageData]);

    const getDetail = useCallback(async () => {
        const detailUri = PODCASTS_DETAIL_URI.replace(/PODCAST_ID/, podcastId!);
        const episodeUri = PODCASTS_EPISODES_URI.replace(/PODCAST_ID/, podcastId!);
        try {
            const response = await fetchData({ url: detailUri });
            const p = response.results[0];
            let podcastDetail: PodcastDetailType = {
                id: p.trackId,
                artwork: p.artworkUrl600,
                name: p.trackName,
                feedUrl: p.feedUrl,
                artistName: p.artistName
            };
            let episodes: EpisodeType[] = [];

            const episodesResponse = await fetchData({ url: episodeUri });
            const [itemTrack, ...items] = episodesResponse.results;

            items.forEach((episode: any) => {
                episodes.push({
                    id: episode.trackId,
                    title: episode.trackName,
                    date: episode.releaseDate,
                    duration: episode.trackTimeMillis ? msToTime(episode.trackTimeMillis) : '-',
                    content: episode.description,
                    url: episode.episodeUrl
                });
            });
            podcastDetail.episodes = episodes;
            const podcastItem = data.podcastsList?.find((podcast: any) => podcast.id === podcastId);
            podcastDetail.description = podcastItem?.summary;

            setPodcast(podcastDetail);
            setData((prevState: PodcastsData) => ({
                ...prevState,
                podcastsDetail: {
                    ...prevState.podcastsDetail,
                    [podcastId!]: podcastDetail
                }
            }));

            storeDataLocalStorage(podcastId!, podcastDetail);
        } catch (error) {
            console.error('Podcast not found', error);

        }
    }, [fetchData, podcastId, storeDataLocalStorage, data.podcastsList, setData]);

    useEffect(() => {
        const hasDataLocalStorageData = () => {
            if (localStorageData?.podcastsDetail) {
                const podcastTimestamp = localStorageData.podcastsDetail[podcastId!]?.podcastTimestamp;
                return localStorageData.podcastsDetail[podcastId!] && !isOutdated(localStorageData.podcastsDetail[podcastId!]?.podcastTimestamp);
            } else {
                return false;
            }
        };

        if (hasDataLocalStorageData()) {
            setPodcast(localStorageData.podcastsDetail[podcastId!]);
            setData((prevState: PodcastsData) => ({
                ...prevState,
                podcastsDetail: {
                    ...prevState.podcastsDetail,
                    [podcastId!]: localStorageData.podcastsDetail[podcastId!]
                }
            }));
        } else {
            getDetail();
        }

    }, [getDetail, localStorageData?.podcastsDetail, podcastId, setData]);

    return (
        <>
            { error ? (<h2>Something went wrong. Please check the console.</h2>)
            : (
                <Grid>
                    <Grid.Column width={4}>
                        {isLoading ? (
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                        ) : (
                            <PodcastInfo podcast={podcast} />
                        )}
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Outlet context={[podcast, isLoading]} />
                    </Grid.Column>
                </Grid>
                )
            }
        </>
    );
};

export default PodcastDetail;
