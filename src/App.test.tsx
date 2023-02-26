import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const charName = "Luke Skywalker Test";

const server = setupServer(
  rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => {
    return res(ctx.json({
      "name": charName
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

  await screen.findByText(/Name : Luke Skywalker Test/i);
  const textElement = screen.getByText("Name : Luke Skywalker Test");
  expect(textElement).toBeInTheDocument();
});


test('Check error is rendered correctly', async () => {
  server.use(
    rest.get('https://swapi.dev/api/people/1', (_req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  render(<App />);

  await screen.findByText(/Oops... something went wrong, try again/i);
  const textElement = screen.getByText("Oops... something went wrong, try again");
  expect(textElement).toBeInTheDocument();
});
