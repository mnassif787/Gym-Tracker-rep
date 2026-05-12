// Data — exercises, templates, PRs, and helper functions

export interface Exercise {
  id: string;
  name: string;
  group: 'chest' | 'back' | 'legs' | 'arms' | 'shoulders' | 'core' | 'cardio';
}

export interface Set {
  weight: number; // in kg
  reps: number;
  done?: boolean;
}

export interface WorkoutExercise extends Exercise {
  sets: Set[];
}

export interface Workout {
  exercises: WorkoutExercise[];
  sets: Set[][];
  exIdx: number;
  setIdx: number;
  startedAt: number;
  restUntil: number | null;
  active: boolean;
}

export interface ReadyPlan {
  id: string;
  name: string;
  days: number;
  level: string;
  blurb: string;
}

// Per-exercise rest defaults (seconds)
export const REST_DEFAULTS: Record<string, number> = {
  bench: 150, squat: 180, deadlift: 180, ohp: 150, row: 120, pullup: 120,
  curl: 60,   dip: 75,   lunge: 90,    plank: 45,  lat: 75,  'leg-press': 120,
  lateral: 60, fly: 60,
};

// Unit conversion
const KG_TO_LB = 2.20462;

export function toDisplay(weightKg: number, unit: 'kg' | 'lb'): number {
  if (unit === 'lb') return Math.round(weightKg * KG_TO_LB * 2) / 2;
  return weightKg;
}

export function fromDisplay(weight: number, unit: 'kg' | 'lb'): number {
  if (unit === 'lb') return weight / KG_TO_LB;
  return weight;
}

export function displayStep(unit: 'kg' | 'lb'): number {
  return unit === 'lb' ? 5 : 2.5;
}

// Plate calculator
export function platesFor(totalKg: number, unit: 'kg' | 'lb') {
  const barKg = unit === 'lb' ? 45 / KG_TO_LB : 20;
  const plates = unit === 'lb'
    ? [45, 35, 25, 10, 5, 2.5].map(p => p / KG_TO_LB)
    : [25, 20, 15, 10, 5, 2.5, 1.25];
  const display = unit === 'lb'
    ? [45, 35, 25, 10, 5, 2.5]
    : [25, 20, 15, 10, 5, 2.5, 1.25];
  
  let perSide = (totalKg - barKg) / 2;
  if (perSide <= 0) return { plates: [], over: 0, perSide: 0 };
  
  const out: number[] = [];
  for (let i = 0; i < plates.length; i++) {
    while (perSide >= plates[i] - 0.001) {
      out.push(display[i]);
      perSide -= plates[i];
    }
  }
  return { plates: out, over: Math.max(0, perSide), perSide: (totalKg - barKg) / 2 };
}

export const EXERCISES: Exercise[] = [
  { id: 'bench', name: 'Bench Press', group: 'chest' },
  { id: 'squat', name: 'Back Squat', group: 'legs' },
  { id: 'deadlift', name: 'Deadlift', group: 'back' },
  { id: 'ohp', name: 'Overhead Press', group: 'shoulders' },
  { id: 'row', name: 'Barbell Row', group: 'back' },
  { id: 'pullup', name: 'Pull-up', group: 'back' },
  { id: 'curl', name: 'Bicep Curl', group: 'arms' },
  { id: 'dip', name: 'Tricep Dip', group: 'arms' },
  { id: 'lunge', name: 'Walking Lunge', group: 'legs' },
  { id: 'plank', name: 'Plank', group: 'core' },
  { id: 'lat', name: 'Lat Pulldown', group: 'back' },
  { id: 'leg-press', name: 'Leg Press', group: 'legs' },
  { id: 'lateral', name: 'Lateral Raise', group: 'shoulders' },
  { id: 'fly', name: 'Cable Fly', group: 'chest' },
];

export const READY_PLANS: ReadyPlan[] = [
  { id: 'pp', name: 'Push · Pull · Legs', days: 6, level: 'Intermediate',
    blurb: 'Classic split for steady muscle gain. Each major muscle hit twice a week.' },
  { id: 'full', name: 'Full Body Three', days: 3, level: 'Beginner',
    blurb: 'Whole-body sessions with the big lifts. Perfect when time is tight.' },
  { id: 'ul', name: 'Upper / Lower', days: 4, level: 'All levels',
    blurb: 'Even split between upper and lower work. Forgiving recovery.' },
  { id: 'home', name: 'Home, No Gym', days: 5, level: 'Beginner',
    blurb: 'Squats, push-ups, planks. Nothing but a mat and a doorway.' },
];

// Personal records (for Progress page)
export const PRS = [
  { id: 'bench',    last: '70 × 8',  best: '80 × 5',  bestKg: 80, ago: '12d ago' },
  { id: 'squat',    last: '90 × 6',  best: '110 × 3', bestKg: 110, ago: '6d ago' },
  { id: 'deadlift', last: '110 × 5', best: '130 × 2', bestKg: 130, ago: '21d ago' },
  { id: 'ohp',      last: '45 × 8',  best: '55 × 5',  bestKg: 55, ago: '8d ago' },
  { id: 'row',      last: '60 × 10', best: '70 × 8',  bestKg: 70, ago: '15d ago' },
];

// Weekly volume data
export const WEEKLY_VOLUME = [
  { wk: 'W-7', t: 38 }, { wk: 'W-6', t: 42 }, { wk: 'W-5', t: 45 },
  { wk: 'W-4', t: 41 }, { wk: 'W-3', t: 48 }, { wk: 'W-2', t: 52 },
  { wk: 'W-1', t: 50 }, { wk: 'now', t: 28 },
];

// Default workout for "Begin"
export function makeWorkout(): Workout {
  const seed = [
    { id: 'bench', sets: [{ weight: 60, reps: 8 }, { weight: 65, reps: 8 }, { weight: 70, reps: 6 }, { weight: 70, reps: 6 }] },
    { id: 'ohp',   sets: [{ weight: 40, reps: 10 }, { weight: 45, reps: 8 }, { weight: 45, reps: 8 }] },
    { id: 'dip',   sets: [{ weight: 0, reps: 12 }, { weight: 0, reps: 10 }, { weight: 0, reps: 10 }] },
    { id: 'fly',   sets: [{ weight: 18, reps: 12 }, { weight: 18, reps: 12 }, { weight: 18, reps: 12 }] },
    { id: 'lateral', sets: [{ weight: 10, reps: 15 }, { weight: 10, reps: 15 }, { weight: 10, reps: 15 }] },
  ];
  
  return {
    exercises: seed.map(s => ({ ...EXERCISES.find(e => e.id === s.id)!, sets: s.sets })),
    sets: seed.map(s => s.sets.map(x => ({ ...x, done: false }))),
    exIdx: 0,
    setIdx: 0,
    startedAt: Date.now(),
    restUntil: null,
    active: true,
  };
}