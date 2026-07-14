export type ScriptType = "kaishu" | "xingshu" | "caoshu" | "lishu" | "zhuanshu";

export interface ScriptStyle {
  id: ScriptType;
  chinese: string;
  pinyin: string;
  english: string;
  description: string;
  period: string;
  masters: string[];
}

export const SCRIPT_STYLES: ScriptStyle[] = [
  {
    id: "kaishu",
    chinese: "楷书",
    pinyin: "Kǎishū",
    english: "Regular Script",
    description:
      "Standardized, upright characters with clear structure. The most legible script and the foundation of modern printed Chinese.",
    period: "Han to present",
    masters: ["Ouyang Xun", "Yan Zhenqing", "Liu Gongquan"],
  },
  {
    id: "xingshu",
    chinese: "行书",
    pinyin: "Xíngshū",
    english: "Running Script",
    description:
      "A semi-cursive style balancing legibility and fluidity. Strokes connect naturally as if written in conversation.",
    period: "Late Han to present",
    masters: ["Wang Xizhi", "Mi Fu", "Su Shi"],
  },
  {
    id: "caoshu",
    chinese: "草书",
    pinyin: "Cǎoshū",
    english: "Cursive Script",
    description:
      "Highly abbreviated and expressive. Strokes merge into single gestures, prized as pure artistic expression.",
    period: "Han to present",
    masters: ["Zhang Xu", "Huai Su", "Wang Xianzhi"],
  },
  {
    id: "lishu",
    chinese: "隶书",
    pinyin: "Lìshū",
    english: "Clerical Script",
    description:
      "Flat, broad characters with a distinctive wave-like ending stroke. Bridged ancient seal script and modern regular script.",
    period: "Qin–Han",
    masters: ["Cai Yong", "Deng Shiru"],
  },
  {
    id: "zhuanshu",
    chinese: "篆书",
    pinyin: "Zhuànshū",
    english: "Seal Script",
    description:
      "Ancient, curvilinear characters used on bronzes and seals. Still used today for artistic seal engraving.",
    period: "Shang–Qin",
    masters: ["Li Si", "Wu Changshuo"],
  },
];

export interface Character {
  id: string;
  character: string;
  pinyin: string;
  meaning: string;
  radical: string;
  radicalMeaning: string;
  strokes: number;
  hsk?: number;
  etymology: string;
  examples: { word: string; pinyin: string; meaning: string }[];
  quote?: string;
  cultural: string;
}

