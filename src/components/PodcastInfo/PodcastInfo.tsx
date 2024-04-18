import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

import classes from 'src/components/PodcastInfo/PodcastInfo.module.scss';

import { PodcastDetailType } from 'src/models/appTypes';

interface PodcastInfoProps {
    podcast: PodcastDetailType | null;
}

interface DescriptionProps {
    description: string;
}

const Description: React.FC<DescriptionProps> = ({ description = '' }) => {
    return (
        <>
            <b>Description:</b>
            <div dangerouslySetInnerHTML={{__html: description}} /> {/* TODO: sanitize this */}
        </>
    );
};

const PodcastInfo: React.FC<PodcastInfoProps> = ({ podcast }) => {
    return (
        <Link to={`/podcast/${podcast?.id}`}>
            <Card>
                <Card.Content>
                    <div className={classes.image}>
                        <Image src={podcast?.artwork} />
                    </div>
                    <Card.Header><span className={classes['info-name']}>{podcast?.name}</span></Card.Header>
                    <Card.Meta>
                        <span className={classes['info-artist']}>by {podcast?.artistName}</span>
                    </Card.Meta>
                    <Card.Description>
                        <div className={classes['info-description']} >
                            <Description description={podcast?.description!} />
                        </div>   
                    </Card.Description>
                </Card.Content>
            </Card>
        </Link>
    );
};

export default PodcastInfo;
