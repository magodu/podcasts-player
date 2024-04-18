import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import { useSiteContext } from 'src/store/site-context';
import { EpisodeType } from 'src/models/appTypes';

const PodcastEpisodeDetail: React.FC = () => {
    const { podcastId, episodeId } = useParams();
    const [episode, setEpisode] = useState<EpisodeType | null>(null);
    const { data } = useSiteContext();

    const getEpisode = useCallback(async () => {
        const episode = data.podcastsDetail ? data.podcastsDetail[podcastId!].episodes.find((episode: any) => episode.id.toString() === episodeId) : {};
        setEpisode(episode);
    }, []);

    useEffect(() => {
        getEpisode();
    }, [getEpisode]);


    return (
        <Segment>
            {episode && (
                <>
                    <h2>{episode?.title}</h2>
                    <div dangerouslySetInnerHTML={{__html: episode?.content}} /> {/* TODO: sanitize this */}
                    <div className="ui divider" />
                    <div className="ui column centered grid padded">
                        <audio controls>
                            <source src={episode?.url} type="audio/ogg" />
                            <source src={episode?.url} type="audio/mpeg" />
                            <source src={episode?.url} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </>
            )}
        </Segment>
    );
};

export default PodcastEpisodeDetail;