export const CHARACTERS: Character[] = [
  {
    id: "yong",
    character: "永",
    pinyin: "yǒng",
    meaning: "Eternal, forever",
    radical: "水",
    radicalMeaning: "Water",
    strokes: 5,
    hsk: 3,
    etymology:
      "Originally a pictograph of flowing water, symbolizing the endless current of a river. The character famously contains all eight fundamental strokes of Chinese calligraphy — the 'Eight Principles of Yong' (永字八法).",
    examples: [
      { word: "永远", pinyin: "yǒngyuǎn", meaning: "forever" },
      { word: "永恒", pinyin: "yǒnghéng", meaning: "eternity" },
      { word: "永久", pinyin: "yǒngjiǔ", meaning: "permanent" },
    ],
    cultural:
      "Practicing 永 is the traditional first exercise in learning calligraphy — master this single character and you have practiced every fundamental stroke.",
  },
  {
    id: "shan",
    character: "山",
    pinyin: "shān",
    meaning: "Mountain",
    radical: "山",
    radicalMeaning: "Mountain",
    strokes: 3,
    hsk: 1,
    etymology:
      "A pictograph of three mountain peaks rising together. Among the oldest and most recognizable characters, preserved almost unchanged since oracle bone script.",
    examples: [
      { word: "山水", pinyin: "shānshuǐ", meaning: "landscape (mountains & water)" },
      { word: "火山", pinyin: "huǒshān", meaning: "volcano" },
      { word: "登山", pinyin: "dēngshān", meaning: "to climb a mountain" },
    ],
    cultural:
      "Mountains are sacred in Chinese cosmology — home to immortals and the subject of shan-shui painting for over a millennium.",
  },
  {
    id: "shui",
    character: "水",
    pinyin: "shuǐ",
    meaning: "Water",
    radical: "水",
    radicalMeaning: "Water",
    strokes: 4,
    hsk: 1,
    etymology:
      "A pictograph of a flowing stream with droplets on either side. As a radical it takes the compressed form 氵.",
    examples: [
      { word: "水墨", pinyin: "shuǐmò", meaning: "ink wash" },
      { word: "山水", pinyin: "shānshuǐ", meaning: "landscape" },
      { word: "水平", pinyin: "shuǐpíng", meaning: "level, standard" },
    ],
    cultural: "Laozi wrote: 上善若水 — 'The highest good is like water.'",
  },
  {
    id: "ai",
    character: "爱",
    pinyin: "ài",
    meaning: "Love",
    radical: "爪",
    radicalMeaning: "Claw",
    strokes: 10,
    hsk: 1,
    etymology:
      "The traditional form 愛 contained 心 (heart) at its center. The simplified form removed the heart, a change sometimes debated by calligraphers.",
    examples: [
      { word: "爱情", pinyin: "àiqíng", meaning: "romantic love" },
      { word: "热爱", pinyin: "rè'ài", meaning: "to love ardently" },
      { word: "爱好", pinyin: "àihào", meaning: "hobby" },
    ],
    cultural: "A perennial favorite for calligraphic gifts, especially at weddings.",
  },
  {
    id: "fu",
    character: "福",
    pinyin: "fú",
    meaning: "Blessing, fortune",
    radical: "示",
    radicalMeaning: "Altar",
    strokes: 13,
    hsk: 3,
    etymology:
      "Combines the altar radical 示 with 畐 (abundance). Depicts offering wine at an altar to invoke blessings from ancestors.",
    examples: [
      { word: "福气", pinyin: "fúqì", meaning: "good fortune" },
      { word: "祝福", pinyin: "zhùfú", meaning: "blessing, to bless" },
      { word: "幸福", pinyin: "xìngfú", meaning: "happiness" },
    ],
    cultural:
      "During Spring Festival, 福 is pasted upside-down on doors — 'upside-down' (倒) sounds like 'arrives' (到), meaning fortune arrives.",
  },
  {
    id: "he",
    character: "和",
    pinyin: "hé",
    meaning: "Harmony, peace",
    radical: "口",
    radicalMeaning: "Mouth",
    strokes: 8,
    hsk: 1,
    etymology:
      "Combines 禾 (grain) and 口 (mouth). To share grain from one's mouth — the essence of harmony.",
    examples: [
      { word: "和平", pinyin: "hépíng", meaning: "peace" },
      { word: "和谐", pinyin: "héxié", meaning: "harmony" },
      { word: "温和", pinyin: "wēnhé", meaning: "gentle, mild" },
    ],
    cultural:
      "A central concept in Confucian philosophy: 和为贵 — 'harmony is to be prized.'",
  },
  {
    id: "dao",
    character: "道",
    pinyin: "dào",
    meaning: "The Way, path, principle",
    radical: "辶",
    radicalMeaning: "Walk",
    strokes: 12,
    hsk: 4,
    etymology:
      "Combines the walking radical 辶 with 首 (head). Literally 'the head walking forward' — a road, and by extension the underlying principle of things.",
    examples: [
      { word: "道理", pinyin: "dàolǐ", meaning: "reason, principle" },
      { word: "知道", pinyin: "zhīdào", meaning: "to know" },
      { word: "道路", pinyin: "dàolù", meaning: "road, way" },
    ],
    quote: "道可道，非常道 — The Way that can be spoken of is not the eternal Way. — Laozi",
    cultural: "The central concept of Daoism and a cornerstone of Chinese philosophy.",
  },
  {
    id: "mei",
    character: "美",
    pinyin: "měi",
    meaning: "Beauty, beautiful",
    radical: "羊",
    radicalMeaning: "Sheep",
    strokes: 9,
    hsk: 2,
    etymology:
      "Combines 羊 (sheep) atop 大 (large) — 'a large sheep is delicious.' Ancient Chinese associated beauty with the good and the tasteful.",
    examples: [
      { word: "美丽", pinyin: "měilì", meaning: "beautiful" },
      { word: "美术", pinyin: "měishù", meaning: "fine art" },
      { word: "赞美", pinyin: "zànměi", meaning: "to praise" },
    ],
    cultural: "The Chinese word for aesthetics — 美学 — literally means 'the study of beauty.'",
  },
];

