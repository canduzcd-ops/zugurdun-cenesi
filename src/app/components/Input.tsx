import type { InputHTMLAttributes, ReactNode, ChangeEvent } from 'react';
import { useState, forwardRef } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onChange?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, leftIcon, rightIcon, onChange, className = '', ...props }, ref) => {
        const [focused, setFocused] = useState(false);

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {label}
                    </label>
                )}
                <div
                    className={`
            flex items-center gap-2 px-4 py-3 border-2 transition-all
            bg-white dark:bg-black
            ${focused ? 'border-primary shadow-brutal' : 'border-black dark:border-white'}
            ${error ? 'border-red-600 shadow-brutal' : ''}
          `}
                >
                    {leftIcon && <span className="text-gray-400">{leftIcon}</span>}
                    <input
                        ref={ref}
                        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={(e) => onChange?.(e.target.value)}
                        {...props}
                    />
                    {rightIcon && <span className="text-gray-400">{rightIcon}</span>}
                </div>
                {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

interface AmountInputProps {
    value: number;
    onChange: (value: number) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
}

export function AmountInput({ value, onChange, onFocus, onBlur, placeholder = '0' }: AmountInputProps) {
    const [inputValue, setInputValue] = useState(value > 0 ? formatForDisplay(value) : '');

    function formatForDisplay(num: number): string {
        return new Intl.NumberFormat('tr-TR').format(num);
    }

    function parseInput(str: string): number {
        const cleaned = str.replace(/[^\d]/g, '');
        return parseInt(cleaned, 10) || 0;
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value;
        const num = parseInput(raw);
        setInputValue(num > 0 ? formatForDisplay(num) : raw);
        onChange(num);
    }

    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-black dark:text-white font-mono">
                ₺
            </div>
            <input
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-4 text-2xl font-bold text-center bg-white dark:bg-black border-4 border-black dark:border-white focus:border-primary focus:shadow-brutal outline-none transition-all font-mono"
            />
        </div>
    );
}
