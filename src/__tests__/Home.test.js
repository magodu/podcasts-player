import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import { SiteContext } from 'src/store/site-context';
import Home from 'src/pages/Home/Home';

const mockContextData = {
    data: {
        podcastsList: [
          { id: '1', name: 'Podcast 1', author: 'Author 1', img: 'image1.jpg' },
          { id: '2', name: 'Podcast 2', author: 'Author 2', img: 'image2.jpg' },
        ],
    },
    isLoading: false,
    errorLoading: false,
    setData: jest.fn(),
    setLoading: jest.fn(),
}

function renderComponentWithContext() {
    return render(
        <SiteContext.Provider value={mockContextData}>
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        </SiteContext.Provider>
    );
}


describe('Home', () => {

    afterEach(cleanup);

    test('renders loading state correctly', () => {
        renderComponentWithContext(mockContextData);
        expect(screen.getByPlaceholderText('Filter podcasts...')).toBeInTheDocument();
    });

    test('renders podcasts correctly', () => {
        renderComponentWithContext(mockContextData);
        expect(screen.getByText('Podcast 1')).toBeInTheDocument();
        expect(screen.getByText('Podcast 2')).toBeInTheDocument();
    });

    test('filters podcasts based on search text', () => {
        renderComponentWithContext(mockContextData);
        const searchInput = screen.getByPlaceholderText('Filter podcasts...');
        fireEvent.change(searchInput, { target: { value: 'Podcast 1' } });
        expect(screen.getByText('Podcast 1')).toBeInTheDocument();
        expect(screen.queryByText('Podcast 2')).not.toBeInTheDocument();
    });

    test('displays no results message when no podcasts match the search', () => {
        renderComponentWithContext(mockContextData);
        const searchInput = screen.getByPlaceholderText('Filter podcasts...');
        fireEvent.change(searchInput, { target: { value: 'Non-existent Podcast' } });
        expect(screen.getByText('No results for this search text: Non-existent Podcast.')).toBeInTheDocument();
    });
});
