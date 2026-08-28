import React from 'react';
import { X, Trash2, Trophy, Zap, Target, Calendar } from 'lucide-react';
import { TestResult, Language } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  results: TestResult[];
  onClearHistory: () => void;
  language: Language;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  results,
  onClearHistory,
  language,
}) => {
  if (!isOpen) return null;

  const bestWpm = results.length > 0 ? Math.max(...results.map(r => r.wpm)) : 0;
  const avgWpm = results.length > 0 ? Math.round(results.reduce((acc, r) => acc + r.wpm, 0) / results.length) : 0;
  const avgAccuracy = results.length > 0 ? Math.round(results.reduce((acc, r) => acc + r.accuracy, 0) / results.length) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg text-slate-100">
              {language === 'th' ? 'สถิติและประวัติการพิมพ์' : 'Typing History & Stats'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aggregate Stats Cards */}
        {results.length > 0 ? (
          <div className="grid grid-cols-3 gap-2.5 my-4">
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center shadow-inner">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Best WPM</div>
              <div className="text-xl font-black font-mono text-amber-400 mt-0.5">{bestWpm}</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center shadow-inner">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Avg WPM</div>
              <div className="text-xl font-black font-mono text-cyan-400 mt-0.5">{avgWpm}</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center shadow-inner">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Acc</div>
              <div className="text-xl font-black font-mono text-emerald-400 mt-0.5">{avgAccuracy}%</div>
            </div>
          </div>
        ) : (
          <div className="my-8 text-center text-slate-500 text-sm">
            {language === 'th' ? 'ยังไม่มีประวัติการทดสอบ' : 'No test records yet'}
          </div>
        )}

        {/* History List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {results.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black font-mono text-white">{item.wpm}</span>
                  <span className="text-xs text-slate-400 font-mono">WPM</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-800/40">
                    {item.accuracy}%
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {item.date}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                <span>โหมด: {item.mode} ({item.language.toUpperCase()})</span>
                <span>เวลา: {item.durationSeconds}s</span>
              </div>
            </div>
          ))}
        </div>

        {/* Clear History Button */}
        {results.length > 0 && (
          <div className="pt-4 border-t border-slate-800 mt-auto">
            <button
              type="button"
              onClick={onClearHistory}
              className="w-full py-2 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{language === 'th' ? 'ล้างประวัติทั้งหมด' : 'Clear All Records'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
