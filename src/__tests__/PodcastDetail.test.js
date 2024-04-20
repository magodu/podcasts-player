import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import PodcastDetail from 'src/pages/PodcastDetail/PodcastDetail';
import useHttp from 'src/hooks/useHttp';
import { PODCASTS_DETAIL_URI, PODCASTS_EPISODES_URI } from 'src/constants';

jest.mock('src/utils', () => ({
    msToTime: jest.fn(),
}));

jest.mock('src/utils', () => ({
    isOutdated: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));


describe('PodcastDetail', () => {
    beforeEach(() => {
        useParams.mockReset();
    });

    test('renders loading state correctly', () => {
        useParams.mockReturnValue({ podcastId: '1' });

        const { container } = render(
            <MemoryRouter initialEntries={['/podcast/1']}>
                <PodcastDetail />
            </MemoryRouter>
        );
        const placeholderElement = container.querySelector('.ui.placeholder');

        expect(placeholderElement).toBeInTheDocument();
    });
});
