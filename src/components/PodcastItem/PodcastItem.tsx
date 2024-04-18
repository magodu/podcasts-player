import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Image } from 'semantic-ui-react';

import { useSiteContext } from 'src/store/site-context';

import classes from 'src/components/PodcastItem/PodcastItem.module.scss';

import { PodcastsType } from 'src/models/appTypes';

interface PodcastItemProps {
    podcast: PodcastsType;
}

const PodcastItem: React.FC<PodcastItemProps> = ({ podcast }) => {
    const { isLoading } = useSiteContext();

    return (
        <Link to={`/podcast/${podcast.id}`}>
            <Card style={{ marginTop: '4rem' }}>
                <Card.Content>
                    <div className={classes.image}>
                        <Image src={podcast.img} />
                    </div>
                    <Card.Header><span className={classes['centered-content']}>{podcast.name}</span></Card.Header>
                    <Card.Meta>
                        <span className={classes['centered-content']}>Author: {podcast.author}</span>
                    </Card.Meta>
                </Card.Content>
            </Card>
        </Link>

        
    );
};

export default PodcastItem;
