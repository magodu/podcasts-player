import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Image } from 'semantic-ui-react';

import { SiteContext } from 'src/store/site-context';

import classes from 'src/components/PodcastItem/PodcastItem.module.scss';

interface PodcastItemProps {
    podcast: any;
}

const PodcastItem: React.FC<PodcastItemProps> = ({ podcast }) => {
    const navigate = useNavigate();
    const { isLoading } = useContext(SiteContext);

    const handleClick = () => {
        navigate(`/podcast/${podcast.id}`, { state: podcast });
    };

    return (
        <Card onClick={() => handleClick()} style={{ marginTop: '4rem' }}>
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

        
    );
};

export default PodcastItem;