export interface Calligrapher {
  id: string;
  name: string;
  chinese: string;
  dynasty: string;
  years: string;
  signatureStyle: ScriptType;
  bio: string;
  works: string[];
  epithet?: string;
}

export const CALLIGRAPHERS: Calligrapher[] = [
  {
    id: "wang-xizhi",
    name: "Wang Xizhi",
    chinese: "王羲之",
    dynasty: "Jin",
    years: "303–361",
    signatureStyle: "xingshu",
    epithet: "Sage of Calligraphy (书圣)",
    bio: "The most revered calligrapher in Chinese history. His 'Preface to the Poems Collected from the Orchid Pavilion' (兰亭集序) is considered the greatest work of running script ever produced.",
    works: ["Lantingji Xu (兰亭集序)", "Sangluan Tie (丧乱帖)", "Kuaixue Shiqing Tie (快雪时晴帖)"],
  },
  {
    id: "wang-xianzhi",
    name: "Wang Xianzhi",
    chinese: "王献之",
    dynasty: "Jin",
    years: "344–386",
    signatureStyle: "caoshu",
    bio: "Youngest son of Wang Xizhi and equally celebrated. Together they are known as the 'Two Wangs' (二王). Pushed running and cursive script into freer, more expressive territory.",
    works: ["Zhongqiu Tie (中秋帖)", "Yatou Wan Tie (鸭头丸帖)"],
  },
  {
    id: "ouyang-xun",
    name: "Ouyang Xun",
    chinese: "欧阳询",
    dynasty: "Tang",
    years: "557–641",
    signatureStyle: "kaishu",
    bio: "One of the Four Great Calligraphers of the early Tang. His regular script is famous for its precise geometry and structural rigor.",
    works: ["Jiuchenggong Liquan Ming (九成宫醴泉铭)", "Huadu Si Bei (化度寺碑)"],
  },
  {
    id: "yan-zhenqing",
    name: "Yan Zhenqing",
    chinese: "颜真卿",
    dynasty: "Tang",
    years: "709–785",
    signatureStyle: "kaishu",
    bio: "General, statesman, and master of a robust, muscular regular script known as 颜体 (Yan style). His draft eulogy for a nephew killed in war is considered the second greatest work of running script.",
    works: ["Duobao Ta Bei (多宝塔碑)", "Ji Zhi Wen Gao (祭侄文稿)"],
  },
  {
    id: "liu-gongquan",
    name: "Liu Gongquan",
    chinese: "柳公权",
    dynasty: "Tang",
    years: "778–865",
    signatureStyle: "kaishu",
    bio: "Master of a taut, sinewy regular script often paired with Yan Zhenqing as 'Yan-Liu' (颜柳). Known for the saying 'when the heart is upright, the brush is upright.'",
    works: ["Xuanmita Bei (玄秘塔碑)", "Shen Ce Jun Bei (神策军碑)"],
  },
  {
    id: "zhao-mengfu",
    name: "Zhao Mengfu",
    chinese: "赵孟頫",
    dynasty: "Yuan",
    years: "1254–1322",
    signatureStyle: "kaishu",
    bio: "Descendant of Song royalty who served the Mongol Yuan. Revived the elegant Wang Xizhi tradition; his 赵体 remains one of the four canonical regular-script styles.",
    works: ["Danba Bei (胆巴碑)", "Luoshen Fu (洛神赋)"],
  },
  {
    id: "mi-fu",
    name: "Mi Fu",
    chinese: "米芾",
    dynasty: "Song",
    years: "1051–1107",
    signatureStyle: "xingshu",
    bio: "Eccentric scholar-painter, one of the Four Masters of the Northern Song. His running script is bold, tilted, and wonderfully unpredictable.",
    works: ["Shu Su Tie (蜀素帖)", "Tiaoxi Shi Juan (苕溪诗卷)"],
  },
  {
    id: "su-shi",
    name: "Su Shi",
    chinese: "苏轼",
    dynasty: "Song",
    years: "1037–1101",
    signatureStyle: "xingshu",
    bio: "Statesman, poet, gastronome, and calligrapher — one of the towering figures of the Song. His 'Cold Food Observance' is called the third greatest running script.",
    works: ["Han Shi Tie (寒食帖)", "Chi Bi Fu (赤壁赋)"],
  },
];

