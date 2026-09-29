import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="relative z-10 my-10" 
      role="dialog" 
      aria-modal="true"
    >
      <div 
        className="absolute inset-0 bg-(--bg) opacity-80 backdrop-blur-[2px] -m-10 rounded-xl cursor-pointer" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}