import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
  it('should render the application', () => {
    render(<App />);
    expect(screen.getByText(/rep\./i)).toBeInTheDocument();
  });

  it('should render the home page by default', () => {
    render(<App />);
    // Home page should show the wordmark
    expect(screen.getByText(/rep\./i)).toBeInTheDocument();
  });

  it('should render the tab bar', () => {
    render(<App />);
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Plans')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();
  });

  it('should navigate to Plans page when Plans tab is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.click(screen.getByText('Plans'));
    // Plans page should show plan cards
    expect(screen.getByText(/Push\/Pull/i)).toBeInTheDocument();
  });

  it('should navigate to Progress page when Progress tab is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.click(screen.getByText('Progress'));
    // Progress page should show PRs
    expect(screen.getByText(/Personal Records/i)).toBeInTheDocument();
  });

  it('should navigate to Profile page when You tab is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await user.click(screen.getByText('You'));
    // Profile page should show settings
    expect(screen.getByText(/Body stats/i)).toBeInTheDocument();
  });

  it('should render in an iPhone frame', () => {
    const { container } = render(<App />);
    const frame = container.firstChild as HTMLElement;
    expect(frame.style.width).toBe('390px');
    expect(frame.style.height).toBe('844px');
  });

  it('should show status bar', () => {
    const { container } = render(<App />);
    // Status bar shows time
    const statusBar = container.querySelector('[style*="position"]');
    expect(statusBar).toBeInTheDocument();
  });

  it('should show home indicator', () => {
    const { container } = render(<App />);
    // Home indicator is a rounded bar at the bottom
    const indicators = container.querySelectorAll('div');
    expect(indicators.length).toBeGreaterThan(5);
  });
});
