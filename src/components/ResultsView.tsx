import React, { useState } from 'react';
import { RotateCcw, Share2, Award, CheckCircle2, AlertTriangle, Clock, Target, Gauge, Copy, Check } from 'lucide-react';
import { TestResult, Language } from '../types';

interface ResultsViewProps {
  result: TestResult;
  language: Language;
  onRestart: () => void;
  onNextTest: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  language,
  onRestart,
  onNextTest,
}) => {
  const [copied, setCopied] = useState(false);

  const getRankBadge = (wpm: number, accuracy: number) => {
    if (wpm >= 90 && accuracy >= 95) {
      return { title: language === 'th' ? 'ระดับมหาเทพ (Godspeed Typist)' : 'Godspeed Typist', color: 'from-amber-400 to-yellow-500', icon: '👑' };
    } else if (wpm >= 70 && accuracy >= 90) {
      return { title: language === 'th' ? 'ระดับโปร (Pro Typist)' : 'Pro Typist', color: 'from-purple-400 to-pink-500', icon: '⚡' };
    } else if (wpm >= 50) {
      return { title: language === 'th' ? 'ระดับคล่องแคล่ว (Fluent Typist)' : 'Fluent Typist', color: 'from-cyan-400 to-blue-500', icon: '🚀' };
    } else if (wpm >= 30) {
      return { title: language === 'th' ? 'ระดับปานกลาง (Intermediate)' : 'Intermediate', color: 'from-emerald-400 to-teal-500', icon: '🎯' };
    } else {
      return { title: language === 'th' ? 'กำลังเริ่มต้น (Beginner)' : 'Beginner', color: 'from-slate-400 to-slate-500', icon: '🌱' };
    }
  };

  const badge = getRankBadge(result.wpm, result.accuracy);

  const handleShare = () => {
    const shareText = `⚡ TypeSprint Scorecard:\n🚀 Speed: ${result.wpm} WPM (Raw: ${result.rawWpm} WPM)\n🎯 Accuracy: ${result.accuracy}%\n⌨️ Keystrokes: ${result.totalChars} (${result.errors} errors)\n⏱️ Duration: ${result.durationSeconds}s\nMode: ${result.mode} (${result.language.toUpperCase()})`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SVG Chart calculation
  const history = result.keystrokeHistory;
  const maxWpm = Math.max(...history.map(h => Math.max(h.wpm, h.rawWpm)), 40);
  const chartWidth = 600;
  const chartHeight = 160;
  const padding = 20;

  const points = history.map((item, index) => {
    const x = padding + (index / Math.max(history.length - 1, 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - (item.wpm / maxWpm) * (chartHeight - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const rawPoints = history.map((item, index) => {
    const x = padding + (index / Math.max(history.length - 1, 1)) * (chartWidth - 2 * padding);
    const y = chartHeight - padding - (item.rawWpm / maxWpm) * (chartHeight - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const missedEntries = Object.entries(result.missedKeys)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 5);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 animate-in fade-in zoom-in-95 duration-300">
      {/* Bento Grid Results Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bento Card 1: Main Speed Hero (Span 2 cols on md) */}
        <div className="md:col-span-2 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-black tracking-wider text-cyan-400">
              {language === 'th' ? 'ความเร็วสุทธิ (Net WPM)' : 'Net Typing Speed'}
            </span>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 font-mono">
              {result.mode.toUpperCase()} ({result.language.toUpperCase()})
            </span>
          </div>

          <div className="my-4 flex items-baseline gap-3">
            <span className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white drop-shadow-lg">
              {result.wpm}
            </span>
            <span className="text-xl font-extrabold text-cyan-400 font-mono">WPM</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <span>{language === 'th' ? 'อิงตามเกณฑ์มาตรฐานสากล' : 'Based on standard 5 chars/word'}</span>
            <span className="font-mono text-slate-300 font-bold">{result.cpm} CPM</span>
          </div>
        </div>

        {/* Bento Card 2: Accuracy & Rank Achievement Tile */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-black tracking-wider text-emerald-400">
                {language === 'th' ? 'ความแม่นยำ' : 'Accuracy'}
              </span>
              <span className="text-2xl">{badge.icon}</span>
            </div>

            <div className="my-3 flex items-baseline gap-1">
              <span className="text-5xl font-black font-mono tracking-tight text-emerald-300">
                {result.accuracy}
              </span>
              <span className="text-xl font-extrabold text-slate-400 font-mono">%</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="font-extrabold text-xs sm:text-sm text-slate-200 block truncate">
                {badge.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stats Bento Sub-Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
            <Gauge className="w-4 h-4 text-blue-400" />
            <span>{language === 'th' ? 'ความเร็วดิบ' : 'Raw Speed'}</span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-200 mt-1">
            {result.rawWpm} <span className="text-xs font-normal text-slate-400">WPM</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">{result.cpm} CPM</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{language === 'th' ? 'อักขระที่ถูก' : 'Correct Chars'}</span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-300 mt-1">
            {result.correctChars}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">จาก {result.totalChars} ตัว</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>{language === 'th' ? 'ข้อผิดพลาด' : 'Mistakes'}</span>
          </div>
          <div className="text-2xl font-black font-mono text-rose-300 mt-1">
            {result.errors}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {result.errors === 0 ? 'พิมพ์ถูกต้อง 100%' : 'จุดที่พิมพ์ผิด'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{language === 'th' ? 'เวลาที่ใช้' : 'Time'}</span>
          </div>
          <div className="text-2xl font-black font-mono text-purple-300 mt-1">
            {result.durationSeconds}s
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{result.date}</div>
        </div>
      </div>

      {/* Keystroke Trend Chart Bento Card (SVG) */}
      {history.length > 1 && (
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">
              {language === 'th' ? 'กราฟพัฒนาการความเร็ว (WPM Progression Timeline)' : 'WPM Progression Timeline'}
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400"></span>
                <span className="text-slate-300 font-medium">Net WPM</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                <span className="text-slate-400 font-medium">Raw WPM</span>
              </span>
            </div>
          </div>

          <div className="w-full h-44 bg-slate-950/80 rounded-2xl border border-slate-800/80 p-2 overflow-hidden flex items-center justify-center shadow-inner">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
              {/* Horizontal Guide Lines */}
              <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
              <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#334155" strokeWidth="1" />

              {/* Raw WPM line (grey) */}
              <polyline
                fill="none"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="4 4"
                points={rawPoints}
              />

              {/* Net WPM Line (Cyan) */}
              <polyline
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />

              {/* Data Points */}
              {history.map((item, index) => {
                const x = padding + (index / Math.max(history.length - 1, 1)) * (chartWidth - 2 * padding);
                const y = chartHeight - padding - (item.wpm / maxWpm) * (chartHeight - 2 * padding);
                return (
                  <g key={index}>
                    <circle cx={x} cy={y} r="3.5" fill="#06b6d4" />
                    {item.errors > 0 && (
                      <circle cx={x} cy={y} r="5.5" fill="#f43f5e" opacity="0.85" />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Most Missed Characters Review Bento Card */}
      {missedEntries.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md backdrop-blur-md flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-bold">
            {language === 'th' ? 'ปุ่มที่พิมพ์ผิดบ่อย:' : 'Most missed keys:'}
          </span>
          {missedEntries.map(([char, count]) => (
            <span
              key={char}
              className="px-2.5 py-1 rounded-xl bg-rose-950/50 border border-rose-800/50 text-rose-300 font-mono font-bold flex items-center gap-1.5 shadow-sm"
            >
              <span>{char === ' ' ? 'Space' : char}</span>
              <span className="text-[10px] text-rose-400 font-normal">({count}x)</span>
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons Bento Dock */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/25 ring-1 ring-cyan-300 transition-all cursor-pointer hover:scale-[1.02]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{language === 'th' ? 'ทดสอบซ้ำอีกครั้ง' : 'Try Again'}</span>
        </button>

        <button
          type="button"
          onClick={onNextTest}
          className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
        >
          <span>{language === 'th' ? 'ชุดข้อความใหม่' : 'New Prompt'}</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (language === 'th' ? 'คัดลอกคะแนนแล้ว!' : 'Copied!') : (language === 'th' ? 'คัดลอกผลคะแนน' : 'Share Scorecard')}</span>
        </button>
      </div>
    </div>
  );
};
