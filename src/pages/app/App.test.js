import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const response = { speaker: 'Speaker', quote: 'Test Quote' };

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const server = setupServer(
    rest.get(process.env.REACT_APP_API, (req, res, context)=>{
        return res(context.json(response));
    })
);

test('renders the app, with a button, a quote and a text', () => {
  render(<App />);
  const buttonEl = screen.getByRole('button');
  const imageEl = screen.getByRole('img');
  const textEl = screen.getByText(/loading author/);

  expect(buttonEl).toBeInTheDocument();
  expect(imageEl).toBeInTheDocument();
  expect(textEl).toBeInTheDocument();
});

test('call api on button click and update its text', async () => {
  render(<App />);
  
  const buttonEl = screen.getByRole('button');
  fireEvent.click(buttonEl);
  const quoteEl = await screen.findByText(response.quote);

  expect(quoteEl).toBeInTheDocument();
});

test('call api on startup and renders its response', async () => {
  render(<App />);

  const quoteEl = await screen.findByText(response.quote);

  expect(quoteEl).toBeInTheDocument();
});