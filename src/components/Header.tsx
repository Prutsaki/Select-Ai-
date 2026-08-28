import React from 'react';
import { Keyboard, Volume2, VolumeX, Sparkles, BookOpen, FileText, History, RotateCcw } from 'lucide-react';
import { Language, SoundTheme, VisualTheme } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  soundTheme: SoundTheme;
  onSoundThemeChange: (sound: SoundTheme) => void;
  visualTheme: VisualTheme;
  onVisualThemeChange: (theme: VisualTheme) => void;
  onOpenInstructions: () => void;
  onOpenPromptLog: () => void;
  onOpenHistory: () => void;
  onResetTest: () => void;
  showKeyboard: boolean;
  onToggleKeyboard: () => void;
  showFingerGuide: boolean;
  onToggleFingerGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  soundTheme,
  onSoundThemeChange,
  visualTheme,
  onVisualThemeChange,
  onOpenInstructions,
  onOpenPromptLog,
  onOpenHistory,
  onResetTest,
  showKeyboard,
  onToggleKeyboard,
  showFingerGuide,
  onToggleFingerGuide,
}) => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
            <Keyboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                TypeSprint
              </span>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                BENTO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {language === 'th' ? 'ทดสอบและฝึกพิมพ์เร็วอัจฉริยะ' : 'Speed Typing Arena & Metrics'}
            </p>
          </div>
        </div>

        {/* Global Controls & Actions */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Language Switch */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('th')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                language === 'th'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TH (ไทย)
            </button>
          </div>

          {/* Sound Switcher */}
          <div className="flex items-center rounded-xl bg-slate-900/90 border border-slate-800 px-2.5 py-1.5 gap-1.5 shadow-inner">
            {soundTheme === 'silent' ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <select
              value={soundTheme}
              onChange={(e) => onSoundThemeChange(e.target.value as SoundTheme)}
              className="bg-transparent text-slate-300 font-medium focus:outline-none cursor-pointer text-xs"
              aria-label="เลือกเสียงสวิตช์แป้นพิมพ์"
            >
              <option value="cherry-blue" className="bg-slate-900 text-slate-200">Cherry MX Blue (Clicky)</option>
              <option value="thock" className="bg-slate-900 text-slate-200">Gateron Brown (Thock)</option>
              <option value="typewriter" className="bg-slate-900 text-slate-200">Typewriter (Classic)</option>
              <option value="bubble" className="bg-slate-900 text-slate-200">Bubble Pop (Soft)</option>
              <option value="silent" className="bg-slate-900 text-slate-200">Mute (ปิดเสียง)</option>
            </select>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center rounded-xl bg-slate-900/90 border border-slate-800 px-2.5 py-1.5 gap-1.5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={visualTheme}
              onChange={(e) => onVisualThemeChange(e.target.value as VisualTheme)}
              className="bg-transparent text-slate-300 font-medium focus:outline-none cursor-pointer text-xs"
              aria-label="เลือกธีมหน้าจอ"
            >
              <option value="slate-dark" className="bg-slate-900 text-slate-200">Dark Cyber (Slate)</option>
              <option value="cyber-neon" className="bg-slate-900 text-slate-200">Neon Synthwave</option>
              <option value="emerald-terminal" className="bg-slate-900 text-slate-200">Matrix Emerald</option>
              <option value="warm-sepia" className="bg-slate-900 text-slate-200">Warm Coffee (Sepia)</option>
              <option value="nordic-frost" className="bg-slate-900 text-slate-200">Nordic Frost</option>
            </select>
          </div>

          {/* Quick Nav & Modal Buttons */}
          <button
            type="button"
            onClick={onToggleKeyboard}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
              showKeyboard
                ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-500/20'
                : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="เปิด/ปิด แป้นพิมพ์เสมือน"
          >
            <Keyboard className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">
              {showKeyboard ? 'ซ่อนคีย์บอร์ด' : 'แสดงคีย์บอร์ด'}
            </span>
          </button>

          {showKeyboard && (
            <button
              type="button"
              onClick={onToggleFingerGuide}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                showFingerGuide
                  ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 shadow-sm shadow-purple-500/20'
                  : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="แสดงสีคู่มือนิ้ว"
            >
              <span className="hidden sm:inline">ไกด์นิ้วมือ</span>
              <span className="sm:hidden">ไกด์</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenHistory}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
            title="ประวัติการพิมพ์และสถิติ"
          >
            <History className="w-4 h-4" />
            <span className="hidden md:inline font-semibold">สถิติ</span>
          </button>

          <button
            type="button"
            onClick={onOpenInstructions}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
            title="วิธีเล่นและคำแนะนำ"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline font-semibold">วิธีใช้งาน</span>
          </button>

          {/* Prompt Log Helper for the Student's assignment */}
          <button
            type="button"
            onClick={onOpenPromptLog}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 flex items-center gap-1.5 font-bold transition-all shadow-sm shadow-amber-500/10 cursor-pointer"
            title="คัดลอกข้อมูลทำรายงานส่งงานอาจารย์ (Prompt Log)"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Prompt Log Helper</span>
          </button>
        </div>
      </div>
    </header>
  );
};
