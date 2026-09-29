interface TapeProps {
  className?: string;
  rotate?: string;
}

export function Tape({ className = "w-20 h-5", rotate = "rotate-2" }: TapeProps) {
  return (
    <div 
      aria-hidden="true"
      className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-(--text) opacity-10 shadow-sm pointer-events-none transition-colors ${rotate} ${className}`}
    />
  );
}
