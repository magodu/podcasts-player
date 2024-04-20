import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { MemoryRouter } from 'react-router-dom';
import EpisodesTable from 'src/components/EpisodesTable/EpisodesTable';

jest.mock('src/utils', () => ({
    dateParser: jest.fn(),
}));

describe('EpisodesTable', () => {
    afterEach(cleanup);

    test('renders episodes correctly', () => {
        const mockEpisodes = [
          { id: '1', title: 'Episode 1', date: '2024-04-20', duration: '30 min' },
          { id: '2', title: 'Episode 2', date: '2024-04-21', duration: '45 min' },
        ];

        render(<MemoryRouter><EpisodesTable episodes={mockEpisodes} /></MemoryRouter>);
        
        expect(screen.getByText('Episode 1')).toBeInTheDocument();
        expect(screen.getByText('Episode 2')).toBeInTheDocument();
    });

});
   