import React, { useState } from 'react';
import { Grid, Label, Segment, Placeholder } from 'semantic-ui-react';

import PodcastItem from 'src/components/PodcastItem/PodcastItem';

import { useSiteContext } from 'src/store/site-context';

import { PodcastsType } from 'src/models/appTypes';

import classes from 'src/pages/Home/Home.module.scss';

const Home: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const { isLoading, data } = useSiteContext();
    const dummyArray = new Array(16).fill(0);

    const filterData = () => {
        let results: PodcastsType[] = data.podcastsList?.length! > 0 ? [...data.podcastsList!] : []; 

        if (searchText.length > 0) {
            results = results.filter((item: PodcastsType) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.author.toLowerCase().includes(searchText.toLowerCase()));
        }

        return results;
    }

    const filteredData = filterData();

    const searchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;

        if (text.length > 0) {
            setSearchText(text);
        } else {
            setSearchText('');
        }
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <>
                    <Segment className={classes['podcast-no-border']}>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line />
                            </Placeholder.Header>
                        </Placeholder>
                    </Segment>
                    <Grid columns={4} padded>
                        {dummyArray.map((item, index) => {
                            return (
                                <Grid.Column width={4} key={index}>
                                    <Segment raised>
                                        <Placeholder >
                                            <Placeholder.Image style={{ height: '100px', width: '100%' }}/>
                                            <Placeholder.Paragraph>
                                                <Placeholder.Line length="medium" />
                                                <Placeholder.Line length="short" />
                                            </Placeholder.Paragraph>
                                        </Placeholder>
                                    </Segment>
                                </Grid.Column>
                            );
                        })}
                    </Grid>
                </>
            ) :
            (
                <>
                    <Segment textAlign="right" className={classes['podcast-no-border']}>
                        <Label color="blue" size="large">
                            {filteredData.length}
                        </Label>
                        <div className="ui icon focus input">
                            <i className="search icon" />
                                <input
                                    type="text"
                                    placeholder="Filter podcasts..."
                                    name="filter"
                                    autoComplete="off"
                                    onChange={(event) => searchTextChange(event)}
                                />
                        </div> 
                    </Segment>

                    <Grid columns={4} padded>
                        {filteredData.map((podcast) => {
                            return (
                                <Grid.Column width={4} key={podcast.id}>
                                    <PodcastItem podcast={podcast} />
                                </Grid.Column>
                            );
                        })} 
                        {filteredData.length === 0 && searchText.length > 0 && <div className={classes['no-results']}>No results for this search text: {searchText}.</div>}
                    </Grid>
                </>
            )}
        </React.Fragment>
    );
};

export default Home;
