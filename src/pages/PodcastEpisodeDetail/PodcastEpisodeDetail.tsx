import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import { SiteContext } from 'src/store/site-context';


const PodcastEpisodeDetail: React.FC = () => {
    const { podcastId, episodeId } = useParams();
    const [episode, setEpisode] = useState<any>(null);  // TODO: add type
    const { data } = useContext(SiteContext);

    const getEpisode = useCallback(async () => {
        const episode = data.podcastsDetail ? data.podcastsDetail[podcastId!].episodes.find((episode: any) => episode.id.toString() === episodeId) : {};
        setEpisode(episode);
        console.log('episode', episodeId, episode)
    }, []);

    useEffect(() => {
        getEpisode();
    }, [getEpisode]);


    return (
        <Segment>
            <h2>{episode.title}</h2>
            <div dangerouslySetInnerHTML={{__html: episode.content}} /> {/* TODO: sanitize this */}
            <div className="ui divider" />
            <div className="ui column centered grid padded">
            <audio controls>
                <source src={episode.url} type="audio/ogg" />
                <source src={episode.url} type="audio/mpeg" />
                <source src={episode.url} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            </div>
        </Segment>
    );
};

export default PodcastEpisodeDetail;
