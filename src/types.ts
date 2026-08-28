export type GameMode = 'time' | 'words' | 'quote' | 'custom';
export type TimeOption = 15 | 30 | 60 | 120;
export type WordOption = 10 | 25 | 50 | 100;
export type QuoteLength = 'short' | 'medium' | 'long';
export type Language = 'en' | 'th';
export type SoundTheme = 'cherry-blue' | 'thock' | 'typewriter' | 'bubble' | 'silent';
export type VisualTheme = 'slate-dark' | 'cyber-neon' | 'warm-sepia' | 'emerald-terminal' | 'nordic-frost';

export interface KeystrokeRecord {
  second: number;
  wpm: number;
  rawWpm: number;
  errors: number;
}

export interface TestResult {
  id: string;
  date: string;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  cpm: number;
  errors: number;
  correctChars: number;
  totalChars: number;
  durationSeconds: number;
  mode: GameMode;
  modeOption: number | string;
  language: Language;
  keystrokeHistory: KeystrokeRecord[];
  missedKeys: Record<string, number>;
}

export interface QuoteItem {
  id: string;
  text: string;
  author: string;
  length: QuoteLength;
  lang: Language;
}
