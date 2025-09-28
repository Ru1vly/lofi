import { render, screen } from '@testing-library/react';
import App from './App';

// Mock custom hooks to avoid issues with dependencies like `require.context`
// and to provide controlled test data.

jest.mock('./hooks/useQuotes', () => () => ({
  currentQuote: 'This is a test quote.',
}));

jest.mock('./hooks/useSongs', () => () => ({
  currentSong: 'test-song.mp3',
  selectRandomSongs: jest.fn(),
}));

jest.mock('./hooks/useVolume', () => () => ({
  volume: 50,
  renderVolumeControl: () => <div data-testid="volume-control">Volume Control</div>,
}));

jest.mock('./hooks/useGifs', () => () => ({
  currentGif: 'test.gif',
  currentGifIndex: 0,
  selectRandomGif: jest.fn(),
}));

jest.mock('./hooks/useTransitionGifs', () => () => ({
  currentTransitionGif: 'transition.gif',
  handleGifTransition: jest.fn(),
  selectRandomTransitionGifs: jest.fn(),
  showTransition: false,
}));

// Mock the Timer component since its internal logic (useTimer) can be complex
// and is not the focus of the App component test.
jest.mock('./Timer', () => () => <div data-testid="timer">Timer Component</div>);

test('renders the main application components', () => {
  render(<App />);

  // Check for the quote
  expect(screen.getByText('This is a test quote.')).toBeInTheDocument();

  // Check for the main control buttons
  expect(screen.getByAltText('Previous')).toBeInTheDocument();
  expect(screen.getByAltText('Play')).toBeInTheDocument();
  expect(screen.getByAltText('Next')).toBeInTheDocument();

  // Check for the mocked components
  expect(screen.getByTestId('volume-control')).toBeInTheDocument();
  expect(screen.getByTestId('timer')).toBeInTheDocument();
});