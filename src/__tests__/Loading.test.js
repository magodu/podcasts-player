import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Loading from 'src/components/Loading/Loading';

describe('Loading component', () => {

    afterEach(cleanup);

    test('should render Loading component correctly', () => {
        render(<Loading />);

        const loadingText = screen.getByTestId('spinnerTesting')

        expect(loadingText).toBeInTheDocument();
    });
});
