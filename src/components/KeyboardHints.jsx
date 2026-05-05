export function KeyboardHints() {
  return (
    <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-wider text-white/12">
      <span className="flex items-center gap-1.5">
        <kbd className="px-1.5 py-0.5 rounded-md text-[9px] font-mono" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.18)' }}>Space</kbd>
        <span>播放 / 暂停</span>
      </span>
      <span className="text-white/06">·</span>
      <span className="flex items-center gap-1.5">
        <kbd className="px-1.5 py-0.5 rounded-md text-[9px] font-mono" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.18)' }}>R</kbd>
        <span>重置</span>
      </span>
      <span className="text-white/06">·</span>
      <span className="flex items-center gap-1.5">
        <kbd className="px-1.5 py-0.5 rounded-md text-[9px] font-mono" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.18)' }}>S</kbd>
        <span>跳过</span>
      </span>
      <span className="text-white/06">·</span>
      <span className="flex items-center gap-1.5">
        <kbd className="px-1.5 py-0.5 rounded-md text-[9px] font-mono" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.18)' }}>1-3</kbd>
        <span>白噪音</span>
      </span>
    </div>
  );
}
