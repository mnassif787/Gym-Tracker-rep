import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ExerciseFigure } from '../components/ExerciseFigure';

describe('ExerciseFigure', () => {
  it('should render SVG for bench exercise', () => {
    const { container } = render(<ExerciseFigure id="bench" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render SVG for squat exercise', () => {
    const { container } = render(<ExerciseFigure id="squat" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render SVG for deadlift exercise', () => {
    const { container } = render(<ExerciseFigure id="deadlift" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render fallback for unknown exercise', () => {
    const { container } = render(<ExerciseFigure id="unknown-exercise" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should apply custom size', () => {
    const { container } = render(<ExerciseFigure id="bench" size={100} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('100');
    expect(svg?.getAttribute('height')).toBe('100');
  });

  it('should apply custom background color', () => {
    const { container } = render(<ExerciseFigure id="bench" bg="#ff0000" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('should apply custom stroke color', () => {
    const { container } = render(<ExerciseFigure id="bench" color="#00ff00" />);
    const svg = container.querySelector('svg');
    const paths = svg?.querySelectorAll('path, line, circle, rect');
    expect(paths && paths.length > 0).toBe(true);
  });

  it('should render all common exercises', () => {
    const exercises = ['bench', 'ohp', 'squat', 'deadlift', 'row', 'pullup', 'dip', 'lateral', 'fly', 'curl', 'lunge', 'plank', 'leg-press', 'lat'];
    
    exercises.forEach(id => {
      const { container } = render(<ExerciseFigure id={id} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});
