import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  GameMode,
  TimeOption,
  WordOption,
  QuoteLength,
  Language,
  SoundTheme,
  VisualTheme,
  KeystrokeRecord,
  TestResult,
} from './types';
import { soundManager } from './utils/soundSynthesizer';
import { generateRandomWords, getRandomQuote } from './utils/textGenerator';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { TypingArena } from './components/TypingArena';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { ResultsView } from './components/ResultsView';
import { HistoryDrawer } from './components/HistoryDrawer';
import { InstructionsModal } from './components/InstructionsModal';
import { PromptLogModal } from './components/PromptLogModal';

export default function App() {
  // Configuration State
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<GameMode>('time');
  const [timeOption, setTimeOption] = useState<TimeOption>(30);
  const [wordOption, setWordOption] = useState<WordOption>(25);
  const [quoteLength, setQuoteLength] = useState<QuoteLength>('medium');
  const [includePunctuation, setIncludePunctuation] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');
  const [soundTheme, setSoundTheme] = useState<SoundTheme>('cherry-blue');
  const [visualTheme, setVisualTheme] = useState<VisualTheme>('slate-dark');
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);
  const [showFingerGuide, setShowFingerGuide] = useState<boolean>(true);

  // Active Test State
  const [targetText, setTargetText] = useState<string>('');
  const [quoteAuthor, setQuoteAuthor] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [keystrokeHistory, setKeystrokeHistory] = useState<KeystrokeRecord[]>([]);
  const [missedKeys, setMissedKeys] = useState<Record<string, number>>({});
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);

  // Modals & Drawers
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);
  const [isPromptLogOpen, setIsPromptLogOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Saved Results History
  const [resultsHistory, setResultsHistory] = useState<TestResult[]>(() => {
    try {
      const saved = localStorage.getItem('typesprint_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('typesprint_history', JSON.stringify(resultsHistory));
    } catch {
      // ignore
    }
  }, [resultsHistory]);

  // Sync sound theme
  useEffect(() => {
    soundManager.setTheme(soundTheme);
  }, [soundTheme]);

  // Generate initial or new target text
  const generateNewTarget = useCallback(() => {
    setUserInput('');
    setIsTestActive(false);
    setIsCompleted(false);
    setStartTime(null);
    setKeystrokeHistory([]);
    setMissedKeys({});
    setCurrentResult(null);

    if (mode === 'time') {
      setTimeLeft(timeOption);
      const generated = generateRandomWords(100, language, includePunctuation, includeNumbers);
      setTargetText(generated);
      setQuoteAuthor('');
    } else if (mode === 'words') {
      setTimeLeft(0);
      const generated = generateRandomWords(wordOption, language, includePunctuation, includeNumbers);
      setTargetText(generated);
      setQuoteAuthor('');
    } else if (mode === 'quote') {
      setTimeLeft(0);
      const quote = getRandomQuote(quoteLength, language);
      setTargetText(quote.text);
      setQuoteAuthor(quote.author);
    } else if (mode === 'custom') {
      setTimeLeft(0);
      const defaultText = language === 'th'
        ? 'การสร้างสรรค์นวัตกรรมเริ่มต้นจากความอยากรู้อยากเห็น และความตั้งใจที่จะลงมือทำอย่างต่อเนื่อง'
        : 'Innovation begins with curiosity and the determination to keep building.';
      setTargetText(customText.trim() || defaultText);
      setQuoteAuthor('');
    }
  }, [mode, timeOption, wordOption, quoteLength, language, includePunctuation, includeNumbers, customText]);

  // Trigger regeneration on mode / language changes
  useEffect(() => {
    generateNewTarget();
  }, [generateNewTarget]);

  // Finish test handler
  const handleTestCompletion = useCallback(() => {
    setIsTestActive(false);
    setIsCompleted(true);
    soundManager.playCompleteSound();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    const duration = startTime ? Math.max((Date.now() - startTime) / 1000, 1) : 1;
    const minutes = duration / 60;

    let correctChars = 0;
    let errors = 0;
    const newMissed: Record<string, number> = { ...missedKeys };

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetText[i]) {
        correctChars++;
      } else {
        errors++;
        const key = targetText[i] || 'extra';
        newMissed[key] = (newMissed[key] || 0) + 1;
      }
    }

    const rawWpm = Math.round((userInput.length / 5) / minutes);
    const netWpm = Math.max(0, Math.round(((correctChars - errors) / 5) / minutes));
    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;
    const cpm = Math.round((correctChars / duration) * 60);

    const result: TestResult = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      wpm: netWpm,
      rawWpm,
      accuracy,
      cpm,
      errors,
      correctChars,
      totalChars: userInput.length,
      durationSeconds: Math.round(duration),
      mode,
      modeOption: mode === 'time' ? timeOption : mode === 'words' ? wordOption : quoteLength,
      language,
      keystrokeHistory: keystrokeHistory.length > 0 ? keystrokeHistory : [{ second: Math.round(duration), wpm: netWpm, rawWpm, errors }],
      missedKeys: newMissed,
    };

    setCurrentResult(result);
    setResultsHistory((prev) => [result, ...prev.slice(0, 19)]);
  }, [startTime, userInput, targetText, missedKeys, keystrokeHistory, mode, timeOption, wordOption, quoteLength, language]);

  // Timer Tick Interval for Time Mode & Stats Sampling
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTestActive && startTime) {
      interval = setInterval(() => {
        const elapsedSec = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
        const elapsedMin = elapsedSec / 60;

        // Calculate intermediate stats
        let correctChars = 0;
        let errors = 0;
        for (let i = 0; i < userInput.length; i++) {
          if (userInput[i] === targetText[i]) correctChars++;
          else errors++;
        }
        const currentRawWpm = Math.round((userInput.length / 5) / elapsedMin);
        const currentNetWpm = Math.max(0, Math.round(((correctChars - errors) / 5) / elapsedMin));

        setKeystrokeHistory((prev) => {
          if (prev.some((p) => p.second === elapsedSec)) return prev;
          return [...prev, { second: elapsedSec, wpm: currentNetWpm, rawWpm: currentRawWpm, errors }];
        });

        if (mode === 'time') {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              handleTestCompletion();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTestActive, startTime, mode, userInput, targetText, handleTestCompletion]);

  // Check completion for words / quote / custom modes
  useEffect(() => {
    if (isTestActive && userInput.length >= targetText.length && targetText.length > 0) {
      handleTestCompletion();
    }
  }, [userInput, targetText, isTestActive, handleTestCompletion]);

  // Handle Character Input
  const handleInputChange = (val: string) => {
    if (isCompleted) return;

    // Start timer on first keystroke
    if (!isTestActive && val.length > 0) {
      setIsTestActive(true);
      setStartTime(Date.now());
    }

    const lastChar = val.slice(-1);
    const expectedChar = targetText[val.length - 1];

    if (val.length > userInput.length) {
      // Keystroke sound
      if (lastChar === ' ') {
        soundManager.playKeySound(true);
      } else if (lastChar !== expectedChar) {
        soundManager.playErrorSound();
        if (expectedChar) {
          setMissedKeys((prev) => ({ ...prev, [expectedChar]: (prev[expectedChar] || 0) + 1 }));
        }
      } else {
        soundManager.playKeySound(false);
      }
    }

    setUserInput(val);
  };

  // Global Keydown Listener for keyboard lightup and hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setActiveKey(e.key);

      // Hotkey: Tab + Enter or Esc to reset
      if (e.key === 'Escape') {
        generateNewTarget();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        generateNewTarget();
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [generateNewTarget]);

  // Virtual Key Press Handler (from on-screen keyboard)
  const handleVirtualKeyPress = (char: string) => {
    if (isCompleted) return;
    if (char === 'Backspace') {
      setUserInput((prev) => prev.slice(0, -1));
    } else {
      handleInputChange(userInput + char);
    }
  };

  // Live Metrics Calculation for HUD
  const elapsedMinutes = startTime ? Math.max((Date.now() - startTime) / 60000, 0.01) : 0.01;
  let correctCount = 0;
  let errorCount = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === targetText[i]) correctCount++;
    else errorCount++;
  }
  const liveWpm = isTestActive
    ? Math.max(0, Math.round(((correctCount - errorCount) / 5) / elapsedMinutes))
    : 0;
  const liveAccuracy = userInput.length > 0
    ? Math.round((correctCount / userInput.length) * 100)
    : 100;

  // Next expected char for virtual keyboard
  const nextChar = targetText[userInput.length] || null;

  // Theme styling mapper
  const getThemeContainerClass = () => {
    switch (visualTheme) {
      case 'cyber-neon':
        return 'bg-[#0b0817] text-pink-50';
      case 'emerald-terminal':
        return 'bg-[#05130b] text-emerald-50';
      case 'warm-sepia':
        return 'bg-[#15120f] text-amber-50';
      case 'nordic-frost':
        return 'bg-[#09111b] text-sky-50';
      default:
        return 'bg-slate-950 text-slate-100';
    }
  };

  return (
    <div id="typesprint-root" className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${getThemeContainerClass()}`}>
      {/* Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        soundTheme={soundTheme}
        onSoundThemeChange={setSoundTheme}
        visualTheme={visualTheme}
        onVisualThemeChange={setVisualTheme}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        onOpenPromptLog={() => setIsPromptLogOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onResetTest={generateNewTarget}
        showKeyboard={showKeyboard}
        onToggleKeyboard={() => setShowKeyboard(!showKeyboard)}
        showFingerGuide={showFingerGuide}
        onToggleFingerGuide={() => setShowFingerGuide(!showFingerGuide)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center justify-start gap-6">
        {/* Mode Selector Bento Tile */}
        {!isCompleted && (
          <ModeSelector
            mode={mode}
            onModeChange={setMode}
            timeOption={timeOption}
            onTimeOptionChange={setTimeOption}
            wordOption={wordOption}
            onWordOptionChange={setWordOption}
            quoteLength={quoteLength}
            onQuoteLengthChange={setQuoteLength}
            includePunctuation={includePunctuation}
            onTogglePunctuation={() => setIncludePunctuation(!includePunctuation)}
            includeNumbers={includeNumbers}
            onToggleNumbers={() => setIncludeNumbers(!includeNumbers)}
            onCustomTextSubmit={(text) => {
              setCustomText(text);
              setMode('custom');
            }}
            isTestActive={isTestActive}
            language={language}
          />
        )}

        {/* Dynamic View: Arena vs Results */}
        {!isCompleted ? (
          <div className="w-full space-y-6">
            <TypingArena
              text={targetText}
              userInput={userInput}
              isTestActive={isTestActive}
              isCompleted={isCompleted}
              timeLeft={timeLeft}
              wordCountTarget={mode === 'words' ? wordOption : targetText.split(/\s+/).length}
              mode={mode}
              liveWpm={liveWpm}
              liveAccuracy={liveAccuracy}
              language={language}
              onInputChange={handleInputChange}
              onRestart={generateNewTarget}
              quoteAuthor={quoteAuthor}
            />

            {/* Virtual Keyboard Bento Card */}
            {showKeyboard && (
              <VirtualKeyboard
                activeKey={activeKey}
                nextChar={nextChar}
                language={language}
                onVirtualKeyPress={handleVirtualKeyPress}
                showFingerGuide={showFingerGuide}
              />
            )}
          </div>
        ) : (
          currentResult && (
            <ResultsView
              result={currentResult}
              language={language}
              onRestart={generateNewTarget}
              onNextTest={generateNewTarget}
            />
          )
        )}
      </main>

      {/* Footer Bento Bar */}
      <footer className="w-full border-t border-slate-800/80 py-4 px-4 sm:px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto">
        <div className="font-medium">
          TypeSprint Speed Typing Arena • Built with React, TypeScript & Web Audio API
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <button
            type="button"
            onClick={() => setIsInstructionsOpen(true)}
            className="hover:text-slate-300 underline underline-offset-2 cursor-pointer font-medium"
          >
            {language === 'th' ? 'คำแนะนำการใช้งาน' : 'Instructions'}
          </button>
          <button
            type="button"
            onClick={() => setIsPromptLogOpen(true)}
            className="text-amber-400/90 hover:text-amber-300 font-bold underline underline-offset-2 cursor-pointer"
          >
            {language === 'th' ? 'ใบงาน & Prompt Log' : 'Prompt Log Helper'}
          </button>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        language={language}
      />

      <PromptLogModal
        isOpen={isPromptLogOpen}
        onClose={() => setIsPromptLogOpen(false)}
        language={language}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        results={resultsHistory}
        onClearHistory={() => setResultsHistory([])}
        language={language}
      />
    </div>
  );
}
