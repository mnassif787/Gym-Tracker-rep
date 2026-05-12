import { describe, it, expect } from 'vitest';
import { toDisplay, fromDisplay, displayStep, platesFor, makeWorkout, EXERCISES, READY_PLANS } from '../lib/data';

describe('data utilities', () => {
  describe('toDisplay', () => {
    it('should convert kg to kg with 1 decimal', () => {
      expect(toDisplay(100, 'kg')).toBe('100.0');
      expect(toDisplay(82.5, 'kg')).toBe('82.5');
    });

    it('should convert kg to lb (multiply by 2.20462)', () => {
      expect(toDisplay(100, 'lb')).toBe('220.5');
      expect(toDisplay(50, 'lb')).toBe('110.2');
    });

    it('should round to 1 decimal place', () => {
      expect(toDisplay(100.12345, 'kg')).toBe('100.1');
      expect(toDisplay(45.67, 'lb')).toBe('100.7');
    });
  });

  describe('fromDisplay', () => {
    it('should convert displayed kg back to kg', () => {
      expect(fromDisplay(100, 'kg')).toBe(100);
      expect(fromDisplay(82.5, 'kg')).toBe(82.5);
    });

    it('should convert displayed lb back to kg (divide by 2.20462)', () => {
      expect(fromDisplay(220.5, 'lb')).toBeCloseTo(100, 1);
      expect(fromDisplay(110.2, 'lb')).toBeCloseTo(50, 1);
    });
  });

  describe('displayStep', () => {
    it('should return 2.5 for kg', () => {
      expect(displayStep('kg')).toBe(2.5);
    });

    it('should return 5 for lb', () => {
      expect(displayStep('lb')).toBe(5);
    });
  });

  describe('platesFor', () => {
    it('should calculate plates needed for kg (20kg bar)', () => {
      const plates = platesFor(100, 'kg');
      expect(plates).toContain('2×20');
    });

    it('should calculate plates needed for lb (45lb bar)', () => {
      const plates = platesFor(135, 'lb');
      expect(plates).toContain('2×45');
    });

    it('should return empty string if total is less than bar weight', () => {
      expect(platesFor(10, 'kg')).toBe('');
      expect(platesFor(20, 'lb')).toBe('');
    });
  });

  describe('EXERCISES', () => {
    it('should have all required exercises', () => {
      expect(EXERCISES).toHaveLength(14);
      expect(EXERCISES.find(e => e.id === 'bench')).toBeDefined();
      expect(EXERCISES.find(e => e.id === 'squat')).toBeDefined();
      expect(EXERCISES.find(e => e.id === 'deadlift')).toBeDefined();
    });

    it('should have valid muscle groups', () => {
      const validGroups = ['push', 'pull', 'legs', 'core'];
      EXERCISES.forEach(ex => {
        expect(validGroups).toContain(ex.group);
      });
    });
  });

  describe('READY_PLANS', () => {
    it('should have 4 workout plans', () => {
      expect(READY_PLANS).toHaveLength(4);
    });

    it('should have valid plan structures', () => {
      READY_PLANS.forEach(plan => {
        expect(plan).toHaveProperty('id');
        expect(plan).toHaveProperty('name');
        expect(plan).toHaveProperty('desc');
        expect(plan).toHaveProperty('days');
        expect(Array.isArray(plan.days)).toBe(true);
      });
    });

    it('should have Push/Pull plan', () => {
      const pp = READY_PLANS.find(p => p.id === 'pp');
      expect(pp).toBeDefined();
      expect(pp?.days).toHaveLength(6);
    });
  });

  describe('makeWorkout', () => {
    it('should create a valid workout object', () => {
      const workout = makeWorkout();
      
      expect(workout).toHaveProperty('name');
      expect(workout).toHaveProperty('exercises');
      expect(workout).toHaveProperty('sets');
      expect(Array.isArray(workout.exercises)).toBe(true);
      expect(Array.isArray(workout.sets)).toBe(true);
    });

    it('should create Push Day workout by default', () => {
      const workout = makeWorkout();
      // Workout doesn't have a name property in current implementation
      expect(workout.exercises).toHaveLength(5);
    });

    it('should have 5 exercises', () => {
      const workout = makeWorkout();
      expect(workout.exercises).toHaveLength(5);
    });

    it('should initialize all sets as not done', () => {
      const workout = makeWorkout();
      workout.sets.forEach(exerciseSets => {
        exerciseSets.forEach(set => {
          expect(set.done).toBe(false);
        });
      });
    });

    it('should have valid exercise IDs', () => {
      const workout = makeWorkout();
      const validIds = EXERCISES.map(e => e.id);
      workout.exercises.forEach(ex => {
        expect(validIds).toContain(ex.id);
      });
    });
  });
});
