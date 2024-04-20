import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import PodcastItem from 'src/components/PodcastItem/PodcastItem';

describe('PodcastItem', () => {
    const mockPodcast = {
        id: '1',
        img: 'https://example.com/image.jpg',
        name: 'Test Podcast',
        author: 'John Doe',
    };

    test('renders the podcast name and author', () => {
        render(
            <MemoryRouter>
                <PodcastItem podcast={mockPodcast} />
            </MemoryRouter>
        );

        expect(screen.getByText('Test Podcast')).toBeInTheDocument();
        expect(screen.getByText('Author: John Doe')).toBeInTheDocument();
    });

    test('renders the podcast image', () => {
        render(
            <MemoryRouter>
                <PodcastItem podcast={mockPodcast} />
            </MemoryRouter>
        );

        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    test('renders a link to the podcast page', () => {
        render(
            <MemoryRouter>
                <PodcastItem podcast={mockPodcast} />
            </MemoryRouter>
        );

        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/podcast/1');
    });
});
