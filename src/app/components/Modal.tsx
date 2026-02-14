import { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
            return () => window.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            onClick={(e) => e.target === overlayRef.current && onClose()}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Modal Content */}
            <div className="relative w-full sm:max-w-lg max-h-[85vh] bg-white dark:bg-black border-4 border-black dark:border-white shadow-brutal-lg overflow-hidden animate-slideUp">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b-4 border-black dark:border-white bg-amber-100 dark:bg-gray-900">
                    <h2 className="text-lg font-bold text-black dark:text-white uppercase font-mono tracking-wider">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-black dark:text-white hover:bg-amber-200 dark:hover:bg-gray-800 transition-colors border-2 border-black dark:border-white font-mono font-bold"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto max-h-[calc(85vh-60px)] p-6">{children}</div>
            </div>
        </div>
    );
}

interface CardProps {
    title?: string;
    icon?: string;
    children: React.ReactNode;
    className?: string;
}

export function Card({ title, icon, children, className = '' }: CardProps) {
    return (
        <div
            className={`bg-white dark:bg-black border-4 border-black dark:border-white shadow-brutal overflow-hidden ${className}`}
        >
            {title && (
                <div className="flex items-center gap-2 px-4 py-3 border-b-4 border-black dark:border-white bg-accent">
                    {icon && <span className="text-2xl">{icon}</span>}
                    <h3 className="font-bold text-black uppercase tracking-wide font-mono">{title}</h3>
                </div>
            )}
            <div className="p-4">{children}</div>
        </div>
    );
}
