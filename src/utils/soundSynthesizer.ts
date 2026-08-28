import { SoundTheme } from '../types';

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private currentTheme: SoundTheme = 'cherry-blue';

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setTheme(theme: SoundTheme) {
    this.currentTheme = theme;
  }

  public playKeySound(isSpaceOrEnter = false) {
    if (this.currentTheme === 'silent') return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    try {
      if (this.currentTheme === 'cherry-blue') {
        // Cherry MX Blue style: crisp high tick with spring release
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(isSpaceOrEnter ? 600 : 1200 + Math.random() * 200, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.04);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(800, t);

        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.05);

      } else if (this.currentTheme === 'thock') {
        // Deep thocky switch: low frequency resonant thump
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        const baseFreq = isSpaceOrEnter ? 140 : 220 + Math.random() * 40;
        osc.frequency.setValueAtTime(baseFreq, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.06);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, t);

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.08);

      } else if (this.currentTheme === 'typewriter') {
        // Mechanical typewriter metal strike
        const osc = this.ctx.createOscillator();
        const noise = this.createNoiseBuffer();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(isSpaceOrEnter ? 300 : 800, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.05);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

        osc.connect(gain);
        if (noise) {
          const noiseGain = this.ctx.createGain();
          noiseGain.gain.setValueAtTime(0.1, t);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
          noise.connect(noiseGain);
          noiseGain.connect(this.ctx.destination);
          noise.start(t);
          noise.stop(t + 0.04);
        }
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.07);

      } else if (this.currentTheme === 'bubble') {
        // Soft popping water bubble
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const start = isSpaceOrEnter ? 350 : 500 + Math.random() * 200;
        osc.frequency.setValueAtTime(start, t);
        osc.frequency.exponentialRampToValueAtTime(start * 1.6, t + 0.04);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.06);
      }
    } catch {
      // AudioContext gracefully ignored if blocked
    }
  }

  public playErrorSound() {
    if (this.currentTheme === 'silent') return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.linearRampToValueAtTime(110, t + 0.12);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.13);
    } catch {
      // AudioContext error catch
    }
  }

  public playCompleteSound() {
    if (this.currentTheme === 'silent') return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const noteTime = t + index * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.15, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.26);
      });
    } catch {
      // AudioContext catch
    }
  }

  private createNoiseBuffer(): AudioBufferSourceNode | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    return noise;
  }
}

export const soundManager = new SoundSynthesizer();
