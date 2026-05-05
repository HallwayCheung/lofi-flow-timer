import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  '专注是通往卓越的桥梁。',
  '每一分钟的专注，都在塑造更好的自己。',
  '心无旁骛，方能致远。',
  '深呼吸，感受当下的力量。',
  '简单的事情重复做，你就是专家。',
  '安静地努力，然后惊艳所有人。',
  '不积跬步，无以至千里。',
  '今天的汗水，是明天的勋章。',
  '真正的专注，是和时间做朋友。',
  '保持热爱，奔赴山海。',
  '慢慢来，比较快。',
  '把一件事做到极致，胜过平庸地做一万件。',
  '你不需要看到整个楼梯，只需迈出第一步。',
  '浮躁是专注的天敌，耐心是成功的密友。',
  '每一段沉默的时光，都是在积蓄力量。',
  '最好的状态，是心流中的自己。',
];

export function QuoteDisplay({ sessionIndex }) {
  const quote = QUOTES[sessionIndex % QUOTES.length];

  return (
    <div className="h-6 flex items-center justify-center px-8">
      <AnimatePresence mode="wait">
        <motion.p
          key={sessionIndex}
          className="text-white/18 text-[11px] sm:text-xs font-light tracking-wide text-center max-w-sm"
          style={{ fontStyle: 'italic', letterSpacing: '0.05em' }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {quote}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
