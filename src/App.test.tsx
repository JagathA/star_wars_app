import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const charName = "Luke Skywalker";

const server = setupServer(
  rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => {
    return res(ctx.json({
      "name": "Luke Skywalker"
    }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Check title is rendered correctly', () => {
  render(<App />);
  const textElement = screen.getByText(/Starwars Character/i);
  expect(textElement).toBeInTheDocument();
});


test('Check character data is rendered correctly', async () => {
  render(<App />);

  await screen.findByText(/Starwars Character/i);
  await screen.findByText(/Name :/i);
  const textElement = screen.getByText(/Luke Skywalker/i);
  expect(textElement).toBeInTheDocument();
});