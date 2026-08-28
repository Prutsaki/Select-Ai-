import React, { useState } from 'react';
import { Clock, Type, Quote, PenTool, Hash, AtSign, Check, X } from 'lucide-react';
import { GameMode, TimeOption, WordOption, QuoteLength, Language } from '../types';

interface ModeSelectorProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  timeOption: TimeOption;
  onTimeOptionChange: (time: TimeOption) => void;
  wordOption: WordOption;
  onWordOptionChange: (words: WordOption) => void;
  quoteLength: QuoteLength;
  onQuoteLengthChange: (length: QuoteLength) => void;
  includePunctuation: boolean;
  onTogglePunctuation: () => void;
  includeNumbers: boolean;
  onToggleNumbers: () => void;
  onCustomTextSubmit: (text: string) => void;
  isTestActive: boolean;
  language: Language;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  onModeChange,
  timeOption,
  onTimeOptionChange,
  wordOption,
  onWordOptionChange,
  quoteLength,
  onQuoteLengthChange,
  includePunctuation,
  onTogglePunctuation,
  includeNumbers,
  onToggleNumbers,
  onCustomTextSubmit,
  isTestActive,
  language,
}) => {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim().length > 0) {
      onCustomTextSubmit(customInput.trim());
      setShowCustomModal(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 select-none">
      <div
        className={`flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl transition-all ${
          isTestActive ? 'opacity-30 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Main Mode Segment */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 shadow-inner">
          <button
            type="button"
            onClick={() => onModeChange('time')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              mode === 'time'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 ring-1 ring-cyan-400/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'จับเวลา' : 'Time'}</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('words')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              mode === 'words'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 ring-1 ring-cyan-400/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'จำนวนคำ' : 'Words'}</span>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('quote')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              mode === 'quote'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 ring-1 ring-cyan-400/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'คำคม / ประโยค' : 'Quote'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onModeChange('custom');
              setShowCustomModal(true);
            }}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              mode === 'custom'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 ring-1 ring-cyan-400/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'กำหนดเอง' : 'Custom'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-slate-800 hidden sm:block"></div>

        {/* Sub Option Segment */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 shadow-inner">
          {mode === 'time' && (
            <>
              {([15, 30, 60, 120] as TimeOption[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTimeOptionChange(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    timeOption === t
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}s
                </button>
              ))}
            </>
          )}

          {mode === 'words' && (
            <>
              {([10, 25, 50, 100] as WordOption[]).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => onWordOptionChange(w)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    wordOption === w
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {w}
                </button>
              ))}
            </>
          )}

          {mode === 'quote' && (
            <>
              {(['short', 'medium', 'long'] as QuoteLength[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => onQuoteLengthChange(l)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    quoteLength === l
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {l === 'short' ? 'สั้น' : l === 'medium' ? 'กลาง' : 'ยาว'}
                </button>
              ))}
            </>
          )}

          {mode === 'custom' && (
            <button
              type="button"
              onClick={() => setShowCustomModal(true)}
              className="px-3 py-1 rounded-lg text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <PenTool className="w-3 h-3" />
              <span>{language === 'th' ? 'เปลี่ยนข้อความ' : 'Edit Text'}</span>
            </button>
          )}
        </div>

        {/* Punctuation & Numbers Toggles (available for time/words modes) */}
        {(mode === 'time' || mode === 'words') && (
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 shadow-inner">
            <button
              type="button"
              onClick={onTogglePunctuation}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                includePunctuation
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/10'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="สัญลักษณ์และเครื่องหมายวรรคตอน"
            >
              <AtSign className="w-3 h-3" />
              <span>วรรคตอน</span>
            </button>

            <button
              type="button"
              onClick={onToggleNumbers}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                includeNumbers
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="ตัวเลขผสมในบททดสอบ"
            >
              <Hash className="w-3 h-3" />
              <span>ตัวเลข</span>
            </button>
          </div>
        )}
      </div>

      {/* Custom Text Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-cyan-400" />
                {language === 'th' ? 'กำหนดข้อความฝึกพิมพ์เอง' : 'Custom Practice Text'}
              </h3>
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={
                  language === 'th'
                    ? 'วางข้อความภาษาไทย หรือภาษาอังกฤษที่คุณต้องการฝึกพิมพ์ที่นี่...'
                    : 'Paste or type custom English or Thai text you want to practice with...'
                }
                rows={5}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm font-mono leading-relaxed shadow-inner"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={customInput.trim().length === 0}
                  className="px-5 py-2 rounded-xl text-xs font-black bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  {language === 'th' ? 'ใช้ข้อความนี้' : 'Apply Text'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
