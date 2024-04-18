import React from 'react';
import { useOutletContext } from "react-router-dom"
import { Segment, Placeholder } from 'semantic-ui-react';

import EpisodesTable from 'src/components/EpisodesTable/EpisodesTable';

const EpisodesList: React.FC = () => {
    const [podcast, isLoading] = useOutletContext<any>();

    return (
        <div>
            <Segment>
                {isLoading ? (
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                ) : (
                    <b>Episodes: {podcast?.episodes?.length}</b>
                )}
            </Segment>
            {isLoading ? (
                <Placeholder fluid>
                    <Placeholder.Line length="full" />
                    <Placeholder.Line length="full" />
                    <Placeholder.Line length="full" />
                    <Placeholder.Line length="full" />
                </Placeholder>
            ) : (
                <EpisodesTable episodes={podcast?.episodes} />
            )}
        </div>
    );
};

export default EpisodesList;
