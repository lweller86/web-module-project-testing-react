import React from 'react';
import { render, fireEvent, screen, waitFor, userEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetch from './../../api/fetchShow'
jest.mock('./../../api/fetchShow');

const testShow = {
    name: "testShow",
    summary: "testSummary",
    seasons: [{
        id: 0,
        name: 'Test Season 1',
        episodes: []

    },
    {
        id: 1,
        name: 'Test Season 2',
        episodes: []

    }]

}

test('renders without errors with no props', () => {
    render(<Display />)

});

test('renders Show component when the button is clicked ', async () => {
    mockFetch.mockResolvedValueOnce(testShow);
    render(<Display />)
    const fetch = screen.getByRole('button')
    fireEvent.click(fetch)


    const show = await screen.findByTestId('show-container')
    expect(show).toBeInTheDocument();

});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetch.mockResolvedValueOnce(testShow);

    render(<Display />)
    const fetch = screen.getByRole('button')
    fireEvent.click(fetch)

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option')
        expect(seasonOptions).toHaveLength(2);

    })
});

test('displayFunc is called when the fetch button is pressed', async ( ) => {
    mockFetch.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>)
    const fetch = screen.getByRole('button')
    fireEvent.click(fetch)

    await waitFor(()=> {
        expect(displayFunc).toHaveBeenCalled();
    })
    
})
