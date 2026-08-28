import React, { useRef, useEffect } from 'react';
import { RotateCcw, Zap, Target, Gauge } from 'lucide-react';
import { GameMode, Language } from '../types';

interface TypingArenaProps {
  text: string;
  userInput: string;
  isTestActive: boolean;
  isCompleted: boolean;
  timeLeft: number;
  wordCountTarget: number;
  mode: GameMode;
  liveWpm: number;
  liveAccuracy: number;
  language: Language;
  onInputChange: (val: string) => void;
  onRestart: () => void;
  quoteAuthor?: string;
}

export const TypingArena: React.FC<TypingArenaProps> = ({
  text,
  userInput,
  isTestActive,
  isCompleted,
  timeLeft,
  wordCountTarget,
  mode,
  liveWpm,
  liveAccuracy,
  language,
  onInputChange,
  onRestart,
  quoteAuthor,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  // Focus input automatically
  useEffect(() => {
    if (!isCompleted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCompleted, text]);

  // Keep active char scrolled into view
  useEffect(() => {
    if (activeCharRef.current && containerRef.current) {
      const charEl = activeCharRef.current;
      const container = containerRef.current;
      const charTop = charEl.offsetTop;
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      if (charTop > containerTop + containerHeight - 60) {
        container.scrollTop = charTop - 60;
      } else if (charTop < containerTop) {
        container.scrollTop = charTop;
      }
    }
  }, [userInput]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Words count calculation
  const completedWords = userInput.trim().length === 0 ? 0 : userInput.trim().split(/\s+/).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Live Bento HUD Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Bento Metric Tile 1: Time / Progress */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md backdrop-blur-md flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-bold text-slate-400 truncate">
              {mode === 'time'
                ? (language === 'th' ? 'เวลาเหลือ' : 'Time Left')
                : (language === 'th' ? 'ความคืบหน้า' : 'Progress')}
            </div>
            <div className="text-base sm:text-lg font-black font-mono text-cyan-300">
              {mode === 'time' ? `${timeLeft}s` : `${completedWords}/${wordCountTarget}`}
            </div>
          </div>
        </div>

        {/* Bento Metric Tile 2: Live WPM */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md backdrop-blur-md flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Gauge className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-bold text-slate-400 truncate">
              {language === 'th' ? 'ความเร็วสด' : 'Live Speed'}
            </div>
            <div className="text-base sm:text-lg font-black font-mono text-blue-300">
              {liveWpm} <span className="text-[10px] font-normal text-slate-400">WPM</span>
            </div>
          </div>
        </div>

        {/* Bento Metric Tile 3: Live Accuracy */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md backdrop-blur-md flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-bold text-slate-400 truncate">
              {language === 'th' ? 'ความแม่นยำ' : 'Accuracy'}
            </div>
            <div className="text-base sm:text-lg font-black font-mono text-emerald-300">
              {liveAccuracy}%
            </div>
          </div>
        </div>

        {/* Bento Action Tile 4: Restart & Quick Actions */}
        <button
          type="button"
          onClick={onRestart}
          className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 shadow-md backdrop-blur-md flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-all cursor-pointer group"
          title="เริ่มใหม่ (กดปุ่มลัด Tab + Enter หรือ Esc)"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-800/80 group-hover:bg-slate-700 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 transition-colors">
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-400">
              {language === 'th' ? 'ปุ่มลัด Tab' : 'Shortcut'}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-cyan-300">
              {language === 'th' ? 'เริ่มใหม่' : 'Restart'}
            </div>
          </div>
        </button>
      </div>

      {/* Main Text Display Bento Arena Card */}
      <div
        id="typing-arena"
        onClick={handleContainerClick}
        className="relative min-h-[200px] sm:min-h-[240px] p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl cursor-text overflow-hidden group focus-within:ring-2 focus-within:ring-cyan-500/50 focus-within:border-cyan-500/40 transition-all"
      >
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Hidden Input for Capturing Physical / Mobile Keyboard Input */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-default pointer-events-auto w-full h-full"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-label="ช่องพิมพ์ข้อความทดสอบ"
        />

        {/* Text Container with smooth scrolling */}
        <div
          ref={containerRef}
          className="max-h-[180px] sm:max-h-[200px] overflow-y-auto pr-2 font-mono text-lg sm:text-2xl leading-relaxed tracking-wide select-none scroll-smooth"
        >
          {text.split('').map((char, index) => {
            const userChar = userInput[index];
            const isTyped = index < userInput.length;
            const isCurrent = index === userInput.length;
            const isCorrect = isTyped && userChar === char;
            const isWrong = isTyped && userChar !== char;

            let charColor = 'text-slate-500';
            if (isCorrect) {
              charColor = 'text-slate-100 font-medium';
            } else if (isWrong) {
              charColor = 'text-rose-400 bg-rose-500/20 underline decoration-rose-500 rounded-sm font-bold';
            }

            return (
              <span
                key={index}
                ref={isCurrent ? activeCharRef : null}
                className={`relative transition-colors duration-75 ${charColor}`}
              >
                {/* Blinking Caret on current character */}
                {isCurrent && (
                  <span className="absolute -left-[2px] top-[10%] bottom-[10%] w-[3px] bg-cyan-400 rounded-full animate-pulse shadow-sm shadow-cyan-400"></span>
                )}
                {char === ' ' && isWrong ? '␣' : char}
              </span>
            );
          })}
        </div>

        {/* Quote Author citation if quote mode */}
        {quoteAuthor && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs sm:text-sm text-right text-slate-400 italic">
            — {quoteAuthor}
          </div>
        )}

        {/* Start Hint banner */}
        {!isTestActive && userInput.length === 0 && (
          <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none">
            <span className="text-xs text-slate-400 bg-slate-950/90 px-3.5 py-1.5 rounded-full border border-slate-800 shadow-md">
              {language === 'th'
                ? '💡 เริ่มพิมพ์ตัวอักษรแรกเพื่อเริ่มจับเวลา'
                : '💡 Start typing any letter to begin test'}
            </span>
          </div>
        )}
      </div>

      {/* Quick shortcuts prompt */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 px-3">
        <div className="flex items-center gap-3">
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Tab</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Enter</kbd> : {language === 'th' ? 'เริ่มใหม่' : 'Restart'}
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Esc</kbd> : {language === 'th' ? 'ล้างค่า' : 'Reset'}
          </span>
        </div>
        <div className="text-slate-400">
          {language === 'th' ? 'แตะที่กล่องข้อความเพื่อโฟกัส' : 'Click box to focus'}
        </div>
      </div>
    </div>
  );
};
