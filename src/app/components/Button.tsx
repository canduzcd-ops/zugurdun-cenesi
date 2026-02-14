import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    children: ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseClasses =
        'font-bold rounded-none transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed font-mono uppercase tracking-wide';

    const variantClasses = {
        primary: 'bg-primary text-white border-2 border-black shadow-brutal hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
        secondary: 'bg-accent text-black border-2 border-black shadow-brutal hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
        outline: 'bg-white border-2 border-black text-black shadow-brutal hover:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
        ghost: 'text-black dark:text-white hover:bg-amber-100 dark:hover:bg-gray-900 border-2 border-transparent',
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    label: string;
}

export function IconButton({ icon, label, className = '', ...props }: IconButtonProps) {
    return (
        <button
            className={`p-3 border-2 border-black hover:bg-amber-100 dark:hover:bg-gray-900 transition-colors ${className}`}
            aria-label={label}
            {...props}
        >
            {icon}
        </button>
    );
}
