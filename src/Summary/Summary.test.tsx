import React from 'react';
import { render, screen } from '@testing-library/react';
import Summary from '../Summary/Summary';

test('renders title', () => {
  render(<Summary />);
  const linkElement = screen.getByText(/Transaction Summary/i);
  expect(linkElement).toBeInTheDocument();
});
