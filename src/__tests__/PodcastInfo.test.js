import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { MemoryRouter } from 'react-router-dom';
import PodcastInfo from 'src/components/PodcastInfo/PodcastInfo';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('PodcastInfo', () => {

    test('renders podcast details correctly', () => {
        const mockPodcast = {
            id: '1',
            name: 'Test Podcast',
            artistName: 'Test Artist',
            description: '<p>Test Description</p>',
            artwork: 'https://example.com/artwork.jpg',
        };

        render(
            <MemoryRouter>
                <PodcastInfo podcast={mockPodcast} />
            </MemoryRouter>
        );

        expect(screen.getByText('Test Podcast')).toBeInTheDocument();
        expect(screen.getByText('by Test Artist')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

});
