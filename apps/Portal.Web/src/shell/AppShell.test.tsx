import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppShell } from './AppShell';

describe('neutral take-home starter', () => {
  it('makes the candidate-owned UI boundary explicit', () => {
    render(<AppShell />);

    expect(screen.getByRole('heading', { name: /build the requests & signing experience/i })).toBeVisible();
    expect(screen.getByRole('status', { name: /starter canvas/i })).toHaveTextContent(
      /intentionally does not include adaptivecash product ui/i
    );
  });

  it('does not reveal the production portal shell', () => {
    render(<AppShell />);

    expect(screen.queryByText(/ask adaptivecash ai/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/acme bank ukraine/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: /portal/i })).not.toBeInTheDocument();
  });
});
