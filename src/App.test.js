import React from 'react';
import App from './App';
import {
  render,
  fireEvent,
  waitFor,
  getAllByTestId,
} from '@testing-library/react';
import { fetchShows as mockFetchShows } from './api/fetchShows';

jest.mock('./api/fetchShows.js');

test('App fetches show data and renders it', async () => {
  mockFetchShows.mockResolvedValueOnce(mockData);
  const { getByText, queryAllByText, getByRole } = render(<App />);
  expect(queryAllByText(/Fetching data.../i)).toHaveLength(1);

  await waitFor(() => {
    const button = getByText('Select a season');
    fireEvent.click(button);
  });
});

const mockData = {
  image: { original: 'original' },
  name: 'name',
  summary: '<p>summary</p>',
  _embedded: {
    episodes: [
      {
        id: '1',
        image: { medium: 'medium_image' },
        name: 'name',
        season: 3,
        number: 2,
        summary: '<p>Summary</p>',
        runtime: 20,
      },
    ],
  },
};
