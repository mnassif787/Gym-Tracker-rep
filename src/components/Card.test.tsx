import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../components/Card';

describe('Card', () => {
  it('should render children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('should apply default padding', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.padding).toBe('18px');
  });

  it('should apply custom padding', () => {
    const { container } = render(<Card padding={24}>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.padding).toBe('24px');
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable</Card>);
    
    await user.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have cursor pointer when onClick is provided', () => {
    const { container } = render(<Card onClick={() => {}}>Clickable</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.cursor).toBe('pointer');
  });

  it('should render with accent border when accent prop is provided', () => {
    const { container } = render(<Card accent="#ff0000">Accented</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.borderLeft).toContain('4px');
  });

  it('should apply custom styles', () => {
    const customStyle = { margin: '10px' };
    const { container } = render(<Card style={customStyle}>Custom</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.margin).toBe('10px');
  });
});
