import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { useOutletContext, MemoryRouter } from 'react-router-dom';
import EpisodesList from 'src/components/EpisodesList/EpisodesList';

// Mock useOutletContext
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useOutletContext: jest.fn(),
}));


describe('EpisodesList', () => {
    const renderComponent = () => render(<MemoryRouter><EpisodesList /></MemoryRouter>);

    afterEach(cleanup);

    test('renders loading state correctly', () => {
       useOutletContext.mockReturnValue([null, true]); // Simulate loading state

       const { container } = renderComponent();
       const placeholderElement = container.querySelector('.ui.placeholder');
       expect(placeholderElement).toBeInTheDocument();
       expect(screen.queryByText(/Episodes:/i)).not.toBeInTheDocument();
    });

    test('renders episodes list correctly', () => {
        const mockPodcast = {
          episodes: [
            { title: 'Episode 1', description: 'Description 1' },
            { title: 'Episode 2', description: 'Description 2' },
          ],
        };
        useOutletContext.mockReturnValue([mockPodcast, false]);
        renderComponent();

        const episodesElement = screen.getByText(/Episodes:/i);

        expect(episodesElement).toBeInTheDocument();
        expect(screen.getAllByText((content, element) => element.textContent.includes('2'))[0]).toBeInTheDocument();

    });
});
   