import React from 'react';
import { X, BookOpen, Sparkles, Keyboard, CheckCircle2, Zap } from 'lucide-react';
import { Language } from '../types';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-lg text-slate-100">
              {language === 'th' ? 'คู่มือและวิธีใช้งาน TypeSprint' : 'TypeSprint Guide & How-to-Use'}
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

        {/* Section 1: How to play */}
        <div className="space-y-3 text-sm text-slate-300">
          <h4 className="font-semibold text-cyan-300 flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            {language === 'th' ? '1. กติกาและการใช้งาน' : '1. Gameplay & Rules'}
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs sm:text-sm">
            <li>
              {language === 'th'
                ? 'เลือกโหมดที่ต้องการ: จับเวลา (15s, 30s, 60s, 120s), จำนวนคำ (10, 25, 50, 100), คำคม หรือข้อความของคุณเอง'
                : 'Choose your desired mode: Timed (15s/30s/60s/120s), Word count (10/25/50/100), Quotes, or Custom text.'}
            </li>
            <li>
              {language === 'th'
                ? 'เริ่มพิมพ์ตัวอักษรแรกในช่อง ระบบจะเริ่มจับเวลาและคำนวณสถิติทันที'
                : 'Type the first character to start the timer and real-time calculation automatically.'}
            </li>
            <li>
              {language === 'th'
                ? 'ตัวอักษรที่พิมพ์ถูกจะแสดงเป็นสีขาว ตัวที่พิมพ์ผิดจะไฮไลต์สีแดงพร้อมขีดเส้นใต้'
                : 'Correct characters appear bright white; wrong characters are highlighted in red.'}
            </li>
            <li>
              {language === 'th'
                ? 'รองรับทั้งภาษาไทย (แป้นเกษมณี) และภาษาอังกฤษ (QWERTY)'
                : 'Supports both Thai (Kedmanee) and English (QWERTY).'}
            </li>
          </ul>
        </div>

        {/* Section 2: Shortcuts */}
        <div className="space-y-3 text-sm text-slate-300">
          <h4 className="font-semibold text-purple-300 flex items-center gap-1.5">
            <Keyboard className="w-4 h-4" />
            {language === 'th' ? '2. คีย์ลัดและฟังก์ชันเสริม' : '2. Shortcuts & Tools'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">เริ่มรอบใหม่</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">Tab + Enter</kbd>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">ล้างข้อความ</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">Esc</kbd>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">เปิด/ปิดคีย์บอร์ด</span>
              <span className="text-slate-300 font-semibold">ปุ่มคีย์บอร์ดแถบบน</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">เสียงสวิตช์</span>
              <span className="text-slate-300 font-semibold">Cherry Blue / Thock</span>
            </div>
          </div>
        </div>

        {/* Section 3: Calculation Formulas */}
        <div className="space-y-2 text-xs text-slate-400 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="font-semibold text-slate-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {language === 'th' ? 'สูตรมาตรฐานการวัดผล:' : 'Measurement Standard:'}
          </div>
          <div>• <strong>Net WPM</strong> = ((อักขระที่พิมพ์ถูก - ข้อผิดพลาด) / 5) / (เวลาที่ใช้เป็นนาที)</div>
          <div>• <strong>Accuracy</strong> = (จำนวนอักขระที่พิมพ์ถูกต้อง / อักขระทั้งหมดที่พิมพ์) × 100%</div>
        </div>

        {/* Close Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
          >
            {language === 'th' ? 'เข้าใจแล้ว เริ่มฝึกพิมพ์เลย' : 'Got it, Let\'s Type!'}
          </button>
        </div>
      </div>
    </div>
  );
};
