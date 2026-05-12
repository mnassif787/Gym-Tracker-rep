import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/Button';

describe('Button', () => {
  it('should render children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with primary variant by default', () => {
    const { container } = render(<Button>Primary</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('should render with lime variant styles', () => {
    const { container } = render(<Button variant="lime">Lime</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('should render with small size', () => {
    const { container } = render(<Button size="sm">Small</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('should render with large size', () => {
    const { container } = render(<Button size="lg">Large</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    const icon = <svg data-testid="icon" />;
    render(<Button icon={icon}>With Icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should apply full width when full prop is true', () => {
    const { container } = render(<Button full>Full Width</Button>);
    const button = container.querySelector('button');
    expect(button?.style.width).toBe('100%');
  });

  it('should apply custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = render(<Button style={customStyle}>Custom</Button>);
    const button = container.querySelector('button');
    expect(button?.style.backgroundColor).toBe('red');
  });
});
