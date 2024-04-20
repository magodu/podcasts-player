import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect';

import Header from 'src/components/Header/Header';

describe('Home component', () => {
    const renderComponent = () => render(<MemoryRouter><Header /></MemoryRouter>);

    afterEach(cleanup);

    test('Title contains correct value', () => {
        renderComponent();
        expect(screen.getByText('Podcaster')).toBeInTheDocument();
    });
});
