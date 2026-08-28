import { Language, QuoteItem, QuoteLength } from '../types';

export const ENGLISH_COMMON_WORDS = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it",
  "that", "for", "they", "I", "with", "as", "not", "on", "she", "at",
  "by", "this", "we", "you", "do", "but", "from", "or", "which", "one",
  "would", "all", "will", "there", "say", "who", "make", "when", "can", "more",
  "if", "no", "man", "out", "other", "so", "what", "time", "up", "go",
  "about", "than", "into", "could", "state", "only", "new", "year", "some", "take",
  "come", "these", "know", "see", "use", "get", "like", "then", "first", "any",
  "work", "now", "may", "such", "give", "over", "think", "most", "even", "find",
  "day", "also", "after", "way", "many", "must", "look", "before", "great", "back",
  "through", "long", "where", "much", "should", "well", "people", "down", "own", "just",
  "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place",
  "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write",
  "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop",
  "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another",
  "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point",
  "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home",
  "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without",
  "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem",
  "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face",
  "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"
];

export const THAI_COMMON_WORDS = [
  "การ", "ความ", "ที่", "และ", "ใน", "มี", "ได้", "จะ", "เป็น", "ให้",
  "ไม่", "ของ", "นี้", "ว่า", "ไป", "มา", "อยู่", "คน", "กับ", "ต้อง",
  "ทำ", "ถึง", "จาก", "กัน", "เข้า", "หรือ", "ออก", "ไว้", "กว่า", "ยัง",
  "เลย", "ขึ้น", "ลง", "มาก", "ดี", "แล้ว", "ใจ", "วัน", "เวลา", "รู้",
  "เห็น", "คิด", "พูด", "เรื่อง", "งาน", "บ้าน", "โลก", "ทาง", "ใหม่", "เรา",
  "เขา", "ท่าน", "ตน", "จริง", "พร้อม", "ช่วย", "นำ", "เกิด", "ชีวิต", "พบ",
  "ใช้", "เดิน", "บอก", "เพื่อน", "เรียน", "สอน", "สุข", "รัก", "หวัง", "สวย",
  "เร็ว", "เขียน", "อ่าน", "ฟัง", "ถาม", "ตอบ", "สร้าง", "กิน", "นอน", "เที่ยว"
];

export const QUOTES_LIST: QuoteItem[] = [
  // English Short
  {
    id: "q_en_1",
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
    length: "short",
    lang: "en"
  },
  {
    id: "q_en_2",
    text: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
    length: "short",
    lang: "en"
  },
  {
    id: "q_en_3",
    text: "Knowledge is power.",
    author: "Francis Bacon",
    length: "short",
    lang: "en"
  },
  {
    id: "q_en_4",
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    length: "short",
    lang: "en"
  },
  // English Medium
  {
    id: "q_en_5",
    text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    author: "Steve Jobs",
    length: "medium",
    lang: "en"
  },
  {
    id: "q_en_6",
    text: "Programming isn't about what you know; it's about what you can figure out through persistence and curiosity.",
    author: "Chris Pine",
    length: "medium",
    lang: "en"
  },
  {
    id: "q_en_7",
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts in the end.",
    author: "Winston Churchill",
    length: "medium",
    lang: "en"
  },
  // English Long
  {
    id: "q_en_8",
    text: "The future belongs to those who believe in the beauty of their dreams. Technology alone is not enough; it is technology married with liberal arts, married with the humanities, that yields us the results that make our heart sing.",
    author: "Eleanor Roosevelt & Steve Jobs",
    length: "long",
    lang: "en"
  },
  {
    id: "q_en_9",
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. Clean architecture and thoughtful design stand the test of time and empower future generations of builders.",
    author: "Martin Fowler",
    length: "long",
    lang: "en"
  },
  // Thai Short
  {
    id: "q_th_1",
    text: "ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น",
    author: "สุภาษิตไทย",
    length: "short",
    lang: "th"
  },
  {
    id: "q_th_2",
    text: "การเรียนรู้ไม่มีวันสิ้นสุด ทุกวันคือโอกาสใหม่",
    author: "คติพจน์",
    length: "short",
    lang: "th"
  },
  {
    id: "q_th_3",
    text: "ก้าวแรกที่กล้าหาญ นำพาไปสู่เส้นทางที่ยิ่งใหญ่",
    author: "แรงบันดาลใจ",
    length: "short",
    lang: "th"
  },
  // Thai Medium
  {
    id: "q_th_4",
    text: "การเขียนโปรแกรมเปรียบเสมือนการสร้างสะพานเชื่อมความคิดสู่นวัตกรรมที่เปลี่ยนแปลงโลกได้จริง ด้วยความมุ่งมั่นและความคิดสร้างสรรค์",
    author: "นักพัฒนายุคใหม่",
    length: "medium",
    lang: "th"
  },
  {
    id: "q_th_5",
    text: "ความสุขไม่ได้อยู่ที่จุดหมายปลายทางเพียงอย่างเดียว แต่อยู่ที่การได้เรียนรู้และเติบโตในทุกย่างก้าวของการเดินทาง",
    author: "ปรัชญาชีวิต",
    length: "medium",
    lang: "th"
  },
  // Thai Long
  {
    id: "q_th_6",
    text: "เทคโนโลยีและปัญญาประดิษฐ์เป็นเครื่องมืออันทรงพลัง แต่หัวใจสำคัญที่สุดยังคงเป็นมนุษย์ที่มีจินตนาการ ความเห็นอกเห็นใจ และความตั้งใจที่จะพัฒนาสังคมให้ดียิ่งขึ้นในทุกมิติของชีวิต",
    author: "นวัตกรรมเพื่ออนาคต",
    length: "long",
    lang: "th"
  }
];

export function generateRandomWords(
  count: number,
  lang: Language = 'en',
  includePunctuation = false,
  includeNumbers = false
): string {
  const source = lang === 'th' ? THAI_COMMON_WORDS : ENGLISH_COMMON_WORDS;
  const words: string[] = [];

  for (let i = 0; i < count; i++) {
    let word = source[Math.floor(Math.random() * source.length)];

    if (includeNumbers && Math.random() < 0.15) {
      word = Math.floor(Math.random() * 999).toString();
    } else if (includePunctuation && lang === 'en') {
      const rand = Math.random();
      if (rand < 0.08) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      if (rand < 0.07) {
        word = word + ",";
      } else if (rand < 0.14) {
        word = word + ".";
      } else if (rand < 0.18) {
        word = `"${word}"`;
      }
    }
    words.push(word);
  }

  return words.join(" ");
}

export function getRandomQuote(length: QuoteLength = 'medium', lang: Language = 'en'): QuoteItem {
  const filtered = QUOTES_LIST.filter(q => q.lang === lang && q.length === length);
  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
  const langFiltered = QUOTES_LIST.filter(q => q.lang === lang);
  return langFiltered[Math.floor(Math.random() * langFiltered.length)] || QUOTES_LIST[0];
}
