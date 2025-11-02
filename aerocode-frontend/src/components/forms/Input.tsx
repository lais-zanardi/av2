import React from 'react'
import type { IconType } from 'react-icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    className?: string
    Icon?: IconType;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', id, Icon, ...rest }) => {
    const inputId = id || `input-${label.replace(/\s/g, '-')}-${Math.random().toString(36).substring(2, 9)}`
    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 
                                 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'

    return (
        <div className={`space-y-1 ${className}`}>
            <label htmlFor={inputId} className="block text-sm text-left font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
            <input
                id={inputId}
                className={`block w-full shadow-sm p-2.5 
                            text-gray-900 placeholder-gray-400 
                            ring-1 ring-inset pr-10 ${errorClasses}`}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : undefined}
                {...rest}
            />
            {Icon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                )}
            </div>
            {error && (
                <p id={`${inputId}-error`} className="text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    )
}

export default Input