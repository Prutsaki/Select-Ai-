import React from 'react';
import { Language } from '../types';

interface VirtualKeyboardProps {
  activeKey: string | null;
  nextChar: string | null;
  language: Language;
  onVirtualKeyPress: (char: string) => void;
  showFingerGuide: boolean;
}

interface KeyConfig {
  code: string;
  en: string;
  enShift?: string;
  th: string;
  thShift?: string;
  width?: string;
  finger: 'pinky' | 'ring' | 'middle' | 'index' | 'thumb';
}

const KEYBOARD_ROWS: KeyConfig[][] = [
  // Row 1
  [
    { code: 'Backquote', en: '`', enShift: '~', th: '_', thShift: '%', finger: 'pinky' },
    { code: 'Digit1', en: '1', enShift: '!', th: 'ๅ', thShift: '+', finger: 'pinky' },
    { code: 'Digit2', en: '2', enShift: '@', th: '/', thShift: '๑', finger: 'ring' },
    { code: 'Digit3', en: '3', enShift: '#', th: '-', thShift: '๒', finger: 'middle' },
    { code: 'Digit4', en: '4', enShift: '$', th: 'ภ', thShift: '๓', finger: 'index' },
    { code: 'Digit5', en: '5', enShift: '%', th: 'ถ', thShift: '๔', finger: 'index' },
    { code: 'Digit6', en: '6', enShift: '^', th: 'ุ', thShift: 'ู', finger: 'index' },
    { code: 'Digit7', en: '7', enShift: '&', th: 'ึ', thShift: '฿', finger: 'index' },
    { code: 'Digit8', en: '8', enShift: '*', th: 'ค', thShift: '๕', finger: 'middle' },
    { code: 'Digit9', en: '9', enShift: '(', th: 'ต', thShift: '๖', finger: 'ring' },
    { code: 'Digit0', en: '0', enShift: ')', th: 'จ', thShift: '๗', finger: 'pinky' },
    { code: 'Minus', en: '-', enShift: '_', th: 'ข', thShift: '๘', finger: 'pinky' },
    { code: 'Equal', en: '=', enShift: '+', th: 'ช', thShift: '๙', finger: 'pinky' },
    { code: 'Backspace', en: 'Bksp', th: 'ลบ', width: 'w-14 sm:w-16', finger: 'pinky' },
  ],
  // Row 2
  [
    { code: 'Tab', en: 'Tab', th: 'Tab', width: 'w-12 sm:w-14', finger: 'pinky' },
    { code: 'KeyQ', en: 'q', enShift: 'Q', th: 'ๆ', thShift: '๐', finger: 'pinky' },
    { code: 'KeyW', en: 'w', enShift: 'W', th: 'ไ', thShift: '"', finger: 'ring' },
    { code: 'KeyE', en: 'e', enShift: 'E', th: 'ำ', thShift: 'ฎ', finger: 'middle' },
    { code: 'KeyR', en: 'r', enShift: 'R', th: 'พ', thShift: 'ฑ', finger: 'index' },
    { code: 'KeyT', en: 't', enShift: 'T', th: 'ะ', thShift: 'ธ', finger: 'index' },
    { code: 'KeyY', en: 'y', enShift: 'Y', th: 'ั', thShift: 'ํ', finger: 'index' },
    { code: 'KeyU', en: 'u', enShift: 'U', th: 'ี', thShift: '๊', finger: 'index' },
    { code: 'KeyI', en: 'i', enShift: 'I', th: 'ร', thShift: 'ณ', finger: 'middle' },
    { code: 'KeyO', en: 'o', enShift: 'O', th: 'น', thShift: 'ฯ', finger: 'ring' },
    { code: 'KeyP', en: 'p', enShift: 'P', th: 'ย', thShift: 'ญ', finger: 'pinky' },
    { code: 'BracketLeft', en: '[', enShift: '{', th: 'บ', thShift: 'ฐ', finger: 'pinky' },
    { code: 'BracketRight', en: ']', enShift: '}', th: 'ล', thShift: ',', finger: 'pinky' },
    { code: 'Backslash', en: '\\', enShift: '|', th: 'ฃ', thShift: 'ฅ', finger: 'pinky' },
  ],
  // Row 3
  [
    { code: 'CapsLock', en: 'Caps', th: 'Caps', width: 'w-14 sm:w-16', finger: 'pinky' },
    { code: 'KeyA', en: 'a', enShift: 'A', th: 'ฟ', thShift: 'ฤ', finger: 'pinky' },
    { code: 'KeyS', en: 's', enShift: 'S', th: 'ห', thShift: 'ฆ', finger: 'ring' },
    { code: 'KeyD', en: 'd', enShift: 'D', th: 'ก', thShift: 'ฏ', finger: 'middle' },
    { code: 'KeyF', en: 'f', enShift: 'F', th: 'ด', thShift: 'โ', finger: 'index' },
    { code: 'KeyG', en: 'g', enShift: 'G', th: 'เ', thShift: 'ฌ', finger: 'index' },
    { code: 'KeyH', en: 'h', enShift: 'H', th: '้', thShift: '็', finger: 'index' },
    { code: 'KeyJ', en: 'j', enShift: 'J', th: '่', thShift: '๋', finger: 'index' },
    { code: 'KeyK', en: 'k', enShift: 'K', th: 'า', thShift: 'ษ', finger: 'middle' },
    { code: 'KeyL', en: 'l', enShift: 'L', th: 'ส', thShift: 'ศ', finger: 'ring' },
    { code: 'Semicolon', en: ';', enShift: ':', th: 'ว', thShift: 'ซ', finger: 'pinky' },
    { code: 'Quote', en: "'", enShift: '"', th: 'ง', thShift: '.', finger: 'pinky' },
    { code: 'Enter', en: 'Enter', th: 'Enter', width: 'w-16 sm:w-20', finger: 'pinky' },
  ],
  // Row 4
  [
    { code: 'ShiftLeft', en: 'Shift', th: 'Shift', width: 'w-16 sm:w-20', finger: 'pinky' },
    { code: 'KeyZ', en: 'z', enShift: 'Z', th: 'ผ', thShift: '(', finger: 'pinky' },
    { code: 'KeyX', en: 'x', enShift: 'X', th: 'ป', thShift: ')', finger: 'ring' },
    { code: 'KeyC', en: 'c', enShift: 'C', th: 'แ', thShift: 'ฉ', finger: 'middle' },
    { code: 'KeyV', en: 'v', enShift: 'V', th: 'อ', thShift: 'ฮ', finger: 'index' },
    { code: 'KeyB', en: 'b', enShift: 'B', th: 'ิ', thShift: 'ฺ', finger: 'index' },
    { code: 'KeyN', en: 'n', enShift: 'N', th: 'ื', thShift: '์', finger: 'index' },
    { code: 'KeyM', en: 'm', enShift: 'M', th: 'ท', thShift: '?', finger: 'middle' },
    { code: 'Comma', en: ',', enShift: '<', th: 'ม', thShift: 'ฒ', finger: 'middle' },
    { code: 'Period', en: '.', enShift: '>', th: 'ใ', thShift: 'ฬ', finger: 'ring' },
    { code: 'Slash', en: '/', enShift: '?', th: 'ฝ', thShift: 'ฦ', finger: 'pinky' },
    { code: 'ShiftRight', en: 'Shift', th: 'Shift', width: 'w-16 sm:w-20', finger: 'pinky' },
  ],
  // Row 5
  [
    { code: 'ControlLeft', en: 'Ctrl', th: 'Ctrl', width: 'w-12 sm:w-14', finger: 'pinky' },
    { code: 'AltLeft', en: 'Alt', th: 'Alt', width: 'w-12 sm:w-14', finger: 'thumb' },
    { code: 'Space', en: 'Space', th: 'เว้นวรรค', width: 'flex-1 max-w-sm sm:max-w-md', finger: 'thumb' },
    { code: 'AltRight', en: 'Alt', th: 'Alt', width: 'w-12 sm:w-14', finger: 'thumb' },
    { code: 'ControlRight', en: 'Ctrl', th: 'Ctrl', width: 'w-12 sm:w-14', finger: 'pinky' },
  ],
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  activeKey,
  nextChar,
  language,
  onVirtualKeyPress,
  showFingerGuide,
}) => {
  const getFingerBorderColor = (finger: KeyConfig['finger']) => {
    if (!showFingerGuide) return 'border-slate-800/80';
    switch (finger) {
      case 'pinky': return 'border-pink-500/40 text-pink-300';
      case 'ring': return 'border-purple-500/40 text-purple-300';
      case 'middle': return 'border-cyan-500/40 text-cyan-300';
      case 'index': return 'border-emerald-500/40 text-emerald-300';
      case 'thumb': return 'border-amber-500/40 text-amber-300';
      default: return 'border-slate-800';
    }
  };

  const isNextKey = (key: KeyConfig): boolean => {
    if (!nextChar) return false;
    const lowerNext = nextChar.toLowerCase();
    if (nextChar === ' ' && key.code === 'Space') return true;
    if (language === 'en') {
      return key.en.toLowerCase() === lowerNext || key.enShift?.toLowerCase() === lowerNext;
    } else {
      return key.th === nextChar || key.thShift === nextChar;
    }
  };

  const isCurrentlyActive = (key: KeyConfig): boolean => {
    if (!activeKey) return false;
    if (activeKey.toLowerCase() === key.code.toLowerCase()) return true;
    if (activeKey === ' ' && key.code === 'Space') return true;
    if (key.en.toLowerCase() === activeKey.toLowerCase()) return true;
    if (key.th === activeKey) return true;
    return false;
  };

  return (
    <div id="virtual-keyboard" className="w-full max-w-4xl mx-auto p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl select-none">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400"></span>
          <span className="font-bold text-slate-200">
            {language === 'th' ? 'แป้นพิมพ์เกษมณี (Kedmanee Layout)' : 'Standard QWERTY Layout'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium">
          {showFingerGuide && (
            <>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800"><span className="w-2 h-2 rounded-full bg-pink-400"></span> ก้อย</span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800"><span className="w-2 h-2 rounded-full bg-purple-400"></span> นาง</span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> กลาง</span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> ชี้</span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800"><span className="w-2 h-2 rounded-full bg-amber-400"></span> โป้ง</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-1.5 overflow-x-auto pb-1">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5 min-w-[580px]">
            {row.map((k) => {
              const active = isCurrentlyActive(k);
              const next = isNextKey(k);
              const widthClass = k.width || 'w-8 sm:w-10 md:w-11';
              const fingerBorder = getFingerBorderColor(k.finger);

              return (
                <button
                  key={k.code}
                  type="button"
                  onClick={() => {
                    if (k.code === 'Space') onVirtualKeyPress(' ');
                    else if (k.code === 'Backspace') onVirtualKeyPress('Backspace');
                    else onVirtualKeyPress(language === 'th' ? k.th : k.en);
                  }}
                  className={`h-9 sm:h-11 ${widthClass} rounded-xl flex flex-col items-center justify-center font-mono transition-all duration-75 text-xs sm:text-sm relative cursor-pointer border ${
                    active
                      ? 'bg-cyan-500 text-slate-950 font-bold scale-95 shadow-lg shadow-cyan-500/50 border-cyan-300 z-10'
                      : next
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-500/30 animate-pulse ring-1 ring-cyan-400/50'
                      : `bg-slate-950/80 text-slate-300 hover:bg-slate-800/90 ${fingerBorder}`
                  }`}
                >
                  {/* English/Thai Top Right (Shift layer) */}
                  <span className="text-[9px] sm:text-[10px] opacity-50 absolute top-0.5 right-1 pointer-events-none">
                    {language === 'th' ? k.thShift : k.enShift}
                  </span>

                  {/* Main Key Label */}
                  <span className="font-semibold pointer-events-none">
                    {language === 'th' ? k.th : k.en}
                  </span>

                  {/* Secondary Label (subtle) */}
                  {language === 'th' && k.en.length === 1 && (
                    <span className="text-[8px] opacity-35 absolute bottom-0.5 left-1 pointer-events-none">
                      {k.en.toUpperCase()}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
