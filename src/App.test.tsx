import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Check title is rendered correctley', () => {
  render(<App />);
  const linkElement = screen.getByText(/Starwars Character/i);
  expect(linkElement).toBeInTheDocument();
});
