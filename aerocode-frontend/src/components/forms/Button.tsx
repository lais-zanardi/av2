import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

const getVariantClasses = (variant: ButtonProps['variant']): string => {
    switch (variant) {
        case 'primary':
            return 'bg-[#2b52cc] text-white hover:bg-[#2b42cc] focus:ring-blue-500';
        case 'secondary':
            return 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
        case 'danger':
            return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
        case 'success':
            return 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500';
        default:
            return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
    }
};

const getSizeClasses = (size: ButtonProps['size']): string => {
    switch (size) {
        case 'sm':
            return 'px-3 py-1 text-sm';
        case 'lg':
            return 'px-6 py-3 text-lg';
        default:
            return 'px-4 py-2 text-base';
    }
};

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    children,
    disabled,
    className = '',
    ...rest
}) => {
    const variantClasses = getVariantClasses(variant);
    const sizeClasses = getSizeClasses(size);

    return (
        <button
            className={`flex items-center justify-center font-medium shadow-sm transition-colors duration-150 
                       focus:outline-none focus:ring-2 focus:ring-opacity-50 
                       ${variantClasses} ${sizeClasses} ${loading || disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
            disabled={loading || disabled}
            {...rest}
        >
            {loading && <FaSpinner className="animate-spin mr-2" />}
            {children}
        </button>
    );
};

export default Button;