import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useParams } from "react-router-dom";
import { Grid, Placeholder } from "semantic-ui-react";

import PodcastInfo from 'src/components/PodcastInfo/PodcastInfo';

import { useSiteContext } from 'src/store/site-context';

import useHttp from 'src/hooks/useHttp';
import { PodcastDetailType, EpisodeType, PodcastsData } from 'src/models/appTypes';
import { msToTime } from 'src/utils';

const PODCASTS_DETAIL_URI = 'https://itunes.apple.com/lookup?id=PODCAST_ID';
const PODCASTS_EPISODES_URI = 'https://itunes.apple.com/lookup?id=PODCAST_ID&media=podcast&entity=podcastEpisode'


const PodcastDetail: React.FC = () => {
    const { isLoading, error, sendRequest: fetchData } = useHttp();
    const { podcastId } = useParams();
    const [ podcast, setPodcast ] = useState<PodcastDetailType | null>(null);
    const { data, setData } = useSiteContext();

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
            podcastDetail.description = podcastItem.summary;

            setPodcast(podcastDetail);
            setData((prevState: PodcastsData) => ({
                ...prevState,
                podcastsDetail: {
                    ...prevState.podcastsDetail,
                    [podcastId!]: podcastDetail
                }
            }));
        } catch (error) {
            console.error('Podcast not found', error);

        }
    }, [fetchData, podcastId]);


    useEffect(() => {
        getDetail();
    }, [getDetail]);

    if (error) {
        return <h2>Something went wrong. Please check the console.</h2>;
    }

    return (

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
    );
};

export default PodcastDetail;
