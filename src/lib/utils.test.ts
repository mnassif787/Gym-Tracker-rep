import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Haptic, chime, fmtTime } from '../lib/utils';

describe('utils', () => {
  describe('Haptic', () => {
    beforeEach(() => {
      // Mock navigator.vibrate
      global.navigator.vibrate = vi.fn();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should call navigator.vibrate with 5ms for light haptic', () => {
      Haptic.light();
      expect(navigator.vibrate).toHaveBeenCalledWith(5);
    });

    it('should call navigator.vibrate with 10ms for tap haptic', () => {
      Haptic.tap();
      expect(navigator.vibrate).toHaveBeenCalledWith(10);
    });

    it('should call navigator.vibrate with 15ms for done haptic', () => {
      Haptic.done();
      expect(navigator.vibrate).toHaveBeenCalledWith(15);
    });

    it('should not throw if vibrate is not supported', () => {
      (global.navigator.vibrate as any) = undefined;
      expect(() => Haptic.light()).not.toThrow();
    });
  });

  describe('chime', () => {
    it('should create and play audio chime', () => {
      const mockPlay = vi.fn();
      const mockOscillator = {
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        frequency: { value: 0 },
      };
      const mockGain = {
        connect: vi.fn(),
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      };
      const mockContext = {
        createOscillator: vi.fn(() => mockOscillator),
        createGain: vi.fn(() => mockGain),
        destination: {},
        currentTime: 0,
      };

      global.AudioContext = vi.fn(() => mockContext) as any;

      chime();

      expect(mockContext.createOscillator).toHaveBeenCalledTimes(2);
      expect(mockContext.createGain).toHaveBeenCalledTimes(2);
    });
  });

  describe('fmtTime', () => {
    it('should format 0 seconds as 0:00', () => {
      expect(fmtTime(0)).toBe('0:00');
    });

    it('should format 59 seconds as 0:59', () => {
      expect(fmtTime(59)).toBe('0:59');
    });

    it('should format 60 seconds as 1:00', () => {
      expect(fmtTime(60)).toBe('1:00');
    });

    it('should format 125 seconds as 2:05', () => {
      expect(fmtTime(125)).toBe('2:05');
    });

    it('should format 600 seconds as 10:00', () => {
      expect(fmtTime(600)).toBe('10:00');
    });

    it('should pad single digit seconds', () => {
      expect(fmtTime(65)).toBe('1:05');
      expect(fmtTime(305)).toBe('5:05');
    });
  });
});