export interface TimelineEra {
  id: string;
  script: string;
  chinese: string;
  period: string;
  description: string;
  sample: string;
}

export const TIMELINE: TimelineEra[] = [
  {
    id: "oracle",
    script: "Oracle Bone Script",
    chinese: "甲骨文",
    period: "c. 1250–1050 BCE",
    description:
      "The earliest confirmed Chinese writing, inscribed on turtle plastrons and ox scapulae for divination during the late Shang dynasty.",
    sample: "日月山",
  },
  {
    id: "bronze",
    script: "Bronze Script",
    chinese: "金文",
    period: "c. 1200–200 BCE",
    description:
      "Characters cast into ritual bronzes. Rounder and thicker than oracle script; used across the Shang and Zhou dynasties.",
    sample: "王中",
  },
  {
    id: "large-seal",
    script: "Large Seal Script",
    chinese: "大篆",
    period: "c. 800–221 BCE",
    description:
      "Regional scripts of the late Zhou. Extremely varied by state until unification.",
    sample: "馬車",
  },
  {
    id: "small-seal",
    script: "Small Seal Script",
    chinese: "小篆",
    period: "221–206 BCE",
    description:
      "Standardized by Prime Minister Li Si under the First Emperor of Qin — the first empire-wide script.",
    sample: "山水",
  },
  {
    id: "clerical",
    script: "Clerical Script",
    chinese: "隶书",
    period: "c. 200 BCE–200 CE",
    description:
      "The great simplification. Curves straightened, characters flattened — the bridge to modern script.",
    sample: "永和",
  },
  {
    id: "regular",
    script: "Regular Script",
    chinese: "楷书",
    period: "c. 200 CE–present",
    description:
      "The upright, standardized form still used today. Perfected in the Tang dynasty.",
    sample: "楷书正",
  },
  {
    id: "running",
    script: "Running Script",
    chinese: "行书",
    period: "c. 200 CE–present",
    description:
      "A semi-cursive script for everyday writing — legible but fluid. The domain of Wang Xizhi.",
    sample: "兰亭",
  },
  {
    id: "cursive",
    script: "Cursive Script",
    chinese: "草书",
    period: "c. 200 CE–present",
    description:
      "Radical abbreviation for artistic expression. Characters flow into single gestures of ink.",
    sample: "草書",
  },
];

export interface DailyQuote {
  chinese: string;
  translation: string;
  author: string;
  dynasty: string;
}

export const DAILY_QUOTES: DailyQuote[] = [
  {
    chinese: "书必有神、气、骨、肉、血。",
    translation: "Calligraphy must have spirit, breath, bone, flesh, and blood.",
    author: "Su Shi",
    dynasty: "Song Dynasty",
  },
  {
    chinese: "书，心画也。",
    translation: "Writing is the portrait of the mind.",
    author: "Yang Xiong",
    dynasty: "Han Dynasty",
  },
  {
    chinese: "心正则笔正。",
    translation: "When the heart is upright, the brush is upright.",
    author: "Liu Gongquan",
    dynasty: "Tang Dynasty",
  },
  {
    chinese: "笔落惊风雨，诗成泣鬼神。",
    translation:
      "When the brush falls, wind and rain are startled; when the poem is done, ghosts and gods weep.",
    author: "Du Fu",
    dynasty: "Tang Dynasty",
  },
  {
    chinese: "字如其人。",
    translation: "The writing is the person.",
    author: "Chinese proverb",
    dynasty: "—",
  },
];

// Deterministic daily pick based on day-of-year
export function pickForToday<T>(items: T[], offset = 0): T {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return items[(day + offset) % items.length];
}

export function getCharacter(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}
export function getCalligrapher(id: string): Calligrapher | undefined {
  return CALLIGRAPHERS.find((c) => c.id === id);
}
export function getScript(id: string): ScriptStyle | undefined {
  return SCRIPT_STYLES.find((s) => s.id === id);
}
