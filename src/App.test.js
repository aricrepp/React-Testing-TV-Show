import React from 'react';
import { render, fireEvent, waitFor, getAllByTestId } from '@testing-library/react';
import { fetchMissions as mockFetchMissions } from './api/fetchMissions';

jest.mock('./api/fetchMissions.js');

test('App fetches missions data and renders it', () => {
  mockFetchMissions.mockResolvedValueOnce(missions);
  const { getByRole, findByText } = render(<App />);
  const button = getByRole('button', { name: /get data/i });

  fireEvent.click(button);
  await findByText(/we are fetching data/i);

  await waitFor(() => {
      expect(getAllByTestId('mission')).toEqual(3);
  })
});