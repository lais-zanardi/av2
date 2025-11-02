import React from 'react';

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: Option[];
    error?: string;
    className?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, error, className = '', id, ...rest }) => {
    const selectId = id || `select-${label.replace(/\s/g, '-')}-${Math.random().toString(36).substring(2, 9)}`;

    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 
                                 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    return (
        <div className={`space-y-1 ${className}`}>
            <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={selectId}
                className={`block w-full rounded-lg shadow-sm p-2.5 
                            text-gray-900 bg-white
                            ring-1 ring-inset ${errorClasses}`}
                aria-invalid={!!error}
                aria-describedby={error ? `${selectId}-error` : undefined}
                {...rest}
            >
                <option value="" disabled>Selecione...</option>
                
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p id={`${selectId}-error`} className="text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Select;