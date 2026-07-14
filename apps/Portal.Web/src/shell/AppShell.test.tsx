import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StarterNotice } from './AppShell';

describe('AppShell starter guidance', () => {
  it('identifies the existing shell as a starter prototype', () => {
    render(<StarterNotice />);

    expect(screen.getByRole('status', { name: /starter prototype/i })).toHaveTextContent(
      /existing hubs are demo context/i
    );
  });
});
