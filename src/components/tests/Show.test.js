import React from 'react';
import { render, fireEvent, screen, userEvent, getAllByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';


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


test('renders without errors', () => {
    render(<Show show={testShow} selectedSeason={'none'} />)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);
    const loadingScreen = screen.queryByTestId('loading-container');
    expect(loadingScreen).toBeInTheDocument();

});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShow} selectedSeason={'none'} />);
    const seasons = screen.queryAllByTestId('season-option');
    expect(seasons).toHaveLength(2);
});

test('handleSelect is called when a season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={testShow} selectedSeason={'none'} handleSelect={handleSelect} />)
    const select = screen.getByLabelText(/Select A Season/i)
    fireEvent.change(select), { target: { value: 2 } }
    expect(handleSelect).toBeCalled();


});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { });
const { rerender } = render(<Show show={testShow} selectedSeason={'none'} />);
let episodes = screen.queryByTestId('episodes-container');
expect(episodes).not.toBeInTheDocument();

rerender(<Show show={testShow} selectedSeason={1} />);
episodes = screen.queryByTestId('episodes-container');
expect(episodes).toBeInTheDocument();
