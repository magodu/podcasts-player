import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import NotFound from 'src/pages/NotFound/NotFound';

describe('NotFound component', () => {

    afterEach(cleanup);

    test('should render NotFound component correctly', () => {
        render(<MemoryRouter><NotFound /></MemoryRouter>);

        const notFoundText = screen.getByText('404');
        const notFoundSecondText = screen.getByText('The page you are looking for was not found.');

        expect(notFoundText).toBeInTheDocument();
        expect(notFoundSecondText).toBeInTheDocument();
    });
});
