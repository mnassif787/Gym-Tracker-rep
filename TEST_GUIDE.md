# Test Suite Guide

## Overview

Comprehensive test suite for the Gym Tracker Rep application using **Vitest** and **React Testing Library**.

## Test Results Summary

**Current Status:** 45 passing | 24 failing | 69 total tests

- ✅ **Component Tests**: Button, Card, ExerciseFigure, Wordmark - All passing
- ✅ **Utility Tests**: Time formatting (fmtTime) - All passing  
- ✅ **Data Tests**: fromDisplay, displayStep, exercises structure - Passing
- ✅ **App Integration**: Basic rendering and navigation - Passing
- ⚠️ **HomePage Tests**: Some navigation tests failing
- ⚠️ **Data Tests**: platesFor, toDisplay functions need refinement
- ⚠️ **Utils Tests**: Haptic and chime mocking needs adjustment

## Running Tests

```bash
# Run all tests (watch mode)
npm test

# Run tests once
npm test -- --run

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

## Test Files

### Utility Tests

**`src/lib/utils.test.ts`** - 20 tests
- ✅ Time formatting (fmtTime)
- ⚠️ Haptic feedback (needs browser API mocking)
- ⚠️ Audio chime (needs Web Audio API mocking)

**`src/lib/data.test.ts`** - 19 tests
- ✅ Unit conversion (fromDisplay, displayStep)
- ✅ Exercise and plan data structures
- ⚠️ Display formatting (toDisplay) - rounding issues
- ⚠️ Plate calculation (platesFor) - logic refinement needed
- ✅ Workout generation (makeWorkout)

### Component Tests

**`src/components/Button.test.tsx`** - 9 tests ✅
- Rendering with different variants (primary, lime, peach, ghost, soft, text)
- Click handling
- Size variants (sm, md, lg)
- Icon rendering
- Full width mode
- Custom styling

**`src/components/Card.test.tsx`** - 7 tests ✅
- Children rendering
- Custom and default padding
- Click handling
- Cursor styling
- Accent border
- Custom styles

**`src/components/ExerciseFigure.test.tsx`** - 8 tests ✅
- SVG rendering for all 14 exercises
- Fallback for unknown exercises
- Custom size, background, and stroke color
- All exercise IDs validated

**`src/components/Wordmark.test.tsx`** - 5 tests ✅
- Logo text rendering
- Custom size support
- Icon structure validation

### Page Tests

**`src/pages/HomePage.test.tsx`** - 9 tests
- ✅ Wordmark rendering
- ✅ Rest day state
- ⚠️ Planned workout state - button text mismatch
- ⚠️ Navigation tests - selector issues
- ⚠️ Exercise list rendering - needs DOM inspection

### Integration Tests

**`src/App.test.tsx`** - 9 tests ✅
- Application rendering
- Tab bar navigation (Today, Plans, Progress, You)
- Page transitions
- iPhone frame dimensions
- Status bar and home indicator

## Test Coverage Areas

### ✅ Fully Tested
- UI components (Button, Card, Wordmark, ExerciseFigure)
- Basic app navigation
- Time formatting
- Data structures (EXERCISES, READY_PLANS)
- Unit conversions

### ⚠️ Partially Tested
- Utility functions (haptics, audio)
- Page components (HomePage navigation)
- Display formatting

### ❌ Not Yet Tested
- LogPage (workout logging flow)
- TemplatesPage (plan browsing)
- ProgressPage (charts, PRs)
- ProfilePage (settings)
- TabBar component
- Icon component
- Workout state management
- Set completion logic
- Rest timer functionality

## Test Configuration

### `vitest.config.ts`
```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
  },
});
```

### `src/setupTests.ts`
```typescript
import '@testing-library/jest-dom';
```

## Common Test Patterns

### Component Test Template
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### User Interaction Test
```typescript
import userEvent from '@testing-library/user-event';

it('should handle click', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  await user.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalled();
});
```

## Next Steps

### Priority Fixes
1. Fix toDisplay rounding logic
2. Fix platesFor calculation
3. Improve HomePage navigation tests
4. Mock browser APIs (navigator.vibrate, AudioContext)

### Additional Tests Needed
1. **LogPage**: Complete workout flow
   - Exercise navigation
   - Set completion
   - Rest timer
   - Finish screen

2. **TemplatesPage**: Plan browsing
   - Plan list rendering
   - Plan detail view
   - Active plan highlighting

3. **ProgressPage**: Analytics
   - Volume chart rendering
   - PRs list
   - Unit display

4. **ProfilePage**: Settings
   - Navigation to settings screens
   - Avatar rendering

5. **End-to-End Flows**
   - Complete workout session
   - Plan selection and activation
   - Unit switching (kg/lb)

## Dependencies

```json
{
  "vitest": "Latest",
  "@testing-library/react": "Latest",
  "@testing-library/jest-dom": "Latest",
  "@testing-library/user-event": "Latest",
  "jsdom": "Latest"
}
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what users see and do
2. **Use Semantic Queries**: Prefer `getByRole`, `getByText` over `getByTestId`
3. **Keep Tests Isolated**: Each test should be independent
4. **Mock External Dependencies**: APIs, timers, browser features
5. **Write Descriptive Test Names**: "should render error message when API fails"

## Troubleshooting

### Tests Timing Out
- Increase timeout in vitest.config.ts
- Check for infinite loops or async issues

### Mock Issues
- Ensure mocks are cleared between tests (`afterEach(() => vi.clearAllMocks())`)
- Use `vi.restoreAllMocks()` to reset all mocks

### DOM Queries Failing
- Use `screen.debug()` to see current DOM
- Check for async rendering with `findBy*` queries
- Verify text content with exact strings or regex

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure all tests pass before committing
3. Aim for >80% coverage on new code
4. Update this guide with new test patterns

---

**Last Updated**: May 12, 2026
**Test Framework**: Vitest + React Testing Library
**Total Tests**: 69 (45 passing, 24 failing)
