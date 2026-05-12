import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Wordmark } from '../components/Wordmark';

describe('Wordmark', () => {
  it('should render the logo text "rep."', () => {
    render(<Wordmark />);
    expect(screen.getByText(/rep\./i)).toBeInTheDocument();
  });

  it('should render with default size', () => {
    const { container } = render(<Wordmark />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with custom size', () => {
    const { container } = render(<Wordmark size={30} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  it('should render the lime square icon', () => {
    const { container } = render(<Wordmark />);
    const icon = container.querySelector('[style*="background"]');
    expect(icon).toBeInTheDocument();
  });

  it('should render the bar inside the icon', () => {
    const { container } = render(<Wordmark />);
    // The wordmark has nested divs for the icon structure
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(2);
  });
});
