import React from 'react';
import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect';

import { MemoryRouter } from 'react-router-dom';
import PodcastEpisodeDetail from 'src/pages/PodcastEpisodeDetail/PodcastEpisodeDetail';
import { useSiteContext } from 'src/store/site-context';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('src/store/site-context', () => ({
    useSiteContext: jest.fn(),
}));

describe('PodcastEpisodeDetail', () => {
    beforeEach(() => {
        useParams.mockReturnValue({ podcastId: '1', episodeId: '1234' });

        useSiteContext.mockReturnValue({
            data: {
                podcastsList: [],
                podcastsListTimestamp: 1713614229456,
                podcastsDetail: {
                    1: {
                        id: '1',
                        artwork: 'test',
                        name: 'test',
                        feedUrl: 'test',
                        artistName: 'test',
                        description: 'test',
                        podcastTimestamp: 14223432,
                        episodes: [
                            {
                                id: '1234',
                                title: 'Test Episode',
                                date: '20/04/2024',
                                duration: '01:00:00',
                                content: '<p>Episode content</p>',
                                url: 'https://example.com/episode.mp3',
                            },
                        ],
                    },
                },
            },
        });
    });

    test('renders episode details correctly', async () => {
        render(
            <MemoryRouter initialEntries={['/podcast/1/episode/1234']}>
                <PodcastEpisodeDetail />
            </MemoryRouter>
        );

        expect(screen.getByText('Test Episode')).toBeInTheDocument();
        expect(screen.getByText('Episode content')).toBeInTheDocument();
    });
});
