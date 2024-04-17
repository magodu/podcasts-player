import React, { useState, useContext } from 'react';
import { Grid, Label, Segment, Placeholder } from 'semantic-ui-react';

import PodcastItem from 'src/components/PodcastItem/PodcastItem';

import { SiteContext } from 'src/store/site-context';

import { PodcastsObj } from 'src/models/appTypes';

import classes from 'src/pages/Home/Home.module.scss';

const Home: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const { isLoading, data } = useContext(SiteContext);

    const filterData = () => {
        let results: PodcastsObj[] = data.podcastsList?.length! > 0 ? [...data.podcastsList!] : []; 

        if (searchText.length > 0) {
            results = results.filter((item: PodcastsObj) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.author.toLowerCase().includes(searchText.toLowerCase()));
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
        <>
            {!isLoading && (
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
            )}

            <Grid columns={4} padded>
                {filteredData.map((podcast) => {
                    return (
                        <Grid.Column width={4} key={podcast.id}>
                            {isLoading ? (
                                <Segment raised>
                                    <Placeholder>
                                        <Placeholder.Header image>
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                        </Placeholder.Header>
                                        <Placeholder.Paragraph>
                                            <Placeholder.Line length="medium" />
                                            <Placeholder.Line length="short" />
                                        </Placeholder.Paragraph>
                                    </Placeholder>
                                </Segment>
                            ) : (
                                <PodcastItem podcast={podcast} />
                            )}
                        </Grid.Column>
                    );
                })}
                {filteredData.length === 0 && searchText.length > 0 && <div className={classes['no-results']}>No results for this search text: {searchText}.</div>}
            </Grid>
        </>
    );
};

export default Home;
