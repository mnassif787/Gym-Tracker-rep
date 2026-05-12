import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomePage } from '../pages/HomePage';

describe('HomePage', () => {
  const mockGo = vi.fn();

  it('should render the wordmark', () => {
    render(<HomePage go={mockGo} state="planned" workoutActive={false} />);
    expect(screen.getByText(/rep\./i)).toBeInTheDocument();
  });

  it('should show planned workout state', () => {
    render(<HomePage go={mockGo} state="planned" workoutActive={false} />);
    expect(screen.getByText(/Push Day/i)).toBeInTheDocument();
  });

  it('should show rest day state', () => {
    render(<HomePage go={mockGo} state="rest" workoutActive={false} />);
    expect(screen.getByText(/Rest Day/i)).toBeInTheDocument();
  });

  it('should show no plan state', () => {
    render(<HomePage go={mockGo} state="none" workoutActive={false} />);
    expect(screen.getByText(/No workout/i)).toBeInTheDocument();
  });

  it('should navigate to profile when profile button is clicked', async () => {
    const user = userEvent.setup();
    render(<HomePage go={mockGo} state="planned" workoutActive={false} />);
    
    const profileBtn = screen.getByText('M').closest('button');
    if (profileBtn) {
      await user.click(profileBtn);
      expect(mockGo).toHaveBeenCalledWith('profile');
    }
  });

  it('should show Start Workout button when workout is planned', () => {
    render(<HomePage go={mockGo} state="planned" workoutActive={false} />);
    expect(screen.getByText(/Start Workout/i)).toBeInTheDocument();
  });

  it('should navigate to log page when Start Workout is clicked', async () => {
    const user = userEvent.setup();
    render(<HomePage go={mockGo} state="planned" workoutActive={false} />);
    
    await user.click(screen.getByText(/Start Workout/i));
    expect(mockGo).toHaveBeenCalledWith('log');
  });

  it('should show last lift information', () => {
    render(<HomePage go={mockGo} state="planned" workoutActive={false} />);
    expect(screen.getByText(/Last lift/i)).toBeInTheDocument();
  });

  it('should show exercises list for planned workout', () => {
    render(<HomePage go={mockGo} state="planned" workoutActive={false} />);
    // Should show exercise names
    expect(screen.getByText(/Bench Press/i)).toBeInTheDocument();
  });
});
