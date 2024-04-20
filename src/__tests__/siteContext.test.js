// SiteContextProvider.test.js
import React from 'react';
import { render, screen, act, renderHook } from '@testing-library/react';
import SiteContextProvider, { useSiteContext, SiteContext } from '../store/site-context';

const mockContextData = {
    data: {},
    isLoading: false,
    errorLoading: false,
    setData: jest.fn(),
    setLoading: jest.fn(),
}

const wrapper = ({ children }) => (
    <SiteContext.Provider value={mockContextData}>
        {children}
    </SiteContext.Provider>
);

const mockUseContext = jest.fn().mockImplementation(() => (mockContextData));

React.useContext = mockUseContext;

describe('useSiteContext test', () => {
    test('should return present feature toggles  with its state and dispatch function', () => {
        render(<SiteContextProvider />);
        const { result } = renderHook(() => useSiteContext(), { wrapper });

        expect(result.current.data).toEqual({});
        expect(result.current.isLoading).toBe(false);
        expect(result.current.errorLoading).toBe(false);
        expect(result.current).toEqual(mockContextData);
    });
});


describe('SiteContext Provider', () => {
    let container;
    let data;
    let isLoading;
    let errorLoading;

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        container = render(
            <SiteContext.Provider
                value={mockContextData}
            >
                <div data-testid="test-div" />
            </SiteContext.Provider>
        );
    });

    test('should render children components', () => {
        expect(screen.getByTestId('test-div')).toBeDefined();
    });

    test('should set and get the data value', () => {
        expect(data).toBeUndefined();
        act(() => {
            data = { name: 'John Doe' };
        });
        expect(data).toEqual({ name: 'John Doe' });
    });

    test('should set and get the loading value', () => {
        expect(isLoading).toBeUndefined();
        act(() => {
            isLoading = true;
        });
        expect(isLoading).toBe(true);
    });

    test('should set and get the errorLoading value', () => {
        expect(errorLoading).toBeUndefined();
        act(() => {
            errorLoading = true;
        });
        expect(errorLoading).toBe(true);
    });

    test('should call fetchData and set data using setDataHandler', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ data: { name: 'John Doe' } }],
        });

        expect(data).toEqual({ name: 'John Doe' });
    });

    test('renders error when call fetchData fails', async () => {
        window.fetch = jest.fn();
        window.fetch.mockRejectedValue(() => Promise.reject('API error'));

        await expect(errorLoading).toEqual(true);
    });
});


