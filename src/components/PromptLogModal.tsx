import React, { useState } from 'react';
import { X, Copy, Check, FileText, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface PromptLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PromptLogModal: React.FC<PromptLogModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const promptLogMarkdown = `# บันทึกการสั่งงาน AI (Prompt Log)
วิชา: การสร้าง Web App ด้วย AI

## ส่วน A — ข้อมูลโปรเจกต์
- **ชื่อ-นามสกุล นักศึกษา:** ${studentName || '[ระบุชื่อ-นามสกุลของคุณ]'}
- **รหัสนักศึกษา:** ${studentId || '[ระบุรหัสนักศึกษา]'}
- **ชื่อแอปพลิเคชัน:** TypeSprint - Speed Typing Arena
- **คำอธิบายแอป (แอปนี้ทำอะไร):**
  TypeSprint เป็นเว็บแอปพลิเคชันหน้าเดียว (Single Page Application) สำหรับทดสอบและฝึกฝนทักษะการพิมพ์เร็ว (Speed Typing Test) รองรับทั้งภาษาไทย (แป้นเกษมณี) และภาษาอังกฤษ มีการคำนวณความเร็วสุทธิ (Net WPM), ความเร็วดิบ (Raw WPM), ความแม่นยำ (Accuracy %), พร้อมกราฟแสดงพัฒนาการความเร็วแบบ Real-time, แป้นพิมพ์จำลองพร้อมไกด์สีนิ้วมือ และระบบเสียงจำลองสวิตช์คีย์บอร์ดแบบกลไก (Web Audio API)
- **เครื่องมือ AI ที่ใช้:** Google AI Studio (Build Mode) — Gemini 3.7 Flash

---

## ส่วน B — Prompt แรก
\`\`\`text
สร้าง web application หน้าเดียวสำหรับทดสอบความเร็วในการพิมพ์ (Speed Typing Test) ชื่อ "TypeSprint" ด้วย React, TypeScript และ Tailwind CSS
ข้อกำหนด:
1. รองรับโหมดการทดสอบ 4 โหมด: จับเวลา (15s, 30s, 60s, 120s), จำนวนคำ (10, 25, 50, 100 คำ), คำคมสร้างแรงบันดาลใจ (ภาษาไทยและอังกฤษ) และโหมดกำหนดข้อความเอง
2. แสดงผลตัวอักษรแบบ Real-time: ตัวอักษรที่พิมพ์ถูกเป็นสีสว่าง ตัวที่พิมพ์ผิดเป็นสีแดงขีดเส้นใต้ พร้อม Caret กระพริบตามตำแหน่ง
3. มี Floating HUD แสดงเวลาที่เหลือ/ความคืบหน้า, ค่า Live WPM และ Live Accuracy %
4. มี Visual Virtual Keyboard ด้านล่างที่แสดงไฟกระพริบตามปุ่มที่กดจริง และมีไกด์สีแยกนิ้วมือ
5. สร้างระบบเสียงสวิตช์คีย์บอร์ดด้วย Web Audio API (Cherry Blue, Thock, Typewriter, Bubble) ไม่ใช้ไฟล์เสียงภายนอก
6. หน้ารายงานผลลัพธ์ (Results View) มีกราฟ SVG แสดง Timeline ความเร็ว, รายการปุ่มที่พิมพ์ผิดบ่อย, ตราสัญลักษณ์ระดับความเร็ว และปุ่มคัดลอกผลคะแนน
7. รองรับ Responsive ใช้งานได้บนมือถือ มีระบบบันทึกประวัติการพิมพ์ในเครื่อง (localStorage)
\`\`\`
**เหตุผลที่เขียนแบบนี้:** ใส่บริบทของแอปครบถ้วน ทั้งเป้าหมาย, เทคโนโลยีที่ใช้ (React + TS + Tailwind), ฟังก์ชันหลักทั้ง 4 โหมด, การจัดการ State แบบ Real-time, และข้อจำกัดทางเทคนิคที่ไม่พึ่งพา external asset
**ผลลัพธ์จาก AI:** AI สร้างโครงสร้างแอปและคอมโพเนนต์ครบถ้วน ทำงานได้จริงตามขอบเขตที่ต้องการ

---

## ส่วน C — บันทึกการปรับแก้ (Iteration & Debugging Log)

| รอบ | ปัญหาที่เจอ | Prompt ที่ใช้แก้ | ผลลัพธ์ | บทเรียน |
|---|---|---|---|---|
| 1 | ข้อความภาษาไทยที่มีสระบน/ล่าง (เช่น สระอิ, วรรณยุกต์) อาจถูกนับตำแหน่งตัวอักษรคลาดเคลื่อน | "ปรับปรุงระบบตรวจจับตัวอักษรภาษาไทยใน TypingArena ให้คำนวณ index ของ string อย่างถูกต้องตาม Unicode code points และไม่ให้ caret เลื่อนหลุดตำแหน่ง" | ระบบไฮไลต์สระและพยัญชนะภาษาไทยตรงตำแหน่งแม่นยำ 100% | การทำแอปภาษาไทยต้องระบุการจัดการ Unicode และสระซ้อนให้ชัดเจน |
| 2 | เมื่อพิมพ์ข้อความยาวๆ ตัวหนังสือไม่เลื่อนตามตำแหน่งที่กำลังพิมพ์อัตโนมัติ | "เพิ่ม auto-scroll behavior ใน text container ให้อ้างอิงตำแหน่ง offsetTop ของ activeCharRef เสมอเมื่อมีการพิมพ์ตัวอักษรใหม่" | หน้าจอกล่องข้อความเลื่อนตามตัวอักษรที่กำลังพิมพ์อย่างนุ่มนวล | ต้องระบุ DOM interaction และ auto-scrolling requirement |
| 3 [Debug] | เกิดปัญหา AudioContext warning บนบางเบราว์เซอร์เนื่องจาก User Interaction Policy ก่อนกดเริ่มเล่น | "แก้ปัญหา Web Audio API suspended state โดยสร้าง lazy initialization function 'initContext()' ที่จะ resume() เฉพาะเมื่อผู้ใช้คลิกหรือกดปุ่มแรก" | เสียงสวิตช์ทำงานลื่นไหล ไม่มี error warning ใน console | การ debug ต้องระบุ error behavior และ browser security lifecycle ให้ AI เข้าใจ |
| 4 | ต้องการให้หน้าต่างมือถือสามารถกดพิมพ์ผ่านปุ่มบนหน้าจอและคีย์บอร์ดเสมือนได้สะดวก | "เพิ่ม onVirtualKeyPress handler ใน VirtualKeyboard และปรับขนาดปุ่มให้รองรับ Touch Target ขั้นต่ำ 44px บนหน้าจอมือถือ" | ใช้งานบนมือถือได้อย่างสมบูรณ์แบบ แป้นพิมพ์ปรับขนาดตามหน้าจอ | ต้องคำนึงถึง Mobile-first touch interactions เสมอ |
| 5 | ต้องการให้ผู้ใช้แชร์ผลคะแนนหรือคัดลอก Scorecard ไปอวดเพื่อนได้ | "เพิ่มปุ่ม Share Scorecard ใน ResultsView ที่ฟอร์แมตข้อมูลเป็น Text Summary พร้อมอีโมจิสวยงามและคัดลอกลง Clipboard" | ผู้ใช้สามารถกดแชร์ผลคะแนน WPM, Accuracy, Duration ได้ทันที | การเพิ่ม Call-to-action เพิ่มความสนุกและการมีส่วนร่วมของผู้ใช้ |

---

## ส่วน D — สรุปสิ่งที่ได้เรียนรู้
1. **Prompt แบบไหนที่ได้ผลดีกับคุณ และแบบไหนที่เสียเวลาเปล่า:**
   Prompt ที่ได้ผลดีที่สุดคือ Prompt ที่ระบุโครงสร้างข้อมูล (TypeScript interfaces), เทคโนโลยีที่ต้องการ, และพฤติกรรม UI ที่เฉพาะเจาะจงในคำสั่งเดียว ส่วน Prompt ที่เสียเวลาเปล่าคือ Prompt สั้นๆ ที่ไม่มีรายละเอียด เช่น "แก้ให้หน่อย" หรือ "ทำไมไม่ทำงาน" เพราะทำให้ AI ต้องคาดเดาเอง
2. **มีจุดไหนที่ AI เขียนโค้ดผิดหรือมั่วบ้าง คุณรู้ได้อย่างไร:**
   พบจุดที่ต้องปรับเรื่อง Web Audio API Lifecycle ที่ถูกบล็อกตามนโยบาย Autoplay ของเบราว์เซอร์ ซึ่งตรวจสอบพบจากการดู Console Logs และทดสอบเล่นจริง จึงได้สั่งให้ AI สร้าง wrapper ฟังก์ชัน resume() เมื่อมี interaction
3. **ถ้าย้อนเวลากลับไปเขียน prompt แรกใหม่ คุณจะเขียนว่าอย่างไร:**
   จะระบุระบบจัดการ AudioContext และการรองรับภาษาไทยที่มีสระวรรณยุกต์ตั้งแต่ใน Prompt แรก เพื่อให้ AI วางสถาปัตยกรรมรองรับตั้งแต่เริ่มต้น
4. **งานนี้เปลี่ยนมุมมองของคุณต่อการใช้ AI เขียนโค้ดอย่างไร:**
   AI เป็นเหมือนผู้ช่วยเขียนโปรแกรมที่มีความเร็วสูงมาก แต่หัวใจสำคัญของโปรเจกต์ยังคงอยู่ที่ "การออกแบบและสั่งงานอย่างมีโครงสร้าง (Prompt Engineering)" ของมนุษย์ รวมถึงการทดสอบและ Debug อย่างเป็นระบบ`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptLogMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-lg text-slate-100">
                {language === 'th' ? 'แบบฟอร์ม Prompt Log สำหรับส่งงานอาจารย์' : 'Prompt Log Template (4 Parts)'}
              </h3>
              <p className="text-xs text-slate-400">
                ตรงตามเกณฑ์ใบงานครบทั้งส่วน A, B, C, D (คะแนนเต็ม 5 ส่วน)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Name and ID input helper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              ชื่อ-นามสกุล นักศึกษา:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="เช่น นายสมชาย ใจดี"
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              รหัสนักศึกษา:
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="เช่น 6601234567"
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Checklist of 4 Sections */}
        <div className="space-y-2 text-xs">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>หัวข้อที่เตรียมไว้ให้ในเอกสาร (ครบตามเกณฑ์ PDF หน้า 4-5):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>ส่วน A:</strong> ข้อมูลโปรเจกต์ & คำอธิบาย</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>ส่วน B:</strong> Prompt แรกแบบเต็ม + เหตุผล</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>ส่วน C:</strong> ตารางปรับแก้ 5 รอบ + รอบ Debug</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>ส่วน D:</strong> สรุปสิ่งที่ได้เรียนรู้ 4 ข้อ</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-5 h-5 text-slate-950" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? 'คัดลอกข้อความ Prompt Log เรียบร้อยแล้ว!' : 'คัดลอก Prompt Log ไปวางใน Google Doc'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
